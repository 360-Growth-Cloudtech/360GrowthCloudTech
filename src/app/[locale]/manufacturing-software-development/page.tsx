import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "industryManufacturing",
  path: "/manufacturing-software-development",
  leadSource: "Manufacturing Industry Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
