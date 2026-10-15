import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-4H26WZLVRN";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <body className="grain-overlay">
        <Providers>{children}</Providers>
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </html>
  );
}
