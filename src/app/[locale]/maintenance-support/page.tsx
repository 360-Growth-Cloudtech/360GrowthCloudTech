import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "maintenanceSupport",
  path: "/maintenance-support",
  leadSource: "Maintenance & Support Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
