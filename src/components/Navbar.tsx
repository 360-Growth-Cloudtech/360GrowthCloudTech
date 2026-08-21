"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { Magnetic } from "@/components/motion";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { setOpen } = useScheduleMeeting();

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const goingDown = current > lastScrollY.current;
      setScrolled(current > 16);
      // Hide while scrolling down; reveal on scroll up or near top
      if (mobileMenuOpen) {
        setHidden(false);
      } else if (current < 48) {
        setHidden(false);
      } else if (goingDown && current - lastScrollY.current > 4) {
        setHidden(true);
        setServicesDropdownOpen(false);
      } else if (!goingDown && lastScrollY.current - current > 4) {
        setHidden(false);
      }
      lastScrollY.current = current;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setHidden(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <motion.nav
      className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl"
      data-testid="navbar"
      initial={{ y: -80, opacity: 0, x: "-50%" }}
      animate={{
        y: hidden ? -120 : 0,
        opacity: hidden ? 0 : 1,
        x: "-50%",
        pointerEvents: hidden ? "none" : "auto",
      }}
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
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              data-testid="nav-link-services"
              className={`nav-link flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                isActive("/services") || isActive("/industries")
                  ? "text-primary is-active"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Services
              <ChevronDown
                size={13}
                className={`transition-transform duration-300 ${servicesDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  className="absolute top-full left-0 pt-2 w-44"
                  data-testid="nav-dropdown-services"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-border/60 overflow-hidden p-1.5 flex flex-col gap-0.5">
                    <Link href="/services" className="px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-primary/8 hover:text-primary rounded-xl transition-colors">
                      All Services
                    </Link>
                    <Link href="/industries" className="px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-primary/8 hover:text-primary rounded-xl transition-colors">
                      Industries
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[
            { href: "/about", label: "About", testId: "nav-link-about-us" },
            { href: "/insights", label: "Insights", testId: "nav-link-insights" },
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
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 px-3">Services</p>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary rounded-xl hover:bg-primary/5 transition-colors">All Services</Link>
              <Link href="/industries" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary rounded-xl hover:bg-primary/5 transition-colors">Industries</Link>
              <div className="my-2 border-t border-border/50" />
              {[
                { href: "/about", label: "About Us" },
                { href: "/insights", label: "Insights" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isActive(href) ? "text-primary" : "text-foreground/80 hover:text-primary hover:bg-primary/5"}`}>
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
