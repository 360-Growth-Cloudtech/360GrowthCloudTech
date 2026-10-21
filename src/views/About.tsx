"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Compass, Gem, Handshake, KeyRound, MessageCircle, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { Reveal, Magnetic } from "@/components/motion";
import { Breadcrumb, FaqAccordion, SectionIntro } from "@/components/PageSections";
import { INDUSTRY_SLUGS, industryHref, industryMeta } from "@/lib/industry-catalog";

const VALUE_ICONS: LucideIcon[] = [Target, MessageCircle, Compass, Gem, KeyRound, Handshake];

const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";
const inlineLinks = {
  services: (chunks: ReactNode) => <Link href="/services" className={linkClass}>{chunks}</Link>,
  work: (chunks: ReactNode) => <Link href="/case-studies" className={linkClass}>{chunks}</Link>,
};

export default function About() {
  const t = useTranslations("about");
  const tCta = useTranslations("common.ctas");
  const tCrumbs = useTranslations("common.breadcrumbs");
  const tIndustries = useTranslations("industries.catalog");
  const { setOpen } = useScheduleMeeting();

  const stats = t.raw("stats.items") as { value: string; label: string }[];
  const values = t.raw("values.items") as { title: string; desc: string }[];
  const steps = t.raw("howWeWork.steps") as { title: string; desc: string }[];
  const services = t.raw("whatWeDo.services") as { label: string; href: string }[];

  return (
    <div data-testid="about-page" className="bg-background">
      <PageHero label={t("page.label")} title={t("page.title")} highlight={t("page.highlight")} subtitle={t("page.subtitle")} waveClassName="text-white">
        <dl className="mx-auto grid max-w-4xl grid-cols-2 divide-slate-200 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur sm:grid-cols-4 sm:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-5 py-5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-extrabold tracking-tight text-slate-900">{s.value}</dd>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{s.label}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Breadcrumb homeLabel={tCrumbs("home")} current={tCrumbs("about")} />

      {/* ── Story ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <span className="section-label mb-4 inline-flex">{t("story.badge")}</span>
            <h2 className="display-heading mb-6 text-3xl text-foreground sm:text-4xl md:text-5xl">{t("story.title")}</h2>
            <div className="space-y-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              {(t.raw("story.paragraphs") as string[]).map((_, i) => (
                <p key={i}>{t.rich(`story.paragraphs.${i}`, inlineLinks)}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <aside className="rounded-3xl bg-[#0f172a] p-8 text-white">
              <h3 className="mb-3 text-xl font-bold">{t("team.title")}</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/70">{(t.raw("team.paragraphs") as string[])[0]}</p>
              <ul className="space-y-3">
                {(t.raw("team.points") as string[]).map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-white/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-slate-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={t("values.badge")} title={t("values.title")} subtitle={t("values.subtitle")} />
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <Reveal key={v.title} delay={(i % 3) * 0.06} className="h-full">
                  <div className="h-full rounded-2xl border border-border/80 bg-white p-7 text-left shadow-sm">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={20} />
                    </span>
                    <h3 className="mb-2 text-lg font-bold text-foreground">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How we work ───────────────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={t("howWeWork.badge")} title={t("howWeWork.title")} />
          <ol className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-5">
            <div className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-border md:block" aria-hidden />
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <li className="relative text-left md:text-center">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white ring-4 ring-white md:mx-auto">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-1.5 text-base font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── What we do: services + industries ─────────────────────────── */}
      <section className="border-t border-border/60 bg-slate-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={t("whatWeDo.badge")} title={t("whatWeDo.title")} subtitle={t("whatWeDo.subtitle")} />
          <ul className="mx-auto mb-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary">
                  {s.label} <ArrowRight size={14} />
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mb-5 text-center text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{t("whatWeDo.industriesTitle")}</h3>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
            {INDUSTRY_SLUGS.map((slug) => {
              const Icon = industryMeta[slug].icon;
              return (
                <Link key={slug} href={industryHref(slug)} className="group flex items-center gap-3 rounded-xl border border-border/80 bg-white px-4 py-3 transition-colors hover:border-primary/40">
                  <Icon size={18} className="shrink-0 text-primary" />
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-primary">{tIndustries(`${slug}.name`)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQs ──────────────────────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={t("faqs.badge")} title={t("faqs.title")} subtitle={t("faqs.subtitle")} />
          <FaqAccordion id="about" items={t.raw("faqs.items") as { q: string; a: string }[]} />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-[#0f172a] py-24 text-center text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="display-heading mb-4 text-3xl text-white sm:text-5xl">{t("cta.title")}</h2>
            <p className="mx-auto mb-8 max-w-xl text-sm text-white/70 sm:text-base">{t("cta.subtitle")}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic strength={10}>
                <button type="button" onClick={() => setOpen(true)} className="btn-primary" data-testid="about-cta-conversation">
                  {tCta("startConversation")}
                </button>
              </Magnetic>
              <Link href="/case-studies" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15">
                {tCta("recentProjects")} <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
