import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export function buildAlternates(path: string): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `/${locale}${path}`]),
  );

  return {
    languages: {
      ...languages,
      "x-default": `/en${path}`,
    },
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: buildAlternates(path),
    openGraph: {
      title,
      description,
    },
  };
}
