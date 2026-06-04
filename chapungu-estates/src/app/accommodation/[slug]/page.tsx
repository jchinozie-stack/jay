import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Users, Maximize2, BedDouble, Wifi, Tv, Coffee, Wind, Car, Waves } from "lucide-react";

const rooms = [
  {
    slug: "presidential-suite",
    name: "Presidential Suite",
    tagline: "The pinnacle of luxury at Chapungu Estates",
    description:
      "Our flagship Presidential Suite is a statement in opulence. Spanning over 80 square metres, this magnificent suite features a separate living room, private dining area, a master bedroom with king-size bed, and a luxuriously appointed en suite bathroom with both a soaking tub and rain shower. The private balcony overlooks the estate's manicured gardens and pool.",
    price: 280,
    capacity: 2,
    size: "80 m²",
    bedType: "King",
    images: [
      "/images/rooms/presidential-1.jpg",
      "/images/rooms/presidential-2.jpg",
      "/images/rooms/presidential-3.jpg",
    ],
    amenities: [
      "King-size bed with premium linen",
      "Separate living room",
      "Private dining area",
      "Soaking bath & rain shower",
      "Private balcony with garden view",
      "Minibar & Nespresso machine",
      "55\" smart TV",
      "High-speed Wi-Fi",
      "Air conditioning & ceiling fan",
      "In-room safe",
      "24-hour butler service",
      "Complimentary airport transfers",
    ],
    icons: [Wifi, Tv, Coffee, Wind, Car, Waves],
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    tagline: "Sophisticated comfort for the discerning traveller",
    description:
      "The Executive Suite blends refined aesthetics with all the comforts of home. A spacious bedroom leads to an elegant sitting area and an en suite bathroom with a double vanity and walk-in rain shower. Warm earth tones and natural materials create a serene atmosphere inspired by the African landscape.",
    price: 220,
    capacity: 2,
    size: "60 m²",
    bedType: "King",
    images: [
      "/images/rooms/executive-1.jpg",
      "/images/rooms/executive-2.jpg",
    ],
    amenities: [
      "King-size bed",
      "Sitting area with writing desk",
      "Walk-in rain shower",
      "Double vanity bathroom",
      "Minibar & coffee station",
      "49\" smart TV",
      "High-speed Wi-Fi",
      "Air conditioning",
      "In-room safe",
      "Turndown service",
    ],
    icons: [Wifi, Tv, Coffee, Wind],
  },
  {
    slug: "family-suite",
    name: "Family Suite",
    tagline: "Spacious comfort designed for families",
    description:
      "Our Family Suite offers generous interconnected spaces perfect for families travelling together. With a master bedroom, a second room with twin beds, and a shared lounge area, the suite accommodates up to 4 guests in comfortable style.",
    price: 240,
    capacity: 4,
    size: "75 m²",
    bedType: "King + Twin",
    images: ["/images/rooms/family-1.jpg", "/images/rooms/family-2.jpg"],
    amenities: [
      "Master king bedroom",
      "Second room with twin beds",
      "Shared lounge area",
      "Two en suite bathrooms",
      "Children's amenity kit",
      "Smart TV in each room",
      "High-speed Wi-Fi",
      "Air conditioning",
      "Minibar",
    ],
    icons: [Wifi, Tv, Coffee, Wind],
  },
  {
    slug: "garden-chalet",
    name: "Garden Chalet",
    tagline: "Nestled in nature, beautifully private",
    description:
      "Our Garden Chalets are standalone units set within the estate's lush gardens, offering a private and peaceful retreat. Each chalet features a verandah with garden views, a king-size bed, and a well-appointed bathroom.",
    price: 180,
    capacity: 2,
    size: "45 m²",
    bedType: "King",
    images: ["/images/rooms/garden-1.jpg", "/images/rooms/garden-2.jpg"],
    amenities: [
      "King-size bed",
      "Private verandah",
      "Garden views",
      "En suite shower",
      "Coffee station",
      "Smart TV",
      "High-speed Wi-Fi",
      "Ceiling fan & A/C",
    ],
    icons: [Wifi, Tv, Coffee, Wind],
  },
  {
    slug: "pool-chalet",
    name: "Pool Chalet",
    tagline: "Wake up steps from the water",
    description:
      "Pool Chalets are our most sought-after accommodation for those who love easy access to the pool. These beautiful units open directly onto the pool terrace, offering a seamless indoor-outdoor living experience.",
    price: 200,
    capacity: 2,
    size: "50 m²",
    bedType: "King",
    images: ["/images/rooms/pool-1.jpg", "/images/rooms/pool-2.jpg"],
    amenities: [
      "King-size bed",
      "Direct pool access",
      "Private terrace",
      "En suite shower",
      "Coffee & tea station",
      "Smart TV",
      "High-speed Wi-Fi",
      "Air conditioning",
    ],
    icons: [Wifi, Tv, Coffee, Wind, Waves],
  },
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    tagline: "Comfortable luxury for every budget",
    description:
      "Our Deluxe Rooms offer the quality and comfort Chapungu Estates is known for, at an accessible price point. Each room is tastefully furnished with warm, earthy décor and features a queen bed and well-equipped en suite bathroom.",
    price: 120,
    capacity: 2,
    size: "30 m²",
    bedType: "Queen",
    images: ["/images/rooms/deluxe-1.jpg"],
    amenities: [
      "Queen-size bed",
      "En suite bathroom",
      "Smart TV",
      "High-speed Wi-Fi",
      "Air conditioning",
      "Tea & coffee station",
      "In-room safe",
    ],
    icons: [Wifi, Tv, Coffee, Wind],
  },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return { title: "Room Not Found" };
  return {
    title: room.name,
    description: room.description,
  };
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) notFound();

  const others = rooms.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[65vh] bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 to-stone-950/70" />
        <div className="grain-overlay" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <p className="section-label text-gold/80 mb-4">Accommodation</p>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-4">{room.name}</h1>
          <p className="text-stone-300 text-lg max-w-xl">{room.tagline}</p>
          <p className="mt-6 text-3xl font-display text-gold">
            <span className="text-lg text-stone-400">from </span>${room.price}
            <span className="text-base text-stone-400">/night</span>
          </p>
        </div>
      </section>

      {/* Quick stats bar */}
      <div className="bg-stone-950 text-white">
        <div className="container-site">
          <div className="grid grid-cols-3 divide-x divide-stone-800 py-4">
            {[
              { icon: Users, label: "Guests", value: `Up to ${room.capacity}` },
              { icon: Maximize2, label: "Room Size", value: room.size },
              { icon: BedDouble, label: "Bed Type", value: room.bedType },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 px-6 py-1">
                <stat.icon className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-xs text-stone-500 tracking-wide">{stat.label}</p>
                  <p className="text-sm font-medium">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="container-site grid lg:grid-cols-3 gap-16">
          {/* Left: description + amenities */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="section-label text-gold mb-4">Overview</p>
              <p className="text-stone-600 leading-relaxed text-lg">{room.description}</p>
            </div>

            <div>
              <h2 className="font-display text-3xl mb-6">Room Amenities</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {room.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3 text-stone-700">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-sm">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-stone-50 rounded-2xl p-8">
              <h3 className="font-display text-2xl mb-5">Policies</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-stone-600">
                {[
                  ["Check-in", "From 14:00"],
                  ["Check-out", "By 10:00"],
                  ["Cancellation", "48 hours notice"],
                  ["Pets", "Not permitted"],
                  ["Smoking", "Non-smoking rooms"],
                  ["Children", "Welcome (under 5 free)"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b border-stone-200 pb-3">
                    <span className="text-stone-500">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 card-luxury p-8">
              <p className="font-display text-3xl mb-1">${room.price}</p>
              <p className="text-stone-500 text-sm mb-6">per night, per room</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5 tracking-wide uppercase">Check-in</label>
                  <input type="date" className="input-luxury w-full" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5 tracking-wide uppercase">Check-out</label>
                  <input type="date" className="input-luxury w-full" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5 tracking-wide uppercase">Guests</label>
                  <select className="input-luxury w-full">
                    {Array.from({ length: room.capacity }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
                <Link href="/contact?type=booking" className="btn-gold w-full text-center block mt-2">
                  Request Booking
                </Link>
                <a
                  href="https://wa.me/263772123456"
                  className="btn-outline-gold w-full text-center block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book via WhatsApp
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-stone-200 text-center">
                <p className="text-xs text-stone-500">Free cancellation up to 48 hours before check-in</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other rooms */}
      <section className="py-20 bg-stone-50">
        <div className="container-site">
          <h2 className="font-display text-3xl mb-10">Other Accommodation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {others.map((r) => (
              <Link key={r.slug} href={`/accommodation/${r.slug}`} className="card-luxury group overflow-hidden">
                <div className="h-48 bg-stone-200 relative overflow-hidden">
                  <Image
                    src={r.images[0]}
                    alt={r.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl mb-1">{r.name}</h3>
                  <p className="text-stone-500 text-sm mb-3">{r.tagline}</p>
                  <p className="text-gold font-semibold">${r.price}<span className="text-stone-400 text-xs font-normal">/night</span></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
