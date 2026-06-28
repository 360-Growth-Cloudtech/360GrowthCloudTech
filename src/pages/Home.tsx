import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import {
  Code2, Users, TrendingUp, Cloud, ShieldCheck, ShoppingCart,
  ArrowRight, Star, CheckCircle, Zap, Globe, Lock, Monitor, Palette, Tablet
} from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.09 } } };

export default function Home() {
  const { setOpen } = useScheduleMeeting();

  const services = [
    { icon: Code2, title: "Custom Software", desc: "High-performance web & mobile applications built for scale.", tag: "Engineering" },
    { icon: Users, title: "Custom CRM Tools", desc: "Bespoke CRM systems that fit your exact workflow.", tag: "Product" },
    { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven ads and comprehensive SEO growth.", tag: "Growth" },
    { icon: Cloud, title: "Cloud Infrastructure", desc: "Scalable cloud setup and robust CI/CD pipelines.", tag: "DevOps" },
    { icon: ShieldCheck, title: "Cybersecurity", desc: "Enterprise-grade protection and 24/7 monitoring.", tag: "Security" },
    { icon: ShoppingCart, title: "E-commerce", desc: "End-to-end stores with seamless payment flows.", tag: "Commerce" },
  ];

  const testimonials = [
    { quote: "360GrowthCloudTech completely revamped our patient portal. It's faster, incredibly secure, and their support is always on.", name: "Dr. Sarah Jenkins", role: "CTO, MedCare Health", initials: "SJ" },
    { quote: "Having development and marketing under one roof changed everything. Our e-commerce saw a 40% increase in conversions.", name: "Marcus Chen", role: "Founder, Peak Retail", initials: "MC" },
    { quote: "Their cloud infrastructure setup is flawless. We haven't had a minute of downtime since migrating our booking engine.", name: "Elena Rodriguez", role: "VP Engineering, Global Travel", initials: "ER" },
  ];

  const trustedBy = ["HealthTech Corp", "Peak Retail", "Global Travel", "FinServe Group", "MedCare Health", "CloudFirst"];

  return (
    <Layout>
      <div data-testid="home-page">

        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden hero-grid-bg">
          {/* Warm orange glow */}
          <div
            className="absolute inset-x-0 top-0 h-72 opacity-60"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% -5%, rgba(232,82,26,0.12) 0%, transparent 70%)" }}
          />

          {/* Floating tool icons like Zlaark */}
          <motion.div
            className="absolute left-[8%] top-[38%] w-14 h-14 rounded-2xl premium-card flex items-center justify-center"
            animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Palette size={22} className="text-primary" />
          </motion.div>
          <motion.div
            className="absolute right-[7%] top-[32%] w-14 h-14 rounded-2xl premium-card flex items-center justify-center"
            animate={{ y: [0, 14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Monitor size={22} className="text-foreground/50" />
          </motion.div>
          <motion.div
            className="absolute left-[14%] top-[60%] w-12 h-12 rounded-2xl premium-card flex items-center justify-center"
            animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Code2 size={18} className="text-foreground/40" />
          </motion.div>
          <motion.div
            className="absolute right-[13%] top-[58%] w-12 h-12 rounded-2xl premium-card flex items-center justify-center"
            animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            <Tablet size={18} className="text-foreground/40" />
          </motion.div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.5 }}>
                <span className="section-label mb-7 inline-flex">✦ Clean Code. Scalable Architecture. ✦</span>
              </motion.div>

              <motion.h1
                className="display-heading text-5xl md:text-6xl lg:text-7xl mb-7"
                variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.7, delay: 0.1 }}
              >
                We build the product.
                <br />
                You build the{" "}
                <span className="cursive-accent" style={{ fontSize: "1.05em" }}>company.</span>
              </motion.h1>

              <motion.p
                className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
                variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6, delay: 0.25 }}
              >
                We're the engineering team behind ambitious founders — shipping web apps, SaaS tools, and digital products on modern, maintainable technology.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 relative"
                variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Curved arrow + text like Zlaark */}
                <div className="absolute -left-4 sm:left-auto sm:-ml-56 top-10 sm:top-0 hidden sm:flex flex-col items-center" style={{ transform: "rotate(-8deg)" }}>
                  <svg width="48" height="36" viewBox="0 0 48 36" fill="none" className="text-foreground/25 mb-1">
                    <path d="M2 2 C10 14, 30 8, 44 22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M38 18 L44 22 L41 28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xs font-medium text-muted-foreground" style={{ fontFamily: "Caveat, cursive", fontSize: "0.85rem" }}>Schedule a free call now</span>
                </div>

                <button
                  onClick={() => setOpen(true)}
                  className="btn-primary"
                  data-testid="hero-cta-get-started"
                >
                  Book a Free Strategy Call
                </button>
                <Link href="/services" className="btn-dark">
                  View services
                </Link>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
                variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6, delay: 0.55 }}
              >
                {[
                  { icon: CheckCircle, text: "No lock-in contracts" },
                  { icon: Lock, text: "SOC 2 Certified" },
                  { icon: Globe, text: "Global delivery" },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Icon size={13} className="text-primary" />{text}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TRUSTED BY ───────────────────────────────────── */}
        <section className="py-10 border-y border-border/60 bg-white/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Trusted by industry leaders</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
              {trustedBy.map((name, i) => (
                <span key={i} className="text-sm font-bold text-foreground/20 hover:text-foreground/50 transition-colors tracking-wide select-none">{name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-14"
              variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <span className="section-label mb-5 inline-flex">Our Expertise</span>
              <h2 className="display-heading text-3xl md:text-5xl text-foreground mb-5">
                Everything you need<br />to <span className="cursive-accent">succeed online.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                From idea to a live, growing product — we handle every layer of the stack.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
              variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-60px" }}
            >
              {services.map((service, i) => (
                <Link href="/services" key={i}>
                  <motion.div
                    variants={fadeUp} transition={{ duration: 0.45 }}
                    className="premium-card rounded-2xl p-6 group h-full cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                        <service.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{service.tag}</span>
                    </div>
                    <h4 className="font-bold text-base mb-2 text-foreground">{service.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                    <span className="text-xs font-bold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight size={12} />
                    </span>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── STATS BANNER ─────────────────────────────────── */}
        <section className="py-16 border-y border-border/60 bg-white/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
            >
              {[
                { num: "250+", label: "Projects Delivered" },
                { num: "99.9%", label: "Uptime Achieved" },
                { num: "50+", label: "Enterprise Clients" },
                { num: "10+", label: "Years Experience" },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.5 }}>
                  <div className="display-heading text-4xl md:text-5xl text-foreground mb-1.5">{stat.num}</div>
                  <div className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
              >
                <span className="section-label mb-5 inline-flex">Why Choose Us</span>
                <h2 className="display-heading text-3xl md:text-5xl text-foreground mb-6">
                  One partner for your <br /><span className="cursive-accent">entire journey.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                  We become your long-term technology partner — helping you grow, adapt, and lead in your industry with confidence.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: Zap, title: "Fast Delivery", desc: "Agile sprints with weekly demos — see progress from day one." },
                    { icon: Lock, title: "Enterprise Security", desc: "SOC 2 compliant with HIPAA, GDPR and ISO 27001 standards." },
                    { icon: Globe, title: "Global Support", desc: "24/7 support team across multiple time zones." },
                    { icon: TrendingUp, title: "Measurable Results", desc: "Data-backed KPIs and transparent reporting every step." },
                  ].map(({ icon: Icon, title, desc }, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-sm mb-0.5">{title}</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right side metric grid */}
              <motion.div
                className="grid grid-cols-2 gap-3"
                variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
              >
                {[
                  { bg: "#1a1512", value: "40+", label: "Industries", sub: "sectors served" },
                  { bg: "#e8521a", value: "250+", label: "Projects", sub: "delivered" },
                  { bg: "#2d2620", value: "99.9%", label: "Uptime", sub: "SLA guaranteed" },
                  { bg: "#3d1a0a", value: "24/7", label: "Support", sub: "always available" },
                ].map((item, i) => (
                  <motion.div
                    key={i} variants={fadeUp} transition={{ duration: 0.5 }}
                    className="rounded-2xl p-6 text-white"
                    style={{ backgroundColor: item.bg }}
                  >
                    <div className="display-heading text-3xl mb-1">{item.value}</div>
                    <div className="font-bold text-sm mb-0.5">{item.label}</div>
                    <div className="text-white/45 text-xs">{item.sub}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────── */}
        <section className="py-24 bg-white/40 border-t border-border/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-14"
              variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <span className="section-label mb-5 inline-flex">Testimonials</span>
              <h2 className="display-heading text-3xl md:text-5xl text-foreground">
                Trusted by <span className="cursive-accent">industry leaders.</span>
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={i} variants={fadeUp} transition={{ duration: 0.5 }}
                  className="premium-card rounded-2xl p-6 flex flex-col"
                >
                  <div className="flex gap-0.5 mb-5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-primary text-primary" />)}
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="rounded-3xl overflow-hidden text-center px-8 py-20 relative"
              style={{ backgroundColor: "#1a1512" }}
              variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 50% at 50% 100%, rgba(232,82,26,0.18) 0%, transparent 65%)" }} />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full border" style={{ color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.1)" }}>
                  Ready to start?
                </span>
                <h2 className="display-heading text-3xl md:text-5xl text-white mb-6">
                  Let's build something<br />
                  <span className="cursive-accent" style={{ color: "#f07a3a" }}>amazing together.</span>
                </h2>
                <p className="text-white/50 text-base mb-10 max-w-md mx-auto">
                  Free consultation, no commitment. Just a friendly conversation about your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setOpen(true)}
                    className="btn-primary"
                  >
                    Book a Free Call <ArrowRight size={16} />
                  </button>
                  <Link href="/contact" className="btn-outline" style={{ color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.18)" }}>
                    Send a Message
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
