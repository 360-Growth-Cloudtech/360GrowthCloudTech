import type { Metadata } from "next";
import Services from "@/views/Services";

export const metadata: Metadata = {
  title: "Services",
  description: "Custom software, CRM, digital marketing, cloud, cybersecurity, and e-commerce services.",
};

export default function ServicesPage() {
  return <Services />;
}
