"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone, Linkedin, Twitter, Facebook, CalendarDays } from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from "@/lib/contact";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function Contact() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const { setOpen } = useScheduleMeeting();

  const contactDetails = [
    { icon: Mail, label: t("getInTouch.emailLabel"), value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: Phone, label: t("getInTouch.callLabel"), value: CONTACT_PHONE, href: CONTACT_PHONE_TEL },
  ];

  const socialLinks = [
    { icon: Linkedin, label: tCommon("social.linkedin") },
    { icon: Twitter, label: tCommon("social.twitter") },
    { icon: Facebook, label: tCommon("social.facebook") },
  ] as const;

  return (
    <>
      <PageHero label={t("page.label")} title={t("page.title")} subtitle={t("page.subtitle")} />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-12">
            {/* Left column */}
            <motion.div className="lg:col-span-2 flex flex-col gap-4" variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6 }}>
              <div>
                <h2 className="display-heading text-2xl md:text-3xl text-foreground mb-2">{t("getInTouch.title")}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("getInTouch.subtitle")}</p>
              </div>

              <div className="flex flex-col gap-3">
                {contactDetails.map((item, i) => (
                  <div key={i} className="premium-card rounded-2xl p-4 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-semibold text-foreground whitespace-pre-line leading-relaxed hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm font-semibold text-foreground whitespace-pre-line leading-relaxed">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{tCommon("social.followUs")}</p>
                <div className="flex gap-2">
                  {socialLinks.map(({ icon: Icon, label }) => (
                    <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-full border border-border bg-white/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:bg-white transition-all">
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Schedule card */}
              <div className="rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: "#1a1512" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(232,82,26,0.22) 0%, transparent 70%)" }} />
                <div className="relative z-10">
                  <CalendarDays size={20} className="text-primary mb-2.5" />
                  <h4 className="font-bold text-white text-sm mb-1">{t("scheduleCard.title")}</h4>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {t("scheduleCard.description")}
                  </p>
                  <button onClick={() => setOpen(true)} className="btn-primary rounded-full" style={{ fontSize: "0.8rem", padding: "9px 18px" }}>
                    {tCommon("footer.scheduleMeeting")}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div className="lg:col-span-3" variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6, delay: 0.15 }}>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
