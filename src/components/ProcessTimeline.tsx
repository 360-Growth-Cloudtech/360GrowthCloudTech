"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { BadgeCheck, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion";

type Step = { id: string; title: string; desc: string; deliverables: string[] };

const AUTO_ADVANCE_MS = 6000;

/* ── Step illustrations: lightweight, code-drawn, decorative ─────────────── */

function DiscoverArt() {
  const notes = ["bg-amber-200", "bg-amber-200", "bg-rose-200", "bg-emerald-200", "bg-violet-200", "bg-amber-100"];
  return (
    <div className="relative grid h-full grid-cols-3 gap-3 p-6">
      {notes.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
          transition={{ delay: i * 0.06 }}
          className={`${c} rounded-md p-3 shadow-md`}
        >
          <div className="mb-1.5 h-1.5 w-3/4 rounded bg-black/15" />
          <div className="mb-1.5 h-1.5 w-1/2 rounded bg-black/10" />
          <div className="h-1.5 w-2/3 rounded bg-black/10" />
        </motion.div>
      ))}
    </div>
  );
}

function PlanArt() {
  const nodes = [
    { label: "Web app", x: 12, y: 18 },
    { label: "Mobile", x: 12, y: 62 },
    { label: "API", x: 44, y: 40 },
    { label: "Database", x: 76, y: 18 },
    { label: "Queue", x: 76, y: 62 },
  ];
  const links = [[0, 2], [1, 2], [2, 3], [2, 4]];
  return (
    <div className="relative h-full">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x + 6} y1={nodes[a].y + 8} x2={nodes[b].x + 6} y2={nodes[b].y + 8}
            stroke="#fdae74" strokeWidth="0.6" strokeDasharray="2 1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={n.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.06 }}
          className={`absolute rounded-lg border px-3 py-2 text-xs font-bold shadow-md ${
            n.label === "API" ? "border-brand-500 bg-brand-600 text-white" : "border-slate-200 bg-white text-slate-700"
          }`}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          {n.label}
        </motion.div>
      ))}
    </div>
  );
}

