import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bed, Users, Wifi, Wind, Tv, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Accommodation in Norton Zimbabwe | Rooms & Suites",
  description: "Book comfortable rooms at Chapungu Estates Guest House. Standard Room $40, Standard Twin $70, Deluxe Room $60.",
  alternates: { canonical: "/accommodation" },
};

const rooms = [
  {
    id: "standard-room",
    name: "Standard Room",
    category: "Standard",
    price: 40,
    beds: "1 Double Bed",
    maxGuests: 2,
    description: "A cosy, well-appointed room perfect for solo travellers or couples. Fully ensuite with TV, fan, and free Wi-Fi.",
    amenities: ["1 Double Bed", "Ensuite Bathroom", "TV", "Fan", "Free Wi-Fi"],
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=85",
    featured: false,
    href: "/accommodation/standard-room",
  },
  {
    id: "standard-twin",
    name: "Standard Twin",
    category: "Twin",
    price: 70,
    beds: "2 Double Beds",
    maxGuests: 4,
    description: "Ideal for families or colleagues travelling together. Two double beds, full ensuite, TV, fan, and free Wi-Fi.",
    amenities: ["2 Double Beds", "Ensuite Bathroom", "TV", "Fan", "Free Wi-Fi"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=85",
    featured: true,
    href: "/accommodation/standard-twin",
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    category: "Deluxe",
    price: 60,
    beds: "1 King Bed",
    maxGuests: 2,
    description: "A king bed, two comfortable couches, full ensuite, TV, fan, and free Wi-Fi.",
    amenities: ["1 King Bed", "2 Couches", "Ensuite Bathroom", "TV", "Fan", "Free Wi-Fi"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85",
    featured: false,
    href: "/accommodation/deluxe-room",
  },
];

const categoryColors: Record<string, string> = {
  Standard: "bg-earth-600",
  Twin: "bg-forest-600",
  Deluxe: "bg-brand-500",
};

const faq = [
  { q: "What is the check-in and check-out time?", a: "Check-in is from 2:00 PM (14:00) to 9:00 PM (21:00). Check-out is by 10:00 AM." },
  { q: "What does the room rate include?", a: "Room rates are for accommodation only. Meals are available separately at our restaurant and grill area." },
  { q: "Is there parking available?", a: "Yes, complimentary secure parking is available for all guests on the estate grounds." },
  { q: "What payment methods do you accept?", a: "We accept USD cash, RTGS, EcoCash, and major credit cards. Payment is required at check-in." },
  { q: "Where are you located?", a: "Plot No. 1201, Zvimba Road, Knowe, Norton. Call +263 78 011 4318 or +263 788 734 125 for directions." },
];

export default function AccommodationPage() {
  return (
    <>
      <div className="relative h-72 md:h-96 bg-charcoal overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80" alt="Chapungu Estates Guest House" fill priority className="object-cover opacity-50" sizes="100vw" />
        <div className="absolute inset-0 flex items-end container-site pb-12">
          <div>
            <div className="section-label text-brand-300 mb-2">Guest House</div>
            <h1 className="font-display text-5xl md:text-6xl text-white font-light">Rooms &amp; Rates</h1>
          </div>
        </div>
      </div>

      <div className="bg-charcoal border-b border-earth-800">
        <div className="container-site py-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-body text-earth-300">
            <span>Check-in: <span className="text-white font-medium">14:00 to 21:00</span></span>
            <span>Check-out: <span className="text-white font-medium">10:00</span></span>
            <span>All rooms: <span className="text-white font-medium">Ensuite &middot; TV &middot; Fan &middot; Wi-Fi</span></span>
          </div>
        </div>
      </div>

      <div className="bg-cream border-b border-earth-100">
        <div className="container-site py-8">
          <p className="font-body text-earth-600 max-w-xl">3 room types — comfortable, clean, and excellent value. All rooms include a private ensuite bathroom, TV, fan, and free Wi-Fi.</p>
        </div>
      </div>

      <div className="container-site py-16 space-y-12">
        {rooms.map((room, index) => (
          <article key={room.id} className="grid grid-cols-1 lg:grid-cols-2 gap-0 card-luxury overflow-hidden" aria-label={room.name}>
            <div className={"relative h-64 lg:h-auto min-h-72 " + (index % 2 === 1 ? "lg:order-2" : "")}>
              <Image src={room.image} alt={room.name + " at Chapungu Estates"} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              {room.featured && (<div className="absolute top-4 left-4 bg-brand-500 text-white font-body text-xs font-semibold px-3 py-1 tracking-wide">Popular Choice</div>)}
              <div className={"absolute top-4 " + (room.featured ? "left-36" : "left-4")}>
                <span className={"font-body text-xs text-white font-semibold px-3 py-1 " + categoryColors[room.category]}>{room.category}</span>
              </div>
            </div>
            <div className={"p-8 lg:p-10 flex flex-col justify-between " + (index % 2 === 1 ? "lg:order-1" : "")}>
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h2 className="font-display text-3xl text-charcoal">{room.name}</h2>
                  <div className="text-right">
                    <div className="font-display text-4xl text-brand-600 font-light">{"$"}{room.price}</div>
                    <div className="font-body text-xs text-earth-500">per night</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-earth-100">
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-600"><Bed className="w-3.5 h-3.5 text-brand-500" />{room.beds}</span>
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-600"><Users className="w-3.5 h-3.5 text-brand-500" />Up to {room.maxGuests} guests</span>
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-600"><Wifi className="w-3.5 h-3.5 text-brand-500" />Free Wi-Fi</span>
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-600"><Wind className="w-3.5 h-3.5 text-brand-500" />Fan</span>
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-600"><Tv className="w-3.5 h-3.5 text-brand-500" />TV</span>
                </div>
                <p className="font-body text-sm text-earth-600 leading-relaxed mb-6">{room.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities.map((a) => (<span key={a} className="font-body text-xs bg-earth-50 border border-earth-100 text-earth-600 px-2.5 py-1">{a}</span>))}
                </div>
              </div>
              <div className="flex gap-3">
                <Link href={room.href} className="flex-1 btn-gold text-center justify-center text-sm py-3">Book This Room</Link>
                <Link href={room.href} className="flex items-center gap-1 font-body text-sm text-earth-600 hover:text-brand-600 transition-colors font-medium px-4">Details<ChevronRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-earth-950 py-16">
        <div className="container-site text-center">
          <div className="section-label text-brand-400 mb-3">All Rooms Include</div>
          <h2 className="font-display text-4xl text-white font-light mb-12">{"What's Included"}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Free Wi-Fi", "Private Ensuite", "TV", "Fan", "Secure Parking", "Restaurant & Grill", "Grocery Shop", "Kids Play Area"].map((a) => (
              <div key={a} className="text-center p-4 border border-earth-800"><span className="font-body text-sm text-earth-300">{a}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-brand-600 py-10">
        <div className="container-site text-center">
          <p className="font-display text-2xl text-white font-light mb-2">Ready to book your stay?</p>
          <p className="font-body text-sm text-brand-100 mb-6">Plot No. 1201, Zvimba Road, Knowe, Norton | +263 78 011 4318 · +263 788 734 125 · +263 788 734 120</p>
          <Link href="/contact" className="inline-block bg-white text-brand-600 font-body font-semibold text-sm px-8 py-3 hover:bg-cream transition-colors">Contact Us to Book</Link>
        </div>
      </div>

      <div className="container-site py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12"><div className="section-label mb-3">FAQ</div><h2 className="section-title">Frequently Asked Questions</h2></div>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <details key={q} className="group border border-earth-100 bg-white">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-display text-lg text-charcoal">{q}<ChevronRight className="w-5 h-5 text-brand-500 transition-transform group-open:rotate-90" /></summary>
                <div className="px-6 pb-6"><p className="font-body text-sm text-earth-600 leading-relaxed">{a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
