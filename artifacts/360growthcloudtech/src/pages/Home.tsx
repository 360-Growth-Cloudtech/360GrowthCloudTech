import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { 
  Code2, Users, TrendingUp, Cloud, ShieldCheck, ShoppingCart,
  HeartPulse, Plane, Building2, Landmark, GraduationCap, Building,
  CheckCircle2, ArrowRight, Star
} from "lucide-react";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
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
              <a href="#contact" className="w-full sm:w-auto gradient-bg px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                Get Started <ArrowRight size={20} />
              </a>
              <a href="#services" className="w-full sm:w-auto bg-white border border-border text-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                Explore Services
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Our Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-6">Everything You Need to Succeed Online</h3>
            <p className="text-muted-foreground text-lg">We don't just build apps; we engineer entire digital ecosystems designed for growth and resilience.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { icon: Code2, title: "Custom Software", desc: "High-performance web and mobile applications (iOS/Android) tailored to your business logic." },
              { icon: Users, title: "Custom CRM Tools", desc: "Bespoke customer relationship management systems for Healthcare, Travel, and Retail." },
              { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven Google Ads, Meta Ads, and comprehensive SEO (On-page & Off-page)." },
              { icon: Cloud, title: "Cloud Infrastructure", desc: "Scalable cloud setup, robust deployment pipelines, and 24/7 proactive support." },
              { icon: ShieldCheck, title: "Cybersecurity", desc: "Enterprise-grade protection, secure deployments, and strict compliance management." },
              { icon: ShoppingCart, title: "E-commerce Solutions", desc: "End-to-end web & mobile stores with seamless payment gateway integrations." }
            ].map((service, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-background rounded-2xl p-8 border border-border/50 hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section id="industries" className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Industries We Serve</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">Transforming Every Sector</h3>
            <p className="text-white/80 text-lg">We bring deep domain expertise to solve complex challenges across diverse verticals.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: HeartPulse, name: "Healthcare" },
              { icon: Plane, name: "Travel" },
              { icon: Building2, name: "Retail" },
              { icon: Landmark, name: "Finance" },
              { icon: GraduationCap, name: "Education" },
              { icon: Building, name: "Real Estate" }
            ].map((industry, i) => (
              <div key={i} className="flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <industry.icon className="w-10 h-10 text-accent mb-4" />
                <span className="font-semibold text-white">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">How It Works</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-6">A Proven Path to Launch</h3>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-accent/30 to-primary/10 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {[
                { step: "01", title: "Consult", desc: "Deep dive into your goals" },
                { step: "02", title: "Design", desc: "UI/UX & architecture" },
                { step: "03", title: "Build", desc: "Agile development" },
                { step: "04", title: "Launch", desc: "Secure deployment" },
                { step: "05", title: "Support", desc: "24/7 maintenance" }
              ].map((phase, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-primary/20 border-4 border-white">
                    {phase.step}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{phase.title}</h4>
                  <p className="text-muted-foreground text-sm">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US & STATS */}
      <section id="why-us" className="py-24 bg-background border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Why Choose Us</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-6">More Than Just Developers</h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We eliminate the friction of managing multiple vendors. By handling development, marketing, cloud, and security internally, we ensure your product is cohesive, fast, and completely secure.
              </p>
              
              <div className="space-y-4">
                {[
                  "True End-to-End Delivery",
                  "Security-First Architecture",
                  "24/7 Proactive Support & Monitoring",
                  "Custom Solutions, No Cookie-Cutter Templates"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="font-semibold text-foreground/90">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "250+", label: "Projects Delivered" },
                { number: "99.9%", label: "Uptime Guaranteed" },
                { number: "50+", label: "Enterprise Clients" },
                { number: "10+", label: "Years Experience" }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-border text-center">
                  <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{stat.number}</div>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>

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
              <div key={i} className="bg-background p-8 rounded-2xl border border-border">
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

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-background relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-primary -z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center text-white mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-white/80 text-lg">Let's discuss how we can build, scale, and secure your next big idea.</p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}