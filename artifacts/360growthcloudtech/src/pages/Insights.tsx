import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "lucide-react";

export default function Insights() {
  const [filter, setFilter] = useState("All");

  const articles = [
    {
      category: "Cloud",
      title: "Why Multi-Cloud is the Future of Enterprise Infrastructure",
      excerpt: "Explore how distributing workloads across multiple cloud providers reduces risk and optimizes performance.",
      author: "Sarah J.",
      date: "Oct 12, 2023"
    },
    {
      category: "Marketing",
      title: "How Google Ads + SEO Work Together to Dominate Search",
      excerpt: "A comprehensive guide on blending paid and organic strategies for maximum visibility and ROI.",
      author: "Mark T.",
      date: "Nov 05, 2023"
    },
    {
      category: "Security",
      title: "Zero-Trust Security: What It Means for Your Business",
      excerpt: "Understanding the shift from perimeter-based security to continuous verification in modern architectures.",
      author: "Elena R.",
      date: "Dec 01, 2023"
    }
  ];

  const filteredArticles = filter === "All" 
    ? articles 
    : articles.filter(a => a.category === filter);

  return (
    <Layout>
      <PageHero 
        title="Insights & Perspectives" 
        subtitle="Stay ahead with our latest thinking."
      />
      
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {["All", "Cloud", "Marketing", "Security"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                  filter === cat 
                    ? "bg-primary text-white" 
                    : "bg-white text-foreground hover:bg-slate-100 border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {filteredArticles.map((article, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-white rounded-2xl p-8 h-full flex flex-col border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <span className="text-accent text-xs font-bold uppercase tracking-wider mb-4">{article.category}</span>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{article.title}</h4>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/40">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">{article.author}</span> • {article.date}
                    </div>
                    <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-border text-center shadow-sm">
            <h3 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h3>
            <p className="text-muted-foreground mb-6">Get the latest insights delivered straight to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
              <button type="submit" className="gradient-bg px-6 py-3 rounded-md font-bold text-white shadow-md hover:opacity-90">
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </section>
    </Layout>
  );
}
