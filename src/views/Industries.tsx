"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, ChevronDown, ChevronRight, ShieldCheck } from "lucide-react";
import { IndustryShowcase } from "@/components/IndustryShowcase";
import { PageHero } from "@/components/PageHero";
import { Reveal, Magnetic } from "@/components/motion";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { INDUSTRY_SLUGS, industryHref, industryMeta } from "@/lib/industry-catalog";
import { caseStudyMeta } from "@/lib/case-studies-meta";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";
const inlineLinks = {
  services: (chunks: ReactNode) => <Link href="/services" className={linkClass}>{chunks}</Link>,
  contact: (chunks: ReactNode) => <Link href="/contact" className={linkClass}>{chunks}</Link>,
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

export default function Industries() {
  const t = useTranslations("industries");
  const tHub = useTranslations("industries.hub");
  const tCrumbs = useTranslations("common.breadcrumbs");
  const { setOpen } = useScheduleMeeting();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: String(INDUSTRY_SLUGS.length), label: t("page.statIndustries") },
    { value: String(caseStudyMeta.length), label: t("page.statProjects") },
    { value: t("page.statComplianceValue"), label: t("page.statCompliance") },
  ];
  const services = tHub.raw("services.items") as { label: string; href: string }[];
  const faqs = tHub.raw("faqs.items") as { q: string; a: string }[];

  return (
    <>
      <PageHero
        label={t("page.label")}
        title={t("page.title")}
        highlight={t("page.titleHighlight")}
        subtitle={t("page.subtitle")}
        waveClassName="text-white"
      >
        {/* Industry chips link to each industry's own page */}
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.18 }} className="mb-12 flex flex-wrap justify-center gap-2.5">
          {INDUSTRY_SLUGS.map((slug) => {
            const Icon = industryMeta[slug].icon;
            return (
              <Link
                key={slug}
                href={industryHref(slug)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                <Icon size={15} className="text-brand-500" />
                {t(`catalog.${slug}.name`)}
              </Link>
            );
          })}
        </motion.div>

        <motion.dl
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mx-auto grid max-w-3xl grid-cols-1 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-5">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-2xl font-extrabold tracking-tight text-slate-900">{stat.value}</dd>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </PageHero>

      {/* Visible breadcrumb (BreadcrumbList JSON-LD is emitted by the route) */}
      <nav aria-label="Breadcrumb" className="bg-white">
        <ol className="container mx-auto flex items-center gap-1.5 px-4 pt-2 text-sm text-slate-500 sm:px-6 lg:px-8">
          <li><Link href="/" className="hover:text-primary">{tCrumbs("home")}</Link></li>
          <li aria-hidden><ChevronRight size={14} /></li>
          <li aria-current="page" className="font-semibold text-slate-800">{tCrumbs("industries")}</li>
        </ol>
      </nav>

      {/* ── Intro ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="section-label mb-4 inline-flex">{tHub("intro.badge")}</span>
            <h2 className="display-heading mb-6 text-3xl text-foreground sm:text-4xl md:text-5xl">{tHub("intro.title")}</h2>
            <div className="space-y-5 text-left text-sm leading-relaxed text-slate-600 sm:text-base">
              {(tHub.raw("intro.paragraphs") as string[]).map((_, i) => (
                <p key={i}>{tHub.rich(`intro.paragraphs.${i}`, inlineLinks)}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Industry cards: one link per industry page ────────────────── */}
      <section className="border-t border-border/60 bg-slate-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={tHub("grid.badge")} title={tHub("grid.title")} subtitle={tHub("grid.subtitle")} />
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRY_SLUGS.map((slug, i) => {
              const Icon = industryMeta[slug].icon;
              return (
                <Reveal key={slug} delay={(i % 4) * 0.05} duration={0.5} className="h-full">
                  <Link
                    href={industryHref(slug)}
                    className="group flex h-full flex-col rounded-2xl border border-border/80 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                  >
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <h3 className="mb-2 text-base font-bold text-foreground">{t(`catalog.${slug}.title`)}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{tHub(`grid.items.${slug}`)}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-bold text-primary transition-all group-hover:gap-2">
                      {tHub("grid.explore")} <ArrowRight size={13} />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <IndustryShowcase
        badge={t("page.showcaseBadge")}
        title={t("page.showcaseTitle")}
        subtitle={t("page.showcaseSubtitle")}
        syncHash
      />

      {/* ── Services used across industries ───────────────────────────── */}
      <section className="border-t border-border/60 bg-slate-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={tHub("services.badge")} title={tHub("services.title")} subtitle={tHub("services.subtitle")} />
          <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {services.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {s.label} <ArrowRight size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQs (answers stay in the DOM for crawlers) ───────────────── */}
      <section className="border-t border-border/60 bg-white py-24">
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
                      aria-controls={`industries-faq-${idx}`}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-foreground transition-colors hover:bg-slate-50 sm:text-base"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </h3>
                  <div
                    id={`industries-faq-${idx}`}
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

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-white pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-8 py-14 text-center"
            style={{ background: "linear-gradient(135deg, #f95d16 0%, #ea430c 50%, #7c2412 100%)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ShieldCheck className="mx-auto mb-4 text-white/80" size={32} />
            <h2 className="display-heading mb-4 text-2xl text-white md:text-4xl">{t("cta.title")}</h2>
            <p className="mx-auto mb-8 max-w-md text-sm text-white/75">{t("cta.subtitle")}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic strength={10}>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-foreground hover:bg-white/90"
                >
                  {t("showcase.getStarted")} <ArrowRight size={16} />
                </button>
              </Magnetic>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/20">
                {tCrumbs("contact")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
