"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import {
  Reveal,
  TextRevealParts,
  Counter,
  Marquee,
  Magnetic,
  Aurora,
  Spotlight,
} from "@/components/motion";
import {
  Code2, Users, TrendingUp, Cloud, ShoppingCart,
  ArrowRight, Star, CheckCircle, Zap, Globe, Lock, Monitor, Palette, Tablet,
} from "lucide-react";
import { DISCIPLINE_KEYS, disciplineIcons } from "@/lib/services-data";

const EXPERTISE_SERVICE_KEYS = [
  "customSoftware",
  "customCrm",
  "digitalMarketing",
  "cloudInfrastructure",
  "ecommerce",
] as const;

const EXPERTISE_ICONS = [Code2, Users, TrendingUp, Cloud, ShoppingCart];

const WHY_CHOOSE_FEATURE_KEYS = [
  "fastDelivery",
  "enterpriseSecurity",
  "globalSupport",
  "measurableResults",
] as const;

const WHY_CHOOSE_ICONS = [Zap, Lock, Globe, TrendingUp];

const WHY_CHOOSE_CARD_KEYS = ["industries", "projects", "uptime", "support"] as const;

const STAT_KEYS = ["projectsDelivered", "uptime", "enterpriseClients", "yearsExperience"] as const;

const TRUST_ITEM_KEYS = ["noLockIn", "soc2", "globalDelivery"] as const;
const TRUST_ICONS = [CheckCircle, Lock, Globe];

