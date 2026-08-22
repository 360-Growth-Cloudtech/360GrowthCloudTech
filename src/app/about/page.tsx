import type { Metadata } from "next";
import About from "@/views/About";

export const metadata: Metadata = {
  title: "About",
  description: "A team that designs and engineers what it ships — product strategy through production deployment.",
};

export default function AboutPage() {
  return <About />;
}
