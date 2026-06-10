"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const luxuryEase = [0.21, 0.47, 0.32, 0.98] as const;

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80", alt: "Chapungu Estates exterior and grounds", cols: 2, rows: 2 },
  { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80", alt: "Luxury suite interior", cols: 1, rows: 1 },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", alt: "Restaurant dining experience", cols: 1, rows: 1 },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", alt: "Wedding ceremony setup", cols: 2, rows: 1 },
  { src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80", alt: "Pool and recreation area", cols: 1, rows: 1 },
];

export function GalleryPreview() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 lg:py-32 bg-cream" aria-labelledby="gallery-heading">
      <div className="container-site">
        <Reveal className="text-center mb-16">
          <div className="section-label mb-3">Gallery</div>
          <h2 id="gallery-heading" className="section-title">
            See Chapungu
            <span className="italic text-brand-500"> in All Its Glory</span>
          </h2>
        </Reveal>

        {/* Staggered tile loading: each image settles in sequence with a
            soft scale, like prints being laid on a table. */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 h-[500px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {galleryImages.slice(0, 5).map((img, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden group ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              variants={{
                hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.8, ease: luxuryEase },
                },
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300" />
              <p className="absolute bottom-0 left-0 right-0 p-4 font-body text-xs tracking-wide text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {img.alt}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <Reveal className="text-center mt-8" delay={0.2}>
          <Link href="/gallery" className="btn-outline-gold">View Full Gallery</Link>
        </Reveal>
      </div>
    </section>
  );
}
