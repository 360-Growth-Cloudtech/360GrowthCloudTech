import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "qriDashboard",
  path: "/qri-dashboard",
  leadSource: "QRI Dashboard Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
