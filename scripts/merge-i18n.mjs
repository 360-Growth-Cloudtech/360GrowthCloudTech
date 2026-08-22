#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "..", "messages");

function deepMerge(target, source) {
  if (!source) return target;
  for (const [key, val] of Object.entries(source)) {
    if (Array.isArray(val)) {
      target[key] = val.map((item) =>
        typeof item === "object" && item !== null ? deepMerge(Array.isArray(item) ? [...item] : { ...item }, item) : item
      );
    } else if (val && typeof val === "object") {
      target[key] = deepMerge(target[key] ?? {}, val);
    } else {
      target[key] = val;
    }
  }
  return target;
}

const locales = ["es", "fr", "de", "ja", "ar"];
for (const locale of locales) {
  for (const file of ["caseStudies", "legal"]) {
    const en = JSON.parse(fs.readFileSync(path.join(base, "en", `${file}.json`), "utf8"));
    const overridePath = path.join(__dirname, "i18n-overrides", locale, `${file}.json`);
    if (!fs.existsSync(overridePath)) {
      console.warn(`Missing override: ${overridePath}`);
      continue;
    }
    const override = JSON.parse(fs.readFileSync(overridePath, "utf8"));
    const merged = deepMerge(structuredClone(en), override);
    fs.writeFileSync(path.join(base, locale, `${file}.json`), JSON.stringify(merged, null, 2) + "\n");
    console.log(`Merged ${locale}/${file}.json`);
  }
}
