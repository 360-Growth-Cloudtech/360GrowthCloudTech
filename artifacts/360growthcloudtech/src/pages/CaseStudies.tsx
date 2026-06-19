import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function CaseStudies() {
  const caseStudies = [
    { 
      industry: "Healthcare",
      title: "Patient Portal Transformation",
      challenge: "Legacy systems caused slow load times and poor patient engagement. Security was a major concern for compliance.",
      results: ["40% faster load time", "HIPAA compliance achieved", "3x increase in active users"]
    },
    { 
      industry: "Travel",
      title: "Booking Engine Overhaul",
      challenge: "Frequent downtime during peak booking seasons led to lost revenue and customer frustration.",
      results: ["99.99% uptime achieved", "Auto-scaling infrastructure", "Zero data loss during spikes"]
    },
    { 
      industry: "Retail",
      title: "E-commerce Revenue Scale",
      challenge: "Low conversion rates and high cart abandonment on mobile due to poor UX and slow checkout.",
      results: ["Mobile-first PWA launch", "2x conversion rate", "Sub-second page transitions"]
    }
  ];

  return (
    <Layout>
      <PageHero 
        title="Case Studies" 
        subtitle="Real Problems. Real Results."
      />
      
      <section className="py-12 bg-white border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="text-center py-4 md:py-0">
              <div className="text-4xl font-black gradient-text mb-2">40%</div>
              <div className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Faster Load Times</div>
            </div>
            <div className="text-center py-4 md:py-0">
              <div className="text-4xl font-black gradient-text mb-2">2x</div>
              <div className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Conversion Rates</div>
            </div>
            <div className="text-center py-4 md:py-0">
              <div className="text-4xl font-black gradient-text mb-2">99.99%</div>
              <div className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">System Uptime</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden flex flex-col h-full">
                <div className="h-2 w-full gradient-bg absolute top-0 left-0"></div>
                <div className="p-8 flex-1 flex flex-col">
                  <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-xs font-semibold text-primary mb-4 w-max">
                    {study.industry}
                  </span>
                  <h4 className="text-xl font-bold mb-3">{study.title}</h4>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{study.challenge}</p>
                  
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="text-sm font-semibold text-foreground mb-4">Key Results:</div>
                    {study.results.map((result, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                        <span className="text-sm font-medium text-foreground/80">{result}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href={`/contact`} className="text-primary font-bold text-sm hover:text-accent transition-colors flex items-center gap-1 mt-auto">
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center max-w-2xl mx-auto bg-primary rounded-2xl p-10 text-white">
            <h3 className="text-2xl font-bold mb-4">Have a similar challenge?</h3>
            <p className="text-white/80 mb-8">Let's discuss how we can engineer a solution tailored to your specific business needs.</p>
            <Link href="/contact" className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold shadow-lg hover:-translate-y-0.5 transition-transform">
              Let's Talk
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
