"use client";

import { useState, useRef, useMemo } from "react";
import { Link } from "@/i18n/routing";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import {
  Reveal,
  Counter,
  Marquee,
  Magnetic,
  Spotlight,
} from "@/components/motion";
import {
  Code2, Users, TrendingUp, Cloud, ArrowRight, Star, CheckCircle2,
  Zap, Globe, Lock, ShieldCheck, Cpu, Smartphone, Database, Server,
  Layers, Bot, Wrench, Activity, ChevronRight, ChevronDown, Check,
  Building2, Briefcase, Landmark, Factory, Truck, ShoppingBag, Home as HomeIcon,
  Sparkles, Laptop, CheckCircle, Phone, Mail, Send
} from "lucide-react";
import { SERVICE_SLUGS } from "@/lib/service-catalog";
import { TECH_ICONS } from "@/lib/tech-icons";
import { submitLead } from "@/lib/submit-lead";
import { ServiceCardGrid } from "@/components/ServiceCardGrid";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { IndustryShowcase } from "@/components/IndustryShowcase";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import {
  SoftwareIntro,
  SolutionsGrid,
  IndustryFocus,
  EngagementModels,
  CostGuide,
  ChoosePartner,
} from "@/components/HomeSeoSections";
import { toast } from "sonner";


// Outcome icon mapping helper
const OUTCOME_ICONS = [
  CheckCircle2,
  Activity,
  Users,
  Layers,
  Lock,
  TrendingUp,
];

