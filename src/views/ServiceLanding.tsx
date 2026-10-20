"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";
import {
  AppWindow, ArrowRight, BadgePercent, BarChart3, Monitor, RadioTower, TrendingUp, ClipboardList, FileText,
  ShieldCheck, ScanBarcode, CalendarClock, Receipt, UtensilsCrossed, Gem, Target, Filter, MessagesSquare,
  ListChecks, Pill, Code2, BrainCircuit, Boxes, Building2, Check, ChevronDown, ChevronRight,
  Clock, Cpu, CreditCard, Factory, Gauge, GraduationCap, HeartPulse, Landmark, Layers, Lock, Mail,
  MessageSquareWarning, Palette, Phone, Plane, Plug, Repeat, RefreshCw, Shirt, ShoppingBag, ShoppingBasket,
  ShoppingCart, Smartphone, Sparkles, Store, Truck, Tv, Users, Warehouse, Workflow, Briefcase, Contact, X,
  Zap,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { Reveal, Magnetic } from "@/components/motion";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { submitLead } from "@/lib/submit-lead";
import { whatsappUrl } from "@/lib/contact";

/**
 * Shared layout for service landing pages (/software-development, /ecommerce-software-development, …).
 * All copy comes from one messages namespace; optional sections render only when their key exists.
 */

type Offering = { id: string; title: string; desc: string; bullets: string[]; href?: string };
type LinkedItem = { id: string; title: string; desc: string; href: string };

/** Card icons, looked up by each item's `id` in the page's messages. */
const ICONS: Record<string, LucideIcon> = {
  // software development
  custom: Workflow,
  enterprise: Building2,
  saas: Layers,
  web: AppWindow,
  mobile: Smartphone,
  ai: BrainCircuit,
  erp: Boxes,
  crm: Contact,
  ecommerce: ShoppingCart,
  inventory: Warehouse,
  complaint: MessageSquareWarning,
  embedded: Cpu,
  bi: BarChart3,
  desktop: Monitor,
  telecom: RadioTower,
  // stock management
  salesTracking: TrendingUp,
  stockLedger: ClipboardList,
  customers: Contact,
  purchaseOrders: FileText,
  permissions: ShieldCheck,
  barcode: ScanBarcode,
  multiWarehouse: Boxes,
  batch: CalendarClock,
  invoicing: Receipt,
  shops: Store,
  warehouse: Warehouse,
  restaurant: UtensilsCrossed,
  jewellery: Gem,
  itAssets: Monitor,
  // crm
  leads: Target,
  pipeline: Filter,
  communication: MessagesSquare,
  projects: ListChecks,
  pharma: Pill,
  itAgencies: Code2,
  government: Landmark,
  // ecommerce
  platform: Store,
  website: AppWindow,
  app: Smartphone,
  b2b: Briefcase,
  marketplace: Users,
  headless: Zap,
  orders: Warehouse,
  integrations: Plug,
  migration: RefreshCw,
  design: Palette,
  personalisation: Sparkles,
  optimisation: Gauge,
  d2c: ShoppingBag,
  wholesale: Boxes,
  multivendor: Users,
  omnichannel: Store,
  grocery: ShoppingBasket,
  fashion: Shirt,
  electronics: Tv,
  beauty: BadgePercent,
  payments: CreditCard,
  // industries
  healthcare: HeartPulse,
  fintech: Landmark,
  logistics: Truck,
  realEstate: Building2,
  manufacturing: Factory,
  education: GraduationCap,
  travel: Plane,
  retail: ShoppingBag,
  // engagement models
  dedicated: Users,
  augmentation: Clock,
  fixed: Briefcase,
  subscription: Repeat,
};

const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";
const inlineLinks = {
  home: (chunks: ReactNode) => <Link href="/" className={linkClass}>{chunks}</Link>,
  csd: (chunks: ReactNode) => <Link href="/custom-software-development" className={linkClass}>{chunks}</Link>,
  sd: (chunks: ReactNode) => <Link href="/software-development" className={linkClass}>{chunks}</Link>,
  work: (chunks: ReactNode) => <Link href="/case-studies" className={linkClass}>{chunks}</Link>,
  contact: (chunks: ReactNode) => <Link href="/contact" className={linkClass}>{chunks}</Link>,
};

function SectionIntro({ badge, title, subtitle }: { badge: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="text-center max-w-3xl mx-auto mb-14">
      <span className="section-label mb-4 inline-flex">{badge}</span>
      <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </Reveal>
  );
}

/* ── Hero quote form: opens WhatsApp with the details prefilled ────────── */
function QuoteForm({ ns, topic, services, leadSource }: { ns: string; topic: string; services: string[]; leadSource: string }) {
  const t = useTranslations("common.serviceForm");
  const tPage = useTranslations(ns);
  const empty = { name: "", phone: "", email: "", service: "" };
  const [data, setData] = useState(empty);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.email || data.phone.length < 10 || !data.service) {
      toast.error(t("missingFields"));
      return;
    }

    const text = t("whatsappMessage", { ...data, topic });

    // Open WhatsApp synchronously inside the click handler, or browsers block the pop-up.
    // ("noopener" would make window.open return null, so detach the opener manually.)
    const win = window.open(whatsappUrl(text), "_blank");
    if (win) {
      win.opener = null;
    } else {
      window.location.href = whatsappUrl(text);
    }

    // Also record the lead (Sheet/email) so nothing is lost if the chat is never sent.
    submitLead({
      formType: "contact",
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      message: text,
      source: leadSource,
    }).catch(() => {});

    toast.success(t("success"));
    setData(empty);
  };

  const fieldClass =
    "flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3.5 transition-colors focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100";

  return (
    <>
      <form
        onSubmit={onSubmit}
        aria-label={t("title")}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-2.5 rounded-3xl bg-white p-3 text-left shadow-2xl shadow-brand-900/10 ring-1 ring-slate-200/80 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.15fr_auto]"
      >
        {([
          { key: "name", type: "text", icon: Users, auto: "name" },
          { key: "phone", type: "tel", icon: Phone, auto: "tel" },
          { key: "email", type: "email", icon: Mail, auto: "email" },
        ] as const).map(({ key, type, icon: Icon, auto }) => (
          <label key={key} className={fieldClass}>
            <Icon size={18} className="shrink-0 text-brand-600" />
            <span className="sr-only">{t(`${key}Placeholder`)}</span>
            <input
              type={type}
              required
              autoComplete={auto}
              value={data[key]}
              onChange={(e) => setData({ ...data, [key]: e.target.value })}
              placeholder={t(`${key}Placeholder`)}
              className="w-full bg-transparent text-[0.95rem] text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </label>
        ))}
        <label className={fieldClass}>
          <Layers size={18} className="shrink-0 text-brand-600" />
          <span className="sr-only">{t("requirementPlaceholder")}</span>
          <select
            required
            value={data.service}
            onChange={(e) => setData({ ...data, service: e.target.value })}
            className={`w-full bg-transparent text-[0.95rem] focus:outline-none ${data.service ? "text-slate-900" : "text-slate-400"}`}
          >
            <option value="">{t("requirementPlaceholder")}</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
            <option value={t("otherOption")}>{t("otherOption")}</option>
          </select>
        </label>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-7 py-3.5 text-[0.95rem] font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5 hover:bg-[#1ebe5a] hover:shadow-xl sm:col-span-2 lg:col-span-1"
        >
          <FaWhatsapp size={19} />
          {t("submit")}
        </button>
      </form>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <Lock size={12} />
        {tPage.has("form.trustLine") ? tPage("form.trustLine") : t("trustLine")}
      </p>
    </>
  );
}

