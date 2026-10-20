import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "landingPageDesign",
  path: "/landing-page-design",
  leadSource: "Landing Page Design Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
