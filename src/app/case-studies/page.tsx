import type { Metadata } from "next";
import CaseStudies from "@/views/CaseStudies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies: Himachal Tourism Google Ads, Geetha Studio, Atory Hub, healthcare IVR, DermaYoga, and more.",
};

export default function CaseStudiesPage() {
  return <CaseStudies />;
}
