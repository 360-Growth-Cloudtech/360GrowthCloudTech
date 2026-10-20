import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "aiAutomation",
  path: "/ai-automation",
  leadSource: "AI & Automation Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