export default function Home() {
  const { setOpen } = useScheduleMeeting();
  const reduced = useReducedMotion();
  const t = useTranslations("home");
  const tServices = useTranslations("services.catalog");
  const tCommon = useTranslations("common");

  // State hooks for interactive sections
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [activeTechCategory, setActiveTechCategory] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Hero Form State
  const emptyQuote = { name: "", phone: "", email: "", service: "" };
  const [formData, setFormData] = useState(emptyQuote);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick newsletter / footer lead capture
  const [quickEmail, setQuickEmail] = useState("");
  const [quickName, setQuickName] = useState("");
  const [isSubmittingQuick, setIsSubmittingQuick] = useState(false);


  // Handle Hero Quote Submission (API requires name, email, phone ≥10, service, message ≥10)
  const handleHeroFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || formData.phone.length < 10 || !formData.service) {
      toast.error(t("hero.form.missingFields"));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitLead({
        formType: "contact",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: t("hero.form.serviceMessage", { service: formData.service }),
        source: "Homepage Hero Quote Bar",
      });

      if (res.success) {
        toast.success(t("hero.form.successMessage"));
        setFormData(emptyQuote);
      } else {
        toast.error(res.error || "Submission failed. Please try again.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Quick Email Submission
  const handleQuickEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quickName.trim().length < 2 || !quickEmail.includes("@")) {
      toast.error(t("finalConversion.missingFields"));
      return;
    }

    setIsSubmittingQuick(true);
    try {
      const res = await submitLead({
        formType: "schedule-meeting",
        name: quickName.trim(),
        email: quickEmail,
        service: t("finalConversion.service"),
        message: t("finalConversion.message"),
        source: "Homepage Bottom Quick CTA",
      });

      if (res.success) {
        toast.success("Thank you! We will reach out shortly to schedule your call.");
        setQuickEmail("");
        setQuickName("");
      } else {
        toast.error(res.error || "Submission failed.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmittingQuick(false);
    }
  };

  // Parse structured data safely from translations
  const checkpoints = useMemo(() => {
    try {
      return (t.raw("hero.checkpoints") as string[]) || [];
    } catch {
      return [];
    }
  }, [t]);

  const clientLogos = useMemo(() => {
    try {
      return (t.raw("trustedClients.clients") as { name: string; category: string }[]) || [];
    } catch {
      return [];
    }
  }, [t]);

  const metrics = useMemo(() => {
    try {
      return (
        (t.raw("valueProposition.metrics") as {
          id: string;
          value: string;
          title: string;
          desc: string;
        }[]) || []
      );
    } catch {
      return [];
    }
  }, [t]);

  const testimonials = useMemo(() => {
    try {
      return (
        (t.raw("testimonials.items") as {
          quote: string;
          name: string;
          role: string;
          company: string;
          initials: string;
          rating: number;
        }[]) || []
      );
    } catch {
      return [];
    }
  }, [t]);

  const painPointCards = useMemo(() => {
    try {
      return (
        (t.raw("painPoints.cards") as {
          number: string;
          title: string;
          tagline: string;
          bullets: string[];
        }[]) || []
      );
    } catch {
      return [];
    }
  }, [t]);

  const caseStudies = useMemo(() => {
    try {
      return (
        (t.raw("caseStudySpotlight.studies") as {
          id: string;
          tabName: string;
          title: string;
          subtitle: string;
          challenge: string;
          solution: string;
          metrics: { value: string; label: string }[];
          tags: string[];
        }[]) || []
      );
    } catch {
      return [];
    }
  }, [t]);

  const techCategories = useMemo(() => {
    try {
      return (
        (t.raw("techStack.categories") as {
          id: string;
          name: string;
          items: { name: string; icon: string; category: string }[];
        }[]) || []
      );
    } catch {
      return [];
    }
  }, [t]);

  const whyChooseCards = useMemo(() => {
    try {
      return (
        (t.raw("whyChooseUs.cards") as {
          id: string;
          title: string;
          desc: string;
        }[]) || []
      );
    } catch {
      return [];
    }
  }, [t]);

  const faqItems = useMemo(() => {
    try {
      return (
        (t.raw("faqs.items") as {
          q: string;
          a: string;
        }[]) || []
      );
    } catch {
      return [];
    }
  }, [t]);

  const guarantees = useMemo(() => {
    try {
      return (t.raw("guarantees.items") as { value: string; label: string }[]) || [];
    } catch {
      return [];
    }
  }, [t]);

  const outcomes = useMemo(() => {
    try {
      return (t.raw("outcomes.items") as { title: string; desc: string }[]) || [];
    } catch {
      return [];
    }
  }, [t]);

  const quickStartSteps = useMemo(() => {
    try {
      return (
        (t.raw("quickStart.steps") as {
          when: string;
          title: string;
          desc: string;
        }[]) || []
      );
    } catch {
      return [];
    }
  }, [t]);

  const finalChecklist = useMemo(() => {
    try {
      return (t.raw("finalConversion.checklist") as string[]) || [];
    } catch {
      return [];
    }
  }, [t]);

  const activeStudy = caseStudies[activeCaseStudy] || caseStudies[0];
  const activeTech = techCategories[activeTechCategory] || techCategories[0];

  return (
    <div data-testid="home-page" className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          1. HERO: FULL-BLEED VISUAL, CENTRED HEADLINE, INLINE QUOTE BAR
      ══════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden pb-28 pt-28 md:pt-48">
        <HeroBackdrop />

        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <Reveal delay={0} duration={0.5}>
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-brand-700 shadow-sm backdrop-blur sm:text-xs sm:tracking-[0.14em]">
              <Sparkles size={14} />
              {t("hero.badge")}
            </span>
          </Reveal>

          <Reveal delay={0.08} duration={0.6}>
            <h1 className="display-heading mx-auto max-w-5xl text-4xl leading-[1.04] text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
              {t("hero.titlePrefix")}{" "}
              <span className="bg-gradient-to-r from-amber-500 via-brand-500 to-brand-600 bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16} duration={0.6}>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {t("hero.subtitle")}
            </p>
          </Reveal>

          {/* Inline quote bar */}
          <Reveal delay={0.24} duration={0.6}>
            <form
              onSubmit={handleHeroFormSubmit}
              className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-2.5 rounded-3xl bg-white p-3 text-left shadow-2xl shadow-brand-900/10 ring-1 ring-slate-200/80 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.15fr_auto]"
            >
              {[
                { key: "name", type: "text", icon: Users, auto: "name" },
                { key: "phone", type: "tel", icon: Phone, auto: "tel" },
                { key: "email", type: "email", icon: Mail, auto: "email" },
              ].map(({ key, type, icon: Icon, auto }) => (
                <label key={key} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3.5 transition-colors focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
                  <Icon size={18} className="shrink-0 text-brand-600" />
                  <span className="sr-only">{t(`hero.form.${key}Placeholder`)}</span>
                  <input
                    type={type}
                    required
                    autoComplete={auto}
                    value={formData[key as "name" | "phone" | "email"]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    placeholder={t(`hero.form.${key}Placeholder`)}
                    className="w-full bg-transparent text-[0.95rem] text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </label>
              ))}
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3.5 transition-colors focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
                <Layers size={18} className="shrink-0 text-brand-600" />
                <span className="sr-only">{t("hero.form.servicePlaceholder")}</span>
                <select
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className={`w-full bg-transparent text-[0.95rem] focus:outline-none ${formData.service ? "text-slate-900" : "text-slate-400"}`}
                >
                  <option value="">{t("hero.form.servicePlaceholder")}</option>
                  {SERVICE_SLUGS.map((slug) => (
                    <option key={slug} value={tServices(`items.${slug}.title`)}>
                      {tServices(`items.${slug}.title`)}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-[0.95rem] font-bold text-white shadow-lg shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 sm:col-span-2 lg:col-span-1"
              >
                <Send size={17} />
                {isSubmitting ? t("hero.form.submittingButton") : t("hero.form.submitButton")}
              </button>
            </form>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <Lock size={12} />
              {t("hero.form.trustLine")}
            </p>
          </Reveal>

          {/* Proof row */}
          <Reveal delay={0.32} duration={0.6}>
            <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="flex text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="fill-amber-500" />
                  ))}
                </span>
                <strong className="text-slate-900">{t("hero.ratings.clutch.score")}</strong> {t("hero.proof.clutch")}
              </li>
              <li className="flex items-center gap-2">
                <Star size={14} className="fill-amber-500 text-amber-500" />
                <strong className="text-slate-900">{t("hero.ratings.google.score")}</strong> {t("hero.proof.google")}
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-brand-500" />
                {t("hero.proof.nda")}
              </li>
              <li className="flex items-center gap-2">
                <Zap size={15} className="text-brand-500" />
                {t("hero.proof.reply")}
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Wave into the next section */}
        <svg className="absolute inset-x-0 bottom-[-1px] h-16 w-full text-slate-50 md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
          <path fill="currentColor" d="M0,64 C240,120 480,8 720,40 C960,72 1200,112 1440,48 L1440,120 L0,120 Z" />
        </svg>
      </section>

      {/* ══════════════════════════════════════════════════════════
          1b. DELIVERY GUARANTEES STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="border-y border-border bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 max-w-7xl mx-auto divide-x divide-border">
            {guarantees.map((g, i) => (
              <div key={i} className="px-4 py-6 text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  {g.value}
                </div>
                <div className="text-[0.7rem] sm:text-xs text-muted-foreground mt-1 leading-snug">
                  {g.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. VALUED CLIENTS LOGOS & SOCIAL PROOF BAR
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 border-b border-border bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-5 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">
                Valued Partnerships
              </span>
              <h2 className="font-bold text-lg sm:text-xl text-foreground mb-3">
                {t("trustedClients.title")}
              </h2>
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
              >
                {t("trustedClients.cta")}
              </button>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {clientLogos.map((client, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-background/60 border border-border/60 flex flex-col items-center justify-center text-center hover:border-primary/40 transition-colors"
                  >
                    <span className="font-extrabold text-foreground/80 text-sm tracking-wide">
                      {client.name}
                    </span>
                    <span className="text-[0.65rem] text-muted-foreground mt-0.5">
                      {client.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2b. WHAT CUSTOM SOFTWARE IS & WHO IT'S FOR
      ══════════════════════════════════════════════════════════ */}
      <SoftwareIntro />

      {/* ══════════════════════════════════════════════════════════
          3. VALUE PROPOSITION: 100% FOCUS, 0% DISRUPTION + METRICS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("valueProposition.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("valueProposition.heading")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              {t("valueProposition.subheading")}
            </p>
          </Reveal>

          {/* 4 High-Impact Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {metrics.map((metric, i) => (
              <Reveal key={metric.id || i} delay={i * 0.1} duration={0.5}>
                <div className="p-6 rounded-2xl bg-white/90 border border-border/80 shadow-sm hover:shadow-md hover:border-primary/40 transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="display-heading text-3xl font-extrabold text-primary">
                        {metric.value}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Zap size={15} />
                      </div>
                    </div>
                    <h3 className="font-bold text-foreground text-base mb-2">
                      {metric.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {metric.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. CLIENT TESTIMONIALS MASONRY GRID
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("testimonials.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("testimonials.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              {t("testimonials.subtitle")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((item, i) => (
              <Reveal key={i} delay={i * 0.08} duration={0.55}>
                <Spotlight className="premium-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full bg-white/90 border border-border/80 shadow-sm">
                  <div>
                    <div className="flex gap-1 mb-4 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} className="fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <div className="w-10 h-10 rounded-full bg-foreground text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.role} • {item.company}</p>
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Magnetic strength={10}>
              <button
                onClick={() => setOpen(true)}
                className="btn-primary"
              >
                {t("testimonials.cta")}
              </button>
            </Magnetic>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. PAIN POINTS / FRICTION OVERHAUL SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("painPoints.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("painPoints.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("painPoints.subtitle")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {painPointCards.map((card, i) => (
              <Reveal key={i} delay={i * 0.15} duration={0.6}>
                <div className="rounded-2xl p-7 sm:p-8 bg-white border border-border/80 shadow-sm hover:shadow-md transition-all h-full">
                  <span className="text-xs font-extrabold text-primary tracking-widest block mb-2">
                    CHALLENGE {card.number}
                  </span>
                  <h3 className="font-bold text-xl text-foreground mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-6 font-medium">
                    {card.tagline}
                  </p>

                  <ul className="space-y-3.5">
                    {card.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <div className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          ✕
                        </div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Callout Action Banner */}
          <Reveal className="max-w-4xl mx-auto">
            <div className="p-8 sm:p-10 rounded-2xl bg-foreground text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="max-w-xl text-left">
                <p className="font-bold text-lg sm:text-xl text-white mb-2 leading-snug">
                  {t("painPoints.callout.title")}
                </p>
                <p className="text-xs sm:text-sm text-white/70">
                  Book a free technical feasibility audit to uncover quick optimization wins.
                </p>
              </div>
              <Magnetic strength={10}>
                <button
                  onClick={() => setOpen(true)}
                  className="btn-primary whitespace-nowrap shrink-0"
                >
                  {t("painPoints.callout.cta")}
                </button>
              </Magnetic>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5b. OUTCOMES: WHAT YOU GET
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("outcomes.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("outcomes.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("outcomes.subtitle")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border max-w-6xl mx-auto">
            {outcomes.map((item, idx) => {
              const Icon = OUTCOME_ICONS[idx % OUTCOME_ICONS.length];
              return (
                <div key={idx} className="bg-white p-7 text-left">
                  <Icon size={20} className="text-primary mb-4" />
                  <h3 className="font-bold text-base text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. CASE STUDY SPOTLIGHT WITH INTERACTIVE TABS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("caseStudySpotlight.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("caseStudySpotlight.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("caseStudySpotlight.subtitle")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
            
            {/* Left Tabs List (4 Cols) */}
            <div className="lg:col-span-4 space-y-2">
              {caseStudies.map((study, idx) => (
                <button
                  key={study.id || idx}
                  onClick={() => setActiveCaseStudy(idx)}
                  className={`w-full text-left p-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-between cursor-pointer border ${
                    activeCaseStudy === idx
                      ? "bg-white text-primary border-primary/30 shadow-md translate-x-1"
                      : "bg-background/80 text-foreground/70 border-border/60 hover:bg-white/60"
                  }`}
                >
                  <span>{study.tabName}</span>
                  <ChevronRight size={16} className={activeCaseStudy === idx ? "text-primary" : "text-muted-foreground/50"} />
                </button>
              ))}
            </div>

            {/* Right Active Case Study Details (8 Cols) */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {activeStudy && (
                  <motion.div
                    key={activeStudy.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                    className="bg-white rounded-3xl p-7 sm:p-9 border border-border shadow-lg"
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activeStudy.tags?.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-md bg-primary/10 text-primary font-bold text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="display-heading text-2xl sm:text-3xl text-foreground mb-3">
                      {activeStudy.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {activeStudy.subtitle}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-background border border-border/60">
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wide block mb-1">
                          The Challenge
                        </span>
                        <p className="text-xs text-foreground/80 leading-relaxed">
                          {activeStudy.challenge}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-background border border-border/60">
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide block mb-1">
                          Our Engineered Solution
                        </span>
                        <p className="text-xs text-foreground/80 leading-relaxed">
                          {activeStudy.solution}
                        </p>
                      </div>
                    </div>

                    {/* Metrics Badges */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/60 text-center">
                      {activeStudy.metrics?.map((metric, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white border border-border/60 shadow-2xs">
                          <div className="text-lg sm:text-2xl font-black text-primary mb-0.5">
                            {metric.value}
                          </div>
                          <div className="text-[0.65rem] sm:text-xs font-medium text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 text-right">
                      <button
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline cursor-pointer"
                      >
                        Explore Architecture Details <ArrowRight size={14} />
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          <div className="text-center mt-10">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all"
            >
              {t("caseStudySpotlight.viewAll")} <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. END-TO-END SERVICES GRID (10 CAPABILITIES)
      ══════════════════════════════════════════════════════════ */}
      <ServiceCardGrid
        badge={t("enterpriseServices.badge")}
        title={t("enterpriseServices.title")}
        subtitle={t("enterpriseServices.subtitle")}
        linkToDetails
        footer={
          <Magnetic strength={10}>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-foreground shadow-lg transition-colors hover:bg-white/90"
            >
              {t("enterpriseServices.cta")}
            </button>
          </Magnetic>
        }
      />

      {/* ══════════════════════════════════════════════════════════
          7b. CUSTOM SOFTWARE SOLUTIONS WE BUILD
      ══════════════════════════════════════════════════════════ */}
      <SolutionsGrid />

      {/* ══════════════════════════════════════════════════════════
          8b. FAST START TIMELINE (FIRST CALL → FIRST DELIVERY)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("quickStart.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("quickStart.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("quickStart.subtitle")}
            </p>
          </Reveal>

          <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 max-w-6xl mx-auto">
            {/* Connector line on desktop */}
            <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-border" aria-hidden />
            {quickStartSteps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.08} duration={0.5}>
                <li className="relative text-left md:text-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center md:mx-auto mb-4 ring-4 ring-slate-50">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                    {step.when}
                  </span>
                  <h3 className="font-bold text-base text-foreground mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <div className="text-center mt-12">
            <Magnetic strength={10}>
              <button
                onClick={() => setOpen(true)}
                className="btn-primary"
              >
                {t("trustedClients.cta")}
              </button>
            </Magnetic>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          9. INDUSTRY ROI BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-primary text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <h2 className="display-heading text-2xl sm:text-3xl md:text-4xl text-white max-w-3xl mx-auto mb-6 leading-snug">
              {t("roiBanner.heading")}
            </h2>
            <Magnetic strength={10}>
              <button
                onClick={() => setOpen(true)}
                className="px-8 py-3.5 rounded-xl bg-white text-foreground font-extrabold text-sm shadow-lg hover:bg-white/90 transition-all cursor-pointer"
              >
                {t("roiBanner.cta")}
              </button>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          9b. CUSTOM SOFTWARE BY INDUSTRY
      ══════════════════════════════════════════════════════════ */}
      <IndustryFocus />

      {/* ══════════════════════════════════════════════════════════
          10. INDUSTRY SOLUTIONS SHOWCASE (shared with /industries)
      ══════════════════════════════════════════════════════════ */}
      <IndustryShowcase
        badge={t("industrySolutions.badge")}
        title={t("industrySolutions.title")}
        subtitle={t("industrySolutions.subtitle")}
      />

      {/* ══════════════════════════════════════════════════════════
          11. TECHNOLOGY STACK MATRIX
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("techStack.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("techStack.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("techStack.subtitle")}
            </p>
          </Reveal>

          {/* Tech Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto">
            {techCategories.map((cat, idx) => (
              <button
                key={cat.id || idx}
                onClick={() => setActiveTechCategory(idx)}
                className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  activeTechCategory === idx
                    ? "bg-foreground text-white border-foreground shadow-sm"
                    : "bg-white text-muted-foreground border-border hover:bg-white/80"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Tech Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {activeTech?.items?.map((item, i) => (
              <Reveal key={i} delay={i * 0.04} duration={0.4}>
                <div className="group p-4 rounded-xl bg-white border border-border/80 shadow-2xs hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md transition-all flex items-center gap-3">
                  {(() => {
                    const brand = TECH_ICONS[item.icon];
                    const Logo = brand?.icon ?? Code2;
                    const color = brand?.color ?? "#64748b";
                    return (
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${color}14`, color }}
                        aria-hidden
                      >
                        <Logo size={24} />
                      </span>
                    );
                  })()}
                  <div className="min-w-0 text-left">
                    <p className="font-bold text-sm text-foreground truncate">{item.name}</p>
                    <p className="text-[0.65rem] text-muted-foreground truncate">{item.category}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          12. HOW WE WORK — INTERACTIVE PROCESS TIMELINE (shared with /services)
      ══════════════════════════════════════════════════════════ */}
      <ProcessTimeline />

      {/* ══════════════════════════════════════════════════════════
          12b. ENGAGEMENT & OUTSOURCING MODELS
      ══════════════════════════════════════════════════════════ */}
      <EngagementModels />

      {/* ══════════════════════════════════════════════════════════
          13. WHY CHOOSE US (6 CORE DIFFERENTIATORS)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("whyChooseUs.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("whyChooseUs.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("whyChooseUs.subtitle")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyChooseCards.map((card, idx) => (
              <Reveal key={card.id || idx} delay={idx * 0.07} duration={0.5}>
                <div className="p-7 rounded-2xl bg-white border border-border/80 shadow-sm hover:border-primary/40 hover:shadow-md transition-all h-full text-left">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          13b. BUYER'S GUIDE: CHOOSING A DEVELOPMENT PARTNER
      ══════════════════════════════════════════════════════════ */}
      <ChoosePartner />

      {/* ══════════════════════════════════════════════════════════
          14. COST OF CUSTOM SOFTWARE DEVELOPMENT
      ══════════════════════════════════════════════════════════ */}
      <CostGuide />

      {/* ══════════════════════════════════════════════════════════
          15. FAQ ACCORDION SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("faqs.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("faqs.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("faqs.subtitle")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <Reveal key={idx} delay={idx * 0.03} duration={0.4}>
                  <div className="rounded-2xl bg-white border border-border/80 shadow-2xs overflow-hidden transition-all text-left">
                    <h3>
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${idx}`}
                        className="w-full p-5 sm:p-6 text-left font-bold text-sm sm:text-base text-foreground flex items-center justify-between gap-4 cursor-pointer hover:bg-background/40 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={18}
                          className={`text-primary shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </h3>

                    {/* Answers stay in the DOM (collapsed via grid rows) so crawlers read every FAQ. */}
                    <div
                      id={`faq-answer-${idx}`}
                      className={`grid transition-all duration-300 ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          16. FINAL CONVERSION & STRATEGY CALL BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0f172a] text-white text-center relative overflow-hidden">
        

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-4 inline-block">
              Free Architecture Assessment
            </span>
            <h2 className="display-heading text-3xl sm:text-5xl text-white mb-4 leading-tight">
              {t("finalConversion.title")}
            </h2>
            <p className="text-white/70 text-sm sm:text-base mb-8 max-w-xl mx-auto">
              {t("finalConversion.subtitle")}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 max-w-xl mx-auto mb-8 text-left">
              {finalChecklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/85">
                  <Check size={16} className="text-brand-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <form onSubmit={handleQuickEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
              <input
                type="text"
                required
                value={quickName}
                onChange={(e) => setQuickName(e.target.value)}
                placeholder={t("finalConversion.namePlaceholder")}
                autoComplete="name"
                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:w-40 backdrop-blur-sm"
              />
              <input
                type="email"
                required
                value={quickEmail}
                onChange={(e) => setQuickEmail(e.target.value)}
                placeholder={t("finalConversion.placeholder")}
                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary flex-1 backdrop-blur-sm"
              />
              <button
                type="submit"
                disabled={isSubmittingQuick}
                className="btn-primary whitespace-nowrap px-6 py-3 cursor-pointer text-sm font-bold"
              >
                {isSubmittingQuick ? "Submitting..." : t("finalConversion.cta")}
              </button>
            </form>

            <p className="text-xs text-white/50">
              {t("finalConversion.guarantee")}
            </p>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
