import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "cloudDevops",
  path: "/cloud-devops",
  leadSource: "Cloud & DevOps Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
