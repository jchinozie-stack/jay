"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

const luxuryEase = [0.21, 0.47, 0.32, 0.98] as const;

const lineVariants: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.35 + i * 0.18, ease: luxuryEase },
  }),
};

export function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Parallax: the backdrop drifts at roughly half scroll speed and the
  // foreground copy fades as the visitor moves toward the story section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Welcome to Chapungu Estates"
    >
      {/* Full-bleed background with parallax drift + slow settle */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={reduce ? undefined : { y: bgY }}
      >
        <motion.div
          className="absolute inset-[-6%]"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=90"
            alt="Chapungu Estates — a premier estate in Norton, Zimbabwe"
            fill
            priority
            quality={90}
            className={`object-cover transition-opacity duration-1000 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/20 to-charcoal/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        className="relative z-10 flex-1 flex items-center container-site"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl pt-24">
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={reduce ? { opacity: 0 } : "hidden"}
            animate={reduce ? { opacity: 1 } : "visible"}
          >
            <motion.div
              className="h-px w-12 bg-brand-400 origin-left"
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 0.9, delay: 0.25, ease: luxuryEase } },
              }}
            />
            <motion.span
              className="font-body text-xs tracking-[0.3em] uppercase text-brand-300"
              variants={{
                hidden: { opacity: 0, x: -8 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4, ease: luxuryEase } },
              }}
            >
              Norton, Zimbabwe
            </motion.span>
          </motion.div>

          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-light leading-[0.95] mb-8">
            {["Where Every", "Moment", "Matters."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={
                    i === 1
                      ? "block italic text-brand-300 font-normal"
                      : "block font-light"
                  }
                  custom={i}
                  initial={reduce ? { opacity: 0 } : "hidden"}
                  animate={reduce ? { opacity: 1 } : "visible"}
                  variants={lineVariants}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="font-body text-xl text-white/75 leading-relaxed mb-12 max-w-lg"
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: luxuryEase }}
          >
            An extraordinary estate where the warmth of Zimbabwe meets world-class hospitality.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25, ease: luxuryEase }}
          >
            <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={reduce ? undefined : { scale: 0.97 }}>
              <Link href="/accommodation" className="btn-gold text-base px-8 py-4">
                Begin Your Stay
              </Link>
            </motion.div>
            <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={reduce ? undefined : { scale: 0.97 }}>
              <Link href="/restaurant#reservations" className="btn-white text-base px-8 py-4">
                Reserve a Table
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 flex justify-center pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        style={reduce ? undefined : { opacity: contentOpacity }}
      >
        <a
          href="#story"
          className="flex flex-col items-center gap-3 group"
          aria-label="Scroll to explore"
        >
          <span className="font-body text-[11px] tracking-[0.3em] uppercase text-white/40 group-hover:text-white/70 transition-colors">
            Discover
          </span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent origin-top"
            animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </a>
      </motion.div>
    </section>
  );
}
