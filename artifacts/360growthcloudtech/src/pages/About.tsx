import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { motion } from "framer-motion";
import {
  ShieldCheck, CheckCircle, Star, Award,
  Rocket, Users, BookOpen, Trophy,
  Target, Globe, Lightbulb, Handshake,
  Zap, Heart, Eye, TrendingUp,
  Avatar,
} from "lucide-react";
import { AvatarFallback, Avatar as AvatarUI } from "@/components/ui/avatar";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
  hidden: {},
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-4 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
      {children}
    </span>
  );
}

export default function About() {
  return (
    <Layout>
      <PageHero
        title="Who We Are"
        subtitle="Built by Technologists. Driven by Results."
        label="About Us"
      />

      {/* WHAT WE DO */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
              Solving the World's Toughest <span className="gradient-text">Challenges</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              360GrowthCloudTech solves our clients' toughest challenges by providing unmatched services in strategy, consulting, digital, technology and operations. We drive innovation to improve the way the world works and lives. With expertise across more than 40 industries and all business functions, we deliver transformational outcomes for a demanding new digital world.
            </p>
          </motion.div>

          {/* Stats banner */}
          <motion.div
            className="rounded-3xl p-10 md:p-12 text-white shadow-xl relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0d1f6e 0%, #1a6be0 60%, #00c5c8 100%)" }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row justify-around gap-8 text-center">
              {[
                { num: "40+", label: "Industries Served" },
                { num: "250+", label: "Projects Delivered" },
                { num: "50+", label: "Enterprise Clients" },
                { num: "10+", label: "Years Experience" },
              ].map((stat, i) => (
                <div key={i} data-testid={`stat-${i}`}>
                  <div className="text-4xl md:text-5xl font-black mb-2">{stat.num}</div>
                  <div className="text-white/80 text-sm font-semibold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT THIS MEANS FOR YOU */}
      <section className="py-20" style={{ background: "#f4f7ff" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              What This Means for You
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              {
                icon: ShieldCheck,
                bg: "bg-blue-500",
                title: "Secure Operations",
                desc: "Enterprise-grade security protocols protecting your data",
              },
              {
                icon: CheckCircle,
                bg: "bg-purple-500",
                title: "Privacy Compliance",
                desc: "Full compliance with global privacy regulations",
              },
              {
                icon: Star,
                bg: "bg-orange-500",
                title: "Innovation Focus",
                desc: "Government-backed startup driving innovation",
              },
              {
                icon: Award,
                bg: "bg-green-500",
                title: "Quality Assurance",
                desc: "Internationally certified processes and standards",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-border/40 hover:shadow-md transition-shadow"
                data-testid={`means-card-${i}`}
              >
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-base font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OUR CORE VALUE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <SectionLabel>Our Core Value</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-5">
              Our Values Drive Everything We Do
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
              Our values shape the culture of our organization and define the character of our company. We live the core values through individual behaviors. They serve as the foundation for how we act and make decisions.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto mt-2">
              These core principles guide our decisions, shape our culture, and define how we build lasting partnerships with our clients.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              {
                icon: Lightbulb,
                title: "Innovation",
                desc: "We push boundaries and embrace emerging technologies to deliver cutting-edge solutions",
              },
              {
                icon: Handshake,
                title: "Collaboration",
                desc: "We believe in the power of teamwork and building strong partnerships with our clients",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "We maintain the highest standards of quality in everything we do and deliver",
              },
              {
                icon: Globe,
                title: "Impact",
                desc: "We create solutions that make a meaningful difference to businesses and communities",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 text-center border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                data-testid={`value-card-${i}`}
              >
                <div className="w-14 h-14 bg-primary/8 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(13,31,110,0.08)" }}>
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-base font-bold text-foreground mb-3">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CULTURE */}
      <section className="py-20" style={{ background: "#f4f7ff" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/20 bg-white px-3 py-1 rounded-full mb-4">
              <Heart size={12} /> Our Culture
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Culture</h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mx-auto">
              Join a culture of innovation, collaboration, and continuous growth where your ideas shape the future of technology.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              {
                icon: Rocket,
                bg: "bg-blue-500",
                title: "Innovation First",
                desc: "Cutting-edge projects and emerging technologies",
              },
              {
                icon: Users,
                bg: "bg-purple-500",
                title: "Collaborative Spirit",
                desc: "Cross-functional teams working towards common goals",
              },
              {
                icon: BookOpen,
                bg: "bg-green-500",
                title: "Continuous Learning",
                desc: "Professional development and skill enhancement",
              },
              {
                icon: Trophy,
                bg: "bg-orange-500",
                title: "Recognition",
                desc: "Celebrating achievements and milestones",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 text-center border border-border/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                data-testid={`culture-card-${i}`}
              >
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-base font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MISSION QUOTE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            className="text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <blockquote className="text-2xl md:text-3xl font-bold text-foreground leading-snug relative px-8">
              <span className="absolute -top-4 -left-0 text-6xl text-accent/20 font-serif">"</span>
              Our mission is to empower businesses with technology that not only solves today's problems but anticipates tomorrow's opportunities.
              <span className="absolute -bottom-8 -right-0 text-6xl text-accent/20 font-serif">"</span>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20" style={{ background: "#f4f7ff" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <SectionLabel>Our Team</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Meet the Experts</h2>
            <p className="text-muted-foreground text-base">The people driving your success.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              { name: "Alexandra Reed", role: "CEO & Founder", initials: "AR", bg: "bg-blue-600" },
              { name: "David Chen", role: "CTO", initials: "DC", bg: "bg-purple-600" },
              { name: "Sarah Jenkins", role: "Head of Marketing", initials: "SJ", bg: "bg-teal-600" },
              { name: "Marcus Johnson", role: "Lead Architect", initials: "MJ", bg: "bg-orange-600" },
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="text-center group"
                data-testid={`team-member-${i}`}
              >
                <AvatarUI className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-md group-hover:shadow-lg transition-shadow">
                  <AvatarFallback className={`text-xl font-bold text-white ${member.bg}`}>{member.initials}</AvatarFallback>
                </AvatarUI>
                <h4 className="text-base font-bold text-foreground">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
