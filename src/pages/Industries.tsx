import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { HeartPulse, Plane, Building2, Landmark, GraduationCap, Building, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function Industries() {
  const industries = [
    {
      icon: HeartPulse,
      name: "Healthcare",
      badge: "HIPAA Compliant",
      badgeColor: "bg-green-50 text-green-700 border-green-200",
      iconColor: "from-green-500 to-emerald-600",
      desc: "Secure, compliant portals and telemedicine platforms designed to improve patient outcomes.",
      bullets: ["Patient Portals", "Telehealth Apps", "EHR Integrations"]
    },
    {
      icon: Plane,
      name: "Travel & Tourism",
      badge: "High Availability",
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
      iconColor: "from-cyan-500 to-blue-600",
      desc: "Robust booking engines and travel platforms built to handle seasonal traffic spikes.",
      bullets: ["Booking Engines", "Dynamic Pricing APIs", "Itinerary Planners"]
    },
    {
      icon: Building2,
      name: "Retail",
      badge: "Scalable",
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
      iconColor: "from-orange-500 to-orange-600",
      desc: "Omnichannel e-commerce experiences that drive conversions and foster brand loyalty.",
      bullets: ["E-commerce Platforms", "Inventory Management", "POS Integration"]
    },
    {
      icon: Landmark,
      name: "Finance",
      badge: "Bank-Grade Security",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      iconColor: "from-blue-500 to-blue-700",
      desc: "Secure fintech applications, payment gateways, and trading platforms.",
      bullets: ["Payment Gateways", "Trading Platforms", "Fraud Detection"]
    },
    {
      icon: GraduationCap,
      name: "Education",
      badge: "Engaging",
      badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
      iconColor: "from-violet-500 to-violet-700",
      desc: "Interactive LMS and EdTech platforms enabling remote learning at scale.",
      bullets: ["Learning Management", "Virtual Classrooms", "Student Portals"]
    },
    {
      icon: Building,
      name: "Real Estate",
      badge: "Data-Driven",
      badgeColor: "bg-pink-50 text-pink-700 border-pink-200",
      iconColor: "from-pink-500 to-rose-600",
      desc: "Property management tools and listing platforms for modern brokerages.",
      bullets: ["Property Listings", "Virtual Tours", "CRM for Brokers"]
    }
  ];

  return (
    <Layout>
      <PageHero
        title="Industries We Serve"
        subtitle="Deep domain expertise across complex, regulated, and high-growth sectors."
        label="Industries"
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
          >
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="premium-card rounded-2xl p-8 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-13 h-13 w-12 h-12 rounded-xl bg-gradient-to-br ${industry.iconColor} flex items-center justify-center shadow-lg`}>
                    <industry.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${industry.badgeColor}`}>
                    {industry.badge}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold mb-2.5 text-foreground">{industry.name}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">{industry.desc}</p>

                <div className="pt-5 border-t border-border/50">
                  <ul className="space-y-2.5">
                    {industry.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm font-medium text-foreground/80">
                        <CheckCircle size={14} className="text-green-500 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative rounded-3xl overflow-hidden gradient-bg px-8 py-20 text-center"
            variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 dot-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Discuss Your Industry Needs
              </h2>
              <p className="text-white/65 text-lg mb-10 max-w-md mx-auto">
                Every industry is different. Let's find the right solution for yours.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Let's Talk <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
