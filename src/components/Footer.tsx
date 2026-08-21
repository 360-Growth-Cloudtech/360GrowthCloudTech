"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, ArrowRight, CalendarDays, Send, Twitter, Facebook } from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";

export function Footer() {
  const { setOpen } = useScheduleMeeting();

  return (
    <footer data-testid="footer" style={{ backgroundColor: "#1a1512", color: "white" }}>


      {/* MAIN FOOTER */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <Image
                src="/logo.png"
                alt="360 cloud tech"
                width={40}
                height={40}
                className="h-10 w-auto brightness-0 invert shrink-0"
              />
              <span className="text-base font-bold text-white leading-snug">
                360 cloud tech
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Designing digital-first technologies for future growth — across software, cloud, security, and marketing.
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                <Mail size={13} /> hello@360cloudtech.com
              </li>
            </ul>
            <div className="flex gap-2">
              {[{ icon: Linkedin, label: "LinkedIn" }, { icon: Twitter, label: "Twitter" }, { icon: Facebook, label: "Facebook" }].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/15" style={{ background: "rgba(255,255,255,0.07)" }} data-testid={`social-${label.toLowerCase()}`}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5">Company</h4>
            <ul className="space-y-3">
              {[{ label: "About Us", href: "/about" }, { label: "Careers", href: "/about" }, { label: "Contact", href: "/contact" }].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.45)" }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5">Services</h4>
            <ul className="space-y-3">
              {[{ label: "Consulting", href: "/services" }, { label: "Technology", href: "/services" }, { label: "Industries", href: "/industries" }].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.45)" }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5">Resources</h4>
            <ul className="space-y-3">
              {[{ label: "Insights", href: "/insights" }, { label: "Case Studies", href: "/case-studies" }].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.45)" }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SCHEDULE CARD */}
        <div
          className="rounded-2xl p-8 text-center mb-12"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          data-testid="footer-schedule-card"
        >
          <h3 className="text-xl font-bold text-white mb-2">Ready to transform your business?</h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Let's discuss your project and explore how we can help you reach your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="btn-primary rounded-full"
              style={{ fontSize: "0.85rem", padding: "10px 22px" }}
              data-testid="footer-schedule-btn"
            >
              <CalendarDays size={14} /> Schedule a Meeting
            </button>
            <Link
              href="/contact"
              className="btn-outline rounded-full"
              style={{ fontSize: "0.85rem", padding: "9px 22px", color: "rgba(255,255,255,0.65)", borderColor: "rgba(255,255,255,0.15)" }}
              data-testid="footer-send-message-btn"
            >
              <Send size={14} /> Send Message
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} 360CloudTech. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            <a href="#" className="hover:text-white transition-colors" data-testid="footer-privacy">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors" data-testid="footer-terms">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors" data-testid="footer-cookies">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
