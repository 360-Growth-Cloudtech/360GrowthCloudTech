import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import CaseStudies from "@/views/CaseStudies";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies" });

  return buildPageMetadata({
    title: t("list.label"),
    description: t("list.subtitle"),
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
  return <CaseStudies />;
}
