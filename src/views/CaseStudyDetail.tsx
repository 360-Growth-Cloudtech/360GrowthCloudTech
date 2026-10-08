"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { CaseStudyPreviewImage } from "@/components/CaseStudyPreviewImage";
import {
  ArrowLeft, ArrowRight, Check, Sparkles, User, AlertCircle,
  CheckCircle2, TrendingUp, Cpu, ShieldCheck, Zap, Layers, MessageSquare
} from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import {
  caseStudyMeta,
  mergeCaseStudy,
  type CaseStudy,
  type CaseStudyContent,
} from "@/lib/case-studies-meta";
import { Reveal, Magnetic } from "@/components/motion";

export default function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const t = useTranslations("caseStudies");
  const tDetail = useTranslations("caseStudies.detail");
  const tCta = useTranslations("common.ctas");
  const { setOpen } = useScheduleMeeting();

  const [activeChallengeTab, setActiveChallengeTab] = useState(0);
  const [activeSolutionTab, setActiveSolutionTab] = useState(0);

  const studies = caseStudyMeta.map((meta) => {
    const item = t.raw(`items.${meta.slug}`) as CaseStudyContent;
    return mergeCaseStudy(meta, { ...item, slug: meta.slug });
  });

  const currentIndex = studies.findIndex((s) => s.slug === study.slug);
  const nextStudy = studies[currentIndex + 1] || studies[0];
  const otherStudies = studies.filter((s) => s.slug !== study.slug).slice(0, 3);

  const hasRichContent = !!(
    study.clientVision ||
    study.challengeCategories ||
    study.solutionCategories ||
    study.impactResults
  );

  return (
    <article data-testid="case-study-detail" className="bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl pt-36 pb-20 md:pt-40">
        
        {/* Back link */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={15} className="rtl:rotate-180" />
          {tDetail("backLink")}
        </Link>

        {/* Category & Meta */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">{study.category}</span>
          <span className="text-muted-foreground/50">·</span>
          <span className="text-muted-foreground">{study.date}</span>
          <span className="text-muted-foreground/50">·</span>
          <span className="text-muted-foreground">{study.readTime}</span>
        </div>

        {/* Main Headline */}
        <h1 className="display-heading text-3xl sm:text-4xl lg:text-[2.75rem] text-foreground leading-[1.14] mb-4">
          {study.title}
        </h1>
        <p className="text-base font-semibold text-primary mb-10">{study.client}</p>

        {/* Hero Preview Image */}
        <CaseStudyPreviewImage
          src={study.image}
          alt={study.imageAlt}
          priority
          variant={study.imageVariant}
          className="mb-12 shadow-xl rounded-2xl overflow-hidden border border-border"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />

        {/* Introduction & Technology Stack Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-start">
          <div className="lg:col-span-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
              Executive Overview
            </h2>
            <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
              {study.summary}
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-border shadow-sm">
            <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Cpu size={16} className="text-primary" /> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-bold text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Client Vision Section (if available) */}
        {study.clientVision && (
          <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-white border border-border/80 shadow-md relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                <User size={20} />
              </div>
              <h2 className="display-heading text-xl sm:text-2xl text-foreground">
                Client Vision
              </h2>
            </div>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed italic">
              &ldquo;{study.clientVision}&rdquo;
            </p>
          </div>
        )}

        {/* Product Gallery Screens (if any) */}
        {study.gallery && study.gallery.length > 0 && (
          <section className="mb-16 space-y-8">
            <h2 className="display-heading text-2xl text-foreground">{tDetail("productScreens")}</h2>
            {study.gallery.map((item) => (
              <figure key={item.src}>
                <CaseStudyPreviewImage
                  src={item.src}
                  alt={item.alt}
                  variant={item.variant}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
                {item.caption && (
                  <figcaption className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </section>
        )}

        {/* Rich Structured Challenges Section */}
        {study.challengeCategories && study.challengeCategories.length > 0 ? (
          <section className="mb-16">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
              <AlertCircle size={15} /> Problem Statement
            </div>
            <h2 className="display-heading text-2xl sm:text-3xl text-foreground mb-6">
              The Challenges
            </h2>

            {/* Category selection tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {study.challengeCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChallengeTab(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    activeChallengeTab === idx
                      ? "bg-foreground text-white border-foreground shadow-sm"
                      : "bg-white text-muted-foreground border-border hover:bg-white/80"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Active Challenge Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {study.challengeCategories[activeChallengeTab]?.items.map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-border/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs mb-3">
                    ✕
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-1.5">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-12">
            <h2 className="display-heading text-xl md:text-2xl text-foreground mb-4">{tDetail("challenge")}</h2>
            <p className="text-base leading-relaxed text-muted-foreground">{study.challenge}</p>
          </section>
        )}

        {/* Rich Structured Solutions Section */}
        {study.solutionCategories && study.solutionCategories.length > 0 ? (
          <section className="mb-16">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
              <Sparkles size={15} /> Engineering Strategy
            </div>
            <h2 className="display-heading text-2xl sm:text-3xl text-foreground mb-6">
              The Solutions
            </h2>

            {/* Solution selection tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {study.solutionCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSolutionTab(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    activeSolutionTab === idx
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-muted-foreground border-border hover:bg-white/80"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Active Solution Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {study.solutionCategories[activeSolutionTab]?.items.map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-border/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs mb-3">
                    ✓
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-1.5">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-12">
            <h2 className="display-heading text-xl md:text-2xl text-foreground mb-4">{tDetail("whatWeBuilt")}</h2>
            <ul className="space-y-3">
              {study.solution.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-foreground/85">
                  <Check size={16} className="shrink-0 text-primary mt-1" strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Impact and Results Section */}
        {study.impactResults && study.impactResults.length > 0 ? (
          <section className="mb-16">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
              <TrendingUp size={15} /> Tangible Value Delivered
            </div>
            <h2 className="display-heading text-2xl sm:text-3xl text-foreground mb-6">
              Impact & Results
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {study.impactResults.map((group, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-border/80 shadow-sm">
                  <h3 className="font-bold text-base text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary shrink-0" />
                    {group.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.items.map((res, i) => (
                      <li key={i} className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-12">
            <h2 className="display-heading text-xl md:text-2xl text-foreground mb-4">{tDetail("outcomes")}</h2>
            <ul className="space-y-3">
              {study.results.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-foreground/85">
                  <Check size={16} className="shrink-0 text-primary mt-1" strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Final Thoughts Section */}
        {study.finalThoughts && (
          <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-foreground text-white shadow-xl relative overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              Final Thoughts
            </span>
            <h3 className="display-heading text-xl sm:text-2xl text-white mb-4">
              A Long-Term High-Growth Partnership
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {study.finalThoughts}
            </p>
          </div>
        )}

        {/* Related Case Studies */}
        <section className="mb-16 pt-12 border-t border-border/60">
          <h2 className="display-heading text-2xl text-foreground mb-6">
            Explore More Of Our Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherStudies.map((s) => (
              <Link
                key={s.slug}
                href={`/case-studies/${s.slug}`}
                className="group p-5 rounded-2xl bg-white border border-border/80 shadow-2xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-primary mb-2 block">
                    {s.category}
                  </span>
                  <h3 className="font-bold text-sm text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                    {s.excerpt || s.summary}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                  Read Case Study <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA Block */}
        <div className="p-8 sm:p-10 rounded-3xl bg-foreground text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-left">
            <h3 className="display-heading text-2xl text-white mb-2">{tDetail("ctaTitle")}</h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
              {tDetail("ctaSubtitle")}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-white/60">
              <span>✓ 98% Job Success Rate</span>
              <span>✓ 84.65% Client Retention</span>
              <span>✓ 1.4M+ Hours Worked</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn-primary"
            >
              {tCta("startConversation")}
            </button>
            <Link
              href="/contact"
              className="btn-outline text-white border-white/30 hover:bg-white/10"
            >
              {tCta("contactUs")}
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}
