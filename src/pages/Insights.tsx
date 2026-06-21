import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Eye, Heart, MessageCircle, Search, ChevronDown, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Case Study", "Cloud Computing", "Cybersecurity", "Healthcare", "Software Development", "AI-Driven", "Smart Cities"];

const articles = [
  {
    id: 1,
    category: "Case Study",
    categoryColor: "bg-orange-100 text-orange-600",
    title: "AI-Powered Healthcare Scheduler: Revolutionizing Patient Care",
    excerpt: "Developed an intelligent scheduling system that reduces patient wait times by 40% and improved care coordination across multiple healthcare facilities.",
    author: "Sarah J.",
    date: "Oct 1, 2025",
    views: 6570,
    likes: 24,
    comments: 12,
    gradient: "from-teal-400 to-cyan-600",
    featured: true,
    featuredSize: "large",
  },
  {
    id: 2,
    category: "Healthcare",
    categoryColor: "bg-teal-100 text-teal-700",
    title: "Unified Communication Platform: Transforming Healthcare Connectivity",
    excerpt: "A comprehensive communication platform that seamlessly connects healthcare providers, patients, and care teams, enabling secure messaging and video.",
    author: "Mark T.",
    date: "Oct 2, 2025",
    views: 3652,
    likes: 29,
    comments: 8,
    gradient: "from-blue-500 to-indigo-600",
    featured: true,
    featuredSize: "small",
  },
  {
    id: 3,
    category: "Cloud Computing",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "Cloud-First Strategy: Accelerating Digital Innovation",
    excerpt: "Best practices for implementing a cloud-first approach that ensures scalability, flexibility, and competitive advantage in the modern business landscape.",
    author: "Elena R.",
    date: "Oct 3, 2025",
    views: 5194,
    likes: 52,
    comments: 15,
    gradient: "from-sky-400 to-blue-600",
    featured: true,
    featuredSize: "small",
  },
  {
    id: 4,
    category: "Cybersecurity",
    categoryColor: "bg-red-100 text-red-600",
    title: "Cybersecurity in the Age of Remote Work",
    excerpt: "How we challenged and comprehensive solutions for securing distributed workforces in the age of remote and hybrid environments.",
    author: "James K.",
    date: "Oct 3, 2025",
    views: 4120,
    likes: 24,
    comments: 9,
    gradient: "from-slate-600 to-slate-800",
    featured: false,
    featuredSize: null,
  },
  {
    id: 5,
    category: "Software Development",
    categoryColor: "bg-purple-100 text-purple-700",
    title: "AI Development Lifecycle: Transforming Software Engineering",
    excerpt: "How artificial intelligence is revolutionizing the entire software development lifecycle, from planning to deployment and maintenance.",
    author: "Priya M.",
    date: "Oct 3, 2025",
    views: 3118,
    likes: 47,
    comments: 11,
    gradient: "from-violet-500 to-purple-700",
    featured: false,
    featuredSize: null,
  },
  {
    id: 6,
    category: "Smart Cities",
    categoryColor: "bg-emerald-100 text-emerald-700",
    title: "Smart Energy Management for Societies: Sustainable Living Solutions",
    excerpt: "Implementing intelligent energy management systems that reduced energy consumption by 45% and lowered utility costs for residential areas.",
    author: "Lucas N.",
    date: "Oct 3, 2025",
    views: 1419,
    likes: 54,
    comments: 7,
    gradient: "from-emerald-400 to-green-600",
    featured: false,
    featuredSize: null,
  },
  {
    id: 7,
    category: "Software Development",
    categoryColor: "bg-purple-100 text-purple-700",
    title: "DevSecOps-Driven Development: Security at Every Stage",
    excerpt: "Transforming software development with integrated security practices that reduced vulnerabilities by 80% while accelerating release cycles.",
    author: "Aiden S.",
    date: "Oct 3, 2025",
    views: 3352,
    likes: 38,
    comments: 14,
    gradient: "from-gray-600 to-zinc-800",
    featured: false,
    featuredSize: null,
  },
  {
    id: 8,
    category: "AI-Driven",
    categoryColor: "bg-violet-100 text-violet-700",
    title: "AI-Based Risk Stratification: Predictive Healthcare Analytics",
    excerpt: "How artificial intelligence in risk stratification to identify high risk patients early, enabling proactive interventions and reducing hospital admissions.",
    author: "Dr. Chen W.",
    date: "Oct 3, 2025",
    views: 3194,
    likes: 271,
    comments: 6,
    gradient: "from-fuchsia-500 to-pink-600",
    featured: false,
    featuredSize: null,
  },
  {
    id: 9,
    category: "Healthcare",
    categoryColor: "bg-teal-100 text-teal-700",
    title: "Compliance-First Development: HIPAA-Native Healthcare Applications",
    excerpt: "Building healthcare applications with HIPAA compliance integrated from day one, ensuring security, privacy, and regulatory adherence throughout the development lifecycle.",
    author: "Maya P.",
    date: "Oct 3, 2025",
    views: 2334,
    likes: 58,
    comments: 10,
    gradient: "from-teal-500 to-cyan-700",
    featured: false,
    featuredSize: null,
  },
  {
    id: 10,
    category: "Case Study",
    categoryColor: "bg-orange-100 text-orange-600",
    title: "Introducing QubicCare AI Scheduler: Revolutionizing Healthcare Scheduling with Artificial Intelligence",
    excerpt: "Discover how QubicCare's AI-powered scheduling platform is transforming healthcare operations by reducing patient wait times, optimizing resource allocation.",
    author: "Sarah J.",
    date: "Oct 3, 2025",
    views: 1537,
    likes: 23,
    comments: 5,
    gradient: "from-amber-400 to-orange-600",
    featured: false,
    featuredSize: null,
  },
];

