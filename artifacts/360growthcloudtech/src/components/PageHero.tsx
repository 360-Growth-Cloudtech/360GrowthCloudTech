import { motion } from "framer-motion";

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="pt-36 pb-12 bg-white text-center border-b border-border/40" data-testid="page-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent uppercase tracking-wider mb-4 border border-accent/20 bg-accent/5 px-3 py-1 rounded-full"
          >
            {label}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight"
        >
          <span className="gradient-text">{title}</span>
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
