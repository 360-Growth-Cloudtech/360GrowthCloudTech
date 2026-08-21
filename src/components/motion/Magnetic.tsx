"use client";

import { ReactNode, useRef, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element travels toward the cursor, in px */
  strength?: number;
}

export function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [, setHovered] = useState(false);

  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || reduced) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  }

  function onLeave() {
    setHovered(false);
    x.set(0);
    y.set(0);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className ?? ""}`}
      style={{ x, y }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
