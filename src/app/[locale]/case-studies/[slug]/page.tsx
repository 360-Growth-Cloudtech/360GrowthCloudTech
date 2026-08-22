import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import CaseStudyDetail from "@/views/CaseStudyDetail";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { CaseStudyArticleJsonLd } from "@/lib/seo/json-ld";
import { routing, type Locale } from "@/i18n/routing";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
} from "@/lib/case-studies-data";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllCaseStudySlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const study = await getCaseStudyBySlug(slug, locale);

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  return buildPageMetadata({
    title: study.title,
    description: study.excerpt,
    path: `/case-studies/${slug}`,
    locale: locale as Locale,
    image: study.image,
    type: "article",
  });
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug, locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const study = await getCaseStudyBySlug(slug, locale);

  if (!study) {
    notFound();
  }

  return (
    <>
      <CaseStudyArticleJsonLd
        locale={locale as Locale}
        slug={slug}
        title={study.title}
        description={study.excerpt}
        image={study.image}
        datePublished={study.date}
      />
      <CaseStudyDetail study={study} />
    </>
  );
}
