"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { CaseStudyPreviewImage } from "@/components/CaseStudyPreviewImage";
import {
  DISCIPLINE_KEYS,
  IN_PRACTICE_KEYS,
  PROCESS_STEP_KEYS,
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
      {/* Hero */}
      <section className="relative min-h-[72vh] flex items-center justify-center py-32 overflow-hidden">
        <Image
          src="/services/cloud-platform.png"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="object-cover object-center scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,21,18,0.55) 0%, rgba(26,21,18,0.88) 45%, #1a1512 100%), radial-gradient(ellipse 70% 55% at 50% 35%, rgba(232,82,26,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-6"
          >
            {t("page.label")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="display-heading text-4xl md:text-5xl lg:text-[3.4rem] text-white leading-[1.1] mb-6"
          >
            {t("page.titleLine1")}
            <br />
            {t("page.titleLine2")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {t("page.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Numbered disciplines */}
      <section className="bg-background">
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

      {/* Process */}
      <section className="py-20 md:py-28 bg-[#f5f0e8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div {...fadeUp} className="mb-14 md:mb-16 max-w-3xl">
            <h2 className="display-heading text-3xl md:text-[2.35rem] text-foreground mb-4 leading-tight">
              {t("page.processTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-[1.05rem]">
              {t("page.processSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 lg:gap-y-14">
            {PROCESS_STEP_KEYS.map((key, i) => (
              <motion.div
                key={key}
                {...fadeUp}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="h-2 w-2 shrink-0 rounded-[2px] bg-primary" aria-hidden />
                  <span className="text-sm font-bold tabular-nums tracking-wide text-primary">
                    {key}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3 leading-snug">
                  {t(`process.${key}.title`)}
                </h3>
                <p className="text-sm md:text-[0.9375rem] text-muted-foreground leading-relaxed">
                  {t(`process.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                  className="mb-5 group-hover:shadow-[0_16px_48px_rgba(26,21,18,0.12)] transition-shadow"
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
              background: "linear-gradient(135deg, #e8521a 0%, #c43d0f 55%, #a83208 100%)",
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
