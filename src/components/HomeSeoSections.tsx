"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import {
  AppWindow, ArrowRight, BarChart3, Boxes, Building2, Check, Cpu, Factory, GraduationCap,
  HeartPulse, Landmark, Layers, Monitor, Plug, Rocket, ShoppingBag, Smartphone, Sprout,
  Truck, Users, Workflow, Globe, Briefcase, Clock,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Reveal, Magnetic } from "@/components/motion";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";

type LinkedCard = { id: string; title: string; desc: string; href: string };

const SOLUTION_ICONS: Record<string, LucideIcon> = {
  web: AppWindow,
  mobile: Smartphone,
  enterprise: Workflow,
  saas: Layers,
  crm: Users,
  erp: Boxes,
  data: BarChart3,
  desktop: Monitor,
  ecommerce: ShoppingBag,
  iot: Cpu,
  mvp: Rocket,
  integration: Plug,
};

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  healthcare: HeartPulse,
  fintech: Landmark,
  logistics: Truck,
  manufacturing: Factory,
  retail: ShoppingBag,
  education: GraduationCap,
  realEstate: Building2,
  agriculture: Sprout,
};

const ENGAGEMENT_ICONS: Record<string, LucideIcon> = {
  fixed: Briefcase,
  dedicated: Users,
  augmentation: Clock,
  offshore: Globe,
};

/** Inline internal links used inside translated paragraphs (`<services>…</services>`). */
const inlineLinks = {
  services: (chunks: ReactNode) => (
    <Link href="/services" className="font-semibold text-primary underline-offset-4 hover:underline">{chunks}</Link>
  ),
  csd: (chunks: ReactNode) => (
    <Link href="/custom-software-development" className="font-semibold text-primary underline-offset-4 hover:underline">{chunks}</Link>
  ),
  sd: (chunks: ReactNode) => (
    <Link href="/software-development" className="font-semibold text-primary underline-offset-4 hover:underline">{chunks}</Link>
  ),
  work: (chunks: ReactNode) => (
    <Link href="/case-studies" className="font-semibold text-primary underline-offset-4 hover:underline">{chunks}</Link>
  ),
  about: (chunks: ReactNode) => (
    <Link href="/about" className="font-semibold text-primary underline-offset-4 hover:underline">{chunks}</Link>
  ),
  contact: (chunks: ReactNode) => (
    <Link href="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">{chunks}</Link>
  ),
};

function SectionIntro({ badge, title, subtitle }: { badge: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="text-center max-w-3xl mx-auto mb-16">
      <span className="section-label mb-4 inline-flex">{badge}</span>
      <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </Reveal>
  );
}

