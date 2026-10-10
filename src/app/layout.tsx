import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./providers";
import { buildRootMetadata, rootViewport } from "@/lib/seo/metadata";
import "../index.css";

// Self-hosted via next/font: no render-blocking request to Google Fonts.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = buildRootMetadata();
export const viewport: Viewport = rootViewport;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <body className="grain-overlay">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
