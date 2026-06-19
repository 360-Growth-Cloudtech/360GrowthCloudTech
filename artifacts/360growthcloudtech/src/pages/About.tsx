import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { Lightbulb, Shield, Zap, Target } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function About() {
  return (
    <Layout>
      <PageHero 
        title="Who We Are" 
        subtitle="Built by Technologists. Driven by Results." 
        label="About Us"
      />
      
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                We are more than just a development agency; we are your end-to-end digital partner. We understand that launching a product is only the first step. Success requires a strategic combination of robust architecture, continuous growth marketing, and unwavering security.
              </p>
              <p>
                Our passionate team of engineers, designers, marketers, and security experts work in unison to eliminate the friction of dealing with multiple vendors. We bring everything under one roof, ensuring a cohesive vision and seamless execution.
              </p>
              <p>
                With a global reach and a commitment to excellence, we have helped startups scale into industry leaders and enterprises modernize their legacy systems. Your success is our mission.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Lightbulb, title: "Innovation", desc: "Pushing boundaries with cutting-edge technology." },
                { icon: Shield, title: "Trust", desc: "Uncompromising security and transparency." },
                { icon: Zap, title: "Agility", desc: "Rapid iteration and adaptive strategies." },
                { icon: Target, title: "Excellence", desc: "Delivering exceptional quality in every detail." }
              ].map((pillar, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-border/60">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
                    <pillar.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{pillar.title}</h4>
                  <p className="text-sm text-muted-foreground">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-primary rounded-3xl p-10 md:p-12 text-white shadow-xl relative overflow-hidden mb-24">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-around gap-8 text-center">
              {[
                { num: "250+", label: "Projects Delivered" },
                { num: "99.9%", label: "Uptime Achieved" },
                { num: "50+", label: "Enterprise Clients" },
                { num: "10+", label: "Years Experience" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-5xl font-black mb-2">{stat.num}</div>
                  <div className="text-white/80 text-sm font-semibold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center mb-24">
            <blockquote className="text-2xl md:text-3xl font-bold text-primary/90 italic leading-snug relative">
              <span className="absolute -top-6 -left-8 text-6xl text-accent/20">"</span>
              Our mission is to empower businesses with technology that not only solves today's problems but anticipates tomorrow's opportunities.
              <span className="absolute -bottom-8 -right-8 text-6xl text-accent/20">"</span>
            </blockquote>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-4">Meet the Team</h2>
            <p className="text-muted-foreground text-lg">The experts behind our success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Alexandra Reed", role: "CEO & Founder", initials: "AR" },
              { name: "David Chen", role: "CTO", initials: "DC" },
              { name: "Sarah Jenkins", role: "Head of Marketing", initials: "SJ" },
              { name: "Marcus Johnson", role: "Lead Architect", initials: "MJ" },
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="mb-4 inline-block">
                  <Avatar className="w-32 h-32 mx-auto border-4 border-slate-50 group-hover:border-accent transition-colors">
                    <AvatarFallback className="text-2xl bg-primary text-white">{member.initials}</AvatarFallback>
                  </Avatar>
                </div>
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
