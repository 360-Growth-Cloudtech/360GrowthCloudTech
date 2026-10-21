"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/motion";

/** Centered badge + H2 + subtitle used at the top of page sections. */
export function SectionIntro({ badge, title, subtitle }: { badge: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="text-center max-w-3xl mx-auto mb-14">
      <span className="section-label mb-4 inline-flex">{badge}</span>
      <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </Reveal>
  );
}

/** Visible breadcrumb row under the hero; the BreadcrumbList JSON-LD is emitted by each route. */
export function Breadcrumb({ homeLabel, current }: { homeLabel: string; current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-white">
      <ol className="container mx-auto flex items-center gap-1.5 px-4 pt-2 text-sm text-slate-500 sm:px-6 lg:px-8">
        <li><Link href="/" className="hover:text-primary">{homeLabel}</Link></li>
        <li aria-hidden><ChevronRight size={14} /></li>
        <li aria-current="page" className="font-semibold text-slate-800">{current}</li>
      </ol>
    </nav>
  );
}

/** FAQ accordion. Answers stay in the DOM (collapsed with CSS) so crawlers can read them. */
export function FaqAccordion({ id, items }: { id: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-4xl space-y-3">
      {items.map((faq, idx) => {
        const isOpen = open === idx;
        return (
          <div key={faq.q} className="overflow-hidden rounded-2xl border border-border/80 bg-white text-left">
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : idx)}
                aria-expanded={isOpen}
                aria-controls={`${id}-faq-${idx}`}
                className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-foreground transition-colors hover:bg-slate-50 sm:text-base"
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div
              id={`${id}-faq-${idx}`}
              className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="border-t border-border/40 px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
