import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import WebsiteDevelopmentView from "@/views/WebsiteDevelopmentView";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceListJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

type Props = {
  params: Promise<{ locale: string }>;
};

const PATH = "/website-development-services";
const NS = "websiteDevelopmentServices";
const LEAD_SOURCE = "Website Development Services Page Hero (WhatsApp)";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: NS });

  return buildPageMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: PATH,
    locale: locale as Locale,
    keywords: [
      "website development services",
      "custom website development company",
      "web development services USA",
      "website development services India",
      "Next.js web development company",
      "headless CMS website development",
      "enterprise web development agency",
      "offshore web development services",
      "full stack web application development",
      "responsive business website design",
      "SEO friendly website development",
    ],
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: NS });
  const tCrumbs = await getTranslations({ locale, namespace: "common.breadcrumbs" });
  const offerings = t.raw("offerings.items") as { id: string; title: string; desc: string }[];
  const faqs = t.raw("faqs.items") as { q: string; a: string }[];

  const servicePageUrl = `${SITE_URL}${PATH}`;

  // Rich Schema specifically optimized for outranking competitors with Service + AggregateRating + multi-country areaServed
  const serviceRichSnippet = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${servicePageUrl}/#service`,
    name: "Custom Website Development Services",
    serviceType: "Website Development, Full-Stack Web Application Engineering, Headless CMS",
    description: t("meta.description"),
    url: servicePageUrl,
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "India" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website Development Solutions",
      itemListElement: offerings.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.desc,
          url: `${servicePageUrl}#${item.id}`,
        },
      })),
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        homeLabel={tCrumbs("home")}
        items={[
          ...(t.has("breadcrumbParent")
            ? [{ name: t("breadcrumbParent.label"), path: t("breadcrumbParent.href") }]
            : []),
          { name: t("breadcrumb"), path: PATH },
        ]}
      />
      <FaqJsonLd items={faqs} />
      <ServiceListJsonLd
        locale={locale as Locale}
        path={PATH}
        name={t("offerings.title")}
        services={offerings.map((item) => ({
          name: item.title,
          description: item.desc,
          path: `${PATH}#${item.id}`,
        }))}
      />
      <JsonLd data={serviceRichSnippet} />
      <WebsiteDevelopmentView />
    </>
  );
}
