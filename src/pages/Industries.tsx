import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { HeartPulse, Plane, Building2, Landmark, GraduationCap, Building, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.09 } } };

export default function Industries() {
  const industries = [
    { icon: HeartPulse, name: "Healthcare", badge: "HIPAA Compliant", desc: "Secure, compliant portals and telemedicine platforms.", bullets: ["Patient Portals", "Telehealth Apps", "EHR Integrations"] },
    { icon: Plane, name: "Travel & Tourism", badge: "High Availability", desc: "Robust booking engines built for seasonal traffic spikes.", bullets: ["Booking Engines", "Dynamic Pricing APIs", "Itinerary Planners"] },
    { icon: Building2, name: "Retail", badge: "Scalable", desc: "Omnichannel e-commerce experiences that drive conversions.", bullets: ["E-commerce Platforms", "Inventory Management", "POS Integration"] },
    { icon: Landmark, name: "Finance", badge: "Bank-Grade Security", desc: "Secure fintech applications, payment gateways, and trading platforms.", bullets: ["Payment Gateways", "Trading Platforms", "Fraud Detection"] },
    { icon: GraduationCap, name: "Education", badge: "Engaging", desc: "Interactive LMS and EdTech platforms enabling remote learning.", bullets: ["Learning Management", "Virtual Classrooms", "Student Portals"] },
    { icon: Building, name: "Real Estate", badge: "Data-Driven", desc: "Property management tools for modern brokerages.", bullets: ["Property Listings", "Virtual Tours", "CRM for Brokers"] },
  ];

  return (
    <Layout>
      <PageHero label="Industries" title="Who we serve." subtitle="Deep domain expertise across complex, regulated, and high-growth sectors." />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-3" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {industries.map((industry, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.45 }} className="premium-card rounded-2xl p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <industry.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="px-3 py-1 text-xs font-bold rounded-full" style={{ background: "rgba(26,21,18,0.06)", color: "#6b6258" }}>
                    {industry.badge}
                  </span>
                </div>
                <h3 className="font-extrabold text-base mb-2 text-foreground">{industry.name}</h3>
                <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">{industry.desc}</p>
                <div className="pt-4 border-t border-border/50">
                  <ul className="space-y-2">
                    {industry.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm font-medium text-foreground/75">
                        <CheckCircle size={13} className="text-primary shrink-0" />{bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white/40 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="rounded-3xl overflow-hidden text-center px-8 py-14 relative" style={{ backgroundColor: "#1a1512" }} variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(232,82,26,0.2) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <h2 className="display-heading text-2xl md:text-4xl text-white mb-4">Discuss your industry needs.</h2>
              <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>Every industry is different. Let's find the right solution for yours.</p>
              <Link href="/contact" className="btn-primary inline-flex">
                Let's Talk <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
