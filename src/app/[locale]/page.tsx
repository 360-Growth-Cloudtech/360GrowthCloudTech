import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Home from "@/views/Home";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { FaqJsonLd, ServiceListJsonLd } from "@/lib/seo/json-ld";

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
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const faqs = t.raw("faqs.items") as { q: string; a: string }[];
  const services = t.raw("enterpriseServices.services") as { title: string; desc: string }[];

  return (
    <>
      <FaqJsonLd items={faqs} />
      <ServiceListJsonLd
        locale={locale as Locale}
        path=""
        name={t("enterpriseServices.title")}
        services={services.map((s) => ({ name: s.title, description: s.desc }))}
      />
      <Home />
    </>
  );
}