function ArticleImage({ gradient, category, size = "normal" }: { gradient: string; category: string; size?: "normal" | "large" }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} ${size === "large" ? "h-56" : "h-44"} w-full rounded-t-xl flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_white_0%,_transparent_70%)]" />
      <BookOpen className="w-10 h-10 text-white/60" />
      <div className="absolute bottom-3 left-3">
        <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">{category}</span>
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
    <Layout>
      {/* PAGE HEADER */}
      <section className="pt-36 pb-12 bg-white text-center border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent uppercase tracking-wider mb-4 border border-accent/20 bg-accent/5 px-3 py-1 rounded-full">
            Insights &amp; Innovation
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Latest{" "}
            <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover cutting-edge perspectives on technology trends, industry innovations,
            and successful digital transformation stories from our experts.
          </p>
        </div>
      </section>

      {/* SEARCH + FILTER BAR */}
      <section className="py-6 bg-white sticky top-16 z-30 border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search insights, topics, or techstack..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                data-testid="insights-search"
              />
            </div>
            <div className="flex gap-2 shrink-0">
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white cursor-pointer"
                  data-testid="insights-category-filter"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-slate-50 min-h-screen">
        {/* FEATURED INSIGHTS */}
        {search === "" && categoryFilter === "All" && (
          <section className="py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-5 h-5 gradient-bg rounded-full" />
                <h2 className="text-lg font-bold text-foreground">Featured Insights</h2>
                <span className="text-sm text-muted-foreground">Our most-read content.</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LEFT: 2 small featured cards stacked */}
                <div className="flex flex-col gap-6">
                  {featuredSmall.map((article) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white rounded-xl border border-border/60 shadow-sm hover:shadow-md transition-shadow flex gap-4 overflow-hidden cursor-pointer"
                      data-testid={`featured-card-${article.id}`}
                    >
                      <div className={`bg-gradient-to-br ${article.gradient} w-28 shrink-0 flex items-center justify-center`}>
                        <BookOpen className="w-6 h-6 text-white/60" />
                      </div>
                      <div className="p-4 flex flex-col justify-center">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-max mb-2 ${article.categoryColor}`}>
                          {article.category}
                        </span>
                        <h3 className="text-sm font-bold text-foreground leading-snug mb-2 line-clamp-2">{article.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{article.excerpt}</p>
                        <div className="flex items-center gap-3">
                          <StatBadge icon={Eye} count={article.views} />
                          <StatBadge icon={Heart} count={article.likes} />
                          <span className="text-xs text-muted-foreground">{article.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* RIGHT: 1 large featured card */}
                {featuredLarge && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-white rounded-xl border border-border/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer flex flex-col"
                    data-testid={`featured-card-large-${featuredLarge.id}`}
                  >
                    <div className={`bg-gradient-to-br ${featuredLarge.gradient} h-52 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_white_0%,_transparent_70%)]" />
                      <BookOpen className="w-12 h-12 text-white/50" />
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm`}>
                          {featuredLarge.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-foreground leading-snug mb-3">{featuredLarge.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-1">{featuredLarge.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <StatBadge icon={Eye} count={featuredLarge.views} />
                          <StatBadge icon={Heart} count={featuredLarge.likes} />
                          <span className="text-xs text-muted-foreground">{featuredLarge.date}</span>
                        </div>
                        <span className="text-primary text-sm font-bold flex items-center gap-1 hover:translate-x-1 transition-transform">
                          Read More <ArrowRight size={14} />
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
              <h2 className="text-lg font-bold text-foreground">All Insights</h2>
              <span className="text-sm text-muted-foreground">{filtered.length} insights found</span>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-semibold">No insights found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.07 } }, hidden: {} }}
              >
                {filtered.map((article) => (
                  <motion.article
                    key={article.id}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="bg-white rounded-xl border border-border/60 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col overflow-hidden"
                    data-testid={`article-card-${article.id}`}
                  >
                    <ArticleImage gradient={article.gradient} category={article.category} />
                    <div className="p-5 flex flex-col flex-1">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full w-max mb-3 ${article.categoryColor}`}>
                        {article.category}
                      </span>
                      <h3 className="text-sm font-bold text-foreground leading-snug mb-2 line-clamp-2">{article.title}</h3>
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

        {/* STAY UPDATED — dark newsletter section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
            <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Stay Updated</h2>
            <p className="text-white/70 mb-8 text-sm leading-relaxed">
              Get the latest insights on technology, cloud, and digital growth delivered straight to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:bg-white/15"
                required
                data-testid="newsletter-email"
              />
              <button
                type="submit"
                className="shrink-0 bg-accent hover:bg-accent/90 text-white font-bold px-6 py-3 rounded-lg text-sm transition-colors shadow-lg"
                data-testid="newsletter-subscribe"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
}
