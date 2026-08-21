"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #e8521a 0%, #f07a3a 100%)",
      }}
      aria-hidden
    />
  );
}
