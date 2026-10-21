"use client";

import { useTranslations } from "next-intl";
import { CalendarDays, Check, Mail, MapPin, Phone, Star } from "lucide-react";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion";
import { Breadcrumb, FaqAccordion, SectionIntro } from "@/components/PageSections";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, CONTACT_WHATSAPP_URL } from "@/lib/contact";

/** Only profiles that are actually configured are shown (no empty "#" links). */
const SOCIALS = [
  { key: "linkedin", url: process.env.NEXT_PUBLIC_LINKEDIN_URL, icon: FaLinkedinIn },
  { key: "clutch", url: process.env.NEXT_PUBLIC_CLUTCH_URL, icon: Star },
  { key: "google", url: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL, icon: MapPin },
].filter((s): s is { key: string; url: string; icon: typeof Star } => Boolean(s.url));

export default function Contact() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const tCrumbs = useTranslations("common.breadcrumbs");
  const { setOpen } = useScheduleMeeting();

  const channels = [
    { key: "whatsapp", icon: FaWhatsapp, value: CONTACT_PHONE, href: CONTACT_WHATSAPP_URL, external: true, accent: "bg-[#25D366] text-white" },
    { key: "call", icon: Phone, value: CONTACT_PHONE, href: CONTACT_PHONE_TEL, external: false, accent: "bg-primary/10 text-primary" },
    { key: "email", icon: Mail, value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, external: false, accent: "bg-primary/10 text-primary" },
  ] as const;
  const steps = t.raw("nextSteps.steps") as { title: string; desc: string }[];

  return (
    <>
      <PageHero label={t("page.label")} title={t("page.title")} highlight={t("page.highlight")} subtitle={t("page.subtitle")} waveClassName="text-white">
        <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2">
          {(t.raw("trust") as string[]).map((item) => (
            <li key={item} className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
              <Check size={15} className="text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <Breadcrumb homeLabel={tCrumbs("home")} current={tCrumbs("contact")} />

      {/* ── Contact channels ──────────────────────────────────────────── */}
      <section className="bg-white pb-6 pt-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-xl font-bold text-foreground sm:text-2xl">{t("channels.title")}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ key, icon: Icon, value, href, external, accent }) => (
              <a
                key={key}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col rounded-2xl border border-border/80 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
                  <Icon size={20} />
                </span>
                <span className="text-base font-bold text-foreground">{t(`channels.${key}.label`)}</span>
                <span className="mt-1 text-sm font-semibold text-slate-700 group-hover:text-primary">{value}</span>
                <span className="mt-2 text-xs text-muted-foreground">{t(`channels.${key}.desc`)}</span>
              </a>
            ))}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group flex h-full flex-col rounded-2xl bg-[#0f172a] p-6 text-left text-white shadow-sm transition-all hover:-translate-y-1"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                <CalendarDays size={20} />
              </span>
              <span className="text-base font-bold">{t("channels.meeting.label")}</span>
              <span className="mt-1 text-sm font-semibold text-brand-300">{t("channels.meeting.cta")} →</span>
              <span className="mt-2 text-xs text-white/60">{t("channels.meeting.desc")}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Form + what happens next ──────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <Reveal className="lg:col-span-3">
            <h2 className="display-heading mb-2 text-2xl text-foreground md:text-3xl">{t("form.title")}</h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{t("form.subtitle")}</p>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <aside className="rounded-3xl border border-border bg-slate-50 p-7">
              <span className="section-label mb-3 inline-flex">{t("nextSteps.badge")}</span>
              <h3 className="mb-6 text-xl font-bold text-foreground">{t("nextSteps.title")}</h3>
              <ol className="space-y-5">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{i + 1}</span>
                    <div>
                      <p className="text-sm font-bold text-foreground">{s.title}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {SOCIALS.length > 0 && (
                <div className="mt-8 border-t border-border pt-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">{tCommon("social.followUs")}</p>
                  <div className="flex gap-2">
                    {SOCIALS.map(({ key, url, icon: Icon }) => (
                      <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key} className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary">
                        <Icon size={15} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ── FAQs ──────────────────────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-slate-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={t("faqs.badge")} title={t("faqs.title")} subtitle={t("faqs.subtitle")} />
          <FaqAccordion id="contact" items={t.raw("faqs.items") as { q: string; a: string }[]} />
        </div>
      </section>
    </>
  );
}
