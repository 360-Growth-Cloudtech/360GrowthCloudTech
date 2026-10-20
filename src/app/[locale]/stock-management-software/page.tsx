import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "stockManagementSoftware",
  path: "/stock-management-software",
  leadSource: "Stock Management Software Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
