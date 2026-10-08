import type { Metadata, Viewport } from "next";
import type { Locale } from "@/i18n/routing";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  localePath,
  OG_LOCALE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  THEME_COLOR,
} from "./site";

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
  type?: "website" | "article";
  /** Skip the "| 360GrowthCloudTech" template (home page already carries the brand). */
  absoluteTitle?: boolean;
  keywords?: string[];
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

const MAX_DESCRIPTION_LENGTH = 160;

/** Search engines truncate around 155–160 chars; cut on a word boundary. */
function clampDescription(description: string): string {
  const clean = description.replace(/\s+/g, " ").trim();
  if (clean.length <= MAX_DESCRIPTION_LENGTH) return clean;
  const cut = clean.slice(0, MAX_DESCRIPTION_LENGTH - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function buildOgImage(image: string | undefined, alt: string) {
  const url = absoluteUrl(image ?? DEFAULT_OG_IMAGE);
  // Only the generated default has known dimensions; let crawlers size others.
  return image
    ? [{ url, alt }]
    : [{ url, width: 1200, height: 630, alt, type: "image/png" }];
}

const ROBOTS_INDEX: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const ROBOTS_NOINDEX: Metadata["robots"] = {
  index: false,
  follow: true,
  googleBot: { index: false, follow: true },
};

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  image,
  type = "website",
  absoluteTitle = false,
  keywords,
  noindex = false,
  publishedTime,
  modifiedTime,
}: BuildPageMetadataOptions): Metadata {
  const canonical = localePath(locale, path);
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const metaDescription = clampDescription(description);
  const ogImages = buildOgImage(image, title);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: metaDescription,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical },
    robots: noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX,
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE,
      images: ogImages,
      ...(type === "article"
        ? {
            type: "article",
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            authors: [SITE_URL],
          }
        : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: ogImages.map((entry) => entry.url),
      ...(process.env.NEXT_PUBLIC_TWITTER_HANDLE
        ? {
            site: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
            creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
          }
        : {}),
    },
  };
}

export const rootViewport: Viewport = {
  themeColor: THEME_COLOR,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export function buildRootMetadata(): Metadata {
  const verification: Metadata["verification"] = {};

  if (process.env.GOOGLE_SITE_VERIFICATION) {
    verification.google = process.env.GOOGLE_SITE_VERIFICATION;
  }
  if (process.env.YANDEX_SITE_VERIFICATION) {
    verification.yandex = process.env.YANDEX_SITE_VERIFICATION;
  }
  if (process.env.BING_SITE_VERIFICATION) {
    verification.other = {
      ...(verification.other ?? {}),
      "msvalidate.01": process.env.BING_SITE_VERIFICATION,
    };
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    keywords: SITE_KEYWORDS,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    robots: ROBOTS_INDEX,
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/logo.png" }],
      apple: "/logo.png",
    },
    openGraph: {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      type: "website",
      locale: OG_LOCALE,
      siteName: SITE_NAME,
      images: buildOgImage(undefined, SITE_NAME),
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
    ...(Object.keys(verification).length > 0 ? { verification } : {}),
  };
}
