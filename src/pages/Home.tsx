import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import {
  Code2, Users, TrendingUp, Cloud, ShieldCheck, ShoppingCart,
  ArrowRight, Star, CheckCircle, Zap, Globe, Lock
} from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.09 } } };

export default function Home() {
  const { setOpen } = useScheduleMeeting();

  const services = [
    { icon: Code2, title: "Custom Software", desc: "High-performance web & mobile applications.", color: "from-violet-500 to-violet-700" },
    { icon: Users, title: "Custom CRM Tools", desc: "Bespoke CRM systems tailored to your workflow.", color: "from-indigo-500 to-indigo-700" },
    { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven ads and comprehensive SEO.", color: "from-emerald-500 to-emerald-700" },
    { icon: Cloud, title: "Cloud Infrastructure", desc: "Scalable cloud setup and robust CI/CD pipelines.", color: "from-purple-500 to-purple-700" },
    { icon: ShieldCheck, title: "Cybersecurity", desc: "Enterprise-grade protection and 24/7 monitoring.", color: "from-teal-500 to-teal-700" },
    { icon: ShoppingCart, title: "E-commerce", desc: "End-to-end stores with seamless payments.", color: "from-fuchsia-500 to-fuchsia-700" },
  ];

  const stats = [
    { num: "250+", label: "Projects Delivered" },
    { num: "99.9%", label: "Uptime Achieved" },
    { num: "50+", label: "Enterprise Clients" },
    { num: "10+", label: "Years Experience" },
  ];

  const testimonials = [
    { quote: "360GrowthCloudTech completely revamped our patient portal. It's faster, incredibly secure, and their support team is always available.", name: "Dr. Sarah Jenkins", role: "CTO, MedCare Health", initials: "SJ", color: "from-violet-500 to-violet-700" },
    { quote: "Having development and marketing under one roof changed everything. Our e-commerce platform saw a 40% increase in conversions.", name: "Marcus Chen", role: "Founder, Peak Retail", initials: "MC", color: "from-indigo-500 to-indigo-700" },
    { quote: "Their cloud infrastructure setup is flawless. We haven't had a minute of downtime since migrating our booking engine.", name: "Elena Rodriguez", role: "VP Engineering, Global Travel", initials: "ER", color: "from-emerald-500 to-emerald-700" },
  ];

  const trustedBy = ["HealthTech Corp", "Peak Retail", "Global Travel", "FinServe Group", "MedCare Health", "CloudFirst"];

  return (
    <Layout>
      <div data-testid="home-page">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 hero-grid-bg" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at 50% -5%, rgba(91,33,182,0.1) 0%, transparent 70%)" }} />

          <motion.div
            className="absolute top-28 right-[8%] w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(16,185,129,0.13) 0%, transparent 70%)", filter: "blur(40px)" }}
            animate={{ y: [0, -25, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-16 left-[4%] w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)", filter: "blur(60px)" }}
            animate={{ y: [0, 35, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.5 }}>
                <span className="section-label mb-6 inline-flex"><Zap size={11} />End-to-End Digital Transformation</span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
                style={{ letterSpacing: "-0.025em" }}
                variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.7, delay: 0.1 }}
              >
                Build, Scale &amp;{" "}
                <span className="gradient-text">Secure</span>
                <br />Your Digital Future
              </motion.h1>

              <motion.p
                className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
                variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6, delay: 0.25 }}
              >
                One partner for custom software, powerful marketing, resilient cloud, and enterprise security — all under one roof.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
                variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button
                  onClick={() => setOpen(true)}
                  className="group w-full sm:w-auto gradient-bg px-7 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  data-testid="hero-cta-get-started"
                >
                  Get Started Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/services"
                  className="w-full sm:w-auto bg-white/80 backdrop-blur border border-border/60 text-foreground px-7 py-3.5 rounded-xl font-bold text-base hover:bg-white hover:shadow-md transition-all flex items-center justify-center"
                >
                  Explore Services
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
                    <Icon size={13} className="text-emerald-500" />{text}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TRUSTED BY ───────────────────────────────────── */}
        <section className="py-10 border-y border-border/50 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Trusted by industry leaders</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {trustedBy.map((name, i) => (
                <span key={i} className="text-sm font-bold text-foreground/20 hover:text-foreground/45 transition-colors tracking-wide select-none">{name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-12"
              variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <span className="section-label mb-4 inline-flex">Our Expertise</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Everything You Need to <span className="gradient-text">Succeed</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                From idea to a live, growing product — we handle every layer of the stack.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-60px" }}
            >
              {services.map((service, i) => (
                <Link href="/services" key={i}>
                  <motion.div
                    variants={fadeUp} transition={{ duration: 0.45 }}
                    className="premium-card rounded-xl p-5 group h-full cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-sm font-bold mb-1.5 text-foreground">{service.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3">{service.desc}</p>
                    <span className="text-xs font-semibold text-secondary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight size={12} />
                    </span>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────── */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 gradient-bg opacity-95" />
          <div className="absolute inset-0 dot-pattern" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
              variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
            >
              {stats.map((stat, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.5 }}>
                  <div className="text-4xl md:text-5xl font-black text-white mb-1.5 leading-none">{stat.num}</div>
                  <div className="text-white/65 text-xs font-semibold uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <motion.div
                variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
              >
                <span className="section-label mb-4 inline-flex">Why Choose Us</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  One Partner for Your <span className="gradient-text">Entire Journey</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                  We become your long-term technology partner — helping you grow, adapt, and lead in your industry.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Zap, title: "Fast Delivery", desc: "Agile sprints with weekly demos — see progress from day one." },
                    { icon: Lock, title: "Enterprise Security", desc: "SOC 2 compliant with HIPAA, GDPR and ISO 27001 standards." },
                    { icon: Globe, title: "Global Support", desc: "24/7 support team across multiple time zones." },
                    { icon: TrendingUp, title: "Measurable Results", desc: "Data-backed KPIs and transparent reporting every step." },
                  ].map(({ icon: Icon, title, desc }, i) => (
                    <div key={i} className="flex gap-3.5">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(91,33,182,0.07)" }}>
                        <Icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-sm mb-0.5">{title}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-3"
                variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
              >
                {[
                  { bg: "from-violet-500 to-violet-700", value: "40+", label: "Industries", sub: "sectors served" },
                  { bg: "from-indigo-500 to-indigo-700", value: "250+", label: "Projects", sub: "delivered" },
                  { bg: "from-emerald-500 to-emerald-700", value: "99.9%", label: "Uptime", sub: "SLA guaranteed" },
                  { bg: "from-purple-500 to-purple-700", value: "24/7", label: "Support", sub: "always available" },
                ].map((item, i) => (
                  <motion.div
                    key={i} variants={fadeUp} transition={{ duration: 0.5 }}
                    className={`bg-gradient-to-br ${item.bg} rounded-xl p-5 text-white`}
                  >
                    <div className="text-2xl font-black mb-0.5">{item.value}</div>
                    <div className="font-bold text-xs mb-0.5">{item.label}</div>
                    <div className="text-white/55 text-xs">{item.sub}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────── */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-12"
              variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <span className="section-label mb-4 inline-flex">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Trusted by <span className="gradient-text">Industry Leaders</span>
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={i} variants={fadeUp} transition={{ duration: 0.5 }}
                  className="premium-card rounded-xl p-5 flex flex-col"
                >
                  <div className="flex gap-0.5 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-foreground/75 text-xs leading-relaxed mb-5 flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 bg-gradient-to-br ${t.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="relative rounded-2xl overflow-hidden gradient-bg px-8 py-16 text-center"
              variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 dot-pattern" />
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />
              <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  Ready to Transform Your Business?
                </h2>
                <p className="text-white/65 text-base mb-8 max-w-md mx-auto">
                  Free consultation, no commitment. Let's talk.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setOpen(true)}
                    className="group bg-white text-primary px-7 py-3.5 rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    Schedule a Call <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <Link
                    href="/contact"
                    className="border border-white/30 text-white px-7 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center text-sm"
                  >
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
