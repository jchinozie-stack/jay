import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bed, Users, Wifi } from "lucide-react";

const rooms = [
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    category: "Suite",
    price: 280,
    beds: "1 King Bed",
    guests: 2,
    size: "72m²",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    amenities: ["Private Balcony", "Lounge", "Jacuzzi"],
    href: "/accommodation/presidential-suite",
  },
  {
    id: "garden-chalet",
    name: "Garden Chalet",
    category: "Chalet",
    price: 180,
    beds: "1 King Bed",
    guests: 2,
    size: "48m²",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    amenities: ["Garden View", "Patio", "Mini Bar"],
    href: "/accommodation/garden-chalet",
  },
  {
    id: "family-suite",
    name: "Family Suite",
    category: "Suite",
    price: 220,
    beds: "2 Queen Beds",
    guests: 4,
    size: "65m²",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    amenities: ["Lounge Area", "Kids Zone", "Pool View"],
    href: "/accommodation/family-suite",
  },
];

export function AccommodationPreview() {
  return (
    <section id="accommodation" className="py-24 lg:py-32 bg-cream" aria-labelledby="accommodation-heading">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-label mb-3">Accommodation</div>
            <h2 id="accommodation-heading" className="section-title">
              Rest in African
              <span className="block italic text-brand-500">Splendour</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="font-body text-earth-600 leading-relaxed mb-4">
              From intimate chalets to opulent suites, every room is designed 
              for comfort, elegance, and an authentic Zimbabwean experience.
            </p>
            <Link href="/accommodation" className="inline-flex items-center gap-2 font-body text-sm text-brand-600 font-medium hover:text-brand-700 transition-colors">
              View All Rooms
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {rooms.map((room, index) => (
            <article
              key={room.id}
              className={`card-luxury group overflow-hidden ${index === 1 ? "md:mt-8" : ""}`}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={room.image}
                  alt={`${room.name} at Chapungu Estates`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="font-body text-xs font-semibold tracking-[0.15em] uppercase bg-brand-500 text-white px-3 py-1">
                    {room.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="font-display text-white text-3xl font-light">
                    ${room.price}
                    <span className="font-body text-sm text-white/70 ml-1">/ night</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl text-charcoal mb-3 group-hover:text-brand-600 transition-colors">
                  {room.name}
                </h3>

                {/* Room Details */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-500">
                    <Bed className="w-3.5 h-3.5" aria-hidden="true" />
                    {room.beds}
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-500">
                    <Users className="w-3.5 h-3.5" aria-hidden="true" />
                    Up to {room.guests}
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-500">
                    <Wifi className="w-3.5 h-3.5" aria-hidden="true" />
                    Free WiFi
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="font-body text-xs text-earth-600 bg-earth-50 border border-earth-100 px-2.5 py-1"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <Link
                    href={room.href}
                    className="flex-1 btn-gold text-center justify-center text-xs py-2.5"
                  >
                    Book Now
                  </Link>
                  <Link
                    href={room.href}
                    className="flex-1 btn-outline-gold text-center justify-center text-xs py-2.5"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
