import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Industries from "@/views/Industries";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceListJsonLd } from "@/lib/seo/json-ld";
import { INDUSTRY_SLUGS, industryHref } from "@/lib/industry-catalog";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });

  return buildPageMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/industries",
    locale: locale as Locale,
  });
}

export default async function IndustriesPage({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "industries" });
  const tCrumbs = await getTranslations({ locale, namespace: "common.breadcrumbs" });

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        homeLabel={tCrumbs("home")}
        items={[{ name: tCrumbs("industries"), path: "/industries" }]}
      />
      <ServiceListJsonLd
        locale={locale as Locale}
        path="/industries"
        name={t("meta.title")}
        services={INDUSTRY_SLUGS.map((slug) => ({
          name: t(`catalog.${slug}.title`),
          description: t(`hub.grid.items.${slug}`),
          path: industryHref(slug),
        }))}
      />
      <FaqJsonLd items={t.raw("hub.faqs.items") as { q: string; a: string }[]} />
      <Industries />
    </>
  );
}
