"use client";

import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Eye, Heart, MessageCircle, Search, ChevronDown, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Case Study", "Cloud Computing", "Healthcare", "Software Development", "AI-Driven", "Smart Cities"];

const articles = [
  {
    id: 1,
    category: "Case Study",
    title: "AI-Powered Healthcare Scheduler: Revolutionizing Patient Care",
    excerpt: "Developed an intelligent scheduling system that reduces patient wait times by 40% and improved care coordination across multiple healthcare facilities.",
    author: "Sarah J.",
    date: "Oct 1, 2025",
    views: 6570,
    likes: 24,
    comments: 12,
    accent: "#e8521a",
    featured: true,
    featuredSize: "large",
  },
  {
    id: 2,
    category: "Healthcare",
    title: "Unified Communication Platform: Transforming Healthcare Connectivity",
    excerpt: "A comprehensive communication platform that seamlessly connects healthcare providers, patients, and care teams, enabling secure messaging and video.",
    author: "Mark T.",
    date: "Oct 2, 2025",
    views: 3652,
    likes: 29,
    comments: 8,
    accent: "#1a1512",
    featured: true,
    featuredSize: "small",
  },
  {
    id: 3,
    category: "Cloud Computing",
    title: "Cloud-First Strategy: Accelerating Digital Innovation",
    excerpt: "Best practices for implementing a cloud-first approach that ensures scalability, flexibility, and competitive advantage in the modern business landscape.",
    author: "Elena R.",
    date: "Oct 3, 2025",
    views: 5194,
    likes: 52,
    comments: 15,
    accent: "#2d2620",
    featured: true,
    featuredSize: "small",
  },
  {
    id: 5,
    category: "Software Development",
    title: "AI Development Lifecycle: Transforming Software Engineering",
    excerpt: "How artificial intelligence is revolutionizing the entire software development lifecycle, from planning to deployment and maintenance.",
    author: "Priya M.",
    date: "Oct 3, 2025",
    views: 3118,
    likes: 47,
    comments: 11,
    accent: "#e8521a",
    featured: false,
    featuredSize: null,
  },
  {
    id: 6,
    category: "Smart Cities",
    title: "Smart Energy Management for Societies: Sustainable Living Solutions",
    excerpt: "Implementing intelligent energy management systems that reduced energy consumption by 45% and lowered utility costs for residential areas.",
    author: "Lucas N.",
    date: "Oct 3, 2025",
    views: 1419,
    likes: 54,
    comments: 7,
    accent: "#2d2620",
    featured: false,
    featuredSize: null,
  },
  {
    id: 7,
    category: "Software Development",
    title: "DevSecOps-Driven Development: Security at Every Stage",
    excerpt: "Transforming software development with integrated security practices that reduced vulnerabilities by 80% while accelerating release cycles.",
    author: "Aiden S.",
    date: "Oct 3, 2025",
    views: 3352,
    likes: 38,
    comments: 14,
    accent: "#1a1512",
    featured: false,
    featuredSize: null,
  },
  {
    id: 8,
    category: "AI-Driven",
    title: "AI-Based Risk Stratification: Predictive Healthcare Analytics",
    excerpt: "How artificial intelligence in risk stratification to identify high risk patients early, enabling proactive interventions and reducing hospital admissions.",
    author: "Dr. Chen W.",
    date: "Oct 3, 2025",
    views: 3194,
    likes: 271,
    comments: 6,
    accent: "#e8521a",
    featured: false,
    featuredSize: null,
  },
  {
    id: 9,
    category: "Healthcare",
    title: "Compliance-First Development: HIPAA-Native Healthcare Applications",
    excerpt: "Building healthcare applications with HIPAA compliance integrated from day one, ensuring security, privacy, and regulatory adherence throughout the lifecycle.",
    author: "Maya P.",
    date: "Oct 3, 2025",
    views: 2334,
    likes: 58,
    comments: 10,
    accent: "#2d2620",
    featured: false,
    featuredSize: null,
  },
  {
    id: 10,
    category: "Case Study",
    title: "Introducing QubicCare AI Scheduler: Revolutionizing Healthcare Scheduling",
    excerpt: "Discover how QubicCare's AI-powered scheduling platform is transforming healthcare operations by reducing patient wait times and optimizing resource allocation.",
    author: "Sarah J.",
    date: "Oct 3, 2025",
    views: 1537,
    likes: 23,
    comments: 5,
    accent: "#e8521a",
    featured: false,
    featuredSize: null,
  },
];

function ArticleCardBanner({ accent, category, size = "normal" }: { accent: string; category: string; size?: "normal" | "large" }) {
  return (
    <div
      className={`${size === "large" ? "h-52" : "h-40"} w-full rounded-t-2xl flex items-center justify-center relative overflow-hidden`}
      style={{ backgroundColor: accent }}
    >
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <BookOpen className="w-10 h-10 text-white/30" />
      <div className="absolute top-3 left-3">
        <span className="text-white/80 text-xs font-bold uppercase tracking-widest">{category}</span>
      </div>
    </div>
  );
}

function StatBadge({ icon: Icon, count }: { icon: typeof Eye; count: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <Icon size={12} />
      {count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count}
    </span>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } }, hidden: {} };

