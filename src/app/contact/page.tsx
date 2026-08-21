import type { Metadata } from "next";
import Contact from "@/views/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with 360CloudTech — schedule a meeting or send a message.",
};

export default function ContactPage() {
  return <Contact />;
}
