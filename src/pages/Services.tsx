import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { 
  Code2, Users, TrendingUp, Cloud, ShieldCheck, ShoppingCart, ArrowRight
} from "lucide-react";

export default function Services() {
  const allServices = [
    { icon: Code2, title: "Custom Software", desc: "High-performance web and mobile applications." },
    { icon: Users, title: "Custom CRM Tools", desc: "Bespoke customer relationship management." },
    { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven Ads and comprehensive SEO." },
    { icon: Cloud, title: "Cloud Infrastructure", desc: "Scalable cloud setup and robust pipelines." },
    { icon: ShieldCheck, title: "Cybersecurity", desc: "Enterprise-grade protection & compliance." },
    { icon: ShoppingCart, title: "E-commerce", desc: "End-to-end stores with seamless payments." }
  ];

  const consultingServices = [
    {
      icon: TrendingUp,
      title: "Strategic Planning",
      desc: "Align your technology roadmap with your business goals.",
      bullets: ["Market analysis", "Technology roadmapping", "Resource allocation"]
    },
    {
      icon: Cloud,
      title: "Digital Transformation",
      desc: "Modernize legacy systems and processes.",
      bullets: ["Process automation", "Legacy system modernization", "Change management"]
    },
    {
      icon: ShieldCheck,
      title: "Technology Audit",
      desc: "Comprehensive review of your current tech stack.",
      bullets: ["Security vulnerability assessment", "Performance analysis", "Cost optimization"]
    }
  ];

  const techServices = [
    {
      icon: Code2,
      title: "Custom Software Dev",
      desc: "Tailored applications built for your specific needs.",
      bullets: ["Web applications", "Mobile apps (iOS & Android)", "API development"]
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      desc: "Scalable and resilient infrastructure solutions.",
      bullets: ["Cloud migration", "CI/CD pipelines", "Infrastructure as Code"]
    },
    {
      icon: ShieldCheck,
      title: "Cybersecurity",
      desc: "Protecting your digital assets from emerging threats.",
      bullets: ["Penetration testing", "Compliance (HIPAA/SOC2)", "24/7 Monitoring"]
    }
  ];

  return (
    <Layout>
      <PageHero 
        title="Our Services" 
        subtitle="Everything You Need to Succeed Online"
      />
      
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-md grid-cols-3 h-auto p-1 bg-white border border-border shadow-sm">
                <TabsTrigger value="all" className="py-3 text-sm font-semibold">All Services</TabsTrigger>
                <TabsTrigger value="consulting" className="py-3 text-sm font-semibold">Consulting</TabsTrigger>
                <TabsTrigger value="technology" className="py-3 text-sm font-semibold">Technology</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allServices.map((service, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 border border-border/50 hover:shadow-xl transition-shadow group">
                    <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                      <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="text-base font-bold mb-2 text-foreground">{service.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="consulting" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {consultingServices.map((service, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 border border-border/50 hover:shadow-xl transition-shadow">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-accent" />
                    </div>
                    <h4 className="text-base font-bold mb-2 text-foreground">{service.title}</h4>
                    <p className="text-sm text-muted-foreground mb-5">{service.desc}</p>
                    <ul className="space-y-2">
                      {service.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-center text-sm text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="technology" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {techServices.map((service, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 border border-border/50 hover:shadow-xl transition-shadow">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h4 className="text-base font-bold mb-2 text-foreground">{service.title}</h4>
                    <p className="text-sm text-muted-foreground mb-5">{service.desc}</p>
                    <ul className="space-y-2">
                      {service.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-center text-sm text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Our Process</h2>
            <p className="text-muted-foreground text-lg">A proven path to launching secure, scalable products.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-accent/30 to-primary/10 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {[
                { step: "01", title: "Consult", desc: "Deep dive into goals" },
                { step: "02", title: "Design", desc: "UI/UX & architecture" },
                { step: "03", title: "Build", desc: "Agile development" },
                { step: "04", title: "Launch", desc: "Secure deployment" },
                { step: "05", title: "Support", desc: "24/7 maintenance" }
              ].map((phase, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-primary/20 border-4 border-white">
                    {phase.step}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{phase.title}</h4>
                  <p className="text-muted-foreground text-sm">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8">Need a custom solution?</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-shadow">
            Contact Us <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
