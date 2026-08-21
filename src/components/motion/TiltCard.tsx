"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

function Sheen({ x, y }: { x: MotionValue<string>; y: MotionValue<string> }) {
  const background = useTransform(
    [x, y],
    ([sx, sy]) =>
      `radial-gradient(circle at ${sx} ${sy}, rgba(255,255,255,0.22) 0%, transparent 55%)`,
  );

  return (
    <motion.div
      className="tilt-sheen pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background }}
    />
  );
}

export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 200,
    damping: 20,
  });
  const sheenX = useTransform(x, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(y, [0, 1], ["0%", "100%"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || reduced) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt-card group relative h-full ${className ?? ""}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <Sheen x={sheenX} y={sheenY} />
    </motion.div>
  );
}
