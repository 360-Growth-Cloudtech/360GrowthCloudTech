import type { LucideIcon } from "lucide-react";
import { Building2, Factory, GraduationCap, HeartPulse, Landmark, Plane, ShoppingBag, Truck } from "lucide-react";

/** Industries we serve. Copy lives in messages/en/industries.json → catalog. */
export const INDUSTRY_SLUGS = [
  "healthcare",
  "finance",
  "manufacturing",
  "logistics",
  "travel",
  "retail",
  "education",
  "realEstate",
] as const;

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];

type IndustryMeta = {
  icon: LucideIcon;
  /** Screenshot of our own project in this sector; sectors without one show a sample dashboard. */
  image?: string;
  /** Related case study slug, linked from the showcase. */
  caseStudy?: string;
};

export const industryMeta: Record<IndustrySlug, IndustryMeta> = {
  healthcare: { icon: HeartPulse, image: "/case-studies/healthcare-ivr-platform.png", caseStudy: "healthcare-ivr-platform" },
  finance: { icon: Landmark },
  manufacturing: { icon: Factory },
  logistics: { icon: Truck, image: "/case-studies/mahasu-travels-crm.png", caseStudy: "mahasu-travels-crm" },
  travel: { icon: Plane, image: "/case-studies/mahasu-travels-website-home.jpg", caseStudy: "mahasu-travels-website" },
  retail: { icon: ShoppingBag, image: "/case-studies/dermayoga.jpg", caseStudy: "dermayoga" },
  education: { icon: GraduationCap, image: "/case-studies/skinfinity-academy.jpg", caseStudy: "skinfinity-academy" },
  realEstate: { icon: Building2, image: "/case-studies/atory-hub-home.jpg", caseStudy: "atory-hub" },
};

/** URL-friendly anchor for each industry on /industries. */
export const industryAnchor = (slug: IndustrySlug) =>
  slug.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

export const industryHref = (slug: IndustrySlug) => `/industries#${industryAnchor(slug)}`;

/**
 * Fired with the target hash (e.g. "#retail") when a menu link points at a
 * section. Same-page hash navigation doesn't emit `hashchange` under Next's
 * router, so listeners can't rely on the URL alone.
 */
export const HASH_NAV_EVENT = "app:hash-nav";

export function announceHashNav(href: string) {
  const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
  if (!hash) return;
  window.dispatchEvent(new CustomEvent(HASH_NAV_EVENT, { detail: hash }));
}
