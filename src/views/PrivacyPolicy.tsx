"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  LegalDocument,
  LegalSectionContent,
  legalVars,
} from "@/components/LegalDocument";

const PRIVACY_SECTION_KEYS = [
  "introduction",
  "informationWeCollect",
  "howWeUse",
  "legalBases",
  "howWeShare",
  "dataRetention",
  "security",
  "yourRights",
  "internationalTransfers",
  "thirdPartyLinks",
  "childrensPrivacy",
  "changes",
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

export default function PrivacyPolicy() {
  const t = useTranslations("legal.privacy");

  const sections = useMemo(
    () =>
      PRIVACY_SECTION_KEYS.map((key) => {
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
      {sections.map((section) => (
        <LegalSectionContent key={section.title} section={section} />
      ))}
    </LegalDocument>
  );
}
