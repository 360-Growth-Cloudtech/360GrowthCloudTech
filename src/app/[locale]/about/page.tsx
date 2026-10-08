import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import About from "@/views/About";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd } from "@/lib/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return buildPageMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/about",
    locale: locale as Locale,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const tCrumbs = await getTranslations({ locale, namespace: "common.breadcrumbs" });

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        homeLabel={tCrumbs("home")}
        items={[{ name: tCrumbs("about"), path: "/about" }]}
      />
      <About />
    </>
  );
}
