import type { Metadata } from "next";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ScrollProgress } from "@/components/motion";
import "../index.css";

export const metadata: Metadata = {
  title: {
    default: "360CloudTech",
    template: "%s | 360CloudTech",
  },
  description:
    "360CloudTech — End-to-end digital transformation: custom software, cloud, and digital marketing.",
  robots: { index: true, follow: true },
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "360CloudTech",
    description: "End-to-end digital transformation for ambitious businesses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "360CloudTech",
    description: "End-to-end digital transformation for ambitious businesses.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain-overlay">
        <Providers>
          <ScrollProgress />
          <div className="flex flex-col min-h-[100dvh] relative bg-background">
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
            <WhatsAppFloat />
          </div>
        </Providers>
      </body>
    </html>
  );
}
