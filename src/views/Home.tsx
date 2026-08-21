"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
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
  Code2, Users, TrendingUp, Cloud, ShieldCheck, ShoppingCart,
  ArrowRight, Star, CheckCircle, Zap, Globe, Lock, Monitor, Palette, Tablet,
} from "lucide-react";

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

  const services = [
    {
      icon: Code2,
      title: "Custom Software",
      desc: "High-performance web & mobile apps built for scale.",
      tag: "Engineering",
    },
    {
      icon: Users,
      title: "Custom CRM Tools",
      desc: "Bespoke CRM systems that fit your exact workflow.",
      tag: "Product",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      desc: "Data-driven ads and comprehensive SEO growth.",
      tag: "Growth",
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      desc: "Scalable cloud setup and robust CI/CD pipelines.",
      tag: "DevOps",
    },
    {
      icon: ShieldCheck,
      title: "Cybersecurity",
      desc: "Enterprise-grade protection and 24/7 monitoring.",
      tag: "Security",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      desc: "End-to-end stores with seamless payment flows.",
      tag: "Commerce",
    },
  ];

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

  const testimonials = [
    { quote: "360CloudTech completely revamped our patient portal. It's faster, incredibly secure, and their support is always on.", name: "Dr. Sarah Jenkins", role: "CTO, MedCare Health", initials: "SJ" },
    { quote: "Having development and marketing under one roof changed everything. Our e-commerce saw a 40% increase in conversions.", name: "Marcus Chen", role: "Founder, Peak Retail", initials: "MC" },
    { quote: "Their cloud infrastructure setup is flawless. We haven't had a minute of downtime since migrating our booking engine.", name: "Elena Rodriguez", role: "VP Engineering, Global Travel", initials: "ER" },
  ];

  const trustedBy = ["HealthTech Corp", "Peak Retail", "Global Travel", "FinServe Group", "MedCare Health", "CloudFirst"];

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
              <span className="section-label shimmer mb-7 inline-flex">✦ Clean Code. Scalable Architecture. ✦</span>
            </Reveal>

            <div className="mb-7">
              <TextRevealParts
                as="h1"
                className="display-heading text-5xl md:text-6xl lg:text-7xl"
                delay={0.12}
                stagger={0.055}
                parts={[{ text: "We build the product." }]}
              />
              <TextRevealParts
                as="h1"
                className="display-heading text-5xl md:text-6xl lg:text-7xl"
                delay={0.32}
                stagger={0.055}
                parts={[
                  { text: "You build the" },
                  { text: "company.", className: "cursive-accent", style: { fontSize: "1.05em" } },
                ]}
              />
            </div>

            <Reveal delay={0.45} duration={0.65}>
              <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                We&apos;re the engineering team behind ambitious founders — shipping web apps, SaaS tools, and digital products on modern, maintainable technology.
              </p>
            </Reveal>

            <Reveal delay={0.55} duration={0.6}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 relative">
                <div className="absolute -left-4 sm:left-auto sm:-ml-56 top-10 sm:top-0 hidden sm:flex flex-col items-center" style={{ transform: "rotate(-8deg)" }}>
                  <svg width="48" height="36" viewBox="0 0 48 36" fill="none" className="text-foreground/25 mb-1">
                    <path d="M2 2 C10 14, 30 8, 44 22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M38 18 L44 22 L41 28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xs font-medium text-muted-foreground" style={{ fontFamily: "Caveat, cursive", fontSize: "0.85rem" }}>Schedule a free call now</span>
                </div>

                <Magnetic strength={12}>
                  <button
                    onClick={() => setOpen(true)}
                    className="btn-primary"
                    data-testid="hero-cta-get-started"
                  >
                    Book a Free Strategy Call
                  </button>
                </Magnetic>
                <Magnetic strength={12}>
                  <Link href="/services" className="btn-dark">
                    View services
                  </Link>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={0.65} duration={0.55}>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {[
                  { icon: CheckCircle, text: "No lock-in contracts" },
                  { icon: Lock, text: "SOC 2 Certified" },
                  { icon: Globe, text: "Global delivery" },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Icon size={13} className="text-primary" />{text}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </motion.div>
      </section>

      {/* ── TRUSTED BY ───────────────────────────────────── */}
      <section className="py-10 border-y border-border/60 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Trusted by industry leaders</p>
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

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
            <span className="section-label shimmer mb-5 inline-flex">Our Expertise</span>
            <h2 className="display-heading text-3xl md:text-5xl text-foreground mb-4">
              Everything you need<br />to <span className="cursive-accent">succeed online.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              From idea to a live, growing product — we handle every layer of the stack.
            </p>
          </Reveal>

          {/* Desktop / tablet circular ring */}
          <Reveal className="relative mx-auto hidden aspect-square w-full max-w-[480px] md:block lg:max-w-[520px]">
            <div className="service-ring-orbit absolute inset-[10%] rounded-full" aria-hidden />
            <div className="service-ring-orbit service-ring-orbit--mid absolute inset-[20%] rounded-full" aria-hidden />
            <div className="service-ring-orbit service-ring-orbit--inner absolute inset-[34%] rounded-full" aria-hidden />

            {/* Center hub */}
            <div className="service-ring-hub absolute left-1/2 top-1/2 z-10 flex w-[44%] max-w-[210px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-full px-5 py-8 text-center shadow-lg">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                <ActiveIcon className="h-5 w-5" />
              </div>
              <p className="mb-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-primary">
                {active.tag}
              </p>
              <h3 className="display-heading mb-1.5 text-base text-foreground lg:text-lg">
                {active.title}
              </h3>
              <p className="mb-3 text-[0.7rem] leading-relaxed text-muted-foreground lg:text-xs">
                {active.desc}
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-primary transition-transform hover:translate-x-0.5"
              >
                Explore <ArrowRight size={11} />
              </Link>
            </div>

            {/* Auto-rotating orbit */}
            <div
              className={`service-ring-spinner absolute inset-0 ${ringPaused || reduced ? "is-paused" : ""}`}
              onMouseEnter={() => setRingPaused(true)}
              onMouseLeave={() => setRingPaused(false)}
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
                      onMouseEnter={() => setActiveService(i)}
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

          {/* Mobile fallback list */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={i * 0.05}>
                  <Link
                    href="/services"
                    className="flex items-center gap-4 rounded-2xl border border-border/70 bg-white/70 p-4 transition-colors hover:border-primary/30"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
                        {service.tag}
                      </div>
                      <div className="font-bold text-foreground">{service.title}</div>
                      <p className="truncate text-sm text-muted-foreground">{service.desc}</p>
                    </div>
                    <ArrowRight size={16} className="shrink-0 text-primary" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ─────────────────────────────────── */}
      <section className="py-16 border-y border-border/60 bg-white/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "250+", label: "Projects Delivered" },
              { num: "99.9%", label: "Uptime Achieved" },
              { num: "50+", label: "Enterprise Clients" },
              { num: "10+", label: "Years Experience" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08} duration={0.5}>
                <div>
                  <Counter
                    value={stat.num}
                    className="display-heading text-4xl md:text-5xl text-foreground mb-1.5 block"
                  />
                  <div className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────── */}
      <section ref={whyRef} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div style={{ y: leftY }} className="parallax-layer">
              <Reveal>
                <span className="section-label shimmer mb-5 inline-flex">Why Choose Us</span>
                <h2 className="display-heading text-3xl md:text-5xl text-foreground mb-6">
                  One partner for your <br /><span className="cursive-accent">entire journey.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                  We become your long-term technology partner — helping you grow, adapt, and lead in your industry with confidence.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: Zap, title: "Fast Delivery", desc: "Agile sprints with weekly demos — see progress from day one." },
                    { icon: Lock, title: "Enterprise Security", desc: "SOC 2 compliant with HIPAA, GDPR and ISO 27001 standards." },
                    { icon: Globe, title: "Global Support", desc: "24/7 support team across multiple time zones." },
                    { icon: TrendingUp, title: "Measurable Results", desc: "Data-backed KPIs and transparent reporting every step." },
                  ].map(({ icon: Icon, title, desc }, i) => (
                    <Reveal key={i} delay={i * 0.06} duration={0.5} direction="left">
                      <div className="flex gap-4">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon size={16} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-foreground text-sm mb-0.5">{title}</div>
                          <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </motion.div>

            <motion.div style={{ y: rightY }} className="grid grid-cols-2 gap-3 parallax-layer">
              {[
                { bg: "#1a1512", value: "40+", label: "Industries", sub: "sectors served" },
                { bg: "#e8521a", value: "250+", label: "Projects", sub: "delivered" },
                { bg: "#2d2620", value: "99.9%", label: "Uptime", sub: "SLA guaranteed" },
                { bg: "#3d1a0a", value: "24/7", label: "Support", sub: "always available" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.08} duration={0.55}>
                  <motion.div
                    className="rounded-2xl p-6 text-white gradient-border"
                    style={{ backgroundColor: item.bg }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Counter value={item.value} className="display-heading text-3xl mb-1 block" />
                    <div className="font-bold text-sm mb-0.5">{item.label}</div>
                    <div className="text-white/45 text-xs">{item.sub}</div>
                  </motion.div>
                </Reveal>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-24 bg-white/40 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label shimmer mb-5 inline-flex">Testimonials</span>
            <h2 className="display-heading text-3xl md:text-5xl text-foreground">
              Trusted by <span className="cursive-accent">industry leaders.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1} duration={0.6} scale>
                <Spotlight className="premium-card gradient-border rounded-2xl p-6 flex flex-col h-full overflow-hidden">
                  <div className="flex gap-0.5 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
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
                  Ready to start?
                </span>
                <h2 className="display-heading text-4xl md:text-6xl text-white mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
                  Let&apos;s build something<br />
                  <span className="cursive-accent" style={{ color: "#ffd9c2" }}>amazing together.</span>
                </h2>
                <p className="text-white/70 text-base mb-10 max-w-md mx-auto">
                  Free consultation, no commitment. Just a friendly conversation about your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Magnetic strength={12}>
                    <button
                      onClick={() => setOpen(true)}
                      className="btn-primary"
                    >
                      Book a Free Call <ArrowRight size={16} />
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
                      Send a Message
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
