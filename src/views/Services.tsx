"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import {
  AppWindow, ArrowRight, BrainCircuit, Building2, Check, ChevronDown, ChevronRight, ClipboardCheck,
  CloudCog, Code2, Contact, Factory, Fingerprint, GraduationCap, Headset, HeartPulse, Landmark, Layers,
  LayoutTemplate, MessageSquareWarning, MonitorSmartphone, MousePointerClick, Palette, Plane, Plug,
  RefreshCw, ShieldCheck, ShoppingBag, ShoppingCart, Smartphone, Truck, Warehouse, Workflow, FileCode2,
  Database, Monitor, Gauge,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { Reveal, Magnetic } from "@/components/motion";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CaseStudyPreviewImage } from "@/components/CaseStudyPreviewImage";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { IN_PRACTICE_KEYS, inPracticeImages } from "@/lib/services-data";
import { QuoteForm } from "@/views/ServiceLanding";

type HubItem = { slug: string; title: string; desc: string };
type HubGroup = { id: string; title: string; subtitle: string; items: HubItem[] };

/** Card icon for each service page (keyed by its URL slug). */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  "software-development": Code2,
  "custom-software-development": Workflow,
  "custom-enterprise-software": Building2,
  "enterprise-application-development": Layers,
  "web-application-development": AppWindow,
  "mobile-app-development": Smartphone,
  "saas-development": CloudCog,
  "crm-software-development": Contact,
  "ecommerce-software-development": ShoppingCart,
  "stock-management-software": Warehouse,
  "online-complaint-management-system": MessageSquareWarning,
  "it-asset-management-software": Monitor,
  "qri-dashboard": Gauge,
  "web-design": Palette,
  "custom-web-design": LayoutTemplate,
  "website-redesign": RefreshCw,
  "static-website-design": FileCode2,
  "dynamic-website-design": Database,
  "mobile-website-design": MonitorSmartphone,
  "landing-page-design": MousePointerClick,
  "brand-identity-design": Fingerprint,
  "cloud-devops": CloudCog,
  "ai-automation": BrainCircuit,
  "api-integration": Plug,
  "qa-testing": ClipboardCheck,
  "maintenance-support": Headset,
};

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  healthcare: HeartPulse,
  fintech: Landmark,
  manufacturing: Factory,
  logistics: Truck,
  travel: Plane,
  retail: ShoppingBag,
  education: GraduationCap,
  realEstate: Building2,
};

