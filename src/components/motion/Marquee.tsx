"use client";

import { ReactNode, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  gap?: string;
}

export function Marquee({
  children,
  className,
  speed = 40,
  gap = "3.5rem",
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  if (reduced) {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-8 md:gap-14 ${className ?? ""}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`marquee-mask overflow-hidden ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex w-max items-center"
        style={{ gap }}
        animate={{ x: paused ? undefined : ["0%", "-50%"] }}
        transition={
          paused
            ? { duration: 0 }
            : {
                x: {
                  duration: speed,
                  ease: "linear",
                  repeat: Infinity,
                },
              }
        }
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
