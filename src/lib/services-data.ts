import type { LucideIcon } from "lucide-react";
import { Sparkles, Box, Code2, Network, Diamond, TrendingUp, Cloud } from "lucide-react";

export const DISCIPLINE_KEYS = ["01", "02", "03", "04", "05", "06", "07"] as const;
export type DisciplineKey = (typeof DISCIPLINE_KEYS)[number];

export const disciplineIcons: Record<DisciplineKey, LucideIcon> = {
  "01": Sparkles,
  "02": Box,
  "03": Code2,
  "04": Network,
  "05": Diamond,
  "06": TrendingUp,
  "07": Cloud,
};

export const PROCESS_STEP_KEYS = ["01", "02", "03", "04", "05", "06"] as const;
export type ProcessStepKey = (typeof PROCESS_STEP_KEYS)[number];

export const IN_PRACTICE_KEYS = ["healthcare", "travel", "retail", "marketing", "cloud"] as const;
export type InPracticeKey = (typeof IN_PRACTICE_KEYS)[number];

export const inPracticeImages: Record<InPracticeKey, { image: string }> = {
  healthcare: { image: "/services/healthcare-portal.png" },
  travel: { image: "/services/travel-booking.png" },
  retail: { image: "/services/retail-ecommerce.png" },
  marketing: { image: "/services/marketing-dashboard.png" },
  cloud: { image: "/services/cloud-platform.png" },
};
