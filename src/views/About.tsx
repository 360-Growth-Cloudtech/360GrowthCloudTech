"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { ShieldCheck, CheckCircle, Star, Award, Rocket, Users, BookOpen, Trophy, Globe, Lightbulb, Handshake, Heart } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.09 } }, hidden: {} };

export default function About() {
  return (
    <>
      <PageHero label="About Us" title="Who we are." subtitle="Built by technologists. Driven by results. Powered by partnership." />

      {/* WHAT WE DO */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-label mb-5 inline-flex">What We Do</span>
            <h2 className="display-heading text-3xl md:text-5xl text-foreground mb-5">
              Solving the world's toughest <span className="cursive-accent">challenges.</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl mx-auto">
              360CloudTech solves our clients' toughest challenges by providing unmatched services in strategy, consulting, digital, technology and operations. With expertise across more than 40 industries, we deliver transformational outcomes for a demanding new digital world.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            className="rounded-3xl p-10 text-white relative overflow-hidden"
            style={{ backgroundColor: "#1a1512" }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(232,82,26,0.18) 0%, transparent 70%)" }} />
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { num: "40+", label: "Industries Served" },
                { num: "250+", label: "Projects Delivered" },
                { num: "50+", label: "Enterprise Clients" },
                { num: "10+", label: "Years Experience" },
              ].map((stat, i) => (
                <div key={i} data-testid={`stat-${i}`}>
                  <div className="display-heading text-3xl md:text-4xl text-white mb-1.5">{stat.num}</div>
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT THIS MEANS FOR YOU */}
      <section className="py-20 bg-white/40 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-label mb-5 inline-flex">Our Impact</span>
            <h2 className="display-heading text-3xl md:text-5xl text-foreground mb-4">
              What this means for <span className="cursive-accent">you.</span>
            </h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { icon: ShieldCheck, title: "Secure Operations", desc: "Enterprise-grade security protocols protecting your data." },
              { icon: CheckCircle, title: "Privacy Compliance", desc: "Full compliance with global privacy regulations." },
              { icon: Star, title: "Innovation Focus", desc: "Government-backed startup driving innovation." },
              { icon: Award, title: "Quality Assurance", desc: "Internationally certified processes and standards." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="premium-card rounded-2xl p-6 text-center" data-testid={`means-card-${i}`}>
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-sm text-foreground mb-1.5">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-label mb-5 inline-flex">Core Values</span>
            <h2 className="display-heading text-3xl md:text-5xl text-foreground mb-4">
              Values that drive <span className="cursive-accent">everything.</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto">
              These principles guide our decisions, shape our culture, and define how we build lasting partnerships.
            </p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { icon: Lightbulb, title: "Innovation", desc: "Push boundaries and embrace emerging technologies.", accent: "text-amber-600" },
              { icon: Handshake, title: "Collaboration", desc: "Strong partnerships and teamwork at every step.", accent: "text-primary" },
              { icon: Award, title: "Excellence", desc: "Highest standards of quality in everything we deliver.", accent: "text-foreground" },
              { icon: Globe, title: "Impact", desc: "Solutions that make a meaningful global difference.", accent: "text-emerald-600" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="premium-card rounded-2xl p-6 text-center" data-testid={`value-card-${i}`}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(26,21,18,0.05)" }}>
                  <item.icon className={`w-5 h-5 ${item.accent}`} />
                </div>
                <h4 className="font-bold text-sm text-foreground mb-1.5">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CULTURE */}
      <section className="py-20 bg-white/40 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-label mb-5 inline-flex"><Heart size={10} />Our Culture</span>
            <h2 className="display-heading text-3xl md:text-5xl text-foreground mb-4">
              A culture of <span className="cursive-accent">growth.</span>
            </h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { icon: Rocket, title: "Innovation First", desc: "Cutting-edge projects and emerging technologies." },
              { icon: Users, title: "Collaborative Spirit", desc: "Cross-functional teams with common goals." },
              { icon: BookOpen, title: "Continuous Learning", desc: "Professional development and skill enhancement." },
              { icon: Trophy, title: "Recognition", desc: "Celebrating achievements and milestones." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="premium-card rounded-2xl p-6 text-center" data-testid={`culture-card-${i}`}>
                <div className="w-11 h-11 bg-foreground rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-sm text-foreground mb-1.5">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MISSION QUOTE */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            className="rounded-3xl overflow-hidden p-10 md:p-14 text-center relative"
            style={{ backgroundColor: "#1a1512" }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 60% at 50% 100%, rgba(232,82,26,0.15) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <div className="display-heading text-5xl text-white/10 mb-3">"</div>
              <blockquote className="display-heading text-lg md:text-2xl text-white leading-relaxed max-w-2xl mx-auto font-normal">
                Our mission is to empower businesses with technology that not only solves today's problems but anticipates tomorrow's opportunities.
              </blockquote>
              <div className="display-heading text-5xl text-white/10 mt-3">"</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 bg-white/40 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-label mb-5 inline-flex">Our Team</span>
            <h2 className="display-heading text-3xl md:text-5xl text-foreground mb-3">
              Meet the <span className="cursive-accent">experts.</span>
            </h2>
          </motion.div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { name: "Alexandra Reed", role: "CEO & Founder", initials: "AR" },
              { name: "David Chen", role: "CTO", initials: "DC" },
              { name: "Sarah Jenkins", role: "Head of Marketing", initials: "SJ" },
              { name: "Marcus Johnson", role: "Lead Architect", initials: "MJ" },
            ].map((member, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center group" data-testid={`team-member-${i}`}>
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-foreground flex items-center justify-center text-lg font-black text-white shadow-md border-4 border-background group-hover:scale-105 transition-transform">
                  {member.initials}
                </div>
                <h4 className="font-bold text-sm text-foreground">{member.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