function IconCardGrid({ items, columns, bg }: { items: LinkedItem[]; columns: string; bg: string }) {
  return (
    <div className={`mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 ${columns}`}>
      {items.map((item, i) => {
        const Icon = ICONS[item.id] ?? Layers;
        return (
          <Reveal key={item.id} delay={(i % 4) * 0.05} duration={0.5} className="h-full">
            <Link
              href={item.href}
              className={`group flex h-full flex-col rounded-2xl border border-border/80 ${bg} p-6 text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-md`}
            >
              <Icon size={22} className="mb-4 text-primary" />
              <h3 className="mb-2 text-base font-bold text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              <ArrowRight size={15} className="mt-auto pt-4 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

type ServiceLandingProps = {
  /** Messages namespace holding the page copy, e.g. "softwareDevelopment". */
  ns: string;
  /** Label stored with each lead so you can tell which page it came from. */
  leadSource: string;
};

export default function ServiceLanding({ ns, leadSource }: ServiceLandingProps) {
  const t = useTranslations(ns);
  const tCrumbs = useTranslations("common.breadcrumbs");
  const { setOpen } = useScheduleMeeting();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const offerings = t.raw("offerings.items") as Offering[];
  const steps = t.raw("process.steps") as { title: string; desc: string }[];
  const whyItems = t.raw("why.items") as { title: string; desc: string }[];
  const faqs = t.raw("faqs.items") as { q: string; a: string }[];
  const related = t.raw("related.links") as { label: string; href: string }[];

  return (
    <div data-testid={`${ns}-page`} className="overflow-x-hidden">
      <PageHero
        label={t("hero.label")}
        title={t("hero.title")}
        highlight={t("hero.highlight")}
        subtitle={t("hero.subtitle")}
        waveClassName="text-white"
      >
        <QuoteForm
          ns={ns}
          topic={t("form.topic")}
          // Pages can list their own requirement choices; otherwise offer the services on the page.
          services={t.has("form.options") ? (t.raw("form.options") as string[]) : offerings.map((o) => o.title)}
          leadSource={leadSource}
        />
      </PageHero>

      {/* Visible breadcrumb (BreadcrumbList JSON-LD is emitted by the route) */}
      <nav aria-label="Breadcrumb" className="bg-white">
        <ol className="container mx-auto flex items-center gap-1.5 px-4 pt-2 text-sm text-slate-500 sm:px-6 lg:px-8">
          <li><Link href="/" className="hover:text-primary">{tCrumbs("home")}</Link></li>
          <li aria-hidden><ChevronRight size={14} /></li>
          <li aria-current="page" className="font-semibold text-slate-800">{t("breadcrumb")}</li>
        </ol>
      </nav>

      {/* ── Intro ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <Reveal className="text-left lg:col-span-7">
              <span className="section-label mb-4 inline-flex">{t("intro.badge")}</span>
              <h2 className="display-heading mb-6 text-3xl text-foreground sm:text-4xl md:text-5xl">{t("intro.title")}</h2>
              <div className="space-y-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                {(t.raw("intro.paragraphs") as string[]).map((_, i) => (
                  <p key={i}>{t.rich(`intro.paragraphs.${i}`, inlineLinks)}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <aside className="rounded-3xl border border-border bg-slate-50 p-7 sm:p-8">
                <h3 className="mb-5 text-lg font-bold text-foreground">{t("intro.highlightsTitle")}</h3>
                <ul className="space-y-3">
                  {(t.raw("intro.highlights") as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Services offered ──────────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-slate-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={t("offerings.badge")} title={t("offerings.title")} subtitle={t("offerings.subtitle")} />
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item, i) => {
              const Icon = ICONS[item.id] ?? Layers;
              return (
                <Reveal key={item.id} delay={(i % 3) * 0.06} duration={0.5} className="h-full">
                  <article id={item.id} className="flex h-full scroll-mt-32 flex-col rounded-2xl border border-border/80 bg-white p-7 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={22} />
                    </span>
                    <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    <ul className="mb-6 space-y-2">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                          <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    {item.href ? (
                      <Link href={item.href} className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-primary transition-all hover:gap-2">
                        {t("offerings.learnMore")} <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="mt-auto inline-flex items-center gap-1 text-left text-sm font-bold text-primary transition-all hover:gap-2"
                      >
                        {t("offerings.discuss")} <ArrowRight size={14} />
                      </button>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Industries / business types (optional) ────────────────────── */}
      {t.has("industries") && (
        <section className="border-t border-border/60 bg-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionIntro badge={t("industries.badge")} title={t("industries.title")} subtitle={t("industries.subtitle")} />
            <IconCardGrid items={t.raw("industries.items") as LinkedItem[]} columns="lg:grid-cols-4" bg="bg-slate-50" />
          </div>
        </section>
      )}

      {/* ── Ready-made vs custom comparison (optional) ────────────────── */}
      {t.has("comparison") && (
        <section className="border-t border-border/60 bg-slate-50 py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionIntro badge={t("comparison.badge")} title={t("comparison.title")} subtitle={t("comparison.subtitle")} />
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
              {(t.raw("comparison.columns") as { title: string; bestFor: string; pros: string[]; cons: string[] }[]).map((col, i) => (
                <Reveal key={col.title} delay={i * 0.08} className="h-full">
                  <div className={`h-full rounded-2xl border p-7 text-left ${i === 1 ? "border-primary/40 bg-white shadow-lg" : "border-border/80 bg-white"}`}>
                    <h3 className="mb-1 text-lg font-bold text-foreground">{col.title}</h3>
                    <p className="mb-5 text-sm font-semibold text-primary">{col.bestFor}</p>
                    <ul className="space-y-2.5">
                      {col.pros.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-foreground/85">
                          <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                          {p}
                        </li>
                      ))}
                      {col.cons.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-sm text-foreground/70">
                          <X size={16} className="mt-0.5 shrink-0 text-red-500" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mx-auto mt-8 max-w-3xl text-center">
              <p className="text-sm leading-relaxed text-slate-600">{t.rich("comparison.note", inlineLinks)}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Outsourcing / engagement models (optional) ────────────────── */}
      {t.has("outsourcing") && (
        <section className="border-t border-border/60 bg-slate-50 py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionIntro badge={t("outsourcing.badge")} title={t("outsourcing.title")} subtitle={t("outsourcing.subtitle")} />
            <div className="mx-auto mb-10 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {(t.raw("outsourcing.items") as { id: string; title: string; desc: string; bestFor: string }[]).map((m, i) => {
                const Icon = ICONS[m.id] ?? Briefcase;
                return (
                  <Reveal key={m.id} delay={i * 0.06} duration={0.5} className="h-full">
                    <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-white p-6 text-left">
                      <Icon size={22} className="mb-4 text-primary" />
                      <h3 className="mb-2 text-base font-bold text-foreground">{m.title}</h3>
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                      <p className="mt-auto text-xs font-semibold text-primary">{m.bestFor}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 gap-8 rounded-3xl bg-foreground p-8 text-white sm:p-10 lg:grid-cols-12">
                <div className="text-left lg:col-span-7">
                  <h3 className="mb-5 text-lg font-bold sm:text-xl">{t("outsourcing.pointsTitle")}</h3>
                  <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                    {(t.raw("outsourcing.points") as string[]).map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-white/85">
                        <Check size={16} className="mt-0.5 shrink-0 text-brand-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center text-left lg:col-span-5">
                  <p className="text-sm leading-relaxed text-white/75 [&_a]:text-brand-300">
                    {t.rich("outsourcing.note", inlineLinks)}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Process ───────────────────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={t("process.badge")} title={t("process.title")} subtitle={t("process.subtitle")} />
          <ol className="mx-auto max-w-4xl space-y-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.04} duration={0.45}>
                <li className="flex gap-5 rounded-2xl border border-border/80 bg-slate-50 p-6 text-left">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-base font-bold text-foreground sm:text-lg">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Technologies / features as chip groups (optional) ─────────── */}
      {t.has("tech") && (
        <section className="border-t border-border/60 bg-slate-50 py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionIntro badge={t("tech.badge")} title={t("tech.title")} subtitle={t("tech.subtitle")} />
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {(t.raw("tech.groups") as { title: string; items: string[] }[]).map((g) => (
                <Reveal key={g.title} className="h-full">
                  <div className="h-full rounded-2xl border border-border/80 bg-white p-6 text-left">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">{g.title}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <li key={item} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Why us ────────────────────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={t("why.badge")} title={t("why.title")} subtitle={t("why.subtitle")} />
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.06} duration={0.5} className="h-full">
                <div className="h-full rounded-2xl border border-border/80 bg-slate-50 p-7 text-left">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Check size={20} />
                  </span>
                  <h3 className="mb-2 text-base font-bold text-foreground sm:text-lg">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cost (optional) ───────────────────────────────────────────── */}
      {t.has("cost") && (
        <section className="border-t border-border/60 bg-slate-50 py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionIntro badge={t("cost.badge")} title={t("cost.title")} subtitle={t("cost.subtitle")} />
            <div className="mx-auto mb-8 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
              {(t.raw("cost.tiers") as { name: string; price: string; timeline: string; desc: string }[]).map((tier, i) => (
                <Reveal key={tier.name} delay={i * 0.08} duration={0.5} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-white p-7 text-left shadow-sm">
                    <h3 className="mb-4 text-lg font-bold text-foreground">{tier.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("cost.budgetLabel")}</p>
                    <p className="display-heading mb-3 text-2xl text-primary sm:text-3xl">{tier.price}</p>
                    <p className="mb-4 text-xs font-semibold text-foreground/80">{t("cost.timelineLabel")}: {tier.timeline}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{tier.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="mb-6 text-sm leading-relaxed text-slate-600">{t("cost.note")}</p>
              <Magnetic strength={10}>
                <button onClick={() => setOpen(true)} className="btn-primary">{t("cost.cta")}</button>
              </Magnetic>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── FAQs (answers stay in the DOM for crawlers) ───────────────── */}
      <section className="border-t border-border/60 bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionIntro badge={t("faqs.badge")} title={t("faqs.title")} subtitle={t("faqs.subtitle")} />
          <div className="mx-auto max-w-4xl space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="overflow-hidden rounded-2xl border border-border/80 bg-white text-left">
                  <h3>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`${ns}-faq-${idx}`}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-foreground transition-colors hover:bg-slate-50 sm:text-base"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </h3>
                  <div
                    id={`${ns}-faq-${idx}`}
                    className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-border/40 px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA + related links ─────────────────────────────────── */}
      <section className="bg-[#0f172a] py-24 text-center text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="display-heading mb-4 text-3xl text-white sm:text-5xl">{t("cta.title")}</h2>
            <p className="mx-auto mb-8 max-w-xl text-sm text-white/70 sm:text-base">{t("cta.subtitle")}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic strength={10}>
                <button onClick={() => setOpen(true)} className="btn-primary">{t("cta.primary")}</button>
              </Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15"
              >
                {t("cta.secondary")} <ArrowRight size={15} />
              </Link>
            </div>
            <nav aria-label={t("related.title")} className="mt-12 border-t border-white/10 pt-8">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/50">{t("related.title")}</p>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {related.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm font-semibold text-white/80 hover:text-brand-300">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
