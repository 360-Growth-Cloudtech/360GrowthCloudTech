"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { HeroBackdrop } from "@/components/HeroBackdrop";

interface PageHeroProps {
  label?: string;
  title: string;
  /** Words shown in the brand gradient after `title`. Defaults to the title's last word. */
  highlight?: string;
  subtitle?: string;
  /** Text-colour class for the wave; match the section that follows (default: page background). */
  waveClassName?: string;
  children?: ReactNode;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Splits "Privacy Policy" into ["Privacy", "Policy"] so the last word can be highlighted. */
function splitTitle(title: string, highlight?: string): [string, string] {
  if (highlight !== undefined) return [title, highlight];
  const i = title.trim().lastIndexOf(" ");
  return i === -1 ? ["", title] : [title.slice(0, i), title.slice(i + 1)];
}

/** Inner-page banner: ink backdrop, gradient keyword, accent bar and a wave into the page. */
export function PageHero({
  label,
  title,
  highlight,
  subtitle,
  waveClassName = "text-background",
  children,
}: PageHeroProps) {
  const [lead, accent] = splitTitle(title, highlight);

  return (
    <section className="relative overflow-hidden pb-28 pt-32 text-center md:pb-36 md:pt-48" data-testid="page-hero">
      <HeroBackdrop />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-700 shadow-sm backdrop-blur"
          >
            {label}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
          className="display-heading mx-auto max-w-4xl text-4xl leading-[1.06] text-slate-900 md:text-6xl lg:text-7xl"
        >
          {lead && <>{lead} </>}
          <span className="bg-gradient-to-r from-amber-500 via-brand-500 to-brand-600 bg-clip-text text-transparent">{accent}</span>
        </motion.h1>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mx-auto mt-7 block h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-brand-500"
          aria-hidden
        />
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>

      {/* Wave into the page below */}
      <svg
        className={`absolute inset-x-0 bottom-[-1px] h-16 w-full md:h-24 ${waveClassName}`}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path fill="currentColor" d="M0,64 C240,120 480,8 720,40 C960,72 1200,112 1440,48 L1440,120 L0,120 Z" />
      </svg>
    </section>
  );
}
