"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import {
  serviceDisciplines,
  serviceProcessSteps,
  servicesInPractice,
} from "@/lib/services-data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

function ServiceBulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="divide-y divide-border/70 border-t border-border/70">
      {bullets.map((item) => (
        <li key={item} className="flex items-center gap-3 py-4 text-sm font-medium text-foreground/85">
          <Check size={15} className="shrink-0 text-primary" strokeWidth={2.5} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Services() {
  const { setOpen } = useScheduleMeeting();

  return (
    <div data-testid="services-page">
      {/* Hero */}
      <section className="relative min-h-[72vh] flex items-center justify-center py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,21,18,0.45) 0%, rgba(26,21,18,0.92) 50%, #1a1512 100%), radial-gradient(ellipse 70% 55% at 50% 35%, rgba(232,82,26,0.14) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-6"
          >
            Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="display-heading text-4xl md:text-5xl lg:text-[3.4rem] text-white leading-[1.1] mb-6"
          >
            AI engineering and
            <br />
            design, end to end
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Seven disciplines, one team. From product strategy through AI architecture to production
            deployment, without a handoff in the middle.
          </motion.p>
        </div>
      </section>

      {/* Numbered disciplines */}
      <section className="bg-background">
        {serviceDisciplines.map((service, index) => {
          const reversed = index % 2 === 1;

          return (
            <motion.div
              key={service.number}
              {...fadeUp}
              className="border-b border-border/60"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                  <div className={reversed ? "lg:order-2" : undefined}>
                    <span className="display-heading text-5xl md:text-6xl text-primary leading-none mb-6 block">
                      {service.number}
                    </span>
                    <h2 className="display-heading text-3xl md:text-4xl text-foreground mb-5 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-base max-w-lg">
                      {service.desc}
                    </p>
                  </div>

                  <div className={reversed ? "lg:order-1 lg:pt-[4.75rem]" : "lg:pt-[4.75rem]"}>
                    <ServiceBulletList bullets={service.bullets} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-[#f5f0e8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div {...fadeUp} className="mb-14 md:mb-16 max-w-3xl">
            <h2 className="display-heading text-3xl md:text-[2.35rem] text-foreground mb-4 leading-tight">
              A focused, repeatable process
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-[1.05rem]">
              Every engagement follows the same clear phases — from discovery and build through
              launch, marketing, and cloud scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 lg:gap-y-14">
            {serviceProcessSteps.map((step, i) => (
              <motion.div
                key={step.number}
                {...fadeUp}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="h-2 w-2 shrink-0 rounded-[2px] bg-primary" aria-hidden />
                  <span className="text-sm font-bold tabular-nums tracking-wide text-primary">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3 leading-snug">{step.title}</h3>
                <p className="text-sm md:text-[0.9375rem] text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services in practice */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div {...fadeUp} className="mb-12 md:mb-14">
            <h2 className="display-heading text-3xl md:text-[2.35rem] text-foreground leading-tight">
              Services in practice
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesInPractice.map((project, i) => (
              <motion.div
                key={project.title}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col"
              >
                <div className="rounded-2xl overflow-hidden mb-5 aspect-[4/3] relative bg-[#1a1512] shadow-md ring-1 ring-border/40">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                  {project.tag}
                </span>
                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-10">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all"
            >
              View case studies <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-14 md:py-16"
            style={{
              background: "linear-gradient(135deg, #e8521a 0%, #c43d0f 55%, #a83208 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse 50% 80% at 85% 50%, rgba(255,255,255,0.35) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="display-heading text-3xl md:text-4xl text-white mb-3">
                  Talk to us about your project
                </h2>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  Free consultation, no commitment. Tell us what you&apos;re building and we&apos;ll
                  map the path forward.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-foreground hover:bg-white/90 transition-colors"
                  data-testid="services-cta-book"
                >
                  Get in touch <ArrowRight size={16} />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15 transition-colors"
                >
                  Send a message
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
