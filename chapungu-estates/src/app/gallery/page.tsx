"use client";

import { useState } from "react";
import Image from "next/image";
import type { Metadata } from "next";

const categories = ["All", "Accommodation", "Restaurant & Braai", "Weddings", "Conferences", "Events", "Nature"];

const galleryItems = [
  { id: 1, src: "/images/gallery/accommodation-suite.jpg", alt: "Presidential Suite interior", category: "Accommodation", span: "col-span-2 row-span-2" },
  { id: 2, src: "/images/gallery/pool-view.jpg", alt: "Swimming pool at sunset", category: "Accommodation", span: "" },
  { id: 3, src: "/images/gallery/garden-chalet.jpg", alt: "Garden chalet exterior", category: "Accommodation", span: "" },
  { id: 4, src: "/images/gallery/restaurant-interior.jpg", alt: "Restaurant dining area", category: "Restaurant & Braai", span: "" },
  { id: 5, src: "/images/gallery/braai-evening.jpg", alt: "Evening braai setup", category: "Restaurant & Braai", span: "col-span-2" },
  { id: 6, src: "/images/gallery/wedding-ceremony.jpg", alt: "Wedding ceremony on the lawn", category: "Weddings", span: "col-span-2 row-span-2" },
  { id: 7, src: "/images/gallery/wedding-reception.jpg", alt: "Wedding reception décor", category: "Weddings", span: "" },
  { id: 8, src: "/images/gallery/conference-room.jpg", alt: "Savannah conference room", category: "Conferences", span: "" },
  { id: 9, src: "/images/gallery/boardroom.jpg", alt: "Executive boardroom", category: "Conferences", span: "" },
  { id: 10, src: "/images/gallery/birthday-event.jpg", alt: "Birthday celebration event", category: "Events", span: "" },
  { id: 11, src: "/images/gallery/estate-grounds.jpg", alt: "Estate grounds aerial view", category: "Nature", span: "col-span-2" },
  { id: 12, src: "/images/gallery/gardens.jpg", alt: "Manicured gardens", category: "Nature", span: "" },
  { id: 13, src: "/images/gallery/sunset-view.jpg", alt: "Sunset over the estate", category: "Nature", span: "" },
  { id: 14, src: "/images/gallery/food-plating.jpg", alt: "Signature dish presentation", category: "Restaurant & Braai", span: "" },
  { id: 15, src: "/images/gallery/family-suite.jpg", alt: "Family suite lounge", category: "Accommodation", span: "" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const filtered = active === "All" ? galleryItems : galleryItems.filter((i) => i.category === active);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[45vh] flex items-center justify-center bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/30 to-stone-950/80" />
        <div className="grain-overlay" />
        <div className="relative z-10 text-center text-white px-6">
          <p className="section-label text-gold/80 mb-4">Visual Story</p>
          <h1 className="font-display text-5xl md:text-7xl font-light">Gallery</h1>
          <p className="mt-4 text-stone-300 text-lg max-w-xl mx-auto">
            Moments captured across our estate — from intimate suites to grand celebrations
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-stone-200 shadow-sm">
        <div className="container-site">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all ${
                  active === cat
                    ? "bg-stone-900 text-gold shadow-md"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="py-12 bg-stone-50">
        <div className="container-site">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((item) => (
              <button
                key={item.id}
                className="w-full break-inside-avoid block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-zoom-in"
                onClick={() => setLightbox({ src: item.src, alt: item.alt })}
              >
                <div className="relative aspect-auto overflow-hidden bg-stone-200">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/30 transition-colors duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      {item.alt}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-stone-400">
              <p className="text-lg">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-stone-950/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-12 right-0 text-white/70 hover:text-white text-lg tracking-widest"
              onClick={() => setLightbox(null)}
            >
              CLOSE ✕
            </button>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-2xl object-contain max-h-[80vh]"
            />
            <p className="text-center text-stone-400 mt-4 text-sm">{lightbox.alt}</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 bg-stone-950 text-center">
        <div className="container-site max-w-2xl">
          <p className="section-label text-gold/70 mb-4">Create Your Memories</p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-light mb-6">
            Your Event, Your Story
          </h2>
          <p className="text-stone-400 mb-10 leading-relaxed">
            Let us help you craft unforgettable moments at Chapungu Estates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/weddings" className="btn-gold">Plan Your Wedding</a>
            <a href="/accommodation" className="btn-outline-gold">Book a Stay</a>
          </div>
        </div>
      </section>
    </>
  );
}
