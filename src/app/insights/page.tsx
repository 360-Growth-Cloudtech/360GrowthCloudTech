import type { Metadata } from "next";
import Insights from "@/views/Insights";

export const metadata: Metadata = {
  title: "Insights",
  description: "Articles and insights on cloud, cybersecurity, software, and digital growth.",
};

export default function InsightsPage() {
  return <Insights />;
}
