"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { CaseStudyPreviewImage } from "@/components/CaseStudyPreviewImage";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import {
  caseStudyMeta,
  mergeCaseStudy,
  type CaseStudy,
  type CaseStudyContent,
} from "@/lib/case-studies-meta";

export default function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const t = useTranslations("caseStudies");
  const tDetail = useTranslations("caseStudies.detail");
  const tCta = useTranslations("common.ctas");
  const { setOpen } = useScheduleMeeting();

  const studies = caseStudyMeta.map((meta) => {
    const item = t.raw(`items.${meta.slug}`) as CaseStudyContent;
    return mergeCaseStudy(meta, { ...item, slug: meta.slug });
  });

  const currentIndex = studies.findIndex((s) => s.slug === study.slug);
  const nextStudy = studies[currentIndex + 1];

  return (
    <article data-testid="case-study-detail" className="bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl pt-36 pb-20 md:pt-40">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft size={15} className="rtl:rotate-180" />
          {tDetail("backLink")}
        </Link>

        <p className="text-xs font-bold uppercase tracking-[0.12em] mb-6">
          <span className="text-primary">{study.category}</span>
          <span className="text-muted-foreground/50 mx-2">·</span>
          <span className="text-muted-foreground">{study.date}</span>
          <span className="text-muted-foreground/50 mx-2">·</span>
          <span className="text-muted-foreground">{study.readTime}</span>
        </p>

        <h1 className="display-heading text-3xl md:text-4xl lg:text-[2.6rem] text-foreground leading-[1.12] mb-4">
          {study.title}
        </h1>
        <p className="text-base font-semibold text-foreground/70 mb-8">{study.client}</p>

        <CaseStudyPreviewImage
          src={study.image}
          alt={study.imageAlt}
          priority
          variant={study.imageVariant}
          className="mb-12 shadow-[0_16px_48px_rgba(26,21,18,0.1)]"
          sizes="(max-width: 768px) 100vw, 768px"
        />

        {study.gallery && study.gallery.length > 0 && (
          <section className="mb-12 space-y-8">
            <h2 className="display-heading text-xl md:text-2xl text-foreground">{tDetail("productScreens")}</h2>
            {study.gallery.map((item) => (
              <figure key={item.src}>
                <CaseStudyPreviewImage
                  src={item.src}
                  alt={item.alt}
                  variant={item.variant}
                  sizes="(max-width: 768px) 100vw, 768px"
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

        <div className="prose-custom space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <p className="text-base md:text-lg text-foreground/85 leading-relaxed">{study.summary}</p>
          </section>

          <section>
            <h2 className="display-heading text-xl md:text-2xl text-foreground mb-4">{tDetail("challenge")}</h2>
            <p className="text-base leading-relaxed">{study.challenge}</p>
          </section>

          <section>
            <h2 className="display-heading text-xl md:text-2xl text-foreground mb-4">{tDetail("whatWeBuilt")}</h2>
            <ul className="space-y-3">
              {study.solution.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base">
                  <Check size={16} className="shrink-0 text-primary mt-1" strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
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

          <section>
            <h2 className="display-heading text-xl md:text-2xl text-foreground mb-4">{tDetail("stack")}</h2>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border/70 bg-white/70 px-3 py-1.5 text-sm font-semibold text-foreground/75"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <div
          className="mt-16 rounded-2xl px-6 py-8 md:px-8 md:py-10"
          style={{ backgroundColor: "#1a1512" }}
        >
          <h2 className="display-heading text-xl md:text-2xl text-white mb-3">{tDetail("ctaTitle")}</h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
            {tDetail("ctaSubtitle")}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn-primary rounded-full text-sm"
            >
              {tCta("startConversation")}
            </button>
            <Link href="/contact" className="btn-outline rounded-full text-sm text-white/80 border-white/20">
              {tCta("contactUs")}
            </Link>
          </div>
        </div>

        {nextStudy && (
          <div className="mt-14 pt-10 border-t border-border/60">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              {tDetail("nextCaseStudy")}
            </p>
            <Link
              href={`/case-studies/${nextStudy.slug}`}
              className="group inline-flex items-start gap-2 text-foreground hover:text-primary transition-colors"
            >
              <span className="display-heading text-lg md:text-xl leading-snug">{nextStudy.title}</span>
              <ArrowRight size={18} className="shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
