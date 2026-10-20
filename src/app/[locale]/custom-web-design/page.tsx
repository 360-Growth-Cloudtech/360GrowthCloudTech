import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "customWebDesign",
  path: "/custom-web-design",
  leadSource: "Custom Web Design Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
