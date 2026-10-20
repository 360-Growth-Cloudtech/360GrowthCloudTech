"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowUp, CalendarDays, Clock3, Mail, MessageCircle, Phone, Star, MapPin } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, CONTACT_WHATSAPP_URL } from "@/lib/contact";
import { FOOTER_SERVICE_SLUGS, SERVICE_PAGE_SLUGS, SERVICE_SLUGS, isCatalogService, serviceHref } from "@/lib/service-catalog";
import { INDUSTRY_SLUGS, announceHashNav, industryHref } from "@/lib/industry-catalog";

/** Profiles appear only once their URL is configured, so the footer never shows dead links. */
const SOCIALS = [
  { key: "linkedin", url: process.env.NEXT_PUBLIC_LINKEDIN_URL, icon: FaLinkedinIn },
  { key: "clutch", url: process.env.NEXT_PUBLIC_CLUTCH_URL, icon: Star },
  { key: "google", url: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL, icon: MapPin },
].filter((s): s is { key: string; url: string; icon: typeof Star } => Boolean(s.url));

const linkClass = "group inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white";

function FooterLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className={linkClass}>
      <span className="h-px w-0 bg-brand-400 transition-all duration-300 group-hover:w-3" aria-hidden />
      {children}
    </Link>
  );
}

export function Footer() {
  const t = useTranslations("common.footer");
  const tBrand = useTranslations("common.brand");
  const tSocial = useTranslations("common.social");
  const tServices = useTranslations("services.catalog");
  const tMenu = useTranslations("services.menu.items");
  const tIndustries = useTranslations("industries.catalog");
  const { setOpen } = useScheduleMeeting();

  const contacts = [
    { icon: Mail, label: t("emailLabel"), value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: Phone, label: t("phoneLabel"), value: CONTACT_PHONE, href: CONTACT_PHONE_TEL },
    { icon: MessageCircle, label: t("whatsappLabel"), value: CONTACT_PHONE, href: CONTACT_WHATSAPP_URL, external: true },
    { icon: Clock3, label: t("hoursLabel"), value: t("hours") },
  ];

  return (
    <footer data-testid="footer" className="relative overflow-hidden bg-ink-950 pt-16 text-white md:pt-20">
      {/* Warm glow behind the CTA */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96"
        style={{ background: "radial-gradient(ellipse 50% 70% at 50% 0%, rgba(249,93,22,0.18) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA band */}
        <div
          className="relative mb-16 overflow-hidden rounded-3xl px-6 py-10 sm:px-10 md:px-14 md:py-12"
          style={{ background: "linear-gradient(120deg, #f95d16 0%, #ea430c 55%, #c2310c 100%)" }}
          data-testid="footer-schedule-card"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[28px] border-white/10" aria-hidden />
          <div className="pointer-events-none absolute -bottom-28 right-40 h-56 w-56 rounded-full border-[20px] border-amber-300/20" aria-hidden />
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
                {t("ctaEyebrow")}
              </span>
              <h3 className="display-heading mb-3 text-2xl text-white sm:text-3xl md:text-4xl">{t("scheduleTitle")}</h3>
              <p className="text-sm leading-relaxed text-white/85 sm:text-base">{t("scheduleDesc")}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-700 shadow-xl shadow-black/15 transition-transform hover:-translate-y-0.5"
                data-testid="footer-schedule-btn"
              >
                <CalendarDays size={16} /> {t("scheduleMeeting")}
              </button>
              <a
                href={CONTACT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                data-testid="footer-send-message-btn"
              >
                <MessageCircle size={16} /> {t("sendMessage")}
              </a>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="mb-5 flex w-fit items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-white/10">
                <Image src="/logo.png" alt={tBrand("logoAlt")} width={48} height={32} className="h-auto w-10" />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-extrabold tracking-tight">{t("brandName")}</span>
                <span className="block text-xs font-semibold text-brand-400">{tBrand("tagline")}</span>
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/55">{t("tagline")}</p>

            <ul className="grid max-w-sm grid-cols-1 gap-2.5">
              {contacts.map(({ icon: Icon, label, value, href, external }) => {
                const inner = (
                  <>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-brand-400 ring-1 ring-white/10 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <Icon size={15} />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">{label}</span>
                      <span className="block text-sm font-semibold text-white/85 group-hover:text-white">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-3"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-3">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            {SOCIALS.length > 0 && (
              <div className="mt-6 flex items-center gap-2">
                <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-white/40">{t("followUs")}</span>
                {SOCIALS.map(({ key, url, icon: Icon }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tSocial(key)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/70 ring-1 ring-white/10 transition-colors hover:bg-brand-500 hover:text-white"
                    data-testid={`social-${key}`}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-white">{t("services")}</h4>
            <ul className="space-y-3">
              {/* Key service pages first, then catalog services without a page to fill seven slots */}
              {FOOTER_SERVICE_SLUGS.map((slug) => (
                <li key={slug}>
                  <FooterLink href={serviceHref(slug)}>
                    {isCatalogService(slug) ? tServices(`items.${slug}.title`) : tMenu(slug)}
                  </FooterLink>
                </li>
              ))}
              {SERVICE_SLUGS.filter((slug) => !(SERVICE_PAGE_SLUGS as readonly string[]).includes(slug))
                .slice(0, Math.max(0, 7 - FOOTER_SERVICE_SLUGS.length))
                .map((slug) => (
                <li key={slug}>
                  <FooterLink href={serviceHref(slug)}>{tServices(`items.${slug}.title`)}</FooterLink>
                </li>
              ))}
              <li>
                <Link href="/services" className="inline-flex items-center gap-1 text-sm font-bold text-brand-400 hover:text-brand-300">
                  {t("links.services")} <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-white">{t("industries")}</h4>
            <ul className="space-y-3">
              {INDUSTRY_SLUGS.map((slug) => (
                <li key={slug}>
                  <FooterLink href={industryHref(slug)} onClick={() => announceHashNav(industryHref(slug))}>
                    {tIndustries(`${slug}.name`)}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-white">{t("company")}</h4>
            <ul className="space-y-3">
              <li><FooterLink href="/about">{t("links.about")}</FooterLink></li>
              <li><FooterLink href="/case-studies">{t("links.work")}</FooterLink></li>
              <li><FooterLink href="/industries">{t("links.industries")}</FooterLink></li>
              <li><FooterLink href="/contact">{t("links.contact")}</FooterLink></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 md:flex-row">
          <p className="text-xs text-white/40">{t("copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/40">
            <Link href="/privacy-policy" className="transition-colors hover:text-white" data-testid="footer-privacy">
              {t("privacy")}
            </Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-white" data-testid="footer-terms">
              {t("terms")}
            </Link>
            <Link href="/cookies-policy" className="transition-colors hover:text-white" data-testid="footer-cookies">
              {t("cookies")}
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-white/60 transition-colors hover:border-brand-400 hover:text-white"
            >
              <ArrowUp size={12} /> {t("backToTop")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
