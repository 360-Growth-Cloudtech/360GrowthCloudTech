import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import CaseStudyDetail from "@/views/CaseStudyDetail";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { BreadcrumbJsonLd, CaseStudyArticleJsonLd } from "@/lib/seo/json-ld";
import { SITE_NAME } from "@/lib/seo/site";
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

  // Long headlines would push the brand suffix past the ~60-char SERP cut-off.
  const withBrand = `${study.title} | ${SITE_NAME}`;

  return buildPageMetadata({
    title: study.title,
    absoluteTitle: withBrand.length > 65,
    description: study.excerpt,
    path: `/case-studies/${slug}`,
    locale: locale as Locale,
    image: study.image,
    type: "article",
    publishedTime: study.publishedAt,
    modifiedTime: study.publishedAt,
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

  const tCrumbs = await getTranslations({ locale, namespace: "common.breadcrumbs" });

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        homeLabel={tCrumbs("home")}
        items={[
          { name: tCrumbs("caseStudies"), path: "/case-studies" },
          { name: study.title, path: `/case-studies/${slug}` },
        ]}
      />
      <CaseStudyArticleJsonLd
        locale={locale as Locale}
        slug={slug}
        title={study.title}
        description={study.excerpt}
        image={study.image}
        datePublished={study.publishedAt}
        category={study.category}
        keywords={study.stack}
      />
      <CaseStudyDetail study={study} />
    </>
  );
}
