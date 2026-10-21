import { getAllCaseStudySlugs, getCaseStudyPublishedAt } from "@/lib/case-studies-meta";
import type { Locale } from "@/i18n/routing";
import { SERVICE_PAGE_PATHS } from "@/lib/service-catalog";
import { INDUSTRY_PAGE_PATHS } from "@/lib/industry-catalog";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://360cloudtech.com";

export const SITE_NAME = "360GrowthCloudTech";

export const SITE_DESCRIPTION =
  "360GrowthCloudTech is an AI-first custom software development company building enterprise web, mobile, SaaS and cloud platforms with transparent delivery and full IP ownership.";

export const SITE_KEYWORDS = [
  "custom software development company",
  "enterprise software development",
  "custom software development services",
  "AI software development",
  "SaaS development company",
  "web application development",
  "mobile app development",
  "cloud and DevOps services",
  "legacy application modernization",
  "dedicated development team",
  "staff augmentation",
  "software outsourcing India",
];

/** Generated 1200×630 share image (see src/app/og.png/route.tsx). */
export const DEFAULT_OG_IMAGE = "/og.png";

export const THEME_COLOR = "#ea430c";

/**
 * Public profiles for Organization `sameAs`. Empty entries are skipped, so
 * set the env var (or paste the URL) once each profile is live.
 */
export const SOCIAL_PROFILES = [
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  process.env.NEXT_PUBLIC_CLUTCH_URL ?? "",
  process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ?? "",
].filter(Boolean);

/** Optional postal address for Organization schema; omitted until filled. */
export const BUSINESS_ADDRESS: {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
} | null = null;

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

export const OG_LOCALE = "en_US";

/** Absolute URL for a page. English is served without a locale prefix. */
export function localePath(_locale: Locale, path: string): string {
  const normalized = path.startsWith("/") || path === "" ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
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
  return [...STATIC_PATHS, ...SERVICE_PAGE_PATHS, ...INDUSTRY_PAGE_PATHS, ...getCaseStudyPaths()];
}

/** Last meaningful content change per path, for sitemap `lastmod`. */
export function getPathLastModified(path: string): Date {
  if (path.startsWith("/case-studies/")) {
    const published = getCaseStudyPublishedAt(path.split("/").pop() ?? "");
    if (published) return new Date(published);
  }
  return new Date();
}

export function getPathPriority(path: string): number {
  if (path === "") return 1;
  if (
    path === "/services" ||
    path === "/contact" ||
    SERVICE_PAGE_PATHS.includes(path) ||
    INDUSTRY_PAGE_PATHS.includes(path)
  ) {
    return 0.9;
  }
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
