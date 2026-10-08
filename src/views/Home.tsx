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
  Sparkles, Laptop, CheckCircle
} from "lucide-react";
import { submitLead } from "@/lib/submit-lead";
import { toast } from "sonner";

// Tech icon mapping helper
const TECH_ICONS: Record<string, string> = {
  react: "⚛️",
  nextjs: "▲",
  vue: "💚",
  angular: "🅰️",
  ts: "🔷",
  tailwind: "🌊",
  flutter: "💙",
  reactnative: "📱",
  nodejs: "🟢",
  python: "🐍",
  go: "🦫",
  java: "☕",
  dotnet: "🟣",
  django: "🟩",
  fastapi: "⚡",
  graphql: "🔮",
  postgresql: "🐘",
  mongodb: "🍃",
  redis: "🟥",
  mysql: "🐬",
  dynamodb: "⚡",
  elastic: "🔍",
  supabase: "⚡",
  firebase: "🔥",
  aws: "☁️",
  gcp: "🌐",
  azure: "🔷",
  docker: "🐳",
  k8s: "☸️",
  terraform: "🏗️",
  github: "🐙",
  cloudflare: "🛡️",
};

// Industry icon mapping helper
const INDUSTRY_ICONS = [
  Activity,
  Landmark,
  Factory,
  Truck,
  ShoppingBag,
  HomeIcon,
];

// Outcome icon mapping helper
const OUTCOME_ICONS = [
  CheckCircle2,
  Activity,
  Users,
  Layers,
  Lock,
  TrendingUp,
];

// Service icon mapping helper
const SERVICE_ICONS = [
  Code2,
  Building2,
  Globe,
  Smartphone,
  Layers,
  Zap,
  Cloud,
  Bot,
  ShieldCheck,
  Wrench,
];

