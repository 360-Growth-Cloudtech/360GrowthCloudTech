"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { IndustryShowcase } from "@/components/IndustryShowcase";
import { PageHero } from "@/components/PageHero";
import { INDUSTRY_SLUGS, announceHashNav, industryAnchor, industryMeta } from "@/lib/industry-catalog";
import { caseStudyMeta } from "@/lib/case-studies-meta";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function Industries() {
  const t = useTranslations("industries");
  const tCta = useTranslations("common.ctas");

  const stats = [
    { value: String(INDUSTRY_SLUGS.length), label: t("page.statIndustries") },
    { value: String(caseStudyMeta.length), label: t("page.statProjects") },
    { value: t("page.statComplianceValue"), label: t("page.statCompliance") },
  ];

  return (
    <>
      <PageHero
        label={t("page.label")}
        title={t("page.title")}
        highlight={t("page.titleHighlight")}
        subtitle={t("page.subtitle")}
      >
          {/* Industry chips jump straight to that tab */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.18 }} className="mb-12 flex flex-wrap justify-center gap-2.5">
            {INDUSTRY_SLUGS.map((slug) => {
              const Icon = industryMeta[slug].icon;
              return (
                <a
                  key={slug}
                  href={`#${industryAnchor(slug)}`}
                  onClick={() => {
                    // Lenis handles the scroll but doesn't touch the URL; tell the showcase directly.
                    window.history.replaceState(null, "", `#${industryAnchor(slug)}`);
                    announceHashNav(`#${industryAnchor(slug)}`);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  <Icon size={15} className="text-brand-500" />
                  {t(`catalog.${slug}.name`)}
                </a>
              );
            })}
          </motion.div>

          <motion.dl
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mx-auto grid max-w-3xl grid-cols-1 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-extrabold tracking-tight text-slate-900">{stat.value}</dd>
                <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
      </PageHero>

      <IndustryShowcase
        badge={t("page.showcaseBadge")}
        title={t("page.showcaseTitle")}
        subtitle={t("page.showcaseSubtitle")}
        syncHash
      />

      {/* CTA */}
      <section className="bg-white pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-8 py-14 text-center"
            style={{ background: "linear-gradient(135deg, #f95d16 0%, #ea430c 50%, #7c2412 100%)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ShieldCheck className="mx-auto mb-4 text-white/80" size={32} />
            <h2 className="display-heading mb-4 text-2xl text-white md:text-4xl">{t("cta.title")}</h2>
            <p className="mx-auto mb-8 max-w-md text-sm text-white/75">{t("cta.subtitle")}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-foreground hover:bg-white/90">
              {tCta("letsTalk")} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
