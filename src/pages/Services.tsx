import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import {
  Code2, Users, TrendingUp, Cloud, ShieldCheck, ShoppingCart, ArrowRight, CheckCircle
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.09 } }
};

export default function Services() {
  const allServices = [
    { icon: Code2, title: "Custom Software", desc: "High-performance web and mobile applications.", color: "from-blue-500 to-blue-700" },
    { icon: Users, title: "Custom CRM Tools", desc: "Bespoke customer relationship management.", color: "from-violet-500 to-violet-700" },
    { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven Ads and comprehensive SEO.", color: "from-orange-500 to-orange-600" },
    { icon: Cloud, title: "Cloud Infrastructure", desc: "Scalable cloud setup and robust pipelines.", color: "from-cyan-500 to-cyan-700" },
    { icon: ShieldCheck, title: "Cybersecurity", desc: "Enterprise-grade protection & compliance.", color: "from-green-500 to-green-700" },
    { icon: ShoppingCart, title: "E-commerce", desc: "End-to-end stores with seamless payments.", color: "from-pink-500 to-pink-700" }
  ];

  const consultingServices = [
    {
      icon: TrendingUp,
      title: "Strategic Planning",
      desc: "Align your technology roadmap with your business goals.",
      bullets: ["Market analysis", "Technology roadmapping", "Resource allocation"],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Cloud,
      title: "Digital Transformation",
      desc: "Modernize legacy systems and processes.",
      bullets: ["Process automation", "Legacy system modernization", "Change management"],
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: ShieldCheck,
      title: "Technology Audit",
      desc: "Comprehensive review of your current tech stack.",
      bullets: ["Security vulnerability assessment", "Performance analysis", "Cost optimization"],
      color: "from-green-500 to-green-600"
    }
  ];

  const techServices = [
    {
      icon: Code2,
      title: "Custom Software Dev",
      desc: "Tailored applications built for your specific needs.",
      bullets: ["Web applications", "Mobile apps (iOS & Android)", "API development"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      desc: "Scalable and resilient infrastructure solutions.",
      bullets: ["Cloud migration", "CI/CD pipelines", "Infrastructure as Code"],
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: ShieldCheck,
      title: "Cybersecurity",
      desc: "Protecting your digital assets from emerging threats.",
      bullets: ["Penetration testing", "Compliance (HIPAA/SOC2)", "24/7 Monitoring"],
      color: "from-green-500 to-green-600"
    }
  ];

  const processSteps = [
    { step: "01", title: "Consult", desc: "Deep dive into goals" },
    { step: "02", title: "Design", desc: "UI/UX & architecture" },
    { step: "03", title: "Build", desc: "Agile development" },
    { step: "04", title: "Launch", desc: "Secure deployment" },
    { step: "05", title: "Support", desc: "24/7 maintenance" }
  ];

  return (
    <Layout>
      <PageHero
        title="Our Services"
        subtitle="Everything You Need to Succeed Online"
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-14">
              <TabsList className="grid w-full max-w-sm grid-cols-3 h-auto p-1.5 bg-white border border-border shadow-md rounded-2xl">
                <TabsTrigger value="all" className="py-2.5 rounded-xl text-sm font-bold">All Services</TabsTrigger>
                <TabsTrigger value="consulting" className="py-2.5 rounded-xl text-sm font-bold">Consulting</TabsTrigger>
                <TabsTrigger value="technology" className="py-2.5 rounded-xl text-sm font-bold">Technology</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={stagger} initial="initial" animate="animate"
              >
                {allServices.map((service, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    transition={{ duration: 0.45 }}
                    className="premium-card rounded-2xl p-8 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-base font-bold mb-2 text-foreground">{service.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="consulting" className="mt-0">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={stagger} initial="initial" animate="animate"
              >
                {consultingServices.map((service, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    transition={{ duration: 0.45 }}
                    className="premium-card rounded-2xl p-8"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-base font-bold mb-2 text-foreground">{service.title}</h4>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{service.desc}</p>
                    <ul className="space-y-2.5">
                      {service.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-sm text-foreground/80">
                          <CheckCircle size={14} className="text-green-500 shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="technology" className="mt-0">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={stagger} initial="initial" animate="animate"
              >
                {techServices.map((service, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    transition={{ duration: 0.45 }}
                    className="premium-card rounded-2xl p-8"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-base font-bold mb-2 text-foreground">{service.title}</h4>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{service.desc}</p>
                    <ul className="space-y-2.5">
                      {service.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-sm text-foreground/80">
                          <CheckCircle size={14} className="text-cyan-500 shrink-0" />
                          {bullet}
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

      {/* Process Section */}
      <section className="py-24 bg-white border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20"
            variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-5 inline-flex">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              A Proven Path to <span className="gradient-text">Launch</span>
            </h2>
            <p className="text-muted-foreground text-lg">Structured, transparent, and built for results.</p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5" style={{ background: "linear-gradient(to right, rgba(13,31,110,0.1), rgba(26,107,224,0.3), rgba(0,197,200,0.3), rgba(13,31,110,0.1))" }} />

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6 relative z-10"
              variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
            >
              {processSteps.map((phase, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.5 }} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white font-black text-lg mb-6 shadow-xl shadow-blue-500/20 border-4 border-white ring-4 ring-blue-500/10">
                    {phase.step}
                  </div>
                  <h4 className="text-lg font-extrabold mb-2 text-foreground">{phase.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{phase.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative rounded-3xl overflow-hidden gradient-bg px-8 py-20 text-center"
            variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 dot-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Need a Custom Solution?
              </h2>
              <p className="text-white/65 text-lg mb-10 max-w-xl mx-auto">
                Tell us what you're building — we'll handle the rest.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Contact Us <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
