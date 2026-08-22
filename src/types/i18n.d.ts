import { routing } from "./routing";
import type messages from "../../messages/en/common.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: {
      common: typeof messages;
      home: typeof import("../../messages/en/home.json");
      services: typeof import("../../messages/en/services.json");
      about: typeof import("../../messages/en/about.json");
      contact: typeof import("../../messages/en/contact.json");
      industries: typeof import("../../messages/en/industries.json");
      caseStudies: typeof import("../../messages/en/caseStudies.json");
      legal: typeof import("../../messages/en/legal.json");
    };
  }
}
