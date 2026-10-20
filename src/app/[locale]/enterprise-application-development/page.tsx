import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "enterpriseApplicationDevelopment",
  path: "/enterprise-application-development",
  leadSource: "Enterprise Application Development Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
