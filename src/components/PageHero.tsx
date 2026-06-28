import { motion } from "framer-motion";

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section
      className="relative pt-36 pb-20 overflow-hidden text-center"
      data-testid="page-hero"
      style={{
        background: "linear-gradient(160deg, #0d0620 0%, #2d1580 45%, #3b1fa8 70%, #1e0f6b 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 rounded-full opacity-40"
        style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.22) 0%, transparent 70%)", filter: "blur(30px)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 uppercase tracking-widest mb-6 border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 rounded-full"
          >
            {label}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(10,5,25,0.06))" }}
      />
    </section>
  );
}