/* ── What custom software is, who it's for ─────────────────────────────── */
export function SoftwareIntro() {
  const t = useTranslations("home.softwareIntro");
  const paragraphs = t.raw("paragraphs") as string[];
  const audience = t.raw("audience") as { title: string; desc: string }[];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          <Reveal className="lg:col-span-7 text-left">
            <span className="section-label mb-4 inline-flex">{t("badge")}</span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">{t("title")}</h2>
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-slate-600">
              {paragraphs.map((_, i) => (
                <p key={i}>{t.rich(`paragraphs.${i}`, inlineLinks)}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <aside className="rounded-3xl border border-border bg-slate-50 p-7 sm:p-8">
              <h3 className="font-bold text-lg text-foreground mb-5">{t("asideTitle")}</h3>
              <ul className="space-y-4">
                {audience.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check size={14} />
                    </span>
                    <div>
                      <p className="font-bold text-sm text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all"
              >
                {t("asideCta")} <ArrowRight size={15} />
              </Link>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LinkedCardGrid({
  items,
  icons,
  linkLabel,
  columns,
}: {
  items: LinkedCard[];
  icons: Record<string, LucideIcon>;
  linkLabel: string;
  columns: string;
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${columns} gap-5 max-w-6xl mx-auto`}>
      {items.map((item, i) => {
        const Icon = icons[item.id] ?? Layers;
        return (
          <Reveal key={item.id} delay={(i % 4) * 0.05} duration={0.5} className="h-full">
            <Link
              href={item.href}
              className="group flex h-full flex-col rounded-2xl border border-border/80 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon size={20} />
              </span>
              <h3 className="font-bold text-base text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-bold text-primary transition-all group-hover:gap-2">
                {linkLabel} <ArrowRight size={13} />
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ── Types of custom software we build ─────────────────────────────────── */
export function SolutionsGrid() {
  const t = useTranslations("home.solutions");
  return (
    <section className="py-24 bg-slate-50 border-t border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionIntro badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
        <LinkedCardGrid
          items={t.raw("items") as LinkedCard[]}
          icons={SOLUTION_ICONS}
          linkLabel={t("learnMore")}
          columns="lg:grid-cols-3 xl:grid-cols-4"
        />
      </div>
    </section>
  );
}

/* ── Industry-specific custom software ─────────────────────────────────── */
export function IndustryFocus() {
  const t = useTranslations("home.industryFocus");
  return (
    <section className="py-24 bg-background border-t border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionIntro badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
        <LinkedCardGrid
          items={t.raw("items") as LinkedCard[]}
          icons={INDUSTRY_ICONS}
          linkLabel={t("explore")}
          columns="lg:grid-cols-4"
        />
      </div>
    </section>
  );
}

/* ── Engagement / outsourcing models ───────────────────────────────────── */
export function EngagementModels() {
  const t = useTranslations("home.engagement");
  const items = t.raw("items") as { id: string; title: string; desc: string; bestFor: string }[];

  return (
    <section className="py-24 bg-white border-t border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionIntro badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {items.map((item, i) => {
            const Icon = ENGAGEMENT_ICONS[item.id] ?? Briefcase;
            return (
              <Reveal key={item.id} delay={i * 0.06} duration={0.5} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-slate-50 p-6 text-left">
                  <Icon size={22} className="text-primary mb-4" />
                  <h3 className="font-bold text-base text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                  <p className="mt-auto text-xs font-semibold text-foreground/80">
                    <span className="text-primary">{t("bestForLabel")}:</span> {item.bestFor}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="max-w-3xl mx-auto mt-10">
          <p className="text-center text-sm leading-relaxed text-slate-600">{t.rich("note", inlineLinks)}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Buyer's guide: choosing a development partner ─────────────────────── */
export function ChoosePartner() {
  const t = useTranslations("home.choosePartner");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section className="py-24 bg-white border-t border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionIntro badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06} duration={0.5} className="h-full">
              <li className="flex h-full gap-4 rounded-2xl border border-border/80 bg-slate-50 p-6 text-left">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-base text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal className="max-w-3xl mx-auto mt-10">
          <p className="text-center text-sm leading-relaxed text-slate-600">{t.rich("note", inlineLinks)}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Cost of custom software development ───────────────────────────────── */
export function CostGuide() {
  const t = useTranslations("home.costGuide");
  const { setOpen } = useScheduleMeeting();
  const tiers = t.raw("tiers") as { id: string; name: string; price: string; timeline: string; desc: string }[];
  const factors = t.raw("factors") as string[];

  return (
    <section className="py-24 bg-slate-50 border-t border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionIntro badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto mb-10">
          {tiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.08} duration={0.5} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-white p-7 text-left shadow-sm">
                <h3 className="font-bold text-lg text-foreground mb-4">{tier.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("fromLabel")}</p>
                <p className="display-heading text-2xl sm:text-3xl text-primary mb-3">{tier.price}</p>
                <p className="text-xs font-semibold text-foreground/80 mb-4">
                  {t("timelineLabel")}: {tier.timeline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl bg-foreground p-8 sm:p-10 text-white">
            <div className="lg:col-span-7 text-left">
              <h3 className="font-bold text-lg sm:text-xl mb-5">{t("factorsTitle")}</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {factors.map((factor) => (
                  <li key={factor} className="flex items-start gap-2 text-sm text-white/85">
                    <Check size={16} className="text-brand-400 shrink-0 mt-0.5" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <p className="text-sm text-white/75 leading-relaxed mb-6">{t("note")}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Magnetic strength={10}>
                  <button onClick={() => setOpen(true)} className="btn-primary">
                    {t("cta")}
                  </button>
                </Magnetic>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-brand-300">
                  {t("secondaryCta")} <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
