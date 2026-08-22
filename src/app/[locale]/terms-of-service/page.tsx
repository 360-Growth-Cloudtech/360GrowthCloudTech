import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import TermsOfService from "@/views/TermsOfService";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return buildPageMetadata({
    title: t("terms.title"),
    description: t("terms.subtitle", { company: "360GrowthCloudTech" }),
    path: "/terms-of-service",
    locale: locale as Locale,
  });
}

export default async function TermsOfServicePage({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return <TermsOfService />;
}
