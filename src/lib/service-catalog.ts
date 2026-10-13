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

/** Each service is a section on /services, addressable by its slug. */
export function serviceHref(slug: ServiceSlug): string {
  return `/services#${slug}`;
}
