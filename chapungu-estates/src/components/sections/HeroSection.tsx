"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col" aria-label="Welcome to Chapungu Estates">
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
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
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/20 to-charcoal/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex items-center container-site">
        <div className="max-w-3xl pt-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-brand-400" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-brand-300">
              Norton, Zimbabwe
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-light leading-[0.95] mb-8">
            Where Every
            <span className="block italic text-brand-300 font-normal">
              Moment
            </span>
            <span className="block font-light">Matters.</span>
          </h1>

          <p className="font-body text-xl text-white/75 leading-relaxed mb-12 max-w-lg">
            An extraordinary estate where the warmth of Zimbabwe meets world-class hospitality.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/accommodation" className="btn-gold text-base px-8 py-4">
              Begin Your Stay
            </Link>
            <Link href="/restaurant#reservations" className="btn-white text-base px-8 py-4">
              Reserve a Table
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center pb-10">
        <a
          href="#story"
          className="flex flex-col items-center gap-3 group"
          aria-label="Scroll to explore"
        >
          <span className="font-body text-[11px] tracking-[0.3em] uppercase text-white/40 group-hover:text-white/70 transition-colors">
            Discover
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </a>
      </div>
    </section>
  );
}
