import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, CalendarDays } from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Contact() {
  const { setOpen } = useScheduleMeeting();

  const contactDetails = [
    { icon: Mail, label: "Email Us", value: "hello@360growthcloudtech.com", color: "from-blue-500 to-blue-700" },
    { icon: Phone, label: "Call Us", value: "+1 (800) 123-4567", color: "from-violet-500 to-violet-700" },
    { icon: MapPin, label: "Visit Us", value: "123 Innovation Drive, Tech District\nSan Francisco, CA 94105", color: "from-teal-500 to-teal-700" },
  ];

  return (
    <Layout>
      <PageHero
        title="Let's Build Something Amazing"
        subtitle="Whether you have an RFP or just an idea on a napkin — we're ready to help."
        label="Contact Us"
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">

            {/* Left column */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-8"
              variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-3xl font-extrabold text-foreground mb-3 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  Get in Touch
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our team typically responds within 2 hours during business hours.
                </p>
              </div>

              {/* Contact cards */}
              <div className="flex flex-col gap-4">
                {contactDetails.map((item, i) => (
                  <div key={i} className="premium-card rounded-2xl p-5 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-md`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-sm font-semibold text-foreground whitespace-pre-line leading-relaxed">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { icon: Linkedin, label: "LinkedIn" },
                    { icon: Twitter, label: "Twitter" },
                    { icon: Facebook, label: "Facebook" },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-md transition-all"
                    >
                      <Icon size={17} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Schedule meeting */}
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #04102e 0%, #0d1f6e 60%, #1a6be0 100%)" }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />
                <div className="relative z-10">
                  <CalendarDays size={24} className="text-cyan-300 mb-3" />
                  <h4 className="text-base font-bold text-white mb-1.5">Prefer a call?</h4>
                  <p className="text-white/60 text-xs mb-4 leading-relaxed">Book a free 30-min strategy session with our team.</p>
                  <button
                    onClick={() => setOpen(true)}
                    className="bg-white text-primary px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    Schedule a Meeting
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              className="lg:col-span-3"
              variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.6, delay: 0.15 }}
            >
              <ContactForm />
            </motion.div>
          </div>

          {/* Map placeholder */}
          <motion.div
            className="w-full h-72 bg-muted rounded-3xl border border-border overflow-hidden relative flex items-center justify-center"
            variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 hero-grid-bg opacity-50" />
            <div className="relative z-10 text-center">
              <div className="w-14 h-14 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">Tech District, Innovation Hub</p>
              <p className="text-xs text-muted-foreground mt-1">San Francisco, CA 94105</p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
