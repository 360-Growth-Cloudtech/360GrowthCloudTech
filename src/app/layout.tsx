import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { type Locale } from "@/i18n/routing";
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await getLocale()) as Locale;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="grain-overlay">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
