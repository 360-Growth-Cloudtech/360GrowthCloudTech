import type { Metadata } from "next";
import About from "@/views/About";

export const metadata: Metadata = {
  title: "About",
  description: "Built by technologists. Driven by results. Powered by partnership.",
};

export default function AboutPage() {
  return <About />;
}
