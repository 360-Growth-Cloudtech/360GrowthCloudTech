import type { MetadataRoute } from "next";
import {
  getPathChangeFrequency,
  getPathPriority,
  getSitemapPaths,
  localePath,
  buildLanguageAlternates,
} from "@/lib/seo/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = getSitemapPaths();

  return paths.map((path) => ({
    url: localePath(routing.defaultLocale, path),
    lastModified,
    changeFrequency: getPathChangeFrequency(path),
    priority: getPathPriority(path),
    alternates: {
      languages: buildLanguageAlternates(path),
    },
  }));
}