function DesignArt() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="flex gap-1.5 border-b border-slate-100 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-slate-300" /><span className="h-2 w-2 rounded-full bg-slate-300" /><span className="h-2 w-2 rounded-full bg-slate-300" />
        </div>
        <div className="space-y-3 p-4">
          <div className="h-3 w-1/2 rounded bg-slate-800" />
          <div className="h-2 w-3/4 rounded bg-slate-200" />
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[0, 1, 2].map((i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.1 }} className="h-12 rounded-md bg-gradient-to-br from-amber-100 to-brand-200" />
            ))}
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div className="h-6 w-20 rounded-full bg-brand-600" />
            <motion.svg width="16" height="16" viewBox="0 0 24 24" className="text-slate-800" initial={{ x: 30, y: 10 }} animate={{ x: 0, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <path d="M4 2l16 9-7 2-3 7z" fill="currentColor" />
            </motion.svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildArt() {
  const lines = [
    ["text-violet-300", "export async function", "text-amber-300", " createOrder(input) {"],
    ["text-slate-400", "  const order = await", "text-emerald-300", " db.orders.insert(input);"],
    ["text-slate-400", "  await", "text-emerald-300", " payments.capture(order);"],
    ["text-slate-400", "  queue.publish(", "text-amber-300", "\"order.created\", order);"],
    ["text-violet-300", "  return", "text-amber-300", " order;"],
    ["text-slate-400", "}", "", ""],
  ];
  return (
    <div className="flex h-full items-center p-6">
      <div className="w-full overflow-hidden rounded-xl bg-slate-900 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-[0.65rem] text-slate-400">
          <span>orders.ts</span>
          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-300">CI passing</span>
        </div>
        <pre className="overflow-hidden p-4 font-mono text-[0.7rem] leading-6 sm:text-xs">
          {lines.map(([c1, t1, c2, t2], i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
              <span className="mr-3 text-slate-600">{i + 1}</span>
              <span className={c1}>{t1}</span>
              <span className={c2}>{t2}</span>
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  );
}

function TestArt() {
  const checks = ["Unit tests", "Integration tests", "End-to-end flows", "Load test", "Security scan"];
  return (
    <div className="flex h-full items-center gap-6 p-6">
      <div className="flex-1 space-y-2">
        {checks.map((c, i) => (
          <motion.div key={c} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white"><Check size={10} strokeWidth={3} /></span>
            {c}
          </motion.div>
        ))}
      </div>
      <div className="relative hidden h-28 w-28 shrink-0 sm:block">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
          <motion.circle cx="18" cy="18" r="15.5" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-slate-800">100%</span>
      </div>
    </div>
  );
}

function LaunchArt() {
  const stages = ["Build", "Test", "Deploy"];
  const points = "0,30 10,26 20,28 30,20 40,22 50,14 60,16 70,10 80,12 90,6 100,8";
  return (
    <div className="flex h-full flex-col justify-center gap-5 p-6">
      <div className="flex items-center gap-2">
        {stages.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2.5 text-xs font-bold text-slate-700 shadow-md">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />{s}
            </motion.div>
            {i < stages.length - 1 && <span className="text-slate-400">→</span>}
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white p-4 shadow-md">
        <div className="mb-2 flex justify-between text-[0.65rem] font-semibold text-slate-500">
          <span>Uptime</span><span className="text-emerald-600">Healthy</span>
        </div>
        <svg viewBox="0 0 100 34" className="h-16 w-full" preserveAspectRatio="none">
          <motion.polyline points={points} fill="none" stroke="#ea430c" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
        </svg>
      </div>
    </div>
  );
}

const ART: Record<string, () => React.ReactElement> = {
  discover: DiscoverArt,
  plan: PlanArt,
  design: DesignArt,
  build: BuildArt,
  test: TestArt,
  launch: LaunchArt,
};

/* ── Section ────────────────────────────────────────────────────────────── */

export function ProcessTimeline() {
  const t = useTranslations("services.workflow");
  const steps = t.raw("steps") as Step[];
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [userPicked, setUserPicked] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);

  // Mobile: the step list scrolls sideways; keep the active step in view (list only, not the page).
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>('[aria-selected="true"]')?.parentElement;
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tab.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  // Gently walk through the steps while the section is on screen, until the visitor picks one.
  useEffect(() => {
    if (!inView || userPicked || reduced) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % steps.length), AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [active, inView, userPicked, reduced, steps.length]);

  const pick = (i: number) => {
    setUserPicked(true);
    setActive(i);
  };

  const step = steps[active];
  const Art = ART[step.id] ?? DiscoverArt;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-20 md:py-24 hero-grid-bg">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-4 inline-flex rounded-full bg-gradient-to-r from-amber-300 to-amber-300 px-4 py-1.5 text-sm font-semibold text-slate-900">
            {t("badge")}
          </span>
          <p className="mb-3 text-lg font-bold text-slate-400 md:text-xl">{t("eyebrow")}</p>
          <h2 className="display-heading mb-5 text-3xl text-foreground sm:text-4xl md:text-5xl">{t("title")}</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{t("subtitle")}</p>
        </Reveal>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Timeline */}
          <div className="lg:col-span-5">
            <ol
              ref={listRef}
              role="tablist"
              aria-orientation="vertical"
              className="relative flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:block lg:space-y-2 lg:overflow-visible lg:pb-0"
            >
              {/* Rail */}
              <span className="absolute bottom-6 right-[1.375rem] top-6 hidden w-px bg-gradient-to-b from-amber-200 via-brand-300 to-amber-200 lg:block" aria-hidden />
              {steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="process-panel"
                      onClick={() => pick(i)}
                      className={`group relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors lg:py-5 lg:pr-16 ${
                        isActive ? "bg-brand-50 lg:bg-transparent" : "hover:bg-slate-50 lg:hover:bg-transparent"
                      }`}
                    >
                      <span className={`text-xs font-bold tabular-nums lg:hidden ${isActive ? "text-primary" : "text-slate-400"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`whitespace-nowrap text-base font-bold transition-colors lg:text-2xl ${
                          isActive ? "text-foreground" : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      >
                        {s.title}
                      </span>

                      {/* Rail marker (desktop) */}
                      {/* 44px box centred on the rail (rail sits 22px from the right edge) */}
                      <span className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center lg:flex" aria-hidden>
                        {isActive ? (
                          <motion.span
                            layoutId="process-marker"
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-brand-600 text-sm font-extrabold text-white shadow-lg shadow-brand-500/40 ring-4 ring-white"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </motion.span>
                        ) : (
                          <span className="h-3 w-3 rounded-full border-2 border-amber-300 bg-white transition-colors group-hover:border-brand-500" />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Active step */}
          <div className="lg:col-span-7">
            <div id="process-panel" role="tabpanel" className="rounded-3xl border border-amber-200 bg-white p-3 shadow-xl shadow-brand-900/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-amber-50 to-brand-100" aria-hidden>
                    <Art />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-800 shadow-sm">
                        <BadgeCheck size={16} className="text-amber-500" />
                        {t("stepLabel", { n: active + 1 })}
                      </span>
                      <h3 className="display-heading text-2xl text-foreground sm:text-3xl">{step.title}</h3>
                    </div>
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{step.desc}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="mr-1 text-xs font-bold uppercase tracking-wider text-slate-400">{t("deliverablesLabel")}</span>
                      {step.deliverables.map((d) => (
                        <span key={d} className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                          <Check size={12} strokeWidth={3} /> {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Auto-advance progress */}
                  {!userPicked && !reduced && inView && (
                    <motion.div
                      key={`bar-${active}`}
                      className="mx-4 mb-2 h-1 origin-left rounded-full bg-gradient-to-r from-amber-400 to-brand-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
