import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Services from "@/views/Services";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return buildPageMetadata({
    title: t("page.label"),
    description: t("page.subtitle"),
    path: "/services",
    locale: locale as Locale,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return <Services />;
}
