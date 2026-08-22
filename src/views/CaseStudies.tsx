"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CaseStudyPreviewImage } from "@/components/CaseStudyPreviewImage";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

export default function CaseStudies() {
  return (
    <div data-testid="case-studies-page" className="bg-background min-h-screen">
      {/* Hero */}
      <section className="pt-36 pb-14 md:pt-40 md:pb-20 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-8"
          >
            Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="display-heading text-4xl md:text-5xl lg:text-[3.35rem] text-foreground leading-[1.1] max-w-4xl mb-8"
          >
            Case studies from products that ship.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-3xl"
          >
            Real builds from the 360GrowthCloudTech team — healthcare workflows, e-commerce,
            education, architecture, and travel ops — and the engineering decisions behind them.
          </motion.p>
        </div>
      </section>

      {/* List */}
      <section className="py-4 md:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.slug}
              {...fadeUp}
              transition={{ delay: index * 0.04 }}
              className="border-b border-border/60 py-12 md:py-14 last:border-b-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(240px,340px)] gap-8 md:gap-10 lg:gap-14 items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] mb-5">
                    <span className="text-primary">{study.category}</span>
                    <span className="text-muted-foreground/50 mx-2">·</span>
                    <span className="text-muted-foreground">{study.date}</span>
                    <span className="text-muted-foreground/50 mx-2">·</span>
                    <span className="text-muted-foreground">{study.readTime}</span>
                  </p>
                  <h2 className="display-heading text-2xl md:text-[1.75rem] text-foreground leading-snug mb-4 max-w-2xl">
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {study.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-base max-w-2xl mb-6">
                    {study.excerpt}
                  </p>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-primary transition-colors group"
                  >
                    Read the case study
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>

                <Link
                  href={`/case-studies/${study.slug}`}
                  className="block md:mt-6 hover:opacity-[0.98] transition-opacity"
                >
                  <CaseStudyPreviewImage
                    src={study.image}
                    alt={study.imageAlt}
                    priority={index < 2}
                    variant={study.imageVariant}
                  />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
