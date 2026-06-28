import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { HeartPulse, Plane, Building2, Landmark, GraduationCap, Building, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.09 } } };

export default function Industries() {
  const industries = [
    { icon: HeartPulse, name: "Healthcare", badge: "HIPAA Compliant", badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200", iconColor: "from-emerald-500 to-emerald-700", desc: "Secure, compliant portals and telemedicine platforms.", bullets: ["Patient Portals", "Telehealth Apps", "EHR Integrations"] },
    { icon: Plane, name: "Travel & Tourism", badge: "High Availability", badgeColor: "bg-violet-50 text-violet-700 border-violet-200", iconColor: "from-violet-500 to-violet-700", desc: "Robust booking engines built for seasonal traffic spikes.", bullets: ["Booking Engines", "Dynamic Pricing APIs", "Itinerary Planners"] },
    { icon: Building2, name: "Retail", badge: "Scalable", badgeColor: "bg-purple-50 text-purple-700 border-purple-200", iconColor: "from-purple-500 to-purple-700", desc: "Omnichannel e-commerce experiences that drive conversions.", bullets: ["E-commerce Platforms", "Inventory Management", "POS Integration"] },
    { icon: Landmark, name: "Finance", badge: "Bank-Grade Security", badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200", iconColor: "from-indigo-500 to-indigo-700", desc: "Secure fintech applications, payment gateways, and trading platforms.", bullets: ["Payment Gateways", "Trading Platforms", "Fraud Detection"] },
    { icon: GraduationCap, name: "Education", badge: "Engaging", badgeColor: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200", iconColor: "from-fuchsia-500 to-fuchsia-700", desc: "Interactive LMS and EdTech platforms enabling remote learning.", bullets: ["Learning Management", "Virtual Classrooms", "Student Portals"] },
    { icon: Building, name: "Real Estate", badge: "Data-Driven", badgeColor: "bg-teal-50 text-teal-700 border-teal-200", iconColor: "from-teal-500 to-teal-700", desc: "Property management tools for modern brokerages.", bullets: ["Property Listings", "Virtual Tours", "CRM for Brokers"] },
  ];

  return (
    <Layout>
      <PageHero title="Industries We Serve" subtitle="Deep domain expertise across complex, regulated, and high-growth sectors." label="Industries" />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {industries.map((industry, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.45 }} className="premium-card rounded-xl p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${industry.iconColor} flex items-center justify-center shadow-md`}>
                    <industry.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${industry.badgeColor}`}>
                    {industry.badge}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold mb-2 text-foreground">{industry.name}</h3>
                <p className="text-xs text-muted-foreground mb-4 flex-1 leading-relaxed">{industry.desc}</p>
                <div className="pt-4 border-t border-border/50">
                  <ul className="space-y-2">
                    {industry.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                        <CheckCircle size={12} className="text-emerald-500 shrink-0" />{bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="relative rounded-2xl overflow-hidden gradient-bg px-8 py-14 text-center" variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="absolute inset-0 dot-pattern" />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4" style={{ letterSpacing: "-0.02em" }}>Discuss Your Industry Needs</h2>
              <p className="text-white/60 text-sm mb-8 max-w-sm mx-auto">Every industry is different. Let's find the right solution for yours.</p>
              <Link href="/contact" className="group inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Let's Talk <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
