"use client";

import { motion, useReducedMotion } from "framer-motion";

export interface BlurWord {
  text: string;
  className?: string;
}

interface BlurTextProps {
  words: BlurWord[];
  className?: string;
  /** Seconds before the first word begins */
  delay?: number;
  /** Seconds between each word */
  stagger?: number;
  justify?: "center" | "start";
}

/**
 * Word-by-word cinematic reveal: each word arrives through a three-step
 * blur (10px -> 5px -> 0) while rising into place. Falls back to a plain
 * fade when the visitor prefers reduced motion.
 */
export function BlurText({
  words,
  className,
  delay = 0,
  stagger = 0.1,
  justify = "center",
}: BlurTextProps) {
  const reduce = useReducedMotion();

  return (
    <span
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: justify === "center" ? "center" : "flex-start",
        rowGap: "0.1em",
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word.text}-${i}`}
          className={word.className}
          style={{ display: "inline-block", marginRight: "0.28em" }}
          initial={
            reduce
              ? { opacity: 0 }
              : { filter: "blur(10px)", opacity: 0, y: 50 }
          }
          whileInView={
            reduce
              ? {
                  opacity: 1,
                  transition: { duration: 0.5, delay: delay + i * stagger },
                }
              : {
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                  transition: {
                    duration: 0.7,
                    times: [0, 0.5, 1],
                    ease: "easeOut",
                    delay: delay + i * stagger,
                  },
                }
          }
          viewport={{ once: true, amount: 0.1 }}
        >
          {word.text}
        </motion.span>
      ))}
    </span>
  );
}
