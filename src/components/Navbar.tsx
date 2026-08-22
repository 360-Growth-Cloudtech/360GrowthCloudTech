"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { Magnetic } from "@/components/motion";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("common.nav");
  const tCta = useTranslations("common.ctas");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { setOpen } = useScheduleMeeting();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/services", label: t("services"), testId: "nav-link-services" },
    { href: "/case-studies", label: t("work"), testId: "nav-link-work" },
    { href: "/contact", label: t("contact"), testId: "nav-link-contact-us" },
  ] as const;

  return (
    <motion.nav
      className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2"
      data-testid="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`floating-nav flex items-center justify-between gap-2 ${
          scrolled ? "is-scrolled px-4 py-2" : "px-4 py-2.5"
        }`}
      >
        <Link href="/" className="group flex shrink-0 items-center gap-2" data-testid="nav-logo-link">
          <motion.span
            className="inline-flex shrink-0"
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 320, damping: 14 }}
          >
            <Image src="/logo.png" alt="" width={35} height={35} className="h-8 w-auto" priority />
          </motion.span>
          <span className="hidden text-sm font-bold leading-none tracking-tight text-foreground transition-colors group-hover:text-primary sm:block">
            {t("brandShort")}
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map(({ href, label, testId }) => (
            <Link
              key={href}
              href={href}
              data-testid={testId}
              className={`nav-link rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                isActive(href) ? "text-primary is-active" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <button
            onClick={() => setOpen(true)}
            data-testid="nav-link-schedule-meeting"
            className="nav-link hidden px-3 text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground md:block"
          >
            {t("bookCall")}
          </button>
          <Magnetic strength={8}>
            <Link
              href="/contact"
              data-testid="nav-cta-button"
              className="btn-dark rounded-full text-sm"
              style={{ fontSize: "0.82rem", padding: "8px 18px" }}
            >
              {t("getStarted")}
            </Link>
          </Magnetic>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/6 md:hidden"
            data-testid="nav-mobile-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mt-2 overflow-hidden rounded-3xl border border-border bg-white/95 shadow-xl backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -12, height: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-1 px-4 py-5">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive(href)
                      ? "text-primary"
                      : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setOpen(true);
                  }}
                  className="btn-primary w-full rounded-full text-sm"
                >
                  {t("bookFreeCall")}
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
    </motion.nav>
  );
}
