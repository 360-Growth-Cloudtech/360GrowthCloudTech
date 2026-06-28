import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import {
  ShieldCheck, CheckCircle, Star, Award,
  Rocket, Users, BookOpen, Trophy,
  Globe, Lightbulb, Handshake,
  Heart, TrendingUp,
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

export default function About() {
  return (
    <Layout>
      <PageHero
        title="Who We Are"
        subtitle="Built by technologists. Driven by results. Powered by partnership."
        label="About Us"
      />

      {/* WHAT WE DO */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <span className="section-label mb-5 inline-flex">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              Solving the World's Toughest <span className="gradient-text">Challenges</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              360GrowthCloudTech solves our clients' toughest challenges by providing unmatched services in strategy, consulting, digital, technology and operations. We drive innovation to improve the way the world works and lives. With expertise across more than 40 industries and all business functions, we deliver transformational outcomes for a demanding new digital world.
            </p>
          </motion.div>

          {/* Stats banner */}
          <motion.div
            className="relative rounded-3xl p-12 text-white overflow-hidden shadow-2xl"
            style={{ background: "linear-gradient(135deg, #04102e 0%, #0d1f6e 40%, #1a6be0 75%, #00c5c8 100%)" }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div className="absolute inset-0 dot-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: "40+", label: "Industries Served" },
                { num: "250+", label: "Projects Delivered" },
                { num: "50+", label: "Enterprise Clients" },
                { num: "10+", label: "Years Experience" },
              ].map((stat, i) => (
                <div key={i} data-testid={`stat-${i}`}>
                  <div className="text-4xl md:text-5xl font-black mb-2">{stat.num}</div>
                  <div className="text-white/70 text-xs font-semibold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT THIS MEANS FOR YOU */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <span className="section-label mb-5 inline-flex">Our Impact</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              What This Means for <span className="gradient-text">You</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              { icon: ShieldCheck, bg: "from-blue-500 to-blue-700", title: "Secure Operations", desc: "Enterprise-grade security protocols protecting your data" },
              { icon: CheckCircle, bg: "from-violet-500 to-violet-700", title: "Privacy Compliance", desc: "Full compliance with global privacy regulations" },
              { icon: Star, bg: "from-orange-500 to-orange-600", title: "Innovation Focus", desc: "Government-backed startup driving innovation" },
              { icon: Award, bg: "from-green-500 to-green-600", title: "Quality Assurance", desc: "Internationally certified processes and standards" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="premium-card rounded-2xl p-8 text-center"
                data-testid={`means-card-${i}`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-base font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <span className="section-label mb-5 inline-flex">Our Core Values</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              Our Values Drive <span className="gradient-text">Everything</span> We Do
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
              These core principles guide our decisions, shape our culture, and define how we build lasting partnerships with our clients.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              { icon: Lightbulb, title: "Innovation", desc: "We push boundaries and embrace emerging technologies to deliver cutting-edge solutions", accent: "text-amber-500", bg: "bg-amber-50" },
              { icon: Handshake, title: "Collaboration", desc: "We believe in the power of teamwork and building strong partnerships with our clients", accent: "text-blue-600", bg: "bg-blue-50" },
              { icon: Award, title: "Excellence", desc: "We maintain the highest standards of quality in everything we do and deliver", accent: "text-violet-600", bg: "bg-violet-50" },
              { icon: Globe, title: "Impact", desc: "We create solutions that make a meaningful difference to businesses and communities", accent: "text-green-600", bg: "bg-green-50" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="premium-card rounded-2xl p-8 text-center"
                data-testid={`value-card-${i}`}
              >
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                  <item.icon className={`w-7 h-7 ${item.accent}`} />
                </div>
                <h4 className="text-base font-bold text-foreground mb-3">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CULTURE */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <span className="inline-flex items-center gap-1.5 section-label mb-5">
              <Heart size={11} /> Our Culture
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              A Culture of <span className="gradient-text">Growth</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mx-auto">
              Join a culture of innovation, collaboration, and continuous learning where your ideas shape the future.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              { icon: Rocket, bg: "from-blue-500 to-blue-700", title: "Innovation First", desc: "Cutting-edge projects and emerging technologies" },
              { icon: Users, bg: "from-violet-500 to-violet-700", title: "Collaborative Spirit", desc: "Cross-functional teams working towards common goals" },
              { icon: BookOpen, bg: "from-green-500 to-green-700", title: "Continuous Learning", desc: "Professional development and skill enhancement" },
              { icon: Trophy, bg: "from-orange-500 to-orange-600", title: "Recognition", desc: "Celebrating achievements and milestones" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="premium-card rounded-2xl p-8 text-center"
                data-testid={`culture-card-${i}`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center"
            style={{ background: "linear-gradient(160deg, #04102e 0%, #0d1f6e 50%, #1a3a8f 100%)" }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div className="absolute inset-0 dot-pattern opacity-10" />
            <div className="relative z-10">
              <div className="text-6xl font-serif text-white/20 leading-none mb-4">"</div>
              <blockquote className="text-xl md:text-2xl font-semibold text-white leading-relaxed max-w-3xl mx-auto">
                Our mission is to empower businesses with technology that not only solves today's problems but anticipates tomorrow's opportunities.
              </blockquote>
              <div className="text-6xl font-serif text-white/20 leading-none mt-4">"</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <span className="section-label mb-5 inline-flex">Our Team</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              Meet the <span className="gradient-text">Experts</span>
            </h2>
            <p className="text-muted-foreground text-base">The people driving your success.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              { name: "Alexandra Reed", role: "CEO & Founder", initials: "AR", bg: "from-blue-500 to-blue-700" },
              { name: "David Chen", role: "CTO", initials: "DC", bg: "from-violet-500 to-violet-700" },
              { name: "Sarah Jenkins", role: "Head of Marketing", initials: "SJ", bg: "from-teal-500 to-teal-700" },
              { name: "Marcus Johnson", role: "Lead Architect", initials: "MJ", bg: "from-orange-500 to-orange-600" },
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="text-center group"
                data-testid={`team-member-${i}`}
              >
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${member.bg} flex items-center justify-center text-xl font-black text-white shadow-xl border-4 border-white ring-4 ring-border/30 group-hover:ring-blue-500/20 transition-all`}>
                  {member.initials}
                </div>
                <h4 className="text-sm font-bold text-foreground">{member.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
