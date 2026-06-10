"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** How far (px) the layer drifts over a full scroll pass. Positive = slower than scroll. */
  distance?: number;
  /** Subtle zoom applied as you scroll, e.g. 1.1 */
  scaleTo?: number;
}

/**
 * Wraps a layer (usually a full-bleed image) and drifts it at a slower
 * rate than the page scroll, creating depth. Disabled entirely when the
 * visitor prefers reduced motion.
 */
export function Parallax({ children, className, distance = 120, scaleTo }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, scaleTo ?? 1]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

