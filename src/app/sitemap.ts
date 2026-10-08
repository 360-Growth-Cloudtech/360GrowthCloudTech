import type { MetadataRoute } from "next";
import {
  getPathChangeFrequency,
  getPathLastModified,
  getPathPriority,
  getSitemapPaths,
  localePath,
} from "@/lib/seo/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapPaths().map((path) => ({
    url: localePath(routing.defaultLocale, path),
    lastModified: getPathLastModified(path),
    changeFrequency: getPathChangeFrequency(path),
    priority: getPathPriority(path),
  }));
}
