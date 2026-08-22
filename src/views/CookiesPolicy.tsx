"use client";

import { useMemo } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  LegalDocument,
  LegalSection,
  LegalSectionContent,
  legalVars,
} from "@/components/LegalDocument";

const COOKIES_SECTION_KEYS = [
  "whatAreCookies",
  "howWeUse",
  "types",
  "thirdParty",
  "managing",
  "retention",
  "updates",
  "contact",
] as const;

type LegalSectionData = {
  title: string;
  paragraphs: string[];
  list?: string[];
  subsections?: { heading: string; paragraphs: string[] }[];
};

function interpolateText(text: string): string {
  return Object.entries(legalVars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, value),
    text,
  );
}

function interpolateSection(section: LegalSectionData): LegalSectionData {
  return {
    title: interpolateText(section.title),
    paragraphs: section.paragraphs.map(interpolateText),
    list: section.list?.map(interpolateText),
    subsections: section.subsections?.map((subsection) => ({
      heading: interpolateText(subsection.heading),
      paragraphs: subsection.paragraphs.map(interpolateText),
    })),
  };
}

function CookiesHowWeUseSection({ section }: { section: LegalSectionData }) {
  const t = useTranslations("legal.cookies");
  const privacyLinkText = t("privacyPolicyLink");
  const linkParagraph = section.paragraphs[1] ?? "";
  const linkParts = linkParagraph.split(privacyLinkText);

  return (
    <LegalSection title={section.title}>
      {section.paragraphs[0] && <p>{section.paragraphs[0]}</p>}
      {section.list && section.list.length > 0 && (
        <ul>
          {section.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
      {linkParts.length === 2 ? (
        <p>
          {linkParts[0]}
          <Link href="/privacy-policy" className="text-primary font-semibold hover:underline">
            {privacyLinkText}
          </Link>
          {linkParts[1]}
        </p>
      ) : (
        linkParagraph && <p>{linkParagraph}</p>
      )}
    </LegalSection>
  );
}

export default function CookiesPolicy() {
  const t = useTranslations("legal.cookies");

  const sections = useMemo(
    () =>
      COOKIES_SECTION_KEYS.map((key) => {
        const raw = t.raw(`sections.${key}`) as LegalSectionData;
        return interpolateSection(raw);
      }),
    [t],
  );

  return (
    <LegalDocument
      title={t("title")}
      subtitle={t("subtitle", legalVars)}
      lastUpdated={t("lastUpdated")}
    >
      {sections.map((section, index) => {
        const key = COOKIES_SECTION_KEYS[index];
        if (key === "howWeUse") {
          return <CookiesHowWeUseSection key={key} section={section} />;
        }
        return <LegalSectionContent key={key} section={section} />;
      })}
    </LegalDocument>
  );
}
