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
    { icon: Mail, label: "Email Us", value: "hello@360growthcloudtech.com", color: "from-violet-500 to-violet-700" },
    { icon: Phone, label: "Call Us", value: "+1 (800) 123-4567", color: "from-indigo-500 to-indigo-700" },
    { icon: MapPin, label: "Visit Us", value: "123 Innovation Drive, Tech District\nSan Francisco, CA 94105", color: "from-emerald-500 to-emerald-700" },
  ];

  return (
    <Layout>
      <PageHero title="Let's Build Something Amazing" subtitle="Whether you have an RFP or just an idea on a napkin — we're ready to help." label="Contact Us" />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">

            {/* Left column */}
            <motion.div className="lg:col-span-2 flex flex-col gap-5" variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6 }}>
              <div>
                <h2 className="text-2xl font-extrabold text-foreground mb-2 leading-tight" style={{ letterSpacing: "-0.02em" }}>Get in Touch</h2>
                <p className="text-muted-foreground text-xs leading-relaxed">Our team typically responds within 2 hours during business hours.</p>
              </div>

              <div className="flex flex-col gap-3">
                {contactDetails.map((item, i) => (
                  <div key={i} className="premium-card rounded-xl p-4 flex items-start gap-3.5">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-md`}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-xs font-semibold text-foreground whitespace-pre-line leading-relaxed">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Follow Us</p>
                <div className="flex gap-2.5">
                  {[{ icon: Linkedin, label: "LinkedIn" }, { icon: Twitter, label: "Twitter" }, { icon: Facebook, label: "Facebook" }].map(({ icon: Icon, label }) => (
                    <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-md transition-all">
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Schedule card */}
              <div
                className="rounded-xl p-5 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0d0620 0%, #2d1580 60%, #5b21b6 100%)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)" }} />
                <div className="relative z-10">
                  <CalendarDays size={20} className="text-emerald-400 mb-2.5" />
                  <h4 className="text-sm font-bold text-white mb-1">Prefer a call?</h4>
                  <p className="text-white/55 text-xs mb-4 leading-relaxed">Book a free 30-min strategy session with our team.</p>
                  <button onClick={() => setOpen(true)} className="bg-white text-primary px-4 py-2 rounded-lg text-xs font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all">
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
            className="w-full h-56 bg-muted rounded-2xl border border-border overflow-hidden relative flex items-center justify-center"
            variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 hero-grid-bg opacity-50" />
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">Tech District, Innovation Hub</p>
              <p className="text-xs text-muted-foreground mt-0.5">San Francisco, CA 94105</p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
