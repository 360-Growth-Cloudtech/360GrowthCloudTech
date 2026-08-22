"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { DISCIPLINE_KEYS } from "@/lib/services-data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

function AboutSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section {...fadeUp} className="border-t border-border/60 py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] gap-8 lg:gap-16 items-start">
        <h2 className="display-heading text-2xl md:text-3xl text-foreground leading-snug lg:sticky lg:top-28">
          {title}
        </h2>
        <div className="text-muted-foreground leading-relaxed text-base md:text-[1.05rem] space-y-5 [&_p]:leading-relaxed">
          {children}
        </div>
      </div>
    </motion.section>
  );
}

export default function About() {
  const t = useTranslations("about");
  const tCta = useTranslations("common.ctas");
  const tDisciplines = useTranslations("services.disciplines");
  const { setOpen } = useScheduleMeeting();
  const disciplines = DISCIPLINE_KEYS.map((key) => tDisciplines(`${key}.title`)).join(", ");
  const howWeWorkParagraphs = t.raw("sections.howWeWork.paragraphs") as string[];

  return (
    <div data-testid="about-page" className="bg-background">
      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-8"
          >
            {t("page.label")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="display-heading text-4xl md:text-5xl lg:text-[3.25rem] text-foreground leading-[1.12] max-w-4xl mb-8"
          >
            {t("page.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-3xl"
          >
            {t("page.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Content sections */}
      <section className="pb-8 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <AboutSection title={t("sections.howWeWork.title")}>
            {howWeWorkParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </AboutSection>

          <AboutSection title={t("sections.whatWeShip.title")}>
            <p>{t("sections.whatWeShip.paragraph", { disciplines })}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-white hover:bg-foreground/90 transition-colors"
              >
                {tCta("seeServicesDetail")}
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/80 px-5 py-2.5 text-sm font-bold text-foreground hover:border-primary/30 hover:text-primary transition-colors"
              >
                {tCta("recentProjects")} <ArrowRight size={15} />
              </Link>
            </div>
          </AboutSection>

          <AboutSection title={t("sections.team.title")}>
            {(t.raw("sections.team.paragraphs") as string[]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="pt-2">
              <p className="font-bold text-foreground text-base mb-0.5">{t("sections.team.companyName")}</p>
              <p className="text-sm text-muted-foreground">{t("sections.team.companyTagline")}</p>
            </div>
          </AboutSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            {...fadeUp}
            className="rounded-3xl px-8 py-12 md:px-12 md:py-14"
            style={{ backgroundColor: "#1a1512" }}
          >
            <h2 className="display-heading text-3xl md:text-4xl text-white mb-4">{t("cta.title")}</h2>
            <p className="text-base leading-relaxed max-w-2xl mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="btn-primary rounded-full"
                data-testid="about-cta-conversation"
              >
                {tCta("startConversation")}
              </button>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold text-white/80 hover:text-white transition-colors"
              >
                {tCta("viewServicesLink")} <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
