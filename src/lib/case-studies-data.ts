import { getTranslations } from "next-intl/server";
import {
  caseStudyMeta,
  getCaseStudyMetaBySlug,
  getAllCaseStudySlugs,
  mergeCaseStudy,
  type CaseStudy,
  type CaseStudyContent,
  type CaseStudyGalleryMeta,
  type CaseStudyMeta,
} from "./case-studies-meta";

export type CaseStudyImageVariant = "default" | "laptop";

export {
  caseStudyMeta,
  getCaseStudyMetaBySlug,
  getAllCaseStudySlugs,
  mergeCaseStudy,
  type CaseStudy,
  type CaseStudyContent,
  type CaseStudyGalleryMeta,
  type CaseStudyMeta,
};

export async function getCaseStudyBySlug(
  slug: string,
  locale?: string,
): Promise<CaseStudy | undefined> {
  const meta = getCaseStudyMetaBySlug(slug);
  if (!meta) return undefined;

  const t = await getTranslations({ locale, namespace: "caseStudies" });
  const item = t.raw(`items.${slug}`) as CaseStudyContent;

  return mergeCaseStudy(meta, { ...item, slug: meta.slug });
}

export async function getAllCaseStudies(locale?: string): Promise<CaseStudy[]> {
  const t = await getTranslations({ locale, namespace: "caseStudies" });

  return caseStudyMeta.map((meta) => {
    const item = t.raw(`items.${meta.slug}`) as CaseStudyContent;
    return mergeCaseStudy(meta, { ...item, slug: meta.slug });
  });
}
