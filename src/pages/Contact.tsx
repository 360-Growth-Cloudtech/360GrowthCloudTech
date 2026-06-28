import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, CalendarDays } from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function Contact() {
  const { setOpen } = useScheduleMeeting();

  const contactDetails = [
    { icon: Mail, label: "Email Us", value: "hello@360growthcloudtech.com" },
    { icon: Phone, label: "Call Us", value: "+1 (800) 123-4567" },
    { icon: MapPin, label: "Visit Us", value: "123 Innovation Drive, Tech District\nSan Francisco, CA 94105" },
  ];

  return (
    <Layout>
      <PageHero label="Contact Us" title="Let's talk." subtitle="Whether you have an RFP or just an idea on a napkin — we're ready to help." />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-12">

            {/* Left column */}
            <motion.div className="lg:col-span-2 flex flex-col gap-4" variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6 }}>
              <div>
                <h2 className="display-heading text-2xl md:text-3xl text-foreground mb-2">Get in touch.</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">We typically respond within 2 hours during business hours.</p>
              </div>

              <div className="flex flex-col gap-3">
                {contactDetails.map((item, i) => (
                  <div key={i} className="premium-card rounded-2xl p-4 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-sm font-semibold text-foreground whitespace-pre-line leading-relaxed">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Follow Us</p>
                <div className="flex gap-2">
                  {[{ icon: Linkedin, label: "LinkedIn" }, { icon: Twitter, label: "Twitter" }, { icon: Facebook, label: "Facebook" }].map(({ icon: Icon, label }) => (
                    <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-full border border-border bg-white/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:bg-white transition-all">
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Schedule card */}
              <div className="rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: "#1a1512" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(232,82,26,0.22) 0%, transparent 70%)" }} />
                <div className="relative z-10">
                  <CalendarDays size={20} className="text-primary mb-2.5" />
                  <h4 className="font-bold text-white text-sm mb-1">Prefer a call?</h4>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>Book a free 30-min strategy session with our team.</p>
                  <button onClick={() => setOpen(true)} className="btn-primary rounded-full" style={{ fontSize: "0.8rem", padding: "9px 18px" }}>
                    Schedule a Meeting
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div className="lg:col-span-3" variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6, delay: 0.15 }}>
              <ContactForm />
            </motion.div>
          </div>

          {/* Map placeholder */}
          <motion.div
            className="w-full h-52 bg-muted/60 rounded-2xl border border-border overflow-hidden relative flex items-center justify-center hero-grid-bg"
            variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-foreground">Tech District, Innovation Hub</p>
              <p className="text-xs text-muted-foreground mt-0.5">San Francisco, CA 94105</p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
