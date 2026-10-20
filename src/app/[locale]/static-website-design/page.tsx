import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "staticWebsiteDesign",
  path: "/static-website-design",
  leadSource: "Static Website Design Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
