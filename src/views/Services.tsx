"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { CaseStudyPreviewImage } from "@/components/CaseStudyPreviewImage";
import { ServiceCardGrid } from "@/components/ServiceCardGrid";
import { PageHero } from "@/components/PageHero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import {
  DISCIPLINE_KEYS,
  IN_PRACTICE_KEYS,
  inPracticeImages,
} from "@/lib/services-data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

function ServiceBulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="divide-y divide-border/70 border-t border-border/70">
      {bullets.map((item) => (
        <li key={item} className="flex items-center gap-3 py-4 text-sm font-medium text-foreground/85">
          <Check size={15} className="shrink-0 text-primary" strokeWidth={2.5} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Services() {
  const { setOpen } = useScheduleMeeting();
  const t = useTranslations("services");
  const tCommon = useTranslations("common.ctas");

  return (
    <div data-testid="services-page">
      <PageHero
        label={t("page.label")}
        title={t("page.titleLine1")}
        highlight={t("page.titleLine2")}
        subtitle={t("page.subtitle")}
        waveClassName="text-ink-900"
      />

      {/* The ten services; header dropdown links to each card by slug */}
      <ServiceCardGrid
        badge={t("catalog.badge")}
        title={t("catalog.title")}
        subtitle={t("catalog.subtitle")}
        anchorIds
      />

      {/* Numbered disciplines */}
      <section className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-20 md:pt-24">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="display-heading text-3xl md:text-[2.35rem] text-foreground mb-4 leading-tight">
              {t("page.disciplinesTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-[1.05rem]">
              {t("page.disciplinesSubtitle")}
            </p>
          </motion.div>
        </div>
        {DISCIPLINE_KEYS.map((key, index) => {
          const reversed = index % 2 === 1;
          const bullets = t.raw(`disciplines.${key}.bullets`) as string[];

          return (
            <motion.div
              key={key}
              {...fadeUp}
              className="border-b border-border/60"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                  <div className={reversed ? "lg:order-2" : undefined}>
                    <span className="display-heading text-5xl md:text-6xl text-primary leading-none mb-6 block">
                      {key}
                    </span>
                    <h2 className="display-heading text-3xl md:text-4xl text-foreground mb-5 leading-tight">
                      {t(`disciplines.${key}.title`)}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-base max-w-lg">
                      {t(`disciplines.${key}.desc`)}
                    </p>
                  </div>

                  <div className={reversed ? "lg:order-1 lg:pt-[4.75rem]" : "lg:pt-[4.75rem]"}>
                    <ServiceBulletList bullets={bullets} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* How we work */}
      <ProcessTimeline />

      {/* Services in practice */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div {...fadeUp} className="mb-12 md:mb-14">
            <h2 className="display-heading text-3xl md:text-[2.35rem] text-foreground leading-tight">
              {t("page.inPracticeTitle")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IN_PRACTICE_KEYS.map((key, i) => (
              <motion.div
                key={key}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col"
              >
                <CaseStudyPreviewImage
                  src={inPracticeImages[key].image}
                  alt={t(`inPractice.${key}.imageAlt`)}
                  className="mb-5 group-hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)] transition-shadow"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                  {t(`inPractice.${key}.tag`)}
                </span>
                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t(`inPractice.${key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {t(`inPractice.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-10">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all"
            >
              {t("page.viewCaseStudies")} <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-14 md:py-16"
            style={{
              background: "linear-gradient(135deg, #ea430c 0%, #c2310c 55%, #9a2812 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse 50% 80% at 85% 50%, rgba(255,255,255,0.35) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="display-heading text-3xl md:text-4xl text-white mb-3">
                  {t("page.ctaTitle")}
                </h2>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {t("page.ctaSubtitle")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-foreground hover:bg-white/90 transition-colors"
                  data-testid="services-cta-book"
                >
                  {tCommon("getInTouch")} <ArrowRight size={16} />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15 transition-colors"
                >
                  {tCommon("sendMessage")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
