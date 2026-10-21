import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "industryEducation",
  path: "/education-software-development",
  leadSource: "Education Industry Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
