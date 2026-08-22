import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/contact";
import { absoluteUrl, localePath, SITE_NAME, SITE_URL } from "@/lib/seo/site";
import type { Locale } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";

export function OrganizationWebSiteJsonLd({ locale }: { locale: Locale }) {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": organizationId,
          name: SITE_NAME,
          url: SITE_URL,
          logo: absoluteUrl("/logo.png"),
          email: CONTACT_EMAIL,
          telephone: CONTACT_PHONE,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: CONTACT_PHONE,
            email: CONTACT_EMAIL,
            contactType: "customer service",
            availableLanguage: ["English", "Spanish", "French", "German", "Japanese", "Arabic"],
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": websiteId,
          name: SITE_NAME,
          url: SITE_URL,
          inLanguage: locale,
          publisher: { "@id": organizationId },
        },
      ]}
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
};

export function CaseStudyArticleJsonLd({
  locale,
  slug,
  title,
  description,
  image,
  datePublished,
}: CaseStudyArticleJsonLdProps) {
  const url = localePath(locale, `/case-studies/${slug}`);
  const organizationId = `${SITE_URL}/#organization`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: absoluteUrl(image),
        datePublished,
        author: { "@id": organizationId },
        publisher: { "@id": organizationId },
        mainEntityOfPage: url,
        url,
        inLanguage: locale,
      }}
    />
  );
}
