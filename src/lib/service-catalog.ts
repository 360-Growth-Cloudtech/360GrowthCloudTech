import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  BrainCircuit,
  Building2,
  CloudCog,
  Headset,
  Layers,
  Plug,
  ShieldCheck,
  Smartphone,
  Workflow,
} from "lucide-react";

/** The ten services we sell. Copy lives in messages/en/services.json → catalog.items. */
export const SERVICE_SLUGS = [
  "custom-enterprise-software",
  "enterprise-application-development",
  "web-application-development",
  "mobile-app-development",
  "saas-development",
  "api-system-integration",
  "cloud-devops",
  "ai-automation",
  "qa-testing",
  "maintenance-support",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "custom-enterprise-software": Workflow,
  "enterprise-application-development": Building2,
  "web-application-development": AppWindow,
  "mobile-app-development": Smartphone,
  "saas-development": Layers,
  "api-system-integration": Plug,
  "cloud-devops": CloudCog,
  "ai-automation": BrainCircuit,
  "qa-testing": ShieldCheck,
  "maintenance-support": Headset,
};

/**
 * Additional services listed in the header menu. Labels live in
 * messages/en/services.json → menu.items; page content is still to come.
 */
export const MENU_SERVICE_SLUGS = [
  "software-development",
  "ecommerce-software-development",
  "custom-software-development",
  "stock-management-software",
  "crm-software-development",
  "online-complaint-management-system",
  "it-asset-management-software",
  "qri-dashboard",
  "web-design",
  "website-redesigning",
  "static-web-designing",
  "dynamic-website-designing",
  "mobile-website-designing",
  "custom-web-designing",
  "landing-page-designing",
  "design-identity-branding",
] as const;

export type MenuServiceSlug = (typeof MENU_SERVICE_SLUGS)[number];

/** Columns of the Services mega menu. Titles: services.menu.groups.<id>. */
export const SERVICE_MENU_GROUPS: { id: string; items: (ServiceSlug | MenuServiceSlug)[] }[] = [
  {
    id: "softwareDevelopment",
    items: [
      "software-development",
      "ecommerce-software-development",
      "custom-software-development",
      "stock-management-software",
      "crm-software-development",
      "online-complaint-management-system",
      "web-application-development",
      "it-asset-management-software",
      "qri-dashboard",
    ],
  },
  {
    id: "webDesign",
    items: [
      "web-design",
      "website-redesigning",
      "static-web-designing",
      "dynamic-website-designing",
      "mobile-website-designing",
      "custom-web-designing",
      "landing-page-designing",
      "design-identity-branding",
    ],
  },
  {
    id: "more",
    items: SERVICE_SLUGS.filter((slug) => slug !== "web-application-development"),
  },
];

export function isCatalogService(slug: string): slug is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(slug);
}

/**
 * Services with their own landing page at the site root (e.g. /software-development).
 * Adding a slug here updates the header menu, footer and sitemap; the page itself lives in
 * src/app/[locale]/<slug>/page.tsx with copy in messages/en/<namespace>.json.
 */
export const SERVICE_PAGE_SLUGS = [
  "software-development",
  "custom-software-development",
  "ecommerce-software-development",
  "stock-management-software",
  "crm-software-development",
] as const satisfies readonly MenuServiceSlug[];

export const SERVICE_PAGE_PATHS: string[] = SERVICE_PAGE_SLUGS.map((slug) => `/${slug}`);

function hasOwnPage(slug: string): boolean {
  return (SERVICE_PAGE_SLUGS as readonly string[]).includes(slug);
}

/** A service's own page if it has one, otherwise its section on /services. */
export function serviceHref(slug: ServiceSlug | MenuServiceSlug): string {
  return hasOwnPage(slug) ? `/${slug}` : `/services#${slug}`;
}
