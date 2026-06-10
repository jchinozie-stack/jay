"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";

export function CtaBanner() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" aria-label="Book your experience">
      <Parallax className="absolute inset-0 z-0" distance={90}>
        <div className="absolute inset-[-12%]">
          <Image
            src="/images/TIN05061 (2).jpg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-brand-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 to-transparent" />
      </Parallax>

      <div className="relative z-10 container-site">
        <div className="max-w-2xl">
          <Reveal>
            <div className="section-label text-brand-300 mb-4">Begin Your Journey</div>
            <h2 className="font-display text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
              Ready to Experience
              <span className="block italic text-brand-300">Chapungu?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-10">
              Whether you&apos;re planning a romantic getaway, a dream wedding, a productive
              conference, or simply a memorable family outing — we&apos;re ready to welcome you.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              {/* Animated booking CTA: gentle breathing glow, shimmer sweep on
                  hover, and an arrow that leans into the click. */}
              <motion.div
                whileHover={reduce ? undefined : "hover"}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                initial="rest"
                animate={reduce ? undefined : "rest"}
                className="relative"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute -inset-1 bg-brand-400/40 blur-md"
                  variants={{
                    rest: { opacity: [0.25, 0.55, 0.25], transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } },
                    hover: { opacity: 0.8, transition: { duration: 0.3 } },
                  }}
                />
                <Link href="/accommodation" className="btn-gold relative overflow-hidden">
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg]"
                    variants={{
                      rest: { x: "-150%" },
                      hover: { x: "420%", transition: { duration: 0.8, ease: "easeOut" } },
                    }}
                  />
                  <span className="relative">Book Accommodation</span>
                  <motion.span
                    className="relative inline-flex"
                    variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={reduce ? undefined : { scale: 0.97 }}>
                <Link href="/contact" className="btn-white">Make an Enquiry</Link>
              </motion.div>
            </div>
          </Reveal>

          <Stagger className="mt-12 flex flex-wrap gap-6" interval={0.08} delay={0.45}>
            {[
              { label: "Wedding Enquiry", href: "/weddings" },
              { label: "Conference Quote", href: "/conferences#quote" },
              { label: "Restaurant Booking", href: "/restaurant#reservations" },
              { label: "WhatsApp Us", href: "https://wa.me/2637123456789" },
            ].map(({ label, href }) => (
              <StaggerItem key={label}>
                <Link
                  href={href}
                  className="font-body text-sm text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white"
                >
                  {label}
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" aria-label="Book your experience">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/TIN05061 (2).jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 to-transparent" />
      </div>

      <div className="relative z-10 container-site">
        <div className="max-w-2xl">
          <div className="section-label text-brand-300 mb-4">Begin Your Journey</div>
          <h2 className="font-display text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
            Ready to Experience
            <span className="block italic text-brand-300">Chapungu?</span>
          </h2>
          <p className="font-body text-white/80 text-lg leading-relaxed mb-10">
            Whether you&apos;re planning a romantic getaway, a dream wedding, a productive
            conference, or simply a memorable family outing — we&apos;re ready to welcome you.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/accommodation" className="btn-gold">
              Book Accommodation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-white">Make an Enquiry</Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-6">
            {[
              { label: "Wedding Enquiry", href: "/weddings" },
              { label: "Conference Quote", href: "/conferences#quote" },
              { label: "Restaurant Booking", href: "/restaurant#reservations" },
              { label: "WhatsApp Us", href: "https://wa.me/2637123456789" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-body text-sm text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
