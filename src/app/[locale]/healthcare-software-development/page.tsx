import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "industryHealthcare",
  path: "/healthcare-software-development",
  leadSource: "Healthcare Industry Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
