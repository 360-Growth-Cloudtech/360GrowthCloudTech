import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "websiteRedesign",
  path: "/website-redesign",
  leadSource: "Website Redesign Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
