"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { useTranslations } from "next-intl";
import { CaseStudyPreviewImage } from "@/components/CaseStudyPreviewImage";
import { ArrowRight } from "lucide-react";
import { Reveal, Magnetic } from "@/components/motion";
import { Breadcrumb, FaqAccordion, SectionIntro } from "@/components/PageSections";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { INDUSTRY_SLUGS } from "@/lib/industry-catalog";
import {
  caseStudyMeta,
  mergeCaseStudy,
  type CaseStudyContent,
} from "@/lib/case-studies-meta";

type Filter = { id: string; label: string; slugs: string[] };

const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";
const inlineLinks = {
  services: (chunks: ReactNode) => <Link href="/services" className={linkClass}>{chunks}</Link>,
  industries: (chunks: ReactNode) => <Link href="/industries" className={linkClass}>{chunks}</Link>,
  contact: (chunks: ReactNode) => <Link href="/contact" className={linkClass}>{chunks}</Link>,
};

export default function CaseStudies() {
  const t = useTranslations("caseStudies");
  const tCrumbs = useTranslations("common.breadcrumbs");
  const { setOpen } = useScheduleMeeting();
  const filters = t.raw("list.filters") as Filter[];
  const [active, setActive] = useState("all");

  const studies = useMemo(
    () =>
      caseStudyMeta.map((meta) => {
        const item = t.raw(`items.${meta.slug}`) as CaseStudyContent;
        return mergeCaseStudy(meta, { ...item, slug: meta.slug });
      }),
    [t],
  );
  const activeFilter = filters.find((f) => f.id === active);
  const visible = active === "all" || !activeFilter ? studies : studies.filter((s) => activeFilter.slugs.includes(s.slug));

  const stats = [
    { value: String(studies.length), label: t("list.statProjects") },
    { value: String(INDUSTRY_SLUGS.length), label: t("list.statIndustries") },
    { value: String(caseStudyMeta.filter((m) => m.liveUrl).length || studies.length), label: t("list.statLive") },
  ];

  return (
    <div data-testid="case-studies-page" className="bg-background min-h-screen">
      <PageHero label={t("list.label")} title={t("list.title")} highlight={t("list.highlight")} subtitle={t("list.subtitle")} waveClassName="text-white">
        <dl className="mx-auto grid max-w-2xl grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-extrabold tracking-tight text-slate-900">{s.value}</dd>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{s.label}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Breadcrumb homeLabel={tCrumbs("home")} current={tCrumbs("caseStudies")} />

      {/* ── Intro ─────────────────────────────────────────────────────── */}
      <section className="bg-white pb-6 pt-14">
        <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="display-heading mb-5 text-3xl text-foreground sm:text-4xl">{t("list.intro.title")}</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {(t.raw("list.intro.paragraphs") as string[]).map((_, i) => (
              <p key={i}>{t.rich(`list.intro.paragraphs.${i}`, inlineLinks)}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters + grid ────────────────────────────────────────────── */}
      <section className="bg-white pb-24 pt-8">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div role="tablist" aria-label={t("list.filterLabel")} className="mb-10 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                type="button"
                aria-selected={active === f.id}
                onClick={() => setActive(f.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  active === f.id ? "border-primary bg-primary text-white" : "border-border bg-white text-slate-700 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((study, index) => (
                <motion.article
                  key={study.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-white shadow-sm transition-shadow hover:shadow-xl"
                >
                  <Link href={`/case-studies/${study.slug}`} className="block bg-slate-50 p-5">
                    <CaseStudyPreviewImage src={study.image} alt={study.imageAlt} priority={index < 2} variant={study.imageVariant} />
                  </Link>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-primary">{study.category}</p>
                    <h2 className="display-heading mb-3 text-xl leading-snug text-foreground md:text-2xl">
                      <Link href={`/case-studies/${study.slug}`} className="transition-colors hover:text-primary">
                        {study.title}
                      </Link>
                    </h2>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{study.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                      <span>{study.date} · {study.readTime}</span>
                      <Link href={`/case-studies/${study.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground transition-colors hover:text-primary">
                        {t("list.readCaseStudy")}
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── FAQs ──────────────────────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-slate-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={t("list.faqs.badge")} title={t("list.faqs.title")} subtitle={t("list.faqs.subtitle")} />
          <FaqAccordion id="work" items={t.raw("list.faqs.items") as { q: string; a: string }[]} />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-[#0f172a] py-24 text-center text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="display-heading mb-4 text-3xl text-white sm:text-5xl">{t("list.cta.title")}</h2>
            <p className="mx-auto mb-8 max-w-xl text-sm text-white/70 sm:text-base">{t("list.cta.subtitle")}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic strength={10}>
                <button type="button" onClick={() => setOpen(true)} className="btn-primary">{t("list.cta.primary")}</button>
              </Magnetic>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15">
                {t("list.cta.secondary")} <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
