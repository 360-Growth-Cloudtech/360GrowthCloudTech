import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/contact";
import {
  absoluteUrl,
  BUSINESS_ADDRESS,
  localePath,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/lib/seo/site";
import type { Locale } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;

const AVAILABLE_LANGUAGES = ["English"];

export function OrganizationWebSiteJsonLd({ locale }: { locale: Locale }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            legalName: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            logo: {
              "@type": "ImageObject",
              "@id": LOGO_ID,
              url: absoluteUrl("/logo.png"),
              contentUrl: absoluteUrl("/logo.png"),
              caption: SITE_NAME,
            },
            image: { "@id": LOGO_ID },
            email: CONTACT_EMAIL,
            telephone: CONTACT_PHONE,
            areaServed: "Worldwide",
            knowsAbout: [
              "Custom software development",
              "Enterprise application development",
              "Artificial intelligence",
              "Machine learning",
              "SaaS development",
              "Web development",
              "Mobile app development",
              "Cloud computing",
              "DevOps",
              "Legacy modernization",
              "UX/UI design",
              "Digital marketing",
            ],
            ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
            ...(BUSINESS_ADDRESS
              ? { address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS } }
              : {}),
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: CONTACT_PHONE,
                email: CONTACT_EMAIL,
                contactType: "sales",
                areaServed: "Worldwide",
                availableLanguage: AVAILABLE_LANGUAGES,
              },
              {
                "@type": "ContactPoint",
                telephone: CONTACT_PHONE,
                email: CONTACT_EMAIL,
                contactType: "customer support",
                availableLanguage: AVAILABLE_LANGUAGES,
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": WEBSITE_ID,
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            inLanguage: "en",
            publisher: { "@id": ORGANIZATION_ID },
          },
        ],
      }}
    />
  );
}

type Crumb = { name: string; path: string };

/** BreadcrumbList for inner pages; `items` excludes Home, which is always first. */
export function BreadcrumbJsonLd({
  locale,
  homeLabel,
  items,
}: {
  locale: Locale;
  homeLabel: string;
  items: Crumb[];
}) {
  const crumbs: Crumb[] = [{ name: homeLabel, path: "" }, ...items];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: localePath(locale, crumb.path),
        })),
      }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}

/** The services we offer, each tied back to the Organization as provider. */
export function ServiceListJsonLd({
  locale,
  path,
  name,
  services,
}: {
  locale: Locale;
  path: string;
  name: string;
  services: { name: string; description: string; path?: string }[];
}) {
  if (!services.length) return null;
  const url = localePath(locale, path);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        url,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.name,
            description: service.description,
            serviceType: service.name,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: "Worldwide",
            url: service.path ? localePath(locale, service.path) : url,
          },
        })),
      }}
    />
  );
}

export function CaseStudyListJsonLd({
  locale,
  name,
  studies,
}: {
  locale: Locale;
  name: string;
  studies: { slug: string; title: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        itemListElement: studies.map((study, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: study.title,
          url: localePath(locale, `/case-studies/${study.slug}`),
        })),
      }}
    />
  );
}

type CaseStudyArticleJsonLdProps = {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
  category?: string;
  keywords?: string[];
  client?: string;
  liveUrl?: string;
};

export function CaseStudyArticleJsonLd({
  locale,
  slug,
  title,
  description,
  image,
  datePublished,
  category,
  keywords,
  client,
  liveUrl,
}: CaseStudyArticleJsonLdProps) {
  const url = localePath(locale, `/case-studies/${slug}`);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: [absoluteUrl(image)],
        datePublished,
        dateModified: datePublished,
        author: { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL },
        publisher: { "@id": ORGANIZATION_ID },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        isPartOf: { "@id": WEBSITE_ID },
        url,
        inLanguage: locale,
        ...(category ? { articleSection: category } : {}),
        ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
        ...(client
          ? {
              about: {
                "@type": "Organization",
                name: client,
                ...(liveUrl ? { url: liveUrl } : {}),
              },
            }
          : {}),
      }}
    />
  );
}
