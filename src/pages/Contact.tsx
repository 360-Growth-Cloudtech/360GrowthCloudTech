import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";

export default function Contact() {
  const { setOpen } = useScheduleMeeting();

  return (
    <Layout>
      <PageHero 
        title="Let's Build Something Amazing Together" 
      />
      
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            
            <div>
              <h2 className="text-2xl font-extrabold mb-4 text-foreground">Get in Touch</h2>
              <p className="text-sm text-muted-foreground mb-10">
                Whether you have a fully fleshed-out RFP or just an idea on a napkin, our team is ready to help you take the next step.
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground">Email Us</h4>
                    <p className="text-sm text-muted-foreground">hello@360growthcloudtech.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground">Call Us</h4>
                    <p className="text-sm text-muted-foreground">+1 (800) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground">Visit Us</h4>
                    <p className="text-sm text-muted-foreground">123 Innovation Drive, Tech District<br/>San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h4 className="font-bold mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-slate-50 transition-colors text-primary">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-slate-50 transition-colors text-primary">
                    <Twitter size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-slate-50 transition-colors text-primary">
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>

              <button 
                onClick={() => setOpen(true)}
                className="gradient-bg px-8 py-4 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all"
              >
                Schedule a Meeting
              </button>
            </div>

            <div>
              <ContactForm />
            </div>
            
          </div>

          <div className="w-full h-[400px] bg-slate-200 rounded-3xl border border-border overflow-hidden relative flex items-center justify-center group">
            <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/1310/3166.png')] opacity-50 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-500"></div>
            <div className="bg-white p-4 rounded-full shadow-xl relative z-10 animate-bounce">
              <MapPin className="w-8 h-8 text-accent" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
