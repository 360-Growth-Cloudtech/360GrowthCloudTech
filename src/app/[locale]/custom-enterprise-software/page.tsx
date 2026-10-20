import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "customEnterpriseSoftware",
  path: "/custom-enterprise-software",
  leadSource: "Custom Enterprise Software Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
