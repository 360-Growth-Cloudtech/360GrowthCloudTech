import type { Metadata } from "next";
import CookiesPolicy from "@/views/CookiesPolicy";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "How 360GrowthCloudTech uses cookies and similar technologies on its website.",
};

export default function CookiesPolicyPage() {
  return <CookiesPolicy />;
}
