import type { Metadata } from "next";
import Home from "@/views/Home";

export const metadata: Metadata = {
  title: "360CloudTech",
  description:
    "We're the engineering team behind ambitious founders — shipping web apps, SaaS tools, and digital products on modern, maintainable technology.",
};

export default function HomePage() {
  return <Home />;
}
