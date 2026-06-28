import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { Code2, Users, TrendingUp, Cloud, ShieldCheck, ShoppingCart, ArrowRight, CheckCircle } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

export default function Services() {
  const allServices = [
    { icon: Code2, title: "Custom Software", desc: "High-performance web and mobile applications.", color: "from-violet-500 to-violet-700" },
    { icon: Users, title: "Custom CRM Tools", desc: "Bespoke customer relationship management.", color: "from-indigo-500 to-indigo-700" },
    { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven Ads and comprehensive SEO.", color: "from-emerald-500 to-emerald-700" },
    { icon: Cloud, title: "Cloud Infrastructure", desc: "Scalable cloud setup and robust pipelines.", color: "from-purple-500 to-purple-700" },
    { icon: ShieldCheck, title: "Cybersecurity", desc: "Enterprise-grade protection & compliance.", color: "from-teal-500 to-teal-700" },
    { icon: ShoppingCart, title: "E-commerce", desc: "End-to-end stores with seamless payments.", color: "from-fuchsia-500 to-fuchsia-700" },
  ];

  const consultingServices = [
    { icon: TrendingUp, title: "Strategic Planning", desc: "Align your technology roadmap with business goals.", bullets: ["Market analysis", "Technology roadmapping", "Resource allocation"], color: "from-emerald-500 to-emerald-700" },
    { icon: Cloud, title: "Digital Transformation", desc: "Modernize legacy systems and processes.", bullets: ["Process automation", "Legacy system modernization", "Change management"], color: "from-violet-500 to-violet-700" },
    { icon: ShieldCheck, title: "Technology Audit", desc: "Comprehensive review of your current tech stack.", bullets: ["Security vulnerability assessment", "Performance analysis", "Cost optimization"], color: "from-indigo-500 to-indigo-700" },
  ];

  const techServices = [
    { icon: Code2, title: "Custom Software Dev", desc: "Tailored applications built for your specific needs.", bullets: ["Web applications", "Mobile apps (iOS & Android)", "API development"], color: "from-violet-500 to-violet-700" },
    { icon: Cloud, title: "Cloud & DevOps", desc: "Scalable and resilient infrastructure solutions.", bullets: ["Cloud migration", "CI/CD pipelines", "Infrastructure as Code"], color: "from-purple-500 to-purple-700" },
    { icon: ShieldCheck, title: "Cybersecurity", desc: "Protecting your digital assets from emerging threats.", bullets: ["Penetration testing", "Compliance (HIPAA/SOC2)", "24/7 Monitoring"], color: "from-teal-500 to-teal-700" },
  ];

  const processSteps = [
    { step: "01", title: "Consult", desc: "Deep dive into goals" },
    { step: "02", title: "Design", desc: "UI/UX & architecture" },
    { step: "03", title: "Build", desc: "Agile development" },
    { step: "04", title: "Launch", desc: "Secure deployment" },
    { step: "05", title: "Support", desc: "24/7 maintenance" },
  ];

  return (
    <Layout>
      <PageHero title="Our Services" subtitle="Everything You Need to Succeed Online" />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="grid w-full max-w-sm grid-cols-3 h-auto p-1.5 bg-white border border-border shadow-md rounded-xl">
                <TabsTrigger value="all" className="py-2 rounded-lg text-xs font-bold">All Services</TabsTrigger>
                <TabsTrigger value="consulting" className="py-2 rounded-lg text-xs font-bold">Consulting</TabsTrigger>
                <TabsTrigger value="technology" className="py-2 rounded-lg text-xs font-bold">Technology</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" variants={stagger} initial="initial" animate="animate">
                {allServices.map((s, i) => (
                  <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }} className="premium-card rounded-xl p-5 group cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-sm font-bold mb-1.5 text-foreground">{s.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="consulting" className="mt-0">
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={stagger} initial="initial" animate="animate">
                {consultingServices.map((s, i) => (
                  <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }} className="premium-card rounded-xl p-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-md`}>
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-sm font-bold mb-1.5 text-foreground">{s.title}</h4>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-foreground/80">
                          <CheckCircle size={12} className="text-emerald-500 shrink-0" />{b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="technology" className="mt-0">
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={stagger} initial="initial" animate="animate">
                {techServices.map((s, i) => (
                  <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }} className="premium-card rounded-xl p-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-md`}>
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-sm font-bold mb-1.5 text-foreground">{s.title}</h4>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-foreground/80">
                          <CheckCircle size={12} className="text-emerald-500 shrink-0" />{b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="section-label mb-4 inline-flex">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              A Proven Path to <span className="gradient-text">Launch</span>
            </h2>
            <p className="text-muted-foreground text-sm">Structured, transparent, and built for results.</p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px" style={{ background: "linear-gradient(to right, rgba(91,33,182,0.08), rgba(124,58,237,0.25), rgba(16,185,129,0.25), rgba(91,33,182,0.08))" }} />
            <motion.div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
              {processSteps.map((phase, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.45 }} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white font-black text-base mb-5 shadow-lg shadow-violet-500/20 border-4 border-white ring-4 ring-violet-500/10">
                    {phase.step}
                  </div>
                  <h4 className="text-base font-extrabold mb-1 text-foreground">{phase.title}</h4>
                  <p className="text-muted-foreground text-xs">{phase.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="relative rounded-2xl overflow-hidden gradient-bg px-8 py-14 text-center" variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="absolute inset-0 dot-pattern" />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4" style={{ letterSpacing: "-0.02em" }}>Need a Custom Solution?</h2>
              <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">Tell us what you're building — we'll handle the rest.</p>
              <Link href="/contact" className="group inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Contact Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
