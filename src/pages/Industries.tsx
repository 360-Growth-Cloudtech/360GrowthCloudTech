import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { HeartPulse, Plane, Building2, Landmark, GraduationCap, Building, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Industries() {
  const industries = [
    {
      icon: HeartPulse,
      name: "Healthcare",
      badge: "HIPAA Compliant",
      desc: "Secure, compliant portals and telemedicine platforms designed to improve patient outcomes.",
      bullets: ["Patient Portals", "Telehealth Apps", "EHR Integrations"]
    },
    {
      icon: Plane,
      name: "Travel & Tourism",
      badge: "High Availability",
      desc: "Robust booking engines and travel platforms built to handle seasonal traffic spikes without downtime.",
      bullets: ["Booking Engines", "Dynamic Pricing APIs", "Itinerary Planners"]
    },
    {
      icon: Building2,
      name: "Retail",
      badge: "Scalable",
      desc: "Omnichannel e-commerce experiences that drive conversions and foster brand loyalty.",
      bullets: ["E-commerce Platforms", "Inventory Management", "POS Integration"]
    },
    {
      icon: Landmark,
      name: "Finance",
      badge: "Bank-Grade Security",
      desc: "Secure fintech applications, payment gateways, and trading platforms.",
      bullets: ["Payment Gateways", "Trading Platforms", "Fraud Detection"]
    },
    {
      icon: GraduationCap,
      name: "Education",
      badge: "Engaging",
      desc: "Interactive LMS and EdTech platforms enabling remote learning.",
      bullets: ["Learning Management", "Virtual Classrooms", "Student Portals"]
    },
    {
      icon: Building,
      name: "Real Estate",
      badge: "Data-Driven",
      desc: "Property management tools and listing platforms for modern brokerages.",
      bullets: ["Property Listings", "Virtual Tours", "CRM for Brokers"]
    }
  ];

  return (
    <Layout>
      <PageHero 
        title="Industries We Serve" 
        subtitle="Deep domain expertise across complex sectors."
      />
      
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-border shadow-sm flex flex-col h-full hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <industry.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full border border-accent/20">
                    {industry.badge}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold mb-2 text-foreground">{industry.name}</h3>
                <p className="text-sm text-muted-foreground mb-5 flex-1">{industry.desc}</p>
                
                <div className="pt-6 border-t border-border/50">
                  <ul className="space-y-3">
                    {industry.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-center text-sm font-medium text-foreground/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8">Discuss Your Industry Needs</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-shadow">
            Let's Talk <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
