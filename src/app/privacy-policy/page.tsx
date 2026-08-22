import type { Metadata } from "next";
import PrivacyPolicy from "@/views/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how 360GrowthCloudTech collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