function FloatingIcon({
  className,
  parallaxY,
  floatRange,
  duration,
  delay = 0,
  children,
}: {
  className: string;
  parallaxY: ReturnType<typeof useTransform<number, number>>;
  floatRange: number;
  duration: number;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div className={`${className} parallax-layer`} style={{ y: parallaxY }}>
      <motion.div
        className="w-full h-full rounded-2xl premium-card flex items-center justify-center"
        animate={{ y: [0, floatRange, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const { setOpen } = useScheduleMeeting();
  const reduced = useReducedMotion();
  const t = useTranslations("home");
  const tServices = useTranslations("services.disciplines");
  const tCommon = useTranslations("common");
  const heroRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: whyProgress } = useScroll({
    target: whyRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "center center"],
  });

  const contentY = useTransform(heroProgress, [0, 1], [0, reduced ? 0 : -120]);
  const contentOpacity = useTransform(heroProgress, [0, 0.7], [1, reduced ? 1 : 0]);
  const glowY = useTransform(heroProgress, [0, 1], [0, reduced ? 0 : -60]);
  const icon1Y = useTransform(heroProgress, [0, 1], [0, reduced ? 0 : -180]);
  const icon2Y = useTransform(heroProgress, [0, 1], [0, reduced ? 0 : -100]);
  const icon3Y = useTransform(heroProgress, [0, 1], [0, reduced ? 0 : -220]);
  const icon4Y = useTransform(heroProgress, [0, 1], [0, reduced ? 0 : -140]);

  const leftY = useTransform(whyProgress, [0, 1], [reduced ? 0 : 40, reduced ? 0 : -40]);
  const rightY = useTransform(whyProgress, [0, 1], [reduced ? 0 : -30, reduced ? 0 : 50]);

  const ctaScale = useTransform(ctaProgress, [0, 0.55], [reduced ? 1 : 0.96, 1]);
  const ctaGlowOpacity = useTransform(ctaProgress, [0, 0.6], [reduced ? 0.18 : 0.06, 0.22]);

  const services = useMemo(
    () =>
      EXPERTISE_SERVICE_KEYS.map((key, i) => ({
        icon: EXPERTISE_ICONS[i],
        title: t(`expertise.services.${key}.title`),
        desc: t(`expertise.services.${key}.desc`),
        tag: t(`expertise.services.${key}.tag`),
      })),
    [t],
  );

  const whatWeDo = useMemo(
    () =>
      DISCIPLINE_KEYS.map((key) => ({
        icon: disciplineIcons[key],
        title: tServices(`${key}.title`),
        desc: tServices(`${key}.summary`),
      })),
    [tServices],
  );

  const testimonials = t.raw("testimonials.items") as {
    quote: string;
    name: string;
    role: string;
    initials: string;
  }[];

  const trustedBy = t.raw("trustedBy.companies") as string[];

  const [activeService, setActiveService] = useState(0);
  const [ringPaused, setRingPaused] = useState(false);
  const active = services[activeService];
  const ActiveIcon = active.icon;

  useEffect(() => {
    if (reduced || ringPaused) return;
    const id = window.setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduced, ringPaused, services.length]);

  return (
    <div data-testid="home-page">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden hero-grid-bg"
      >
        <Aurora />

        <motion.div
          className="absolute inset-x-0 top-0 h-72 opacity-60 parallax-layer"
          style={{
            y: glowY,
            background: "radial-gradient(ellipse 60% 60% at 50% -5%, rgba(232,82,26,0.12) 0%, transparent 70%)",
          }}
        />

        {!reduced && (
          <>
            <FloatingIcon
              className="absolute left-[8%] top-[38%] w-14 h-14"
              parallaxY={icon1Y}
              floatRange={-12}
              duration={5}
            >
              <Palette size={22} className="text-primary" />
            </FloatingIcon>
            <FloatingIcon
              className="absolute right-[7%] top-[32%] w-14 h-14"
              parallaxY={icon2Y}
              floatRange={14}
              duration={6}
              delay={0.5}
            >
              <Monitor size={22} className="text-foreground/50" />
            </FloatingIcon>
            <FloatingIcon
              className="absolute left-[14%] top-[60%] w-12 h-12"
              parallaxY={icon3Y}
              floatRange={10}
              duration={7}
              delay={1}
            >
              <Code2 size={18} className="text-foreground/40" />
            </FloatingIcon>
            <FloatingIcon
              className="absolute right-[13%] top-[58%] w-12 h-12"
              parallaxY={icon4Y}
              floatRange={-10}
              duration={5.5}
              delay={0.8}
            >
              <Tablet size={18} className="text-foreground/40" />
            </FloatingIcon>
          </>
        )}

        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <Reveal delay={0} duration={0.5}>
              <span className="section-label shimmer mb-7 inline-flex">{t("hero.label")}</span>
            </Reveal>

            <div className="mb-7">
              <TextRevealParts
                as="h1"
                className="display-heading text-5xl md:text-6xl lg:text-7xl"
                delay={0.12}
                stagger={0.055}
                parts={[{ text: t("hero.titleLine1") }]}
              />
              <TextRevealParts
                as="h1"
                className="display-heading text-5xl md:text-6xl lg:text-7xl"
                delay={0.32}
                stagger={0.055}
                parts={[
                  { text: t("hero.titleLine2a") },
                  { text: t("hero.titleLine2b"), className: "cursive-accent", style: { fontSize: "1.05em" } },
                ]}
              />
            </div>

            <Reveal delay={0.45} duration={0.65}>
              <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </Reveal>

            <Reveal delay={0.55} duration={0.6}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 relative">
                <div className="absolute -left-4 sm:left-auto sm:-ml-56 top-10 sm:top-0 hidden sm:flex flex-col items-center" style={{ transform: "rotate(-8deg)" }}>
                  <svg width="48" height="36" viewBox="0 0 48 36" fill="none" className="text-foreground/25 mb-1">
                    <path d="M2 2 C10 14, 30 8, 44 22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M38 18 L44 22 L41 28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xs font-medium text-muted-foreground" style={{ fontFamily: "Caveat, cursive", fontSize: "0.85rem" }}>{tCommon("heroAnnotation")}</span>
                </div>

                <Magnetic strength={12}>
                  <button
                    onClick={() => setOpen(true)}
                    className="btn-primary"
                    data-testid="hero-cta-get-started"
                  >
                    {tCommon("ctas.bookFreeStrategyCall")}
                  </button>
                </Magnetic>
                <Magnetic strength={12}>
                  <Link href="/services" className="btn-dark">
                    {tCommon("ctas.viewServices")}
                  </Link>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={0.65} duration={0.55}>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {TRUST_ITEM_KEYS.map((key, i) => {
                  const Icon = TRUST_ICONS[i];
                  return (
                    <div key={key} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Icon size={13} className="text-primary" />{t(`hero.trustItems.${key}`)}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </motion.div>
      </section>

      {/* ── TRUSTED BY ───────────────────────────────────── */}
      <section className="py-10 border-y border-border/60 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">{t("trustedBy.label")}</p>
          <Marquee speed={35} gap="3.5rem">
            {trustedBy.map((name, i) => (
              <span
                key={i}
                className="text-sm font-bold text-foreground/25 hover:text-foreground/50 transition-colors tracking-wide select-none whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────── */}
      <section className="py-24 bg-[#fcfbf9] border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
            <Reveal className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary mb-5">
                {t("whatWeDo.label")}
              </p>
              <h2 className="display-heading text-3xl md:text-4xl lg:text-[2.65rem] text-foreground mb-6 leading-[1.12]">
                {t("whatWeDo.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base max-w-md">
                {t("whatWeDo.subtitle")}
              </p>
            </Reveal>

            <div className="border-t border-border/70">
              {whatWeDo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={i * 0.06} duration={0.5}>
                    <div className="flex gap-5 py-7 border-b border-border/70">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-border/60 shadow-sm">
                        <Icon size={18} className="text-foreground/55" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <h3 className="font-bold text-foreground text-base mb-1.5">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
            <span className="section-label shimmer mb-5 inline-flex">{t("expertise.label")}</span>
            <h2 className="display-heading text-3xl md:text-5xl text-foreground mb-4">
              {t("expertise.titleLine1")}<br />to <span className="cursive-accent">{t("expertise.titleLine2")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {t("expertise.subtitle")}
            </p>
          </Reveal>

          {/* Circular service ring — all breakpoints */}
          <Reveal className="relative mx-auto aspect-square w-full max-w-[240px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[520px]">
            <div className="service-ring-orbit absolute inset-[10%] rounded-full" aria-hidden />
            <div className="service-ring-orbit service-ring-orbit--mid absolute inset-[20%] rounded-full" aria-hidden />
            <div className="service-ring-orbit service-ring-orbit--inner absolute inset-[34%] rounded-full" aria-hidden />

            {/* Center hub */}
            <div className="service-ring-hub absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center shadow-lg">
              <div className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white sm:mb-3 sm:h-11 sm:w-11">
                <ActiveIcon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              </div>
              <p className="mb-0.5 text-[0.45rem] font-bold uppercase tracking-[0.12em] text-primary sm:mb-1 sm:text-[0.6rem] sm:tracking-[0.16em]">
                {active.tag}
              </p>
              <h3 className="display-heading mb-0.5 line-clamp-2 text-[0.65rem] leading-tight text-foreground sm:mb-1.5 sm:text-base lg:text-lg">
                {active.title}
              </h3>
              <p className="mb-1 hidden line-clamp-2 text-[0.7rem] leading-relaxed text-muted-foreground sm:mb-3 sm:block lg:text-xs">
                {active.desc}
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-0.5 text-[0.55rem] font-bold text-primary transition-transform hover:translate-x-0.5 sm:gap-1 sm:text-[0.7rem]"
              >
                {tCommon("ctas.explore")} <ArrowRight size={9} className="sm:hidden" />
                <ArrowRight size={11} className="hidden sm:block" />
              </Link>
            </div>

            {/* Auto-rotating orbit */}
            <div
              className={`service-ring-spinner absolute inset-0 ${ringPaused || reduced ? "is-paused" : ""}`}
              onMouseEnter={() => setRingPaused(true)}
              onMouseLeave={() => setRingPaused(false)}
              onTouchStart={() => setRingPaused(true)}
              onTouchEnd={() => setRingPaused(false)}
            >
              {services.map((service, i) => {
                const angle = (360 / services.length) * i - 90;
                const isActive = i === activeService;
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="service-ring-slot absolute left-1/2 top-1/2"
                    style={{ ["--ring-angle" as string]: `${angle}deg` }}
                  >
                    <button
                      type="button"
                      onPointerEnter={() => setActiveService(i)}
                      onFocus={() => {
                        setRingPaused(true);
                        setActiveService(i);
                      }}
                      onBlur={() => setRingPaused(false)}
                      onClick={() => setActiveService(i)}
                      className={`service-ring-node group ${isActive ? "is-active" : ""}`}
                      aria-pressed={isActive}
                      aria-label={service.title}
                    >
                      <span className="service-ring-bubble">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="service-ring-label">{service.title}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BANNER ─────────────────────────────────── */}
      {/* <section className="py-16 border-y border-border/60 bg-white/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STAT_KEYS.map((key, i) => (
              <Reveal key={key} delay={i * 0.08} duration={0.5}>
                <div>
                  <Counter
                    value={t(`stats.${key}.value`)}
                    className="display-heading text-4xl md:text-5xl text-foreground mb-1.5 block"
                  />
                  <div className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">{t(`stats.${key}.label`)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── WHY CHOOSE US ────────────────────────────────── */}
      <section ref={whyRef} className="py-24 bg-white/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div style={{ y: leftY }} className="parallax-layer">
              <Reveal>
                <span className="section-label shimmer mb-5 inline-flex">{t("whyChooseUs.label")}</span>
                <h2 className="display-heading text-3xl md:text-5xl text-foreground mb-6">
                  {t("whyChooseUs.titleLine1")} <br /><span className="cursive-accent">{t("whyChooseUs.titleLine2")}</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                  {t("whyChooseUs.subtitle")}
                </p>
                <div className="space-y-5">
                  {WHY_CHOOSE_FEATURE_KEYS.map((key, i) => {
                    const Icon = WHY_CHOOSE_ICONS[i];
                    return (
                      <Reveal key={key} delay={i * 0.06} duration={0.5} direction="left">
                        <div className="flex gap-4">
                          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon size={16} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-bold text-foreground text-sm mb-0.5">{t(`whyChooseUs.features.${key}.title`)}</div>
                            <div className="text-sm text-muted-foreground leading-relaxed">{t(`whyChooseUs.features.${key}.desc`)}</div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </Reveal>
            </motion.div>

            <motion.div style={{ y: rightY }} className="grid grid-cols-2 gap-3 parallax-layer">
              {WHY_CHOOSE_CARD_KEYS.map((key, i) => {
                const cardColors = ["#1a1512", "#e8521a", "#2d2620", "#3d1a0a"];
                return (
                  <Reveal key={key} delay={i * 0.08} duration={0.55}>
                    <motion.div
                      className="rounded-2xl p-6 text-white gradient-border"
                      style={{ backgroundColor: cardColors[i] }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Counter value={t(`whyChooseUs.cards.${key}.value`)} className="display-heading text-3xl mb-1 block" />
                      <div className="font-bold text-sm mb-0.5">{t(`whyChooseUs.cards.${key}.label`)}</div>
                      <div className="text-white/45 text-xs">{t(`whyChooseUs.cards.${key}.sub`)}</div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-24 bg-white/40 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label shimmer mb-5 inline-flex">{t("testimonials.label")}</span>
            <h2 className="display-heading text-3xl md:text-5xl text-foreground">
              {t("testimonials.titleLine1")} <span className="cursive-accent">{t("testimonials.titleLine2")}</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((item, i) => (
              <Reveal key={i} delay={i * 0.1} duration={0.6} scale>
                <Spotlight className="premium-card gradient-border rounded-2xl p-6 flex flex-col h-full overflow-hidden">
                  <div className="flex gap-0.5 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-1">&ldquo;{item.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {item.initials}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.role}</div>
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ctaRef}
            className="cta-stage rounded-3xl overflow-hidden text-center px-8 py-24 md:py-28 relative"
            style={{ scale: ctaScale }}
          >
            <motion.div className="cta-bloom" style={{ opacity: ctaGlowOpacity }} />
            <div className="relative z-10">
              <Reveal>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full border backdrop-blur-sm" style={{ color: "rgba(255,255,255,0.72)", borderColor: "rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.06)" }}>
                  {t("cta.label")}
                </span>
                <h2 className="display-heading text-4xl md:text-6xl text-white mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
                  {t("cta.titleLine1")}<br />
                  <span className="cursive-accent" style={{ color: "#ffd9c2" }}>{t("cta.titleLine2")}</span>
                </h2>
                <p className="text-white/70 text-base mb-10 max-w-md mx-auto">
                  {t("cta.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Magnetic strength={12}>
                    <button
                      onClick={() => setOpen(true)}
                      className="btn-primary"
                    >
                      {tCommon("ctas.bookFreeCall")} <ArrowRight size={16} />
                    </button>
                  </Magnetic>
                  <Magnetic strength={12}>
                    <Link
                      href="/contact"
                      className="btn-outline backdrop-blur-sm"
                      style={{
                        color: "rgba(255,255,255,0.92)",
                        borderColor: "rgba(255,255,255,0.32)",
                        background: "rgba(255,255,255,0.07)",
                      }}
                    >
                      {tCommon("ctas.sendMessage")}
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
