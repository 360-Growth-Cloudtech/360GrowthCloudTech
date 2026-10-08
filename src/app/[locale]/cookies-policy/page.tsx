import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import CookiesPolicy from "@/views/CookiesPolicy";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd } from "@/lib/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return buildPageMetadata({
    title: t("cookies.title"),
    description: t("cookies.subtitle", { company: "360GrowthCloudTech", website: "360cloudtech.com" }),
    path: "/cookies-policy",
    locale: locale as Locale,
  });
}

export default async function CookiesPolicyPage({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const tCrumbs = await getTranslations({ locale, namespace: "common.breadcrumbs" });

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        homeLabel={tCrumbs("home")}
        items={[{ name: t("cookies.title"), path: "/cookies-policy" }]}
      />
      <CookiesPolicy />
    </>
  );
}
