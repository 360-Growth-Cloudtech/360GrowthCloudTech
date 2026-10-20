import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Services from "@/views/Services";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceListJsonLd } from "@/lib/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

type HubGroup = { items: { slug: string; title: string; desc: string }[] };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return buildPageMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
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
  const tHub = await getTranslations({ locale, namespace: "services.hub" });
  const tCrumbs = await getTranslations({ locale, namespace: "common.breadcrumbs" });
  const groups = tHub.raw("directory.groups") as HubGroup[];

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        homeLabel={tCrumbs("home")}
        items={[{ name: tCrumbs("services"), path: "/services" }]}
      />
      <ServiceListJsonLd
        locale={locale as Locale}
        path="/services"
        name={tHub("directory.title")}
        services={groups.flatMap((group) =>
          group.items.map((item) => ({ name: item.title, description: item.desc, path: `/${item.slug}` })),
        )}
      />
      <FaqJsonLd items={tHub.raw("faqs.items") as { q: string; a: string }[]} />
      <Services />
    </>
  );
}
