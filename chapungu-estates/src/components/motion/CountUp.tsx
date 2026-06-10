"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  /** Display value, e.g. "10+", "500+", "4.9★", "120" */
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
}

/**
 * Animates a statistic from 0 to its final value the first time it
 * scrolls into view. Non-numeric prefixes/suffixes ("+", "★", "%")
 * are preserved and decimals are respected.
 */
export function CountUp({ value, className, duration = 1.8, delay = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;

  const [display, setDisplay] = useState(reduce || !match ? value : `${prefix}0${suffix}`);

  useEffect(() => {
    if (!inView || reduce || !match) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) =>
        setDisplay(
          `${prefix}${latest.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}${suffix}`
        ),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}

