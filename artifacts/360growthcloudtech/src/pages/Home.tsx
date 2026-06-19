import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { 
  Code2, Users, TrendingUp, Cloud, ShieldCheck, ShoppingCart,
  ArrowRight, Star
} from "lucide-react";

export default function Home() {
  const { setOpen } = useScheduleMeeting();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <Layout>
      <div data-testid="home-page">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/4"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial="initial" animate="animate" variants={fadeIn}>
                <span className="inline-block py-1.5 px-4 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6 border border-accent/20">
                  End-to-End Digital Transformation
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 text-foreground"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              >
                Build, Scale, and Secure Your <br className="hidden lg:block"/>
                <span className="gradient-text">Digital Future</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              >
                We are the one partner you need to go from idea to a live, growing digital product. Custom software, powerful marketing, resilient cloud infrastructure, and enterprise-grade security—all under one roof.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              >
                <button 
                  onClick={() => setOpen(true)}
                  className="w-full sm:w-auto gradient-bg px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-white"
                  data-testid="hero-cta-get-started"
                >
                  Get Started <ArrowRight size={20} />
                </button>
                <Link href="/services" className="w-full sm:w-auto bg-white border border-border text-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                  Explore Services
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* COMPACT SERVICES OVERVIEW */}
        <section className="py-20 bg-slate-50 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold mb-4">Our Expertise</h2>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { icon: Code2, title: "Custom Software", desc: "High-performance web and mobile applications." },
                { icon: Users, title: "Custom CRM Tools", desc: "Bespoke customer relationship management." },
                { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven Ads and comprehensive SEO." },
                { icon: Cloud, title: "Cloud Infrastructure", desc: "Scalable cloud setup and robust pipelines." },
                { icon: ShieldCheck, title: "Cybersecurity", desc: "Enterprise-grade protection & compliance." },
                { icon: ShoppingCart, title: "E-commerce", desc: "End-to-end stores with seamless payments." }
              ].map((service, i) => (
                <Link href="/services" key={i}>
                  <motion.div variants={fadeIn} className="bg-white rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-shadow group h-full cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      <service.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">{service.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* STATS BANNER */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: "250+", label: "Projects Delivered" },
                { num: "99.9%", label: "Uptime Achieved" },
                { num: "50+", label: "Enterprise Clients" },
                { num: "10+", label: "Years Experience" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-5xl font-black mb-2">{stat.num}</div>
                  <div className="text-white/80 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-6">Trusted by Industry Leaders</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { quote: "360GrowthCloudTech completely revamped our patient portal. It's faster, incredibly secure, and their support team is always available.", name: "Dr. Sarah Jenkins", role: "CTO, MedCare Health" },
                { quote: "Having development and marketing under one roof changed everything for us. Our new e-commerce platform saw a 40% increase in conversions.", name: "Marcus Chen", role: "Founder, Peak Retail" },
                { quote: "Their cloud infrastructure setup is flawless. We haven't had a minute of downtime since migrating our booking engine to their systems.", name: "Elena Rodriguez", role: "VP Engineering, Global Travel" }
              ].map((test, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-border/60">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-accent text-accent" />)}
                  </div>
                  <p className="text-foreground/80 italic mb-8 min-h-[100px]">"{test.quote}"</p>
                  <div>
                    <div className="font-bold text-foreground">{test.name}</div>
                    <div className="text-sm text-muted-foreground">{test.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-20 gradient-bg text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8">Ready to Transform Your Business?</h2>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-shadow">
              Let's Talk <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
