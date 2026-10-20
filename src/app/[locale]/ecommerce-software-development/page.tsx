import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "ecommerceSoftwareDevelopment",
  path: "/ecommerce-software-development",
  leadSource: "Ecommerce Software Development Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
