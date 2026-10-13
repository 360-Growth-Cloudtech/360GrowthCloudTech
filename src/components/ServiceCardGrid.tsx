"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/motion";
import { SERVICE_SLUGS, serviceHref, serviceIcons, type ServiceSlug } from "@/lib/service-catalog";

type ServiceCardGridProps = {
  badge: string;
  title: string;
  subtitle?: string;
  /** Cards link to their section on /services (use on pages other than /services). */
  linkToDetails?: boolean;
  /** On /services each card is the anchor target for the header dropdown. */
  anchorIds?: boolean;
  footer?: ReactNode;
};

function CardBody({ slug }: { slug: ServiceSlug }) {
  const t = useTranslations("services.catalog");
  const Icon = serviceIcons[slug];

  return (
    <>
      {/* Accent bar that grows in on hover / when targeted from the header menu */}
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-amber-400 to-brand-600 transition-transform duration-300 group-hover:scale-x-100 group-target:scale-x-100" aria-hidden />
      <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-brand-600 group-hover:text-white group-hover:ring-0 group-hover:shadow-lg group-hover:shadow-brand-600/30 group-target:bg-gradient-to-br group-target:from-amber-400 group-target:to-brand-600 group-target:text-white group-target:ring-0">
        <Icon size={24} strokeWidth={1.8} />
      </span>
      <h3 className="mb-3 text-lg font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-brand-700 group-target:text-brand-700">
        {t(`items.${slug}.title`)}
      </h3>
      <p className="text-sm leading-relaxed text-slate-600">
        {t(`items.${slug}.desc`)}
      </p>
    </>
  );
}

const CARD_CLASS =
  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white p-6 text-left shadow-lg shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-950/40 target:border-brand-400 target:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300";

export function ServiceCardGrid({
  badge,
  title,
  subtitle,
  linkToDetails = false,
  anchorIds = false,
  footer,
}: ServiceCardGridProps) {
  const t = useTranslations("services.catalog");

  return (
    <section
      className="relative overflow-hidden py-20 md:py-24"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 85% 0%, rgba(249,93,22,0.22) 0%, transparent 70%), linear-gradient(160deg, #111521 0%, #1a1f2e 55%, #111521 100%)",
      }}
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-amber-200">
            {badge}
          </span>
          <h2 className="display-heading mb-4 text-3xl text-white sm:text-4xl md:text-5xl">{title}</h2>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              {subtitle}
            </p>
          )}
        </Reveal>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SERVICE_SLUGS.map((slug, i) => (
            <Reveal key={slug} delay={(i % 5) * 0.05} duration={0.5} className="h-full">
              {linkToDetails ? (
                <Link href={serviceHref(slug)} className={CARD_CLASS}>
                  <CardBody slug={slug} />
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-xs font-bold text-primary transition-all group-hover:gap-2">
                    {t("learnMore")} <ArrowRight size={13} />
                  </span>
                </Link>
              ) : (
                <article id={anchorIds ? slug : undefined} className={`${CARD_CLASS} scroll-mt-32`}>
                  <CardBody slug={slug} />
                </article>
              )}
            </Reveal>
          ))}
        </div>

        {footer && <div className="mt-12 text-center">{footer}</div>}
      </div>
    </section>
  );
}
