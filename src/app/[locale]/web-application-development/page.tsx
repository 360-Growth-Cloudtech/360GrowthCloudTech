import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "webApplicationDevelopment",
  path: "/web-application-development",
  leadSource: "Web Application Development Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
