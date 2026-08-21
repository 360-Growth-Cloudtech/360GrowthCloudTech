import type { Metadata } from "next";
import CaseStudies from "@/views/CaseStudies";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real results from digital transformation projects across industries.",
};

export default function CaseStudiesPage() {
  return <CaseStudies />;
}
