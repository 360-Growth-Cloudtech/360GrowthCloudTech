"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/motion";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import {
  HASH_NAV_EVENT,
  INDUSTRY_SLUGS,
  industryAnchor,
  industryHref,
  industryMeta,
  type IndustrySlug,
} from "@/lib/industry-catalog";

type IndustryShowcaseProps = {
  badge: string;
  title: string;
  subtitle?: string;
  /** Select the tab named in the URL hash (/industries#real-estate) and keep it in sync. */
  syncHash?: boolean;
};

const slugFromHash = (hash: string): IndustrySlug | undefined =>
  INDUSTRY_SLUGS.find((slug) => `#${industryAnchor(slug)}` === hash);

/** Stand-in visual for sectors where we have no published project yet. */
function SampleDashboard({ slug }: { slug: IndustrySlug }) {
  const t = useTranslations("industries");
  const kpis = t.raw(`catalog.${slug}.mock.kpis`) as { label: string; value: string }[];
  const bars = [42, 58, 51, 67, 63, 78, 72, 88, 81, 94];

  return (
    <div className="flex h-full flex-col gap-4 bg-slate-50 p-5 text-left" aria-hidden>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800">{t(`catalog.${slug}.mock.title`)}</span>
        <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-[0.65rem] font-semibold text-brand-700">
          {t("showcase.sampleDashboard")}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="text-[0.65rem] font-medium text-slate-500">{kpi.label}</div>
            <div className="mt-1 text-lg font-extrabold text-slate-900">{kpi.value}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-end gap-2 rounded-xl border border-slate-200 bg-white p-4">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-brand-600 to-amber-400"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </div>
  );
}

