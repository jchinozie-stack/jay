"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Globe } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { BlurText } from "@/components/motion/BlurText";

const luxuryEase = [0.21, 0.47, 0.32, 0.98] as const;

const entrance = (reduce: boolean | null, delay: number) => ({
  initial: reduce
    ? { opacity: 0 }
    : { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: reduce
    ? { opacity: 1 }
    : { filter: "blur(0px)", opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

const stats = [
  { icon: Clock, value: "10+", label: "Years of Zimbabwean hospitality" },
  { icon: Globe, value: "500+", label: "Weddings & celebrations hosted" },
];

const offerings = [
  { name: "Stay", href: "/accommodation" },
  { name: "Dine", href: "/restaurant" },
  { name: "Weddings", href: "/weddings" },
  { name: "Conferences", href: "/conferences" },
  { name: "Gallery", href: "/gallery" },
];

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
      className="relative min-h-screen flex flex-col overflow-hidden bg-charcoal"
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
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/10 to-charcoal/70" />
      </motion.div>

      <motion.div
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center container-site pt-28 px-4"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Glass badge */}
        <motion.div {...entrance(reduce, 0.4)}>
          <div className="liquid-glass rounded-full inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5">
            <span className="bg-white text-charcoal rounded-full px-3 py-1 text-xs font-body font-semibold">
              New
            </span>
            <span className="text-sm text-white/90 font-body">
              Online ordering now live at the Grill & Butchery
            </span>
          </div>
        </motion.div>

        {/* Word-by-word blur headline */}
        <h1 className="mt-7 font-display text-6xl md:text-7xl lg:text-[5.5rem] text-white leading-[0.9] tracking-tight max-w-3xl">
          <BlurText
            delay={0.5}
            stagger={0.1}
            words={[
              { text: "Where", className: "font-light" },
              { text: "Every", className: "font-light" },
              { text: "Moment", className: "italic text-brand-300 font-normal" },
              { text: "Matters.", className: "font-light" },
            ]}
          />
        </h1>

        <motion.p
          className="mt-5 text-sm md:text-base text-white/90 max-w-xl font-body font-light leading-snug"
          {...entrance(reduce, 0.9)}
        >
          Discover the warmth of Zimbabwe in ways once unimaginable. Our estate
          brings world-class stays, dining, and celebrations within reach —
          serene and extraordinary.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-6 mt-7"
          {...entrance(reduce, 1.15)}
        >
          <motion.div
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
          >
            <Link
              href="/accommodation"
              className="liquid-glass-strong rounded-full inline-flex items-center gap-2 px-6 py-3 text-sm font-body font-medium text-white"
            >
              Begin Your Stay
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </motion.div>
          <Link
            href="/restaurant#reservations"
            className="inline-flex items-center gap-2 text-sm font-body font-medium text-white/90 hover:text-white transition-colors"
          >
            Reserve a Table
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Glass stat cards */}
        <motion.div
          className="flex items-stretch gap-4 mt-10"
          {...entrance(reduce, 1.35)}
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={value}
              className="liquid-glass rounded-[1.25rem] p-5 w-[220px] flex flex-col items-start text-left"
            >
              <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
              <div className="mt-5 font-display italic text-4xl text-white tracking-tight leading-none">
                {value}
              </div>
              <div className="text-xs text-white font-body font-light mt-2">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Offerings row */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 pb-8 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={reduce ? undefined : { opacity: contentOpacity }}
      >
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-body font-medium text-white">
          One estate, every occasion — Norton, Zimbabwe
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-14 gap-y-2">
          {offerings.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className="font-display italic text-white/90 hover:text-white text-2xl md:text-3xl tracking-tight transition-colors"
            >
              {name}
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
