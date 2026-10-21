import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "industryRealEstate",
  path: "/real-estate-software-development",
  leadSource: "Real Estate Industry Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
