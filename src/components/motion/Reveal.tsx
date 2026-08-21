"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Direction = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  once?: boolean;
  blur?: boolean;
  scale?: boolean;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  once = true,
  blur = true,
  scale = false,
}: RevealProps) {
  const reduced = useReducedMotion();
  const { x, y } = offsets[direction];

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x,
      y,
      filter: blur ? "blur(6px)" : "blur(0px)",
      scale: scale ? 0.96 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration, delay, ease: EASE_EXPO },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}
