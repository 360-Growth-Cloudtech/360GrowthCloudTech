import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

// English-only site. Kept on next-intl so copy stays in messages/en/*.json.
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  // Clean URLs (/services, not /en/services); /en/* redirects to the bare path.
  localePrefix: "as-needed",
  localeDetection: false,
  // Single language: no hreflang Link headers.
  alternateLinks: false,
});

export const { Link, redirect, permanentRedirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
