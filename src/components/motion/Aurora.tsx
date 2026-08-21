"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Slow-drifting gradient orbs that give the hero depth without
 * competing with the foreground content.
 */
export function Aurora({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const orbs = [
    {
      size: 520,
      color: "rgba(232,82,26,0.16)",
      left: "-8%",
      top: "-12%",
      duration: 22,
      path: { x: [0, 70, -30, 0], y: [0, 50, 90, 0] },
    },
    {
      size: 420,
      color: "rgba(240,122,58,0.13)",
      right: "-6%",
      top: "4%",
      duration: 26,
      path: { x: [0, -60, 30, 0], y: [0, 70, -40, 0] },
    },
    {
      size: 460,
      color: "rgba(26,21,18,0.06)",
      left: "35%",
      bottom: "-18%",
      duration: 30,
      path: { x: [0, 50, -70, 0], y: [0, -50, 30, 0] },
    },
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full parallax-layer"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            right: orb.right,
            top: orb.top,
            bottom: orb.bottom,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={reduced ? undefined : orb.path}
          transition={
            reduced
              ? undefined
              : {
                  duration: orb.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}