export default function Insights() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered = articles.filter((a) => {
    const matchSearch = search === "" || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || a.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const featuredArticles = articles.filter((a) => a.featured);
  const featuredLarge = featuredArticles.find((a) => a.featuredSize === "large");
  const featuredSmall = featuredArticles.filter((a) => a.featuredSize === "small");

  return (
    <>
      <PageHero label="Insights & Innovation" title="Latest insights." subtitle="Cutting-edge perspectives on technology trends, industry innovations, and successful digital transformation stories." />

      {/* SEARCH + FILTER BAR */}
      <section className="py-5 bg-background/80 backdrop-blur sticky top-16 z-30 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search insights, topics, or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/80"
                data-testid="insights-search"
              />
            </div>
            <div className="relative shrink-0">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none pl-4 pr-9 py-2.5 text-sm border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/80 cursor-pointer font-semibold"
                data-testid="insights-category-filter"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-background min-h-screen">

        {/* FEATURED INSIGHTS */}
        {search === "" && categoryFilter === "All" && (
          <section className="py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="section-label">Featured</span>
                <span className="text-sm text-muted-foreground">Our most-read content</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* LEFT: 2 small featured */}
                <div className="flex flex-col gap-4">
                  {featuredSmall.map((article) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="premium-card rounded-2xl flex overflow-hidden cursor-pointer h-36"
                      data-testid={`featured-card-${article.id}`}
                    >
                      <div
                        className="w-24 shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: article.accent }}
                      >
                        <BookOpen className="w-6 h-6 text-white/30" />
                      </div>
                      <div className="p-4 flex flex-col justify-center">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">{article.category}</span>
                        <h3 className="text-sm font-bold text-foreground leading-snug mb-2 line-clamp-2">{article.title}</h3>
                        <div className="flex items-center gap-3">
                          <StatBadge icon={Eye} count={article.views} />
                          <StatBadge icon={Heart} count={article.likes} />
                          <span className="text-xs text-muted-foreground">{article.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* RIGHT: large featured */}
                {featuredLarge && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="premium-card rounded-2xl overflow-hidden cursor-pointer flex flex-col"
                    data-testid={`featured-card-large-${featuredLarge.id}`}
                  >
                    <div
                      className="h-48 flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: featuredLarge.accent }}
                    >
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                      <BookOpen className="w-12 h-12 text-white/25" />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-bold text-white/70 uppercase tracking-widest">{featuredLarge.category}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="display-heading text-xl text-foreground leading-snug mb-3">{featuredLarge.title}</h3>
                      <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">{featuredLarge.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-border/40">
                        <div className="flex items-center gap-3">
                          <StatBadge icon={Eye} count={featuredLarge.views} />
                          <StatBadge icon={Heart} count={featuredLarge.likes} />
                          <span className="text-xs text-muted-foreground">{featuredLarge.date}</span>
                        </div>
                        <span className="text-primary text-xs font-bold flex items-center gap-1 hover:translate-x-1 transition-transform">
                          Read More <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ALL INSIGHTS GRID */}
        <section className="py-8 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="display-heading text-xl text-foreground">All Insights</h2>
              <span className="text-sm text-muted-foreground font-semibold">{filtered.length} articles</span>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <BookOpen className="w-10 h-10 mx-auto mb-4 opacity-25" />
                <p className="font-bold text-foreground">No insights found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                {filtered.map((article) => (
                  <motion.article
                    key={article.id}
                    variants={fadeUp}
                    className="premium-card rounded-2xl overflow-hidden cursor-pointer flex flex-col"
                    data-testid={`article-card-${article.id}`}
                  >
                    <ArticleCardBanner accent={article.accent} category={article.category} />
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{article.category}</span>
                      <h3 className="font-bold text-sm text-foreground leading-snug mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">{article.excerpt}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-auto">
                        <div className="flex items-center gap-3">
                          <StatBadge icon={Eye} count={article.views} />
                          <StatBadge icon={Heart} count={article.likes} />
                          <StatBadge icon={MessageCircle} count={article.comments} />
                        </div>
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                      </div>

                      <a
                        href="#"
                        className="mt-3 text-primary text-xs font-bold flex items-center gap-1 hover:translate-x-1 transition-transform w-max"
                        onClick={(e) => e.preventDefault()}
                        data-testid={`read-more-${article.id}`}
                      >
                        Read More <ArrowRight size={12} />
                      </a>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* NEWSLETTER CTA */}
        <section className="py-16 bg-white/40 border-t border-border/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
            <span className="section-label mb-5 inline-flex">Stay Updated</span>
            <h2 className="display-heading text-2xl md:text-4xl text-foreground mb-3">
              Never miss an <span className="cursive-accent">insight.</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed max-w-sm mx-auto">
              Get the latest on technology, cloud, and digital growth — delivered to your inbox weekly.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-full text-sm border border-border bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
                data-testid="newsletter-email"
              />
              <button
                type="submit"
                className="btn-primary shrink-0 rounded-full"
                style={{ fontSize: "0.85rem", padding: "11px 22px" }}
                data-testid="newsletter-subscribe"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
