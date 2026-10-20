import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "mobileAppDevelopment",
  path: "/mobile-app-development",
  leadSource: "Mobile App Development Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