export default function Home() {
  const { setOpen } = useScheduleMeeting();
  const reduced = useReducedMotion();
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  // State hooks for interactive sections
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [activeEngagementModel, setActiveEngagementModel] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [activeTechCategory, setActiveTechCategory] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Hero Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    requirement: "",
    isNotRobot: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick newsletter / footer lead capture
  const [quickEmail, setQuickEmail] = useState("");
  const [isSubmittingQuick, setIsSubmittingQuick] = useState(false);

  // Scroll animations
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(heroProgress, [0, 1], [0, reduced ? 0 : -80]);
  const contentOpacity = useTransform(heroProgress, [0, 0.8], [1, reduced ? 1 : 0]);

  // Handle Hero Form Submission
  const handleHeroFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitLead({
        formType: "contact",
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: formData.requirement,
        source: "Homepage Hero Lead Form",
      });

      if (res.success) {
        toast.success(t("hero.form.successMessage"));
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          requirement: "",
          isNotRobot: true,
        });
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
    if (!quickEmail || !quickEmail.includes("@")) {
      toast.error("Please enter a valid business email.");
      return;
    }

    setIsSubmittingQuick(true);
    try {
      const res = await submitLead({
        formType: "contact",
        email: quickEmail,
        message: "Requested 30-min strategy call from Homepage bottom banner",
        source: "Homepage Bottom Quick CTA",
      });

      if (res.success) {
        toast.success("Thank you! We will reach out shortly to schedule your call.");
        setQuickEmail("");
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

  const enterpriseServices = useMemo(() => {
    try {
      return (
        (t.raw("enterpriseServices.services") as {
          number: string;
          title: string;
          desc: string;
        }[]) || []
      );
    } catch {
      return [];
    }
  }, [t]);

  const engagementModels = useMemo(() => {
    try {
      return (
        (t.raw("engagementModels.models") as {
          id: string;
          tabName: string;
          title: string;
          description: string;
          bullets: string[];
          cta: string;
        }[]) || []
      );
    } catch {
      return [];
    }
  }, [t]);

  const industrySolutions = useMemo(() => {
    try {
      return (
        (t.raw("industrySolutions.industries") as {
          id: string;
          name: string;
          title: string;
          desc: string;
          points: string[];
          cta: string;
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

  const processSteps = useMemo(() => {
    try {
      return (
        (t.raw("process.steps") as {
          number: string;
          title: string;
          desc: string;
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
  const activeModel = engagementModels[activeEngagementModel] || engagementModels[0];
  const activeInd = industrySolutions[activeIndustry] || industrySolutions[0];
  const activeTech = techCategories[activeTechCategory] || techCategories[0];

  return (
    <div data-testid="home-page" className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION WITH EMBEDDED CONVERSION FORM
      ══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden hero-grid-bg"
      >
        {/* Soft top wash */}
        <div
          className="absolute inset-x-0 top-0 h-96 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(37,99,235,0.08) 0%, transparent 75%)",
          }}
        />

        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-6"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center max-w-7xl mx-auto">
            
            {/* Left Content Column (7 Cols) */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Badge */}
              <Reveal delay={0} duration={0.5}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-semibold tracking-wide backdrop-blur-sm shadow-sm">
                  <Sparkles size={13} className="text-primary" />
                  <span>{t("hero.badge")}</span>
                </div>
              </Reveal>

              {/* Main Headline */}
              <Reveal delay={0.1} duration={0.6}>
                <h1 className="display-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-foreground leading-[1.12] tracking-tight">
                  {t("hero.titlePrefix")}{" "}
                  <span className="text-primary">{t("hero.titleHighlight")}</span>{" "}
                  {t("hero.titleSuffix")}
                </h1>
              </Reveal>

              {/* Subtitle */}
              <Reveal delay={0.2} duration={0.6}>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  {t("hero.subtitle")}
                </p>
              </Reveal>

              {/* Checkpoints Pills */}
              <Reveal delay={0.3} duration={0.5}>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {checkpoints.map((point, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/80 border border-border/80 text-xs font-medium text-foreground/80 shadow-2xs backdrop-blur-xs"
                    >
                      <CheckCircle2 size={13} className="text-primary shrink-0" />
                      {point}
                    </span>
                  ))}
                </div>
              </Reveal>

              {/* Social Proof & Ratings */}
              <Reveal delay={0.4} duration={0.5}>
                <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-border/60">
                  {/* Clutch Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold text-foreground text-sm">Clutch</span>
                        <div className="flex gap-0.5 text-amber-500">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={13} className="fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-semibold">
                        {t("hero.ratings.clutch.score")} / 5.0 Rating
                      </span>
                    </div>
                  </div>

                  <div className="h-7 w-px bg-border/60 hidden sm:block" />

                  {/* Google Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold text-foreground text-sm">Google</span>
                        <div className="flex gap-0.5 text-amber-500">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={13} className="fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-semibold">
                        {t("hero.ratings.google.score")} / 5.0 Rating
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>

            {/* Right Column: High-Converting Lead Form (5 Cols) */}
            <div className="lg:col-span-5">
              <Reveal delay={0.2} duration={0.6}>
                <div className="bg-white/95 rounded-2xl p-6 sm:p-8 border border-border/80 shadow-xl backdrop-blur-md relative overflow-hidden">
                  
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="mb-5">
                    <h3 className="font-bold text-lg sm:text-xl text-foreground mb-1">
                      {t("hero.form.title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {t("hero.form.subtitle")}
                    </p>
                  </div>

                  <form onSubmit={handleHeroFormSubmit} className="space-y-3.5 text-left">
                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1">
                        {t("hero.form.nameLabel")} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t("hero.form.namePlaceholder")}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border/80 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/60"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-foreground/80 mb-1">
                          {t("hero.form.emailLabel")} <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t("hero.form.emailPlaceholder")}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border/80 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/60"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground/80 mb-1">
                          {t("hero.form.phoneLabel")} <span className="text-primary">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t("hero.form.phonePlaceholder")}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border/80 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/60"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1">
                        {t("hero.form.companyLabel")}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t("hero.form.companyPlaceholder")}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border/80 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1">
                        {t("hero.form.requirementLabel")}
                      </label>
                      <textarea
                        rows={2}
                        value={formData.requirement}
                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                        placeholder={t("hero.form.requirementPlaceholder")}
                        className="w-full px-3.5 py-2 rounded-lg border border-border/80 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none placeholder:text-muted-foreground/60"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                      <input
                        type="checkbox"
                        id="captchaCheck"
                        checked={formData.isNotRobot}
                        onChange={(e) => setFormData({ ...formData, isNotRobot: e.target.checked })}
                        className="rounded border-border text-primary focus:ring-primary/40 h-4 w-4"
                      />
                      <label htmlFor="captchaCheck" className="text-xs text-muted-foreground select-none cursor-pointer">
                        {t("hero.form.captchaLabel")}
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {isSubmitting ? t("hero.form.submittingButton") : t("hero.form.submitButton")}
                    </button>

                    <p className="flex items-center justify-center gap-1.5 text-[0.7rem] text-center text-muted-foreground pt-1">
                      <Lock size={11} className="shrink-0" />
                      {t("hero.form.trustLine")}
                    </p>
                  </form>
                </div>
              </Reveal>
            </div>

          </div>
        </motion.div>
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
              <h3 className="font-bold text-lg sm:text-xl text-foreground mb-3">
                {t("trustedClients.title")}
              </h3>
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
                    <h4 className="font-bold text-foreground text-base mb-2">
                      {metric.title}
                    </h4>
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
                      <h4 className="font-bold text-sm text-foreground truncate">{item.name}</h4>
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
                <h4 className="font-bold text-lg sm:text-xl text-white mb-2 leading-snug">
                  {t("painPoints.callout.title")}
                </h4>
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

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. END-TO-END ENTERPRISE SERVICES GRID (10 CAPABILITIES)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("enterpriseServices.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("enterpriseServices.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {t("enterpriseServices.subtitle")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {enterpriseServices.map((service, idx) => {
              const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length];
              return (
                <Reveal key={idx} delay={idx * 0.05} duration={0.5}>
                  <div className="p-7 rounded-2xl bg-white border border-border/80 shadow-sm hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between h-full group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold text-muted-foreground/60 group-hover:text-primary transition-colors">
                          {service.number}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Icon size={18} />
                        </div>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border/40">
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
                      >
                        Learn more <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Magnetic strength={10}>
              <button
                onClick={() => setOpen(true)}
                className="btn-primary"
              >
                {t("enterpriseServices.cta")}
              </button>
            </Magnetic>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          8. FLEXIBLE ENGAGEMENT MODELS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("engagementModels.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("engagementModels.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("engagementModels.subtitle")}
            </p>
          </Reveal>

          {/* Model Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto">
            {engagementModels.map((model, idx) => (
              <button
                key={model.id || idx}
                onClick={() => setActiveEngagementModel(idx)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  activeEngagementModel === idx
                    ? "bg-foreground text-white border-foreground shadow-md"
                    : "bg-white text-muted-foreground border-border hover:bg-white/80"
                }`}
              >
                {model.tabName}
              </button>
            ))}
          </div>

          {/* Active Model Content Card */}
          <Reveal className="max-w-4xl mx-auto">
            {activeModel && (
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-border shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 text-left">
                  <h3 className="display-heading text-2xl sm:text-3xl text-foreground mb-3">
                    {activeModel.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {activeModel.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {activeModel.bullets?.map((bullet, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/85">
                        <Check size={16} className="text-emerald-600 shrink-0 font-bold" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <Magnetic strength={8}>
                    <button
                      onClick={() => setOpen(true)}
                      className="btn-primary text-xs sm:text-sm"
                    >
                      {activeModel.cta}
                    </button>
                  </Magnetic>
                </div>

                <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-background/80 border border-border/80 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Users size={28} />
                  </div>
                  <h4 className="font-bold text-base text-foreground mb-1">
                    Rapid Onboarding
                  </h4>
                  <p className="text-xs text-muted-foreground mb-4">
                    Zero lock-in contracts & instant IP rights transfer.
                  </p>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    SLA Guaranteed
                  </span>
                </div>
              </div>
            )}
          </Reveal>

        </div>
      </section>

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
          10. INDUSTRY SOLUTIONS SECTION (HEALTHCARE, BFSI, ETC.)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("industrySolutions.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("industrySolutions.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("industrySolutions.subtitle")}
            </p>
          </Reveal>

          {/* Industry Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12 max-w-4xl mx-auto">
            {industrySolutions.map((ind, idx) => {
              const Icon = INDUSTRY_ICONS[idx % INDUSTRY_ICONS.length];
              return (
                <button
                  key={ind.id || idx}
                  onClick={() => setActiveIndustry(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    activeIndustry === idx
                      ? "bg-white text-primary border-primary/40 shadow-sm"
                      : "bg-background/80 text-foreground/70 border-border hover:bg-white/60"
                  }`}
                >
                  <Icon size={15} />
                  <span>{ind.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Industry Showcase Card */}
          <Reveal className="max-w-5xl mx-auto">
            {activeInd && (
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-border shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 text-left">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2 block">
                    Domain Expertise
                  </span>
                  <h3 className="display-heading text-2xl sm:text-3xl text-foreground mb-3">
                    {activeInd.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {activeInd.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {activeInd.points?.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-foreground/80 bg-background/80 p-2.5 rounded-lg border border-border/60">
                        <CheckCircle size={14} className="text-primary shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <Magnetic strength={8}>
                    <button
                      onClick={() => setOpen(true)}
                      className="btn-primary text-xs sm:text-sm"
                    >
                      {activeInd.cta}
                    </button>
                  </Magnetic>
                </div>

                <div className="lg:col-span-5 p-6 rounded-2xl bg-background border border-border flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <ShieldCheck size={32} />
                  </div>
                  <h4 className="font-bold text-base text-foreground mb-1">
                    Compliance & Security First
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Engineered to meet HIPAA, GDPR, PCI-DSS, and ISO 27001 standards.
                  </p>
                </div>
              </div>
            )}
          </Reveal>

        </div>
      </section>

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
                <div className="p-4 rounded-xl bg-white border border-border/80 shadow-2xs hover:border-primary/40 hover:shadow-sm transition-all flex items-center gap-3">
                  <span className="text-2xl">{TECH_ICONS[item.icon] || "⚙️"}</span>
                  <div className="min-w-0 text-left">
                    <h4 className="font-bold text-sm text-foreground truncate">{item.name}</h4>
                    <p className="text-[0.65rem] text-muted-foreground truncate">{item.category}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          12. COLLABORATIVE 6-STEP AGILE PROCESS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 inline-flex">
              {t("process.badge")}
            </span>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t("process.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("process.subtitle")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {processSteps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.08} duration={0.5}>
                <div className="p-7 rounded-2xl bg-white border border-border/80 shadow-sm hover:shadow-md transition-all h-full text-left">
                  <span className="text-xs font-mono font-black text-primary bg-primary/10 px-2.5 py-1 rounded-md mb-4 inline-block">
                    STEP {step.number}
                  </span>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

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
          15. FAQ ACCORDION SECTION (12 QUESTIONS)
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
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
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

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4 inline-block">
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
                  <Check size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <form onSubmit={handleQuickEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
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
