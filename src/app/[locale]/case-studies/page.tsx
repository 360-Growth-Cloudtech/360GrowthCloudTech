import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import CaseStudies from "@/views/CaseStudies";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd, CaseStudyListJsonLd } from "@/lib/seo/json-ld";
import { getAllCaseStudies } from "@/lib/case-studies-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies" });

  return buildPageMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/case-studies",
    locale: locale as Locale,
  });
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "caseStudies" });
  const tCrumbs = await getTranslations({ locale, namespace: "common.breadcrumbs" });

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        homeLabel={tCrumbs("home")}
        items={[{ name: tCrumbs("caseStudies"), path: "/case-studies" }]}
      />
      <CaseStudyListJsonLd
        locale={locale as Locale}
        name={t("meta.title")}
        studies={await getAllCaseStudies(locale)}
      />
      <CaseStudies />
    </>
  );
}
