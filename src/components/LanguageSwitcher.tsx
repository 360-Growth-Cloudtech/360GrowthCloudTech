"use client";

import { Check, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { localeLabels, locales, type Locale } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common.languages");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="nav-link flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/6 hover:text-foreground"
        aria-label={t("switchLanguage")}
        data-testid="nav-language-switcher"
      >
        <Globe size={17} strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[11rem] rounded-2xl border-border/60 bg-[#1a1512]/95 p-1.5 text-white backdrop-blur-xl"
      >
        {locales.map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => router.replace(pathname, { locale: code })}
            className={`flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium focus:bg-white/10 focus:text-white ${
              locale === code ? "bg-primary text-white focus:bg-primary focus:text-white" : "text-white/85"
            }`}
          >
            {locale === code ? <Check size={14} className="shrink-0" /> : <span className="w-3.5 shrink-0" />}
            {localeLabels[code]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
