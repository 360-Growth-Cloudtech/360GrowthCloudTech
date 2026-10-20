import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "brandIdentityDesign",
  path: "/brand-identity-design",
  leadSource: "Brand Identity Design Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
