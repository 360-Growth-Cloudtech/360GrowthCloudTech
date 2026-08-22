import type { Metadata } from "next";
import TermsOfService from "@/views/TermsOfService";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing your use of the 360GrowthCloudTech website and services.",
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
