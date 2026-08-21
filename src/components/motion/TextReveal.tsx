"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "./Reveal";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  accentWordIndex?: number;
  accentClassName?: string;
}

export function TextReveal({
  children,
  className,
  as: Tag = "h1",
  delay = 0,
  stagger = 0.06,
  accentWordIndex,
  accentClassName,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = children.split(" ");

  if (reduced) {
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={i} className={i === accentWordIndex ? accentClassName : undefined}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className={`inline-block ${i === accentWordIndex ? accentClassName ?? "" : ""}`}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.75, ease: EASE_EXPO },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </MotionTag>
  );
}

/** For mixed content (plain words + a React accent node) */
export function TextRevealParts({
  parts,
  className,
  as: Tag = "h1",
  delay = 0,
  stagger = 0.06,
}: {
  parts: Array<{ text: string; className?: string; style?: CSSProperties }>;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const flat = parts.flatMap((part, pi) => {
    const words = part.text.split(" ").filter(Boolean);
    return words.map((word, wi) => ({
      word,
      className: part.className,
      style: part.style,
      key: `${pi}-${wi}`,
    }));
  });

  if (reduced) {
    return (
      <Tag className={className}>
        {flat.map((w, i) => (
          <span key={w.key} className={w.className} style={w.style}>
            {w.word}
            {i < flat.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {flat.map((w, i) => (
        <span key={w.key} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className={`inline-block ${w.className ?? ""}`}
            style={w.style}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.75, ease: EASE_EXPO },
              },
            }}
          >
            {w.word}
          </motion.span>
          {i < flat.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </MotionTag>
  );
}
