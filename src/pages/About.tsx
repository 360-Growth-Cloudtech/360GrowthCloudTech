import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import {
  ShieldCheck, CheckCircle, Star, Award,
  Rocket, Users, BookOpen, Trophy,
  Globe, Lightbulb, Handshake, Heart,
} from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.09 } }, hidden: {} };

export default function About() {
  return (
    <Layout>
      <PageHero title="Who We Are" subtitle="Built by technologists. Driven by results. Powered by partnership." label="About Us" />

      {/* WHAT WE DO */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-label mb-4 inline-flex">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-5 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              Solving the World's Toughest <span className="gradient-text">Challenges</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl mx-auto">
              360GrowthCloudTech solves our clients' toughest challenges by providing unmatched services in strategy, consulting, digital, technology and operations. With expertise across more than 40 industries, we deliver transformational outcomes for a demanding new digital world.
            </p>
          </motion.div>

          <motion.div
            className="relative rounded-2xl p-10 text-white overflow-hidden shadow-xl"
            style={{ background: "linear-gradient(135deg, #0d0620 0%, #2d1580 40%, #5b21b6 75%, #10b981 100%)" }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div className="absolute inset-0 dot-pattern" />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { num: "40+", label: "Industries Served" },
                { num: "250+", label: "Projects Delivered" },
                { num: "50+", label: "Enterprise Clients" },
                { num: "10+", label: "Years Experience" },
              ].map((stat, i) => (
                <div key={i} data-testid={`stat-${i}`}>
                  <div className="text-3xl md:text-4xl font-black mb-1.5">{stat.num}</div>
                  <div className="text-white/65 text-xs font-semibold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT THIS MEANS FOR YOU */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-label mb-4 inline-flex">Our Impact</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              What This Means for <span className="gradient-text">You</span>
            </h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { icon: ShieldCheck, bg: "from-violet-500 to-violet-700", title: "Secure Operations", desc: "Enterprise-grade security protocols protecting your data" },
              { icon: CheckCircle, bg: "from-indigo-500 to-indigo-700", title: "Privacy Compliance", desc: "Full compliance with global privacy regulations" },
              { icon: Star, bg: "from-emerald-500 to-emerald-700", title: "Innovation Focus", desc: "Government-backed startup driving innovation" },
              { icon: Award, bg: "from-purple-500 to-purple-700", title: "Quality Assurance", desc: "Internationally certified processes and standards" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="premium-card rounded-xl p-5 text-center" data-testid={`means-card-${i}`}>
                <div className={`w-11 h-11 bg-gradient-to-br ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1.5">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-label mb-4 inline-flex">Core Values</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              Values That Drive <span className="gradient-text">Everything</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
              These principles guide our decisions, shape our culture, and define how we build lasting partnerships.
            </p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { icon: Lightbulb, title: "Innovation", desc: "Push boundaries and embrace emerging technologies", accent: "text-amber-500", bg: "bg-amber-50" },
              { icon: Handshake, title: "Collaboration", desc: "Strong partnerships and teamwork at every step", accent: "text-violet-600", bg: "bg-violet-50" },
              { icon: Award, title: "Excellence", desc: "Highest standards of quality in everything we deliver", accent: "text-indigo-600", bg: "bg-indigo-50" },
              { icon: Globe, title: "Impact", desc: "Solutions that make a meaningful difference globally", accent: "text-emerald-600", bg: "bg-emerald-50" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="premium-card rounded-xl p-5 text-center" data-testid={`value-card-${i}`}>
                <div className={`w-11 h-11 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-5 h-5 ${item.accent}`} />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1.5">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CULTURE */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 section-label mb-4"><Heart size={10} />Our Culture</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              A Culture of <span className="gradient-text">Growth</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto">
              Innovation, collaboration, and continuous learning — where your ideas shape the future.
            </p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { icon: Rocket, bg: "from-violet-500 to-violet-700", title: "Innovation First", desc: "Cutting-edge projects and emerging technologies" },
              { icon: Users, bg: "from-indigo-500 to-indigo-700", title: "Collaborative Spirit", desc: "Cross-functional teams working towards common goals" },
              { icon: BookOpen, bg: "from-emerald-500 to-emerald-700", title: "Continuous Learning", desc: "Professional development and skill enhancement" },
              { icon: Trophy, bg: "from-purple-500 to-purple-700", title: "Recognition", desc: "Celebrating achievements and milestones" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="premium-card rounded-xl p-5 text-center" data-testid={`culture-card-${i}`}>
                <div className={`w-11 h-11 bg-gradient-to-br ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1.5">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MISSION QUOTE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            className="relative rounded-2xl overflow-hidden p-10 md:p-14 text-center"
            style={{ background: "linear-gradient(160deg, #0d0620 0%, #2d1580 50%, #3b1fa8 100%)" }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div className="absolute inset-0 dot-pattern" />
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <div className="text-5xl font-serif text-white/15 leading-none mb-3">"</div>
              <blockquote className="text-base md:text-xl font-semibold text-white leading-relaxed max-w-2xl mx-auto">
                Our mission is to empower businesses with technology that not only solves today's problems but anticipates tomorrow's opportunities.
              </blockquote>
              <div className="text-5xl font-serif text-white/15 leading-none mt-3">"</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-label mb-4 inline-flex">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              Meet the <span className="gradient-text">Experts</span>
            </h2>
            <p className="text-muted-foreground text-sm">The people driving your success.</p>
          </motion.div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { name: "Alexandra Reed", role: "CEO & Founder", initials: "AR", bg: "from-violet-500 to-violet-700" },
              { name: "David Chen", role: "CTO", initials: "DC", bg: "from-indigo-500 to-indigo-700" },
              { name: "Sarah Jenkins", role: "Head of Marketing", initials: "SJ", bg: "from-emerald-500 to-emerald-700" },
              { name: "Marcus Johnson", role: "Lead Architect", initials: "MJ", bg: "from-purple-500 to-purple-700" },
            ].map((member, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center group" data-testid={`team-member-${i}`}>
                <div className={`w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br ${member.bg} flex items-center justify-center text-lg font-black text-white shadow-lg border-4 border-white ring-4 ring-border/20 group-hover:ring-violet-500/20 transition-all`}>
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
