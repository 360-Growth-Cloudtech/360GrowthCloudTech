"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Clock3,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { SERVICE_MENU_GROUPS, isCatalogService, serviceHref } from "@/lib/service-catalog";
import { INDUSTRY_SLUGS, announceHashNav, industryHref, industryMeta } from "@/lib/industry-catalog";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, CONTACT_WHATSAPP_URL } from "@/lib/contact";

type MenuItem = { href: string; label: string; icon: LucideIcon; /** Short helper line under the label. */ desc?: string };

type MenuGroup = { id: string; title: string; items: { href: string; label: string }[] };

type NavMenu = {
  label: string;
  href: string;
  testId: string;
  menuLabel: string;
  allLabel: string;
  items: MenuItem[];
  /** When set, the menu renders as a multi-column mega menu instead of `items`. */
  groups?: MenuGroup[];
};

const pillClass = (active: boolean) =>
  `inline-flex items-center gap-1 rounded-full px-4 py-2 text-[0.94rem] font-semibold transition-all ${
    active
      ? "bg-white text-brand-600 shadow-sm ring-1 ring-black/5"
      : "text-slate-700 hover:bg-white/70 hover:text-slate-900"
  }`;

function NavDropdown({ menu, active }: { menu: NavMenu; active: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // Small delay so the pointer can travel from the trigger into the panel.
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const choose = (href: string) => {
    setOpen(false);
    announceHashNav(href);
  };

  const mega = Boolean(menu.groups?.length);

  return (
    <div
      // A mega menu is positioned against the whole <nav> so it can be wider than the pill.
      className={mega ? undefined : "relative"}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href={menu.href}
        data-testid={menu.testId}
        aria-haspopup="true"
        aria-expanded={open}
        className={pillClass(active || open)}
      >
        {menu.label}
        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 ${
              mega ? "w-[min(960px,calc(100vw-2rem))]" : "w-[min(640px,calc(100vw-2rem))]"
            }`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-slate-900/10">
              {mega ? (
                <div className="grid grid-cols-3 gap-8 p-6" aria-label={menu.menuLabel}>
                  {menu.groups!.map((group) => (
                    <div key={group.id}>
                      <p className="mb-3 border-b border-border pb-2.5 text-base font-bold text-brand-600">
                        {group.title}
                      </p>
                      <ul className="space-y-0.5">
                        {group.items.map(({ href, label }) => (
                          <li key={href}>
                            <Link
                              href={href}
                              onClick={() => choose(href)}
                              className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:bg-brand-50 focus-visible:outline-none"
                            >
                              <ChevronRight size={14} className="shrink-0 text-slate-400 group-hover:text-brand-600" />
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
              <ul className="grid grid-cols-2 gap-1.5 p-4" aria-label={menu.menuLabel}>
                {menu.items.map(({ href, label, desc, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => choose(href)}
                      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-500 group-hover:text-white group-hover:ring-brand-500">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold leading-snug text-slate-800 group-hover:text-brand-700">
                          {label}
                        </span>
                        {desc && <span className="mt-0.5 block text-xs leading-snug text-slate-500">{desc}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              )}
              <Link
                href={menu.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-t border-border bg-brand-50/60 px-6 py-3 text-sm font-bold text-brand-700 hover:bg-brand-50"
              >
                {menu.allLabel}
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavGroup({
  menu,
  active,
  onNavigate,
}: {
  menu: NavMenu;
  active: boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[0.95rem] font-semibold transition-colors ${
          active ? "bg-brand-50 text-brand-700" : "text-slate-800 hover:bg-slate-50"
        }`}
      >
        {menu.label}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="mb-1 ml-3 border-l-2 border-brand-100 pl-2" aria-label={menu.menuLabel}>
          {menu.groups?.map((group) => (
            <li key={group.id} className="mt-1">
              <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-brand-600">{group.title}</p>
              <ul>
                {group.items.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => {
                        onNavigate();
                        announceHashNav(href);
                      }}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          {!menu.groups && menu.items.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => {
                  onNavigate();
                  announceHashNav(href);
                }}
                className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href={menu.href} onClick={onNavigate} className="block rounded-lg px-3 py-2 text-sm font-bold text-brand-700">
              {menu.allLabel}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export function Navbar() {
  const t = useTranslations("common.nav");
  const tTop = useTranslations("common.topbar");
  const tCta = useTranslations("common.ctas");
  const tServices = useTranslations("services");
  const tIndustries = useTranslations("industries.catalog");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { setOpen } = useScheduleMeeting();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const menus: NavMenu[] = [
    {
      label: t("services"),
      href: "/services",
      testId: "nav-link-services",
      menuLabel: t("servicesMenu"),
      allLabel: t("allServices"),
      items: [],
      groups: SERVICE_MENU_GROUPS.map((group) => ({
        id: group.id,
        title: tServices(`menu.groups.${group.id}`),
        items: group.items.map((slug) => ({
          href: serviceHref(slug),
          label: isCatalogService(slug)
            ? tServices(`catalog.items.${slug}.title`)
            : tServices(`menu.items.${slug}`),
        })),
      })),
    },
    {
      label: t("industries"),
      href: "/industries",
      testId: "nav-link-industries",
      menuLabel: t("industriesMenu"),
      allLabel: t("allIndustries"),
      items: INDUSTRY_SLUGS.map((slug) => ({
        href: industryHref(slug),
        label: tIndustries(`${slug}.name`),
        desc: tIndustries(`${slug}.menuDesc`),
        icon: industryMeta[slug].icon,
      })),
    },
  ];

  const navLinks = [
    { href: "/case-studies", label: t("work"), testId: "nav-link-work" },
    { href: "/about", label: t("about"), testId: "nav-link-about" },
    { href: "/contact", label: t("contact"), testId: "nav-link-contact-us" },
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50" data-testid="navbar">
      {/* Utility bar: collapses once the visitor scrolls */}
      <div
        className={`hidden overflow-hidden bg-ink-900 text-[0.8rem] text-white/75 transition-[height] duration-300 md:block ${
          scrolled ? "h-0" : "h-10"
        }`}
      >
        <div className="container mx-auto flex h-10 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" />
              {tTop("studio")}
            </span>
            <span className="hidden items-center gap-1.5 lg:inline-flex">
              <Clock3 size={14} className="text-amber-400" />
              {tTop("reply")}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href={CONTACT_PHONE_TEL} className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
              <Phone size={13} className="text-amber-400" />
              {CONTACT_PHONE}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hidden items-center gap-1.5 transition-colors hover:text-white lg:inline-flex">
              <Mail size={13} className="text-amber-400" />
              {CONTACT_EMAIL}
            </a>
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-semibold text-white transition-colors hover:bg-brand-600"
            >
              <MessageCircle size={13} />
              {tTop("whatsapp")}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b bg-white/95 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? "border-border shadow-lg shadow-slate-900/5" : "border-transparent"
        }`}
      >
        <div className="container mx-auto flex h-[4.5rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex shrink-0 items-center gap-3" data-testid="nav-logo-link">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-brand-100 transition-transform group-hover:rotate-[-6deg]">
              <Image src="/logo.png" alt="" width={44} height={30} className="h-auto w-9" priority />
            </span>
            <span className="leading-tight">
              <span className="block text-[1.05rem] font-extrabold tracking-tight text-slate-900">{t("brandName")}</span>
              <span className="block text-xs font-semibold text-brand-600">{t("tagline")}</span>
            </span>
          </Link>

          <nav className="relative hidden items-center gap-0.5 rounded-full border border-slate-200 bg-slate-100/70 p-1 lg:flex" aria-label="Main">
            {menus.map((menu) => (
              <NavDropdown key={menu.href} menu={menu} active={isActive(menu.href)} />
            ))}
            {navLinks.map(({ href, label, testId }) => (
              <Link key={href} href={href} data-testid={testId} className={pillClass(isActive(href))}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={CONTACT_PHONE_TEL} className="group hidden items-center gap-3 xl:flex" data-testid="nav-call">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-200">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-200/60 [animation-duration:2.4s]" aria-hidden />
                <Phone size={18} className="relative" />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">{t("callLabel")}</span>
                <span className="block text-[0.95rem] font-extrabold text-slate-900 group-hover:text-brand-600">{CONTACT_PHONE}</span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              data-testid="nav-cta-button"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/30 ring-4 ring-brand-100 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/40 sm:inline-flex"
            >
              {t("getQuote")}
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileMenuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-800 transition-colors hover:bg-slate-50 lg:hidden"
              data-testid="nav-mobile-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mx-3 mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-3xl border border-border bg-white shadow-2xl lg:hidden"
            data-lenis-prevent
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-1 px-4 py-5">
              {menus.map((menu) => (
                <MobileNavGroup
                  key={menu.href}
                  menu={menu}
                  active={isActive(menu.href)}
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              ))}
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-[0.95rem] font-semibold transition-colors ${
                    isActive(href) ? "bg-brand-50 text-brand-700" : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <a href={CONTACT_PHONE_TEL} className="mt-2 flex items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3">
                <Phone size={18} className="text-brand-600" />
                <span className="leading-tight">
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-wider text-slate-500">{t("callLabel")}</span>
                  <span className="block font-extrabold text-slate-900">{CONTACT_PHONE}</span>
                </span>
              </a>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setOpen(true);
                  }}
                  className="btn-primary w-full rounded-full text-sm"
                >
                  {t("getQuote")}
                </button>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-outline w-full rounded-full text-center text-sm"
                >
                  {tCta("sendMessage")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
