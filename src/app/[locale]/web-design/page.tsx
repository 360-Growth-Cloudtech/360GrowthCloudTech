import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "webDesign",
  path: "/web-design",
  leadSource: "Web Design Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
