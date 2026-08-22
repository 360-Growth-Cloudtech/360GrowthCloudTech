import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Home from "@/views/Home";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return buildPageMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: "",
    locale: locale as Locale,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return <Home />;
}
