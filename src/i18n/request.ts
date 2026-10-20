import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const [common, home, services, about, contact, industries, caseStudies, legal, softwareDevelopment, ecommerceSoftwareDevelopment, customSoftwareDevelopment, stockManagementSoftware, crmSoftwareDevelopment, onlineComplaintManagementSystem, webApplicationDevelopment, itAssetManagementSoftware, qriDashboard, webDesign, websiteRedesign, staticWebsiteDesign, dynamicWebsiteDesign, mobileWebsiteDesign, customWebDesign, landingPageDesign, brandIdentityDesign, customEnterpriseSoftware, enterpriseApplicationDevelopment, mobileAppDevelopment, saasDevelopment, apiIntegration, cloudDevops, aiAutomation, qaTesting, maintenanceSupport] =
    await Promise.all([
      import(`../../messages/${locale}/common.json`),
      import(`../../messages/${locale}/home.json`),
      import(`../../messages/${locale}/services.json`),
      import(`../../messages/${locale}/about.json`),
      import(`../../messages/${locale}/contact.json`),
      import(`../../messages/${locale}/industries.json`),
      import(`../../messages/${locale}/caseStudies.json`),
      import(`../../messages/${locale}/legal.json`),
      import(`../../messages/${locale}/softwareDevelopment.json`),
      import(`../../messages/${locale}/ecommerceSoftwareDevelopment.json`),
      import(`../../messages/${locale}/customSoftwareDevelopment.json`),
      import(`../../messages/${locale}/stockManagementSoftware.json`),
      import(`../../messages/${locale}/crmSoftwareDevelopment.json`),
      import(`../../messages/${locale}/onlineComplaintManagementSystem.json`),
      import(`../../messages/${locale}/webApplicationDevelopment.json`),
      import(`../../messages/${locale}/itAssetManagementSoftware.json`),
      import(`../../messages/${locale}/qriDashboard.json`),
      import(`../../messages/${locale}/webDesign.json`),
      import(`../../messages/${locale}/websiteRedesign.json`),
      import(`../../messages/${locale}/staticWebsiteDesign.json`),
      import(`../../messages/${locale}/dynamicWebsiteDesign.json`),
      import(`../../messages/${locale}/mobileWebsiteDesign.json`),
      import(`../../messages/${locale}/customWebDesign.json`),
      import(`../../messages/${locale}/landingPageDesign.json`),
      import(`../../messages/${locale}/brandIdentityDesign.json`),
      import(`../../messages/${locale}/customEnterpriseSoftware.json`),
      import(`../../messages/${locale}/enterpriseApplicationDevelopment.json`),
      import(`../../messages/${locale}/mobileAppDevelopment.json`),
      import(`../../messages/${locale}/saasDevelopment.json`),
      import(`../../messages/${locale}/apiIntegration.json`),
      import(`../../messages/${locale}/cloudDevops.json`),
      import(`../../messages/${locale}/aiAutomation.json`),
      import(`../../messages/${locale}/qaTesting.json`),
      import(`../../messages/${locale}/maintenanceSupport.json`),
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
      softwareDevelopment: softwareDevelopment.default,
      ecommerceSoftwareDevelopment: ecommerceSoftwareDevelopment.default,
      customSoftwareDevelopment: customSoftwareDevelopment.default,
      stockManagementSoftware: stockManagementSoftware.default,
      crmSoftwareDevelopment: crmSoftwareDevelopment.default,
      onlineComplaintManagementSystem: onlineComplaintManagementSystem.default,
      webApplicationDevelopment: webApplicationDevelopment.default,
      itAssetManagementSoftware: itAssetManagementSoftware.default,
      qriDashboard: qriDashboard.default,
      webDesign: webDesign.default,
      websiteRedesign: websiteRedesign.default,
      staticWebsiteDesign: staticWebsiteDesign.default,
      dynamicWebsiteDesign: dynamicWebsiteDesign.default,
      mobileWebsiteDesign: mobileWebsiteDesign.default,
      customWebDesign: customWebDesign.default,
      landingPageDesign: landingPageDesign.default,
      brandIdentityDesign: brandIdentityDesign.default,
      customEnterpriseSoftware: customEnterpriseSoftware.default,
      enterpriseApplicationDevelopment: enterpriseApplicationDevelopment.default,
      mobileAppDevelopment: mobileAppDevelopment.default,
      saasDevelopment: saasDevelopment.default,
      apiIntegration: apiIntegration.default,
      cloudDevops: cloudDevops.default,
      aiAutomation: aiAutomation.default,
      qaTesting: qaTesting.default,
      maintenanceSupport: maintenanceSupport.default,
    },
  };
});
