import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "qaTesting",
  path: "/qa-testing",
  leadSource: "QA & Testing Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
