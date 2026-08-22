import type { Metadata } from "next";
import Services from "@/views/Services";

export const metadata: Metadata = {
  title: "Services",
  description: "AI engineering and design, end to end — product strategy through production deployment.",
};

export default function ServicesPage() {
  return <Services />;
}
