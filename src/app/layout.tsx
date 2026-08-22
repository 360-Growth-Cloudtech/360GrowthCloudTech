import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { type Locale } from "@/i18n/routing";
import { buildRootMetadata } from "@/lib/seo/metadata";
import "../index.css";

export const metadata: Metadata = buildRootMetadata();

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
