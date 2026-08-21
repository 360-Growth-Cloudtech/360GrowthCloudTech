"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from "framer-motion";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
}

/**
 * Cursor-following radial glow layered over a card. Pairs with TiltCard
 * for the full premium hover treatment.
 */
export function Spotlight({
  children,
  className,
  color = "rgba(232,82,26,0.14)",
  size = 280,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 72%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || reduced) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function onLeave() {
    mouseX.set(-9999);
    mouseY.set(-9999);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`group/spot relative ${className ?? ""}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  );
}
