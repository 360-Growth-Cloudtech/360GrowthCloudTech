import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const [common, home, services, about, contact, industries, caseStudies, legal] =
    await Promise.all([
      import(`../../messages/${locale}/common.json`),
      import(`../../messages/${locale}/home.json`),
      import(`../../messages/${locale}/services.json`),
      import(`../../messages/${locale}/about.json`),
      import(`../../messages/${locale}/contact.json`),
      import(`../../messages/${locale}/industries.json`),
      import(`../../messages/${locale}/caseStudies.json`),
      import(`../../messages/${locale}/legal.json`),
    ]);

  return {
    locale,
    messages: {
      common: common.default,
      home: home.default,
      services: services.default,
      about: about.default,
      contact: contact.default,
      industries: industries.default,
      caseStudies: caseStudies.default,
      legal: legal.default,
    },
  };
});
