import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import {
  Code2, Users, TrendingUp, Cloud, ShieldCheck, ShoppingCart,
  ArrowRight, Star, CheckCircle, Zap, Globe, Lock
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const { setOpen } = useScheduleMeeting();

  const services = [
    { icon: Code2, title: "Custom Software", desc: "High-performance web & mobile applications built for scale.", color: "from-blue-500 to-blue-600" },
    { icon: Users, title: "Custom CRM Tools", desc: "Bespoke customer relationship systems tailored to your workflow.", color: "from-violet-500 to-violet-600" },
    { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven ads and comprehensive SEO strategies.", color: "from-orange-500 to-orange-600" },
    { icon: Cloud, title: "Cloud Infrastructure", desc: "Scalable, resilient cloud setup and robust CI/CD pipelines.", color: "from-cyan-500 to-cyan-600" },
    { icon: ShieldCheck, title: "Cybersecurity", desc: "Enterprise-grade protection, compliance, and 24/7 monitoring.", color: "from-green-500 to-green-600" },
    { icon: ShoppingCart, title: "E-commerce", desc: "End-to-end stores with seamless payments and inventory.", color: "from-pink-500 to-pink-600" },
  ];

  const stats = [
    { num: "250+", label: "Projects Delivered" },
    { num: "99.9%", label: "Uptime Achieved" },
    { num: "50+", label: "Enterprise Clients" },
    { num: "10+", label: "Years Experience" },
  ];

  const testimonials = [
    { quote: "360GrowthCloudTech completely revamped our patient portal. It's faster, incredibly secure, and their support team is always available.", name: "Dr. Sarah Jenkins", role: "CTO, MedCare Health", initials: "SJ", color: "bg-blue-600" },
    { quote: "Having development and marketing under one roof changed everything. Our e-commerce platform saw a 40% increase in conversions.", name: "Marcus Chen", role: "Founder, Peak Retail", initials: "MC", color: "bg-violet-600" },
    { quote: "Their cloud infrastructure setup is flawless. We haven't had a minute of downtime since migrating our booking engine.", name: "Elena Rodriguez", role: "VP Engineering, Global Travel", initials: "ER", color: "bg-teal-600" },
  ];

  const trustedBy = ["HealthTech Corp", "Peak Retail", "Global Travel", "FinServe Group", "MedCare Health", "CloudFirst"];

  return (
    <Layout>
      <div data-testid="home-page">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 hero-grid-bg" />
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(26,107,224,0.12) 0%, transparent 70%)"
          }} />

          {/* Floating orbs */}
          <motion.div
            className="absolute top-32 right-[10%] w-72 h-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,197,200,0.15) 0%, transparent 70%)", filter: "blur(40px)" }}
            animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(26,107,224,0.1) 0%, transparent 70%)", filter: "blur(60px)" }}
            animate={{ y: [0, 40, 0], scale: [1, 0.95, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto text-center">

              <motion.div variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.5 }}>
                <span className="section-label mb-8 inline-flex">
                  <Zap size={11} />
                  End-to-End Digital Transformation
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8"
                style={{ letterSpacing: "-0.02em" }}
                variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.7, delay: 0.1 }}
              >
                Build, Scale &amp;{" "}
                <span className="gradient-text">Secure</span>
                <br />
                Your Digital Future
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
                variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6, delay: 0.25 }}
              >
                One partner for custom software, powerful marketing, resilient cloud infrastructure, and enterprise-grade security — all under one roof.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button
                  onClick={() => setOpen(true)}
                  className="group w-full sm:w-auto gradient-bg px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                  data-testid="hero-cta-get-started"
                >
                  Get Started Free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/services"
                  className="w-full sm:w-auto bg-white/80 backdrop-blur border border-border/60 text-foreground px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Explore Services
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
                variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6, delay: 0.55 }}
              >
                {[
                  { icon: CheckCircle, text: "No lock-in contracts" },
                  { icon: Shield, text: "SOC 2 Certified" },
                  { icon: Globe, text: "Global delivery" },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon size={15} className="text-green-500" />
                    {text}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TRUSTED BY ───────────────────────────────────── */}
        <section className="py-12 border-y border-border/50 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">Trusted by industry leaders</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
              {trustedBy.map((name, i) => (
                <span key={i} className="text-sm font-bold text-foreground/25 hover:text-foreground/50 transition-colors tracking-wide select-none">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <span className="section-label mb-5 inline-flex">Our Expertise</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Everything You Need to <span className="gradient-text">Succeed</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From idea to a live, growing digital product — we handle every layer of the stack.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }}
            >
              {services.map((service, i) => (
                <Link href="/services" key={i}>
                  <motion.div
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="premium-card rounded-2xl p-8 group h-full cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold mb-3 text-foreground">{service.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                    <span className="text-sm font-semibold text-secondary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────── */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 gradient-bg opacity-95" />
          <div className="absolute inset-0 dot-pattern opacity-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
            >
              {stats.map((stat, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.5 }}>
                  <div className="text-5xl md:text-6xl font-black text-white mb-2 leading-none">{stat.num}</div>
                  <div className="text-white/70 text-xs font-semibold uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
              >
                <span className="section-label mb-5 inline-flex">Why Choose Us</span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  One Partner for Your <span className="gradient-text">Entire Journey</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                  We don't just deliver code — we become your long-term technology partner, helping you grow, adapt, and lead in your industry.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: Zap, title: "Fast Delivery", desc: "Agile sprints with weekly demos — see progress from day one." },
                    { icon: Lock, title: "Enterprise Security", desc: "SOC 2 compliant with HIPAA, GDPR and ISO 27001 standards." },
                    { icon: Globe, title: "Global Support", desc: "24/7 support team across multiple time zones, always on call." },
                    { icon: TrendingUp, title: "Measurable Results", desc: "Data-backed KPIs and transparent reporting every step of the way." },
                  ].map(({ icon: Icon, title, desc }, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(13,31,110,0.07)" }}>
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground mb-1">{title}</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-4"
                variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
              >
                {[
                  { bg: "from-blue-500 to-blue-700", value: "40+", label: "Industries", sub: "sectors served" },
                  { bg: "from-violet-500 to-violet-700", value: "250+", label: "Projects", sub: "successfully delivered" },
                  { bg: "from-teal-500 to-teal-700", value: "99.9%", label: "Uptime", sub: "SLA guaranteed" },
                  { bg: "from-orange-500 to-orange-600", value: "24/7", label: "Support", sub: "always available" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className={`bg-gradient-to-br ${item.bg} rounded-2xl p-6 text-white`}
                  >
                    <div className="text-3xl font-black mb-1">{item.value}</div>
                    <div className="font-bold text-sm mb-0.5">{item.label}</div>
                    <div className="text-white/60 text-xs">{item.sub}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <span className="section-label mb-5 inline-flex">Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Trusted by <span className="gradient-text">Industry Leaders</span>
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="premium-card rounded-2xl p-8 flex flex-col"
                >
                  <div className="flex gap-1 mb-5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-8 flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
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
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="relative rounded-3xl overflow-hidden gradient-bg px-8 py-20 text-center"
              variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 dot-pattern opacity-10" />
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(0,197,200,0.2) 0%, transparent 70%)" }} />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  Ready to Transform<br className="hidden md:block" /> Your Business?
                </h2>
                <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
                  Let's talk about your goals. Free consultation, no commitment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setOpen(true)}
                    className="group bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    Schedule a Call
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <Link
                    href="/contact"
                    className="border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center"
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

function Shield({ size, className }: { size: number; className?: string }) {
  return <ShieldCheck size={size} className={className} />;
}
