import { createServiceLandingRoute } from "@/lib/service-landing-route";

const route = createServiceLandingRoute({
  ns: "onlineComplaintManagementSystem",
  path: "/online-complaint-management-system",
  leadSource: "Complaint Management System Page Hero (WhatsApp)",
});

export const generateMetadata = route.generateMetadata;
export default route.Page;
