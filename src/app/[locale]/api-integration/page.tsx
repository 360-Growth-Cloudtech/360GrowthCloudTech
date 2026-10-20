import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "apiIntegration",
  path: "/api-integration",
  leadSource: "API Integration Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
