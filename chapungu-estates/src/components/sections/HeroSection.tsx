"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Star, Users, Award } from "lucide-react";
import { QuickBookingWidget } from "@/components/forms/QuickBookingWidget";

const stats = [
  { icon: Star, value: "4.9", label: "Guest Rating" },
  { icon: Users, value: "500+", label: "Happy Guests" },
  { icon: Award, value: "10+", label: "Years of Excellence" },
];

export function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col" aria-label="Welcome to Chapungu Estates">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=85"
          alt="Chapungu Estates — a luxurious estate in Norton, Zimbabwe surrounded by African landscape"
          fill
          priority
          quality={85}
          className={`object-cover transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container-site pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
            <div className="h-px w-8 bg-brand-400" />
            <span className="section-label text-brand-300">Norton, Zimbabwe</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-light leading-[1.05] mb-6 animate-fade-up delay-100 opacity-initial">
            Where Africa&apos;s
            <span className="block italic text-brand-300 font-normal">Heart Beats</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl animate-fade-up delay-200 opacity-initial">
            Experience luxury accommodation, exceptional dining, and unforgettable events 
            at Norton&apos;s premier hospitality destination.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16 animate-fade-up delay-300 opacity-initial">
            <Link href="/accommodation" className="btn-gold">
              Book Your Stay
            </Link>
            <Link href="/weddings" className="btn-white">
              Plan Your Wedding
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 animate-fade-up delay-400 opacity-initial">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Icon className="w-4 h-4 text-brand-400" aria-hidden="true" />
                  <span className="font-display text-2xl text-white font-semibold">{value}</span>
                </div>
                <span className="font-body text-xs text-white/60 tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Booking Widget */}
      <div className="relative z-10 container-site pb-0">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 animate-fade-up delay-500 opacity-initial">
          <h2 className="font-body text-white text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            Check Availability
          </h2>
          <QuickBookingWidget />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 flex justify-center py-8">
        <a
          href="#accommodation"
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors group"
          aria-label="Scroll to explore"
        >
          <span className="font-body text-xs tracking-[0.2em] uppercase">Explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
