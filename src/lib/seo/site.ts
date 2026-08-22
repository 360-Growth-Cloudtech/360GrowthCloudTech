import { getAllCaseStudySlugs } from "@/lib/case-studies-meta";
import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://360cloudtech.com";

export const SITE_NAME = "360CloudTech";

export const DEFAULT_OG_IMAGE = "/og-default.jpg";

export const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/contact",
  "/industries",
  "/case-studies",
  "/privacy-policy",
  "/terms-of-service",
  "/cookies-policy",
] as const;

export type StaticPath = (typeof STATIC_PATHS)[number];

export const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  ja: "ja_JP",
  ar: "ar_SA",
};

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") || path === "" ? path : `/${path}`;
  return `${SITE_URL}/${locale}${normalized}`;
}

export function buildLanguageAlternates(path: string): Record<string, string> {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, localePath(locale, path)]),
  );

  return {
    ...languages,
    "x-default": localePath(routing.defaultLocale, path),
  };
}

export function getCaseStudyPaths(): string[] {
  return getAllCaseStudySlugs().map((slug) => `/case-studies/${slug}`);
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function getSitemapPaths(): string[] {
  return [...STATIC_PATHS, ...getCaseStudyPaths()];
}

export function getPathPriority(path: string): number {
  if (path === "") return 1;
  if (path.startsWith("/case-studies/")) return 0.7;
  if (
    path === "/privacy-policy" ||
    path === "/terms-of-service" ||
    path === "/cookies-policy"
  ) {
    return 0.3;
  }
  return 0.8;
}

export function getPathChangeFrequency(
  path: string,
): "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" {
  if (
    path === "/privacy-policy" ||
    path === "/terms-of-service" ||
    path === "/cookies-policy"
  ) {
    return "monthly";
  }
  return "weekly";
}
