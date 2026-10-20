import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "saasDevelopment",
  path: "/saas-development",
  leadSource: "SaaS Development Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
