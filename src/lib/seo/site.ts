import { getAllCaseStudySlugs, getCaseStudyPublishedAt } from "@/lib/case-studies-meta";
import type { Locale } from "@/i18n/routing";
import { SERVICE_PAGE_PATHS } from "@/lib/service-catalog";
import { INDUSTRY_PAGE_PATHS } from "@/lib/industry-catalog";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://360cloudtech.com";

export const SITE_NAME = "360GrowthCloudTech";

/** Alternate brand names searched by users (e.g. from Google Search Console queries) */
export const SITE_ALTERNATE_NAMES = [
  "360 Cloud Tech",
  "360cloudtech",
  "360 Cloud Solutions",
  "Cloud 360",
  "360Growth",
];

export const SITE_DESCRIPTION =
  "360GrowthCloudTech is an enterprise custom software development company serving businesses across the USA, UK, and India. We engineer scalable web, mobile, SaaS, and cloud platforms with 100% IP ownership.";

export const SITE_KEYWORDS = [
  "custom software development company",
  "custom software development services",
  "enterprise application development services",
  "custom enterprise software development",
  "web application development services",
  "mobile app development company",
  "SaaS development company",
  "custom CRM development services",
  "cloud consulting and DevOps services",
  "custom AI software development",
  "software development outsourcing to India",
  "software development company UK",
  "custom software development company USA",
  "dedicated software development teams",
  "legacy application modernization",
];

/** Generated 1200×630 share image (see src/app/og.png/route.tsx). */
export const DEFAULT_OG_IMAGE = "/og.png";

export const THEME_COLOR = "#ea430c";

/**
 * Public profiles for Organization `sameAs`. Empty entries are skipped, so
 * set the env var (or paste the URL) once each profile is live.
 */
export const SOCIAL_PROFILES = [
  process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/360growthcloudtech",
  process.env.NEXT_PUBLIC_CLUTCH_URL ?? "",
  process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ?? "",
  process.env.NEXT_PUBLIC_TWITTER_HANDLE ? `https://x.com/${process.env.NEXT_PUBLIC_TWITTER_HANDLE}` : "",
  process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/360growthcloudtech",
].filter(Boolean);

/** Postal address for Organization schema; configured via environment or fallback. */
export const BUSINESS_ADDRESS: {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
} | null = process.env.BUSINESS_STREET_ADDRESS
  ? {
      streetAddress: process.env.BUSINESS_STREET_ADDRESS,
      addressLocality: process.env.BUSINESS_LOCALITY || "Delhi NCR",
      addressRegion: process.env.BUSINESS_REGION || "DL",
      postalCode: process.env.BUSINESS_POSTAL_CODE || "110001",
      addressCountry: process.env.BUSINESS_COUNTRY || "IN",
    }
  : null;

export const CORE_STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/contact",
  "/industries",
  "/case-studies",
] as const;

export const LEGAL_PATHS = [
  "/privacy-policy",
  "/terms-of-service",
  "/cookies-policy",
] as const;

export const STATIC_PATHS = [...CORE_STATIC_PATHS, ...LEGAL_PATHS] as const;

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
  // Exclude low-value legal pages from sitemap to concentrate crawl budget on commercial pages
  return [...CORE_STATIC_PATHS, ...SERVICE_PAGE_PATHS, ...INDUSTRY_PAGE_PATHS, ...getCaseStudyPaths()];
}

/** Stable baseline content revision date for non-case-study pages */
const BASELINE_CONTENT_DATE = new Date("2026-11-05T00:00:00Z");

/** Last meaningful content change per path, for sitemap `lastmod`. */
export function getPathLastModified(path: string): Date {
  if (path.startsWith("/case-studies/")) {
    const published = getCaseStudyPublishedAt(path.split("/").pop() ?? "");
    if (published) return new Date(published);
  }
  return BASELINE_CONTENT_DATE;
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
