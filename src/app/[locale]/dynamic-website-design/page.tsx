import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "dynamicWebsiteDesign",
  path: "/dynamic-website-design",
  leadSource: "Dynamic Website Design Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
