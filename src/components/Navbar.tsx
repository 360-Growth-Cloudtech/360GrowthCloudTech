"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { Magnetic } from "@/components/motion";

export function Navbar() {
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

  return (
    <motion.nav
      className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
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
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group" data-testid="nav-logo-link">
          <motion.span
            className="inline-flex"
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 320, damping: 14 }}
          >
            <Image src="/logo.png" alt="360 cloud tech" width={35} height={35} className="h-8 w-auto" priority />
          </motion.span>
        </Link>

        {/* Desktop nav links — center */}
        <div className="hidden md:flex items-center gap-0.5">
          {[
            { href: "/services", label: "Services", testId: "nav-link-services" },
            { href: "/case-studies", label: "Work", testId: "nav-link-work" },
            { href: "/contact", label: "Contact", testId: "nav-link-contact-us" },
          ].map(({ href, label, testId }) => (
            <Link
              key={href}
              href={href}
              data-testid={testId}
              className={`nav-link px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                isActive(href) ? "text-primary is-active" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            data-testid="nav-link-schedule-meeting"
            className="nav-link hidden md:block text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors px-3"
          >
            Book a call
          </button>
          <Magnetic strength={8}>
            <Link
              href="/contact"
              data-testid="nav-cta-button"
              className="btn-dark text-sm rounded-full"
              style={{ fontSize: "0.82rem", padding: "8px 18px" }}
            >
              Get started
            </Link>
          </Magnetic>
          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-foreground hover:bg-foreground/6 transition-colors"
            data-testid="nav-mobile-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden mt-2 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-xl border border-border shadow-xl"
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -12, height: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {[
                { href: "/services", label: "Services" },
                { href: "/case-studies", label: "Work" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(href)
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <button onClick={() => { setMobileMenuOpen(false); setOpen(true); }} className="btn-primary w-full rounded-full text-sm">
                  Book a Free Call
                </button>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="btn-outline w-full rounded-full text-sm text-center">
                  Send a Message
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
