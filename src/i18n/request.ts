import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

/**
 * Every messages/<locale>/<namespace>.json file, loaded as a top-level namespace.
 * Adding a service or industry landing page means adding its file name here.
 */
const NAMESPACES = [
  "common",
  "home",
  "services",
  "about",
  "contact",
  "industries",
  "caseStudies",
  "legal",
  // Service landing pages
  "softwareDevelopment",
  "ecommerceSoftwareDevelopment",
  "customSoftwareDevelopment",
  "stockManagementSoftware",
  "crmSoftwareDevelopment",
  "onlineComplaintManagementSystem",
  "webApplicationDevelopment",
  "itAssetManagementSoftware",
  "qriDashboard",
  "webDesign",
  "websiteRedesign",
  "staticWebsiteDesign",
  "dynamicWebsiteDesign",
  "mobileWebsiteDesign",
  "customWebDesign",
  "landingPageDesign",
  "brandIdentityDesign",
  "customEnterpriseSoftware",
  "enterpriseApplicationDevelopment",
  "mobileAppDevelopment",
  "saasDevelopment",
  "apiIntegration",
  "cloudDevops",
  "aiAutomation",
  "qaTesting",
  "maintenanceSupport",
  // Industry landing pages
  "industryHealthcare",
  "industryFintech",
  "industryManufacturing",
  "industryLogistics",
  "industryTravel",
  "industryRetail",
  "industryEducation",
  "industryRealEstate",
] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const files = await Promise.all(
    NAMESPACES.map((ns) => import(`../../messages/${locale}/${ns}.json`)),
  );

  return {
    locale,
    messages: Object.fromEntries(NAMESPACES.map((ns, i) => [ns, files[i].default])),
  };
});
