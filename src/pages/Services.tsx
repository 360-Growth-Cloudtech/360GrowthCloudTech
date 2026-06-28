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
    { icon: Code2, title: "Custom Software", desc: "High-performance web and mobile applications.", tag: "Engineering" },
    { icon: Users, title: "Custom CRM Tools", desc: "Bespoke customer relationship management.", tag: "Product" },
    { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven Ads and comprehensive SEO.", tag: "Growth" },
    { icon: Cloud, title: "Cloud Infrastructure", desc: "Scalable cloud setup and robust pipelines.", tag: "DevOps" },
    { icon: ShieldCheck, title: "Cybersecurity", desc: "Enterprise-grade protection & compliance.", tag: "Security" },
    { icon: ShoppingCart, title: "E-commerce", desc: "End-to-end stores with seamless payments.", tag: "Commerce" },
  ];

  const consultingServices = [
    { icon: TrendingUp, title: "Strategic Planning", desc: "Align your technology roadmap with business goals.", bullets: ["Market analysis", "Technology roadmapping", "Resource allocation"] },
    { icon: Cloud, title: "Digital Transformation", desc: "Modernize legacy systems and processes.", bullets: ["Process automation", "Legacy system modernization", "Change management"] },
    { icon: ShieldCheck, title: "Technology Audit", desc: "Comprehensive review of your current tech stack.", bullets: ["Security vulnerability assessment", "Performance analysis", "Cost optimization"] },
  ];

  const techServices = [
    { icon: Code2, title: "Custom Software Dev", desc: "Tailored applications built for your specific needs.", bullets: ["Web applications", "Mobile apps (iOS & Android)", "API development"] },
    { icon: Cloud, title: "Cloud & DevOps", desc: "Scalable and resilient infrastructure solutions.", bullets: ["Cloud migration", "CI/CD pipelines", "Infrastructure as Code"] },
    { icon: ShieldCheck, title: "Cybersecurity", desc: "Protecting your digital assets from emerging threats.", bullets: ["Penetration testing", "Compliance (HIPAA/SOC2)", "24/7 Monitoring"] },
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
      <PageHero label="Services" title="What we do." subtitle="From idea to a live, growing product — we handle every layer of the stack." />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="grid w-full max-w-sm grid-cols-3 h-auto p-1.5 bg-white border border-border shadow-sm rounded-full">
                <TabsTrigger value="all" className="py-2 rounded-full text-xs font-bold">All Services</TabsTrigger>
                <TabsTrigger value="consulting" className="py-2 rounded-full text-xs font-bold">Consulting</TabsTrigger>
                <TabsTrigger value="technology" className="py-2 rounded-full text-xs font-bold">Technology</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" variants={stagger} initial="initial" animate="animate">
                {allServices.map((s, i) => (
                  <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }} className="premium-card rounded-2xl p-6 group">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                        <s.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{s.tag}</span>
                    </div>
                    <h4 className="font-bold text-base mb-2 text-foreground">{s.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="consulting" className="mt-0">
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-3" variants={stagger} initial="initial" animate="animate">
                {consultingServices.map((s, i) => (
                  <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }} className="premium-card rounded-2xl p-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-base mb-2 text-foreground">{s.title}</h4>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{s.desc}</p>
                    <ul className="space-y-2.5">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-foreground/75">
                          <CheckCircle size={13} className="text-primary shrink-0" />{b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="technology" className="mt-0">
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-3" variants={stagger} initial="initial" animate="animate">
                {techServices.map((s, i) => (
                  <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }} className="premium-card rounded-2xl p-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-base mb-2 text-foreground">{s.title}</h4>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{s.desc}</p>
                    <ul className="space-y-2.5">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-foreground/75">
                          <CheckCircle size={13} className="text-primary shrink-0" />{b}
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
      <section className="py-20 bg-white/40 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="section-label mb-5 inline-flex">Our Process</span>
            <h2 className="display-heading text-3xl md:text-5xl text-foreground mb-4">
              A proven path to <span className="cursive-accent">launch.</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px" style={{ background: "linear-gradient(to right, transparent, rgba(232,82,26,0.2), rgba(232,82,26,0.2), transparent)" }} />
            <motion.div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
              {processSteps.map((phase, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.45 }} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center text-white font-black text-base mb-5 shadow-lg border-4 border-background">
                    {phase.step}
                  </div>
                  <h4 className="text-base font-extrabold mb-1 text-foreground">{phase.title}</h4>
                  <p className="text-muted-foreground text-sm">{phase.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="rounded-3xl overflow-hidden text-center px-8 py-14 relative" style={{ backgroundColor: "#1a1512" }} variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(232,82,26,0.2) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <h2 className="display-heading text-2xl md:text-4xl text-white mb-4">Need a custom solution?</h2>
              <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>Tell us what you're building — we'll handle the rest.</p>
              <Link href="/contact" className="btn-primary inline-flex">
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
