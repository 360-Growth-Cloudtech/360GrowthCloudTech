import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "softwareDevelopment",
  path: "/software-development",
  leadSource: "Software Development Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
