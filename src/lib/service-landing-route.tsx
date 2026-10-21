import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ServiceLanding from "@/views/ServiceLanding";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceListJsonLd } from "@/lib/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

type ServiceLandingRouteOptions = {
  /** Messages namespace with the page copy (messages/en/<ns>.json). */
  ns: string;
  /** Public path at the site root, e.g. "/ecommerce-software-development". */
  path: string;
  /** Stored with every lead from this page's form. */
  leadSource: string;
};

/**
 * Metadata + page component for a root-level service landing page.
 * Emits Breadcrumb, FAQ and Service JSON-LD from the same copy the page renders.
 */
export function createServiceLandingRoute({ ns, path, leadSource }: ServiceLandingRouteOptions) {
  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: ns });

    return buildPageMetadata({
      title: t("meta.title"),
      description: t("meta.description"),
      path,
      locale: locale as Locale,
    });
  }

  async function Page({ params }: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as Locale)) {
      notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: ns });
    const tCrumbs = await getTranslations({ locale, namespace: "common.breadcrumbs" });
    const offerings = t.raw("offerings.items") as { id: string; title: string; desc: string }[];

    return (
      <>
        <BreadcrumbJsonLd
          locale={locale as Locale}
          homeLabel={tCrumbs("home")}
          items={[
            ...(t.has("breadcrumbParent")
              ? [{ name: t("breadcrumbParent.label"), path: t("breadcrumbParent.href") }]
              : []),
            { name: t("breadcrumb"), path },
          ]}
        />
        <FaqJsonLd items={t.raw("faqs.items") as { q: string; a: string }[]} />
        <ServiceListJsonLd
          locale={locale as Locale}
          path={path}
          name={t("offerings.title")}
          services={offerings.map((item) => ({
            name: item.title,
            description: item.desc,
            path: `${path}#${item.id}`,
          }))}
        />
        <ServiceLanding ns={ns} leadSource={leadSource} />
      </>
    );
  }

  return { generateMetadata, Page };
}
