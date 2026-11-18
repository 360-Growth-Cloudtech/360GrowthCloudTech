"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  AppWindow,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  LayoutTemplate,
  Lock,
  RefreshCw,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Reveal, Magnetic } from "@/components/motion";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";

export default function WebsiteDevelopmentView() {
  const { setOpen } = useScheduleMeeting();
  const t = useTranslations("websiteDevelopmentServices");
  const tCrumbs = useTranslations("common.breadcrumbs");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const offerings = [
    {
      id: "enterprise",
      icon: Building2,
      title: "Custom Enterprise Web Portals",
      desc: "Robust, multi-tenant web portals engineered for high data volumes, role-based access control (RBAC), and deep enterprise integrations (SAP, Salesforce, Workday).",
      bullets: [
        "Microservices & modular web architecture",
        "Single Sign-On (SSO) & enterprise IAM",
        "Automated cloud scaling on AWS & GCP",
      ],
      href: "/custom-enterprise-software",
    },
    {
      id: "cms",
      icon: LayoutTemplate,
      title: "Headless CMS & Fast Marketing Sites",
      desc: "Decoupled marketing websites built with Next.js and headless platforms (Sanity, Strapi, Contentful, Headless WordPress) empowering non-technical teams to publish instantly.",
      bullets: [
        "Instant static site generation (SSG) & ISR",
        "Visual content editing with live preview",
        "Zero render-blocking scripts & 95+ PageSpeed",
      ],
      href: "/custom-web-design",
    },
    {
      id: "ecommerce",
      icon: ShoppingCart,
      title: "Scalable B2B & D2C eCommerce Stores",
      desc: "High-converting online stores built on Shopify Plus, WooCommerce, or headless commerce with multi-currency checkouts, dynamic tax calculation, and automated ERP inventory sync.",
      bullets: [
        "Frictionless 1-click checkout flows",
        "Multi-warehouse & logistics API integration",
        "Engineered for Black Friday peak traffic spikes",
      ],
      href: "/ecommerce-software-development",
    },
    {
      id: "web",
      icon: Code2,
      title: "Full-Stack Web Application Development",
      desc: "Interactive, progressive web applications (PWAs) with complex business logic, real-time dashboards, automated notifications, and seamless third-party API connectivity.",
      bullets: [
        "React, TypeScript, Node.js & Python FastAPI",
        "Offline capabilities & service workers",
        "GraphQL & RESTful API endpoints",
      ],
      href: "/web-application-development",
    },
    {
      id: "redesign",
      icon: RefreshCw,
      title: "Legacy Modernization & Website Redesign",
      desc: "Transform sluggish, outdated websites into cutting-edge modern platforms with zero downtime and guaranteed zero SEO traffic loss through comprehensive 301 mapping.",
      bullets: [
        "Monolith to modern Jamstack/SSR migration",
        "Mobile-first UI/UX overhaul in Figma",
        "Complete SEO equity & ranking preservation",
      ],
      href: "/website-redesign",
    },
    {
      id: "maintenance",
      icon: ShieldCheck,
      title: "24/7 Web Maintenance, Security & DevOps",
      desc: "Continuous monitoring, uptime SLA guarantees, security patching, Core Web Vitals optimization, and ongoing feature rollouts to keep your digital platform ahead.",
      bullets: [
        "24/7 automated uptime & error monitoring",
        "Regular security audits & vulnerability patches",
        "Continuous CI/CD pipeline optimization",
      ],
      href: "/maintenance-support",
    },
  ];

  const trustMetrics = [
    {
      icon: Sparkles,
      title: "Full-Stack Velocity",
      subtitle: "Sprint-Based Engineering",
    },
    {
      icon: Zap,
      title: "Sub-1.2s Load Time",
      subtitle: "100/100 Core Web Vitals",
    },
    {
      icon: Lock,
      title: "100% IP & Git Ownership",
      subtitle: "Full code transfer, zero lock-in",
    },
    {
      icon: Globe,
      title: "Global Dual-Shore Agility",
      subtitle: "US, UK & India Timezone Overlap",
    },
  ];

  const pillars = [
    {
      icon: Zap,
      title: "Next.js 15 & Server Components",
      desc: "Instant page transitions with server-side rendering (SSR) and edge caching. We engineer web experiences that score 95+ on Google PageSpeed Insights.",
    },
    {
      icon: Lock,
      title: "100% Code & IP Ownership",
      desc: "From the first sprint, your team owns the Git repository, architecture documentation, and Figma designs with zero recurring licensing or vendor lock-in.",
    },
    {
      icon: Globe,
      title: "Dual-Shore Agile Delivery",
      desc: "Silicon Valley engineering standards combined with round-the-clock development momentum. Real-time collaboration in your local working hours (US, UK, India).",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise OWASP Security",
      desc: "Bank-grade data protection, encrypted databases, rate limiting, and automated vulnerability scanning to safeguard enterprise applications.",
    },
    {
      icon: Rocket,
      title: "Built-In Technical SEO",
      desc: "Semantic HTML5, automated JSON-LD Schema graphs, and optimized rendering paths ensure your pages capture Google Rich Snippets effortlessly.",
    },
    {
      icon: Timer,
      title: "2-Hour Response SLA",
      desc: "Direct communication with senior solutions architects on dedicated Slack or Microsoft Teams channels with weekly live sprint demos.",
    },
  ];

  const techStacks = [
    {
      category: "Frontend & SSR",
      icon: LayoutTemplate,
      skills: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Vue.js", "Framer Motion"],
    },
    {
      category: "Backend & APIs",
      icon: Cpu,
      skills: ["Node.js", "Python FastAPI", "NestJS", "Go", "GraphQL", "RESTful APIs", "WebSockets"],
    },
    {
      category: "Cloud & DevOps",
      icon: Globe,
      skills: ["AWS", "Google Cloud", "Vercel", "Docker", "Kubernetes", "Cloudflare CDN", "GitHub Actions"],
    },
    {
      category: "Database & CMS",
      icon: Database,
      skills: ["PostgreSQL", "Supabase", "Redis", "MongoDB", "Sanity.io", "Strapi", "Headless WordPress"],
    },
  ];

  const processSteps = [
    {
      num: "01",
      title: "Discovery & Architecture Blueprint",
      desc: "We analyze your business goals, target audience, technical roadmap, and SEO keyword architecture to define the exact project scope.",
    },
    {
      num: "02",
      title: "Interactive UI/UX in Figma",
      desc: "Designers craft high-fidelity, clickable prototypes matching international design standards with responsive breakpoints.",
    },
    {
      num: "03",
      title: "Clean Agile Development",
      desc: "Two-week agile sprints with Next.js & clean TypeScript. You get staging environment access and bi-weekly sprint demos.",
    },
    {
      num: "04",
      title: "QA & Security Audit",
      desc: "Comprehensive automated unit tests, OWASP vulnerability scans, and cross-browser testing across 20+ physical screen sizes.",
    },
    {
      num: "05",
      title: "Core Web Vitals & SEO Setup",
      desc: "Pre-warming caches, asset compression into WebP/AVIF, and rich JSON-LD Schema implementation for 95+ PageSpeed scores.",
    },
    {
      num: "06",
      title: "Zero-Downtime Launch & Hypercare",
      desc: "Seamless live deployment and DNS migration, backed by 90 days of complimentary post-launch warranty support.",
    },
  ];

  const faqs = [
    {
      q: "How do you scope and deliver a custom website development project?",
      a: "Every project begins with a dedicated technical discovery session. Rather than using cookie-cutter estimates or generic templates, our senior architects evaluate your precise business requirements, feature roadmap, and performance criteria to provide a tailored, transparent milestone plan with zero hidden surprises.",
    },
    {
      q: "How long will it take to build and deploy our website?",
      a: "A high-performance corporate marketing website typically launches in 2 to 3 weeks. Custom web applications and eCommerce platforms take approximately 4 to 8 weeks, while large-scale enterprise platforms run across 8 to 12 weeks of structured two-week agile sprints with bi-weekly live staging demos.",
    },
    {
      q: "How do you ensure our website ranks high on Google search results?",
      a: "We build with an SEO-first architecture: server-side rendering (SSR) for instant crawler indexing, semantic HTML5 tags, optimized internal linking, next-gen WebP/AVIF image compression, sub-1.2s Largest Contentful Paint (LCP) performance, and automated Google Schema Markup (Organization, Service, BreadcrumbList, and FAQPage JSON-LD) to help you outrank competitors and capture Google Rich Snippets.",
    },
    {
      q: "How does 360GrowthCloudTech support international clients across the US, UK, and India?",
      a: "We operate a seamless dual-shore model. Our technical leadership and dedicated project managers provide daily overlapping hours across US Eastern/Pacific (EST/PST), UK (GMT), and Indian Standard Time (IST). We collaborate directly in your dedicated Slack or Microsoft Teams channels, hold weekly Zoom sprint demos, and provide continuous updates on Jira or Linear.",
    },
    {
      q: "Will our website be optimized for mobile devices and Core Web Vitals?",
      a: "Absolutely. Every website is engineered mobile-first and tested across 20+ physical screen sizes (iOS, Android, tablets, and desktops). We adhere strictly to Google's Core Web Vitals criteria, targeting 95+ PageSpeed scores, LCP under 1.2 seconds, Cumulative Layout Shift (CLS) near zero, and Interaction to Next Paint (INP) under 100 milliseconds.",
    },
    {
      q: "Do we get 100% intellectual property (IP) and source code ownership?",
      a: "Yes. Upon project milestones and completion, 100% of the intellectual property, design assets (Figma), source code repositories (GitHub/GitLab), and database schemas are transferred directly to you. We never use proprietary vendor lock-in or hidden licensing fees.",
    },
    {
      q: "What happens after the website is launched? Do you offer maintenance?",
      a: "Every project includes 90 days of complimentary post-launch hypercare warranty covering bug fixes, performance monitoring, and server maintenance. Beyond that, we offer flexible monthly maintenance and DevOps retainers that include 24/7 uptime monitoring, security updates, regular backups, and continuous feature enhancements.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-100 bg-slate-50/60 pt-24 pb-3">
        <div className="container mx-auto flex items-center gap-2 px-4 text-xs font-medium text-slate-500 sm:px-6 lg:px-8">
          <Link href="/" className="transition-colors hover:text-brand-600">
            {tCrumbs("home")}
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link href="/services" className="transition-colors hover:text-brand-600">
            Services
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="font-semibold text-slate-800">Website Development Services</span>
        </div>
      </nav>

      {/* ── HERO SECTION (Simple, Clean, Eye-Catchy) ───────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white py-20 lg:py-28">
        {/* Soft radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-200/40 via-amber-100/30 to-transparent blur-3xl"
        />

        <div className="container relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200/90 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 shadow-sm backdrop-blur">
              <Sparkles size={13} className="text-brand-500" />
              <span>Modern Web Engineering • India · USA · Global</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="display-heading mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
              Custom Website Development{" "}
              <span className="bg-gradient-to-r from-brand-600 via-amber-500 to-brand-500 bg-clip-text text-transparent">
                Engineered for Speed & Scale
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
              We design and engineer lightning-fast, secure, and SEO-dominant websites, headless CMS platforms, and custom web applications for ambitious startups and global enterprises. Sub-second load times with 100% Git IP ownership.
            </p>
          </Reveal>

          {/* Clean Action Buttons */}
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic strength={10}>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="btn-primary inline-flex h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition-all hover:-translate-y-0.5"
                >
                  Book a Free Strategy Call
                  <ArrowRight size={16} />
                </button>
              </Magnetic>

              <a
                href={CONTACT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
              >
                <FaWhatsapp size={18} className="text-[#25D366]" />
                WhatsApp Us
              </a>
            </div>
          </Reveal>

          {/* Minimalist Trust Grid */}
          <Reveal delay={0.2}>
            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {trustMetrics.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-center shadow-xs backdrop-blur transition-all hover:border-brand-200"
                  >
                    <Icon size={18} className="mb-2 text-brand-600" />
                    <p className="text-xs font-bold text-slate-900 sm:text-sm">{item.title}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">{item.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CORE CAPABILITIES SECTION (Clean 3-Column Grid) ────────────── */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <span className="section-label mb-3">Our Capabilities</span>
            <h2 className="display-heading text-2xl font-bold text-slate-950 sm:text-3xl md:text-4xl">
              End-to-End Website Development Solutions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              From high-converting corporate portals to complex cloud-native SaaS web apps, we deliver modern web solutions engineered for scale.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.id} delay={i * 0.05} className="h-full">
                  <article className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-md">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">{card.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{card.desc}</p>

                    <ul className="my-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700">
                      {card.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={card.href}
                      className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 transition-all hover:gap-2.5"
                    >
                      Learn more
                      <ArrowRight size={13} />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US (6 Clean Value Pillars) ──────────────────────── */}
      <section className="border-t border-slate-100 bg-white py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <span className="section-label mb-3">Why 360GrowthCloudTech</span>
            <h2 className="display-heading text-2xl font-bold text-slate-950 sm:text-3xl md:text-4xl">
              Engineered for Business Outcomes, Not Vanity
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              We eliminate template bloat, communication gaps, and vendor lock-in with modern, accountable engineering.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.04} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:bg-white hover:border-brand-200 hover:shadow-xs">
                    <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-brand-600 shadow-2xs">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ARSENAL ─────────────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <span className="section-label mb-3">Technology Stack</span>
            <h2 className="display-heading text-2xl font-bold text-slate-950 sm:text-3xl md:text-4xl">
              Modern Technologies We Build With
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Zero legacy bloat. We build exclusively on modern, scalable, and secure frameworks.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {techStacks.map((stack, i) => {
              const Icon = stack.icon;
              return (
                <Reveal key={stack.category} delay={i * 0.05} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                    <div className="mb-3 flex items-center gap-2.5">
                      <Icon size={18} className="text-brand-600" />
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{stack.category}</h3>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {stack.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6-STAGE AGILE PROCESS ───────────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-white py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <span className="section-label mb-3">Our Methodology</span>
            <h2 className="display-heading text-2xl font-bold text-slate-950 sm:text-3xl md:text-4xl">
              Our 6-Stage Web Engineering Lifecycle
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              A transparent, milestone-driven framework that guarantees on-time delivery with zero surprises.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 0.04}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 text-left transition-all hover:bg-white hover:border-brand-200">
                  <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
                    {step.num}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQS ACCORDION ─────────────────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <span className="section-label mb-3">FAQs</span>
            <h2 className="display-heading text-2xl font-bold text-slate-950 sm:text-3xl md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Clear answers to help you evaluate your website development partner.
            </p>
          </Reveal>

          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <Reveal key={faq.q} delay={idx * 0.03}>
                  <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-slate-900 transition-colors hover:text-brand-600 sm:text-base"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-brand-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </h3>
                    {isOpen && (
                      <div className="border-t border-slate-100 px-5 pt-3 pb-5 text-xs sm:text-sm leading-relaxed text-slate-600">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CLEAN CONVERSION BANNER ───────────────────────────────── */}
      <section className="border-t border-slate-100 bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 text-center text-white sm:px-12 md:py-20 shadow-2xl">
              {/* Subtle ambient orange/brand glow in corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl"
              />

              <div className="relative z-10 mx-auto max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
                  <Sparkles size={13} />
                  Let&apos;s Build Together
                </span>

                <h2 className="display-heading mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Ready to Build a Fast, Scalable Website?
                </h2>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                  Speak directly with a Senior Solutions Architect. Get an architecture roadmap, technical feasibility assessment, and transparent milestones within 2 business hours.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Magnetic strength={10}>
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="btn-primary inline-flex h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                    >
                      Book a Free Consultation
                      <ArrowRight size={16} />
                    </button>
                  </Magnetic>

                  <a
                    href={CONTACT_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/15"
                  >
                    <FaWhatsapp size={18} className="text-[#25D366]" />
                    WhatsApp Us
                  </a>
                </div>

                <p className="mt-8 text-xs text-slate-400">
                  🔒 NDA Protected · Direct Senior Architect Consultation · 2-Hour Response SLA
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
