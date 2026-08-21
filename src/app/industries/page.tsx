import type { Metadata } from "next";
import Industries from "@/views/Industries";

export const metadata: Metadata = {
  title: "Industries",
  description: "Industry expertise across healthcare, travel, retail, finance, education, and more.",
};

export default function IndustriesPage() {
  return <Industries />;
}