const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";
const inlineLinks = {
  work: (chunks: ReactNode) => <Link href="/case-studies" className={linkClass}>{chunks}</Link>,
  contact: (chunks: ReactNode) => <Link href="/contact" className={linkClass}>{chunks}</Link>,
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

function SectionIntro({ badge, title, subtitle }: { badge: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="text-center max-w-3xl mx-auto mb-14">
      <span className="section-label mb-4 inline-flex">{badge}</span>
      <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </Reveal>
  );
}

export default function Services() {
  const { setOpen } = useScheduleMeeting();
  const t = useTranslations("services");
  const tHub = useTranslations("services.hub");
  const tCrumbs = useTranslations("common.breadcrumbs");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const groups = tHub.raw("directory.groups") as HubGroup[];
  const guide = tHub.raw("guide.items") as { goal: string; slug: string; service: string }[];
  const industries = tHub.raw("industries.items") as { id: string; title: string; href: string }[];
  const whyItems = tHub.raw("why.items") as { title: string; desc: string }[];
  const faqs = tHub.raw("faqs.items") as { q: string; a: string }[];

  return (
    <div data-testid="services-page" className="overflow-x-hidden">
      <PageHero
        label={tHub("hero.label")}
        title={tHub("hero.title")}
        highlight={tHub("hero.highlight")}
        subtitle={tHub("hero.subtitle")}
        waveClassName="text-white"
      >
        <QuoteForm
          ns="services.hub"
          topic={tHub("form.topic")}
          services={groups.flatMap((g) => g.items.map((i) => i.title))}
          leadSource={tHub("form.leadSource")}
        />
      </PageHero>

      {/* Visible breadcrumb (BreadcrumbList JSON-LD is emitted by the route) */}
      <nav aria-label="Breadcrumb" className="bg-white">
        <ol className="container mx-auto flex items-center gap-1.5 px-4 pt-2 text-sm text-slate-500 sm:px-6 lg:px-8">
          <li><Link href="/" className="hover:text-primary">{tCrumbs("home")}</Link></li>
          <li aria-hidden><ChevronRight size={14} /></li>
          <li aria-current="page" className="font-semibold text-slate-800">{tCrumbs("services")}</li>
        </ol>
      </nav>

      {/* ── Intro ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <Reveal className="text-left lg:col-span-7">
              <span className="section-label mb-4 inline-flex">{tHub("intro.badge")}</span>
              <h2 className="display-heading mb-6 text-3xl text-foreground sm:text-4xl md:text-5xl">{tHub("intro.title")}</h2>
              <div className="space-y-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                {(tHub.raw("intro.paragraphs") as string[]).map((_, i) => (
                  <p key={i}>{tHub.rich(`intro.paragraphs.${i}`, inlineLinks)}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <aside className="rounded-3xl border border-border bg-slate-50 p-7 sm:p-8">
                <h3 className="mb-5 text-lg font-bold text-foreground">{tHub("intro.highlightsTitle")}</h3>
                <ul className="space-y-3">
                  {(tHub.raw("intro.highlights") as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Service directory: links to every service page ────────────── */}
      <section className="border-t border-border/60 bg-slate-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={tHub("directory.badge")} title={tHub("directory.title")} subtitle={tHub("directory.subtitle")} />

          {/* Category jump links */}
          <nav aria-label={tHub("directory.title")} className="mx-auto mb-14 flex max-w-4xl flex-wrap justify-center gap-2">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary"
              >
                {g.title}
              </a>
            ))}
          </nav>

          <div className="mx-auto max-w-6xl space-y-16">
            {groups.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-32">
                <Reveal className="mb-6 text-left">
                  <h2 className="display-heading text-2xl text-foreground sm:text-3xl">{group.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground sm:text-base">{group.subtitle}</p>
                </Reveal>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((item, i) => {
                    const Icon = SERVICE_ICONS[item.slug] ?? Layers;
                    return (
                      <Reveal key={item.slug} delay={(i % 4) * 0.04} duration={0.45} className="h-full">
                        <Link
                          href={`/${item.slug}`}
                          className="group flex h-full flex-col rounded-2xl border border-border/80 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                        >
                          <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                            <Icon size={20} />
                          </span>
                          <h3 className="mb-1.5 text-base font-bold text-foreground">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-bold text-primary transition-all group-hover:gap-2">
                            {tHub("directory.explore")} <ArrowRight size={13} />
                          </span>
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Which service do you need? ────────────────────────────────── */}
      <section className="border-t border-border/60 bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={tHub("guide.badge")} title={tHub("guide.title")} subtitle={tHub("guide.subtitle")} />
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
            {guide.map((g) => (
              <li key={g.goal}>
                <Link
                  href={`/${g.slug}`}
                  className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-border/80 bg-slate-50 px-5 py-4 text-left transition-colors hover:border-primary/40 hover:bg-white"
                >
                  <span>
                    <span className="block text-sm text-muted-foreground">{g.goal}</span>
                    <span className="block text-base font-bold text-foreground group-hover:text-primary">{g.service}</span>
                  </span>
                  <ArrowRight size={18} className="shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How we work ───────────────────────────────────────────────── */}
      <ProcessTimeline />

      {/* ── Services in practice ──────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div {...fadeUp} className="mb-12 md:mb-14">
            <h2 className="display-heading text-3xl md:text-[2.35rem] text-foreground leading-tight">
              {tHub("inPracticeTitle")}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IN_PRACTICE_KEYS.map((key, i) => (
              <motion.div key={key} {...fadeUp} transition={{ delay: i * 0.08 }} className="group flex flex-col">
                <CaseStudyPreviewImage
                  src={inPracticeImages[key].image}
                  alt={t(`inPractice.${key}.imageAlt`)}
                  className="mb-5 group-hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)] transition-shadow"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                  {t(`inPractice.${key}.tag`)}
                </span>
                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t(`inPractice.${key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t(`inPractice.${key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="mt-10">
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all">
              {t("page.viewCaseStudies")} <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Industries ────────────────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-slate-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={tHub("industries.badge")} title={tHub("industries.title")} subtitle={tHub("industries.subtitle")} />
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
            {industries.map((ind) => {
              const Icon = INDUSTRY_ICONS[ind.id] ?? Building2;
              return (
                <Link
                  key={ind.id}
                  href={ind.href}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border/80 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                >
                  <Icon size={24} className="text-primary" />
                  <span className="text-sm font-bold text-foreground group-hover:text-primary">{ind.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why us ────────────────────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={tHub("why.badge")} title={tHub("why.title")} subtitle={tHub("why.subtitle")} />
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.06} duration={0.5} className="h-full">
                <div className="h-full rounded-2xl border border-border/80 bg-slate-50 p-7 text-left">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck size={20} />
                  </span>
                  <h3 className="mb-2 text-base font-bold text-foreground sm:text-lg">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs (answers stay in the DOM for crawlers) ───────────────── */}
      <section className="border-t border-border/60 bg-slate-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={tHub("faqs.badge")} title={tHub("faqs.title")} subtitle={tHub("faqs.subtitle")} />
          <div className="mx-auto max-w-4xl space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="overflow-hidden rounded-2xl border border-border/80 bg-white text-left">
                  <h3>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`services-faq-${idx}`}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-foreground transition-colors hover:bg-slate-50 sm:text-base"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </h3>
                  <div
                    id={`services-faq-${idx}`}
                    className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-border/40 px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="bg-[#0f172a] py-24 text-center text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="display-heading mb-4 text-3xl text-white sm:text-5xl">{tHub("cta.title")}</h2>
            <p className="mx-auto mb-8 max-w-xl text-sm text-white/70 sm:text-base">{tHub("cta.subtitle")}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic strength={10}>
                <button onClick={() => setOpen(true)} className="btn-primary" data-testid="services-cta-book">
                  {tHub("cta.primary")}
                </button>
              </Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15"
              >
                {tHub("cta.secondary")} <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
