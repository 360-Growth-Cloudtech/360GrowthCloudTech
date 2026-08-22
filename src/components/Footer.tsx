"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Linkedin, Mail, Phone, CalendarDays, Send, Twitter, Facebook } from "lucide-react";
import { useTranslations } from "next-intl";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from "@/lib/contact";

export function Footer() {
  const t = useTranslations("common.footer");
  const tBrand = useTranslations("common.brand");
  const tSocial = useTranslations("common.social");
  const { setOpen } = useScheduleMeeting();

  const companyLinks = [
    { label: t("links.about"), href: "/about" },
    { label: t("links.contact"), href: "/contact" },
  ] as const;

  const serviceLinks = [
    { label: t("links.consulting"), href: "/services" },
    { label: t("links.technology"), href: "/services" },
    { label: t("links.industries"), href: "/industries" },
  ] as const;

  const resourceLinks = [{ label: t("links.work"), href: "/case-studies" }] as const;

  const socialLinks = [
    { icon: Linkedin, label: tSocial("linkedin") },
    { icon: Twitter, label: tSocial("twitter") },
    { icon: Facebook, label: tSocial("facebook") },
  ] as const;

  return (
    <footer data-testid="footer" style={{ backgroundColor: "#1a1512", color: "white" }}>
      {/* MAIN FOOTER */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <Image
                src="/logo.png"
                alt={tBrand("logoAlt")}
                width={40}
                height={40}
                className="h-10 w-auto brightness-0 invert shrink-0"
              />
              <span className="text-base font-bold text-white leading-snug">{t("brandName")}</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              {t("tagline")}
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  <Mail size={13} /> {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_PHONE_TEL}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  <Phone size={13} /> {CONTACT_PHONE}
                </a>
              </li>
            </ul>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/15"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  data-testid={`social-${label.toLowerCase()}`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5">{t("company")}</h4>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5">{t("services")}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5">{t("resources")}</h4>
            <ul className="space-y-3">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {item.label}
                  </Link>
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
          <h3 className="text-xl font-bold text-white mb-2">{t("scheduleTitle")}</h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            {t("scheduleDesc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="btn-primary rounded-full"
              style={{ fontSize: "0.85rem", padding: "10px 22px" }}
              data-testid="footer-schedule-btn"
            >
              <CalendarDays size={14} /> {t("scheduleMeeting")}
            </button>
            <Link
              href="/contact"
              className="btn-outline rounded-full"
              style={{ fontSize: "0.85rem", padding: "9px 22px", color: "rgba(255,255,255,0.65)", borderColor: "rgba(255,255,255,0.15)" }}
              data-testid="footer-send-message-btn"
            >
              <Send size={14} /> {t("sendMessage")}
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            <Link href="/privacy-policy" className="hover:text-white transition-colors" data-testid="footer-privacy">
              {t("privacy")}
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors" data-testid="footer-terms">
              {t("terms")}
            </Link>
            <Link href="/cookies-policy" className="hover:text-white transition-colors" data-testid="footer-cookies">
              {t("cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