export function IndustryShowcase({ badge, title, subtitle, syncHash = false }: IndustryShowcaseProps) {
  const t = useTranslations("industries");
  const { setOpen } = useScheduleMeeting();
  const [active, setActive] = useState<IndustrySlug>(INDUSTRY_SLUGS[0]);
  const tablistRef = useRef<HTMLDivElement>(null);

  // On narrow screens the tab bar scrolls sideways; keep the active tab visible
  // (scroll the bar only, never the page).
  useEffect(() => {
    const bar = tablistRef.current;
    const tab = bar?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!bar || !tab || bar.scrollWidth <= bar.clientWidth) return;
    bar.scrollTo({ left: tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    if (!syncHash) return;
    const fromHash = (e?: Event) => {
      const hash = e instanceof CustomEvent ? String(e.detail) : window.location.hash;
      const slug = slugFromHash(hash);
      if (slug) setActive(slug);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    window.addEventListener(HASH_NAV_EVENT, fromHash);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      window.removeEventListener(HASH_NAV_EVENT, fromHash);
    };
  }, [syncHash]);

  const select = useCallback(
    (slug: IndustrySlug) => {
      setActive(slug);
      // Shareable URL per industry without jumping the page.
      if (syncHash) window.history.replaceState(null, "", `#${industryAnchor(slug)}`);
    },
    [syncHash],
  );

  const meta = industryMeta[active];
  const solutions = t.raw(`catalog.${active}.solutions`) as string[];
  const chips = t.raw(`catalog.${active}.badges`) as string[];

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-24">
      {/* Deep-link targets for /industries#<industry> */}
      {INDUSTRY_SLUGS.map((slug) => (
        <span key={slug} id={industryAnchor(slug)} className="absolute top-0 block scroll-mt-24" aria-hidden />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <span className="section-label mb-4 inline-flex">{badge}</span>
          <h2 className="display-heading mb-4 text-3xl text-foreground sm:text-4xl md:text-5xl">{title}</h2>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{subtitle}</p>
          )}
        </Reveal>

        {/* Tab bar: a sliding orange pill marks the active industry */}
        <div
          ref={tablistRef}
          role="tablist"
          aria-label={t("showcase.tablistLabel")}
          className="relative mx-auto mb-8 flex max-w-7xl snap-x gap-1.5 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-1.5 [scrollbar-width:none] lg:grid lg:grid-cols-8 lg:overflow-visible"
        >
          {INDUSTRY_SLUGS.map((slug) => {
            const Icon = industryMeta[slug].icon;
            const isActive = slug === active;
            return (
              <button
                key={slug}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls="industry-panel"
                onClick={() => select(slug)}
                className="group relative flex min-w-[7.5rem] shrink-0 snap-start flex-col items-center gap-2 rounded-xl px-2 py-3.5 text-center lg:min-w-0"
              >
                {isActive && (
                  <motion.span
                    layoutId="industry-pill"
                    className="absolute inset-0 rounded-xl bg-white shadow-md shadow-brand-900/10 ring-1 ring-brand-200"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span
                  className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-amber-400 to-brand-600 text-white shadow-lg shadow-brand-500/30"
                      : "bg-white text-slate-500 ring-1 ring-slate-200 group-hover:text-brand-600 group-hover:ring-brand-200"
                  }`}
                >
                  <Icon size={20} strokeWidth={1.9} />
                </span>
                <span
                  className={`relative text-xs font-semibold leading-tight transition-colors sm:text-sm ${
                    isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-800"
                  }`}
                >
                  {t(`catalog.${slug}.name`)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active industry */}
        <div
          id="industry-panel"
          role="tabpanel"
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-brand-100 p-6 sm:p-10 lg:p-12"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 100% 0%, rgba(255,168,0,0.14) 0%, transparent 70%), radial-gradient(ellipse 45% 55% at 0% 100%, rgba(249,93,22,0.10) 0%, transparent 70%), linear-gradient(180deg, #fffaf5 0%, #ffffff 100%)",
          }}
        >
          {/* Oversized icon watermark */}
          {(() => {
            const Watermark = meta.icon;
            return (
              <Watermark
                className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 text-brand-500/[0.05]"
                strokeWidth={1.2}
                aria-hidden
              />
            );
          })()}

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
            >
              <div className="text-left lg:col-span-6">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-brand-700 shadow-sm ring-1 ring-brand-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {t(`catalog.${active}.name`)}
                </span>
                <h3 className="display-heading mb-4 text-3xl text-slate-900 md:text-4xl">{t(`catalog.${active}.title`)}</h3>
                <p className="mb-7 text-sm leading-relaxed text-slate-600 md:text-base">{t(`catalog.${active}.desc`)}</p>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{t("showcase.whatWeBuild")}</p>
                <ul className="mb-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {solutions.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.05 }}
                      className="group flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xs font-extrabold text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition-transform hover:-translate-y-0.5"
                  >
                    {t("showcase.getStarted")} <ArrowUpRight size={16} />
                  </button>
                  <Link
                    href={industryHref(active)}
                    className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors hover:text-brand-600"
                  >
                    {t("showcase.explore", { industry: t(`catalog.${active}.name`) })}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  {meta.caseStudy && (
                    <Link
                      href={`/case-studies/${meta.caseStudy}`}
                      className="group inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 transition-colors hover:text-brand-600"
                    >
                      {t("showcase.seeCaseStudy")}
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Visual: stacked browser frames with floating capability chips */}
              <div className="relative lg:col-span-6">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-2xl bg-amber-100/70" aria-hidden />
                <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-1 rounded-2xl bg-brand-100/70" aria-hidden />
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-brand-900/15">
                  <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    {meta.image && (
                      <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-700 ring-1 ring-emerald-200">
                        {t("showcase.realProject")}
                      </span>
                    )}
                  </div>
                  <div className="relative aspect-[16/10]">
                    {meta.image ? (
                      <Image
                        src={meta.image}
                        alt={t(`catalog.${active}.title`)}
                        fill
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-cover object-top"
                      />
                    ) : (
                      <SampleDashboard slug={active} />
                    )}
                  </div>
                </div>
                {chips.map((chip, i) => (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: [0, -6, 0] }}
                    transition={{
                      opacity: { delay: 0.2 + i * 0.1 },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 1.2 },
                    }}
                    className={`absolute hidden items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-slate-800 shadow-xl shadow-brand-900/10 ring-1 ring-slate-200 sm:inline-flex ${
                      i === 0 ? "-top-4 left-24" : "-right-4 bottom-10"
                    }`}
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-white">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {chip}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
