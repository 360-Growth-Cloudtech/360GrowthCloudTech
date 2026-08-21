"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

interface CounterProps {
  value: string;
  className?: string;
  duration?: number;
}

function parseValue(raw: string): {
  prefix: string;
  number: number;
  decimals: number;
  suffix: string;
  literal?: string;
} {
  // Non-numeric patterns like "24/7"
  if (!/\d/.test(raw) || (raw.includes("/") && !raw.includes("%"))) {
    return { prefix: "", number: 0, decimals: 0, suffix: "", literal: raw };
  }

  const match = raw.match(/^([^\d.-]*)([\d.]+)(.*)$/);
  if (!match) {
    return { prefix: "", number: 0, decimals: 0, suffix: "", literal: raw };
  }

  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return {
    prefix: prefix ?? "",
    number: parseFloat(numStr),
    decimals,
    suffix: suffix ?? "",
  };
}

export function Counter({ value, className, duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const parsed = parseValue(value);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 60,
    damping: 20,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (parsed.literal || reduced) return;
    if (inView) {
      motionValue.set(parsed.number);
    }
  }, [inView, motionValue, parsed.literal, parsed.number, reduced]);

  useEffect(() => {
    if (parsed.literal || reduced) return;
    const unsubscribe = spring.on("change", (latest) => {
      if (!ref.current) return;
      ref.current.textContent =
        parsed.prefix +
        latest.toFixed(parsed.decimals) +
        parsed.suffix;
    });
    return unsubscribe;
  }, [spring, parsed, reduced]);

  if (parsed.literal || reduced) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={className}>
      {parsed.prefix}0{parsed.suffix}
    </motion.span>
  );
}
