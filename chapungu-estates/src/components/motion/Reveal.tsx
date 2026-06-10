"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const luxuryEase = [0.21, 0.47, 0.32, 0.98] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 36 },
  down: { y: -36 },
  left: { x: 36 },
  right: { x: -36 },
  none: {},
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  once?: boolean;
  amount?: number;
}

/**
 * Scroll-triggered reveal. Content fades + drifts into place the first
 * time it enters the viewport. Falls back to a simple fade when the
 * visitor prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  direction = "up",
  once = true,
  amount = 0.25,
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset = reduce ? {} : offsets[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: luxuryEase }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child reveal */
  interval?: number;
  delay?: number;
  amount?: number;
}

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: luxuryEase },
  },
};

const staggerItemReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

/**
 * Parent container that staggers its <StaggerItem> children as the
 * group scrolls into view — used for grids, galleries, and card rows.
 */
export function Stagger({
  children,
  className,
  interval = 0.1,
  delay = 0,
  amount = 0.15,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: interval, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? staggerItemReduced : staggerItemVariants}>
      {children}
    </motion.div>
  );
}

