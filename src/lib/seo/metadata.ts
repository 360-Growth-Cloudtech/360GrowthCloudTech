import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import {
  absoluteUrl,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  localePath,
  OG_LOCALE_MAP,
  SITE_NAME,
} from "./site";

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
  type?: "website" | "article";
};

function buildOgImage(image?: string) {
  const url = absoluteUrl(image ?? DEFAULT_OG_IMAGE);
  return [{ url, width: 1200, height: 630, alt: SITE_NAME }];
}

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  image,
  type = "website",
}: BuildPageMetadataOptions): Metadata {
  const canonical = localePath(locale, path);
  const languages = buildLanguageAlternates(path);
  const ogLocale = OG_LOCALE_MAP[locale];
  const alternateLocales = routing.locales
    .filter((code) => code !== locale)
    .map((code) => OG_LOCALE_MAP[code]);
  const ogImages = buildOgImage(image);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: ogLocale,
      alternateLocale: alternateLocales,
      type,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((entry) => entry.url),
    },
  };
}

export function buildRootMetadata(): Metadata {
  const verification: Metadata["verification"] = {};

  if (process.env.GOOGLE_SITE_VERIFICATION) {
    verification.google = process.env.GOOGLE_SITE_VERIFICATION;
  }
  if (process.env.BING_SITE_VERIFICATION) {
    verification.other = {
      ...(verification.other ?? {}),
      "msvalidate.01": process.env.BING_SITE_VERIFICATION,
    };
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://360cloudtech.com"),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "360CloudTech — End-to-end digital transformation: custom software, cloud, and digital marketing.",
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/logo.png" }],
      apple: "/logo.png",
    },
    openGraph: {
      title: SITE_NAME,
      description: "End-to-end digital transformation for ambitious businesses.",
      type: "website",
      siteName: SITE_NAME,
      images: buildOgImage(),
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: "End-to-end digital transformation for ambitious businesses.",
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
    ...(Object.keys(verification).length > 0 ? { verification } : {}),
  };
}
