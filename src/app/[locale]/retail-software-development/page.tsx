import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "industryRetail",
  path: "/retail-software-development",
  leadSource: "Retail Industry Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
