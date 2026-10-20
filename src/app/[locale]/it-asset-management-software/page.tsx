import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "itAssetManagementSoftware",
  path: "/it-asset-management-software",
  leadSource: "IT Asset Management Software Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
