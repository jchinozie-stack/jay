"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const luxuryEase = [0.21, 0.47, 0.32, 0.98] as const;

const rooms = [
  {
    id: "standard-room",
    name: "Standard Room",
    tagline: "Your private retreat — quiet, comfortable, entirely yours.",
    description: "Wake up in your own peaceful corner of the estate. Natural light, a comfortable double bed, and all the essentials done beautifully.",
    price: 40,
    detail: "Ensuite · Double Bed · Sleeps 2",
    tags: ["Ensuite", "Double Bed", "Sleeps 2"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85",
    href: "/accommodation/standard-room",
  },
  {
    id: "standard-twin",
    name: "Standard Twin",
    tagline: "Perfect for families and friends who want space to breathe.",
    description: "Two generous double beds, a private ensuite, and enough room for everyone to feel at home. The estate is right outside your door.",
    price: 70,
    detail: "Ensuite · 2 Double Beds · Sleeps 4",
    tags: ["Ensuite", "2 Double Beds", "Sleeps 4"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=85",
    href: "/accommodation/standard-twin",
    featured: true,
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    tagline: "The finest room on the estate. Reserved for those who know.",
    description: "A king bed, two lounge chairs, and a sense of space that makes you never want to leave. Our most requested room — for good reason.",
    price: 60,
    detail: "Ensuite · King Bed · 2 Loungers · Sleeps 2",
    tags: ["Ensuite", "King Bed", "2 Loungers", "Sleeps 2"],
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=85",
    href: "/accommodation/deluxe-room",
  },
];

export function AccommodationPreview() {
  const reduce = useReducedMotion();
  return (
    <section id="accommodation" className="py-32 lg:py-40 bg-cream" aria-labelledby="accommodation-heading">
      <div className="container-site">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <Reveal>
            <div className="section-label mb-4">Where You&apos;ll Sleep</div>
            <h2 id="accommodation-heading" className="font-display text-5xl lg:text-6xl text-charcoal font-light leading-tight">
              Sleep in
              <span className="block italic text-brand-500"> Chapungu&apos;s Embrace</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-body text-earth-600 leading-relaxed text-lg mb-6">
              Three room types — each designed for comfort, quiet, and the particular pleasure of waking up somewhere beautiful.
            </p>
            <p className="font-body text-earth-500 text-sm">
              All rooms include private ensuite bathroom, flat-screen TV, fan, and complimentary Wi-Fi. Check-in from 14:00, check-out by 10:00.
            </p>
          </Reveal>
        </div>

        <div className="space-y-4">
          {rooms.map((room, i) => (
            <motion.article
              key={room.id}
              className={`group grid grid-cols-1 lg:grid-cols-2 overflow-hidden ${room.featured ? "bg-charcoal" : "bg-white border border-earth-100"}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: luxuryEase }}
              whileHover={reduce ? undefined : "hover"}
            >
              <div className={`relative h-72 lg:h-[420px] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <motion.div
                  className="absolute inset-0"
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.8, ease: luxuryEase }}
                >
                  <Image
                    src={room.image}
                    alt={`${room.name} at Chapungu Estates`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
                {/* Glass tag pills */}
                <div className="absolute top-5 right-5 flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  {room.tags.map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/95 font-body whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Hover reveal: room details rise from the bottom edge */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-transparent px-6 pt-14 pb-5 hidden lg:block"
                  initial={false}
                  variants={{ hover: { opacity: 1, y: 0 } }}
                  style={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.45, ease: luxuryEase }}
                >
                  <div className="flex items-end justify-between gap-4">
                    <p className="font-body text-xs tracking-[0.15em] uppercase text-white/80">{room.detail}</p>
                    <p className="font-display text-2xl text-brand-300 font-light whitespace-nowrap">${room.price}<span className="font-body text-xs text-white/60"> / night</span></p>
                  </div>
                </motion.div>
                {room.featured && (
                  <div className="absolute top-5 left-5">
                    <span className="font-body text-xs tracking-[0.2em] uppercase bg-brand-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
              </div>

              <div className={`flex flex-col justify-center p-10 lg:p-16 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className={`font-body text-xs tracking-[0.2em] uppercase mb-3 ${room.featured ? "text-brand-400" : "text-brand-600"}`}>
                  from ${room.price} / night
                </div>
                <h3 className={`font-display text-4xl font-light mb-3 ${room.featured ? "text-white" : "text-charcoal"}`}>
                  {room.name}
                </h3>
                <p className={`font-body text-sm mb-4 ${room.featured ? "text-brand-300" : "text-brand-600"} italic`}>
                  {room.tagline}
                </p>
                <p className={`font-body leading-relaxed text-sm mb-8 ${room.featured ? "text-earth-400" : "text-earth-600"}`}>
                  {room.description}
                </p>
                <div className={`font-body text-xs mb-8 pb-8 border-b ${room.featured ? "text-earth-500 border-earth-800" : "text-earth-400 border-earth-100"}`}>
                  {room.detail}
                </div>
                <div className="flex gap-3">
                  <Link
                    href={room.href}
                    className={room.featured ? "btn-gold text-sm py-3" : "btn-outline-gold text-sm py-3"}
                  >
                    Book This Room
                  </Link>
                  <Link
                    href={room.href}
                    className={`font-body text-sm px-4 py-3 transition-colors ${room.featured ? "text-earth-400 hover:text-white" : "text-earth-500 hover:text-charcoal"}`}
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
