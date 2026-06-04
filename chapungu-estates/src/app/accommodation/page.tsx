import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bed, Users, Wifi, Wind, Coffee, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Accommodation in Norton Zimbabwe | Rooms & Suites",
  description:
    "Book luxury rooms, suites, and chalets at Chapungu Estates in Norton, Zimbabwe. All rooms include free WiFi, air conditioning, and access to estate facilities. Best rate guaranteed.",
  keywords: ["accommodation Norton Zimbabwe", "lodges Norton", "hotel Norton Zimbabwe", "chalets Norton"],
  alternates: { canonical: "/accommodation" },
  openGraph: {
    title: "Accommodation | Chapungu Estates Norton Zimbabwe",
    description: "Luxury rooms and suites in the heart of Norton, Zimbabwe.",
    images: [{ url: "/images/accommodation-og.jpg", width: 1200, height: 630 }],
  },
};

const rooms = [
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    category: "Suite",
    price: 280,
    beds: "1 King Bed",
    maxGuests: 2,
    size: "72m²",
    view: "Garden & Pool",
    description:
      "Our most prestigious accommodation, the Presidential Suite is a haven of refined luxury. Featuring a separate lounge, private jacuzzi, and panoramic views of the estate gardens.",
    amenities: ["Private Jacuzzi", "Separate Lounge", "Private Balcony", "Mini Bar", "Coffee Station", "Smart TV", "Premium Toiletries", "Nespresso Machine"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80",
    ],
    featured: true,
    href: "/accommodation/presidential-suite",
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    category: "Suite",
    price: 220,
    beds: "1 King Bed",
    maxGuests: 2,
    size: "58m²",
    view: "Garden",
    description:
      "Refined elegance in a spacious suite perfect for business travelers or romantic getaways. The Executive Suite features a dedicated work desk, lounge area, and luxury bath.",
    amenities: ["Lounge Area", "Work Desk", "Bathtub & Shower", "Mini Bar", "Smart TV", "Robes & Slippers", "Coffee Station"],
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=900&q=85",
    gallery: [],
    featured: false,
    href: "/accommodation/executive-suite",
  },
  {
    id: "family-suite",
    name: "Family Suite",
    category: "Suite",
    price: 240,
    beds: "1 King + 2 Single Beds",
    maxGuests: 4,
    size: "65m²",
    view: "Garden",
    description:
      "Designed for families who refuse to compromise on comfort. Two interconnected rooms with a shared lounge area, ideal for families with children or groups of friends.",
    amenities: ["Interconnected Rooms", "Family Lounge", "Kids Welcome Pack", "Smart TV", "Mini Bar", "Air Conditioning"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=85",
    gallery: [],
    featured: false,
    href: "/accommodation/family-suite",
  },
  {
    id: "garden-chalet",
    name: "Garden Chalet",
    category: "Chalet",
    price: 180,
    beds: "1 King Bed",
    maxGuests: 2,
    size: "48m²",
    view: "Private Garden",
    description:
      "A private sanctuary nestled among indigenous gardens. Each chalet features a private patio, outdoor seating, and a direct connection to nature that creates an authentic bush-lodge feel.",
    amenities: ["Private Patio", "Garden View", "Mini Bar", "Outdoor Seating", "Smart TV", "Air Conditioning", "Tea & Coffee"],
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=85",
    gallery: [],
    featured: true,
    href: "/accommodation/garden-chalet",
  },
  {
    id: "pool-chalet",
    name: "Pool-View Chalet",
    category: "Chalet",
    price: 200,
    beds: "1 King Bed",
    maxGuests: 2,
    size: "52m²",
    view: "Swimming Pool",
    description:
      "Wake up to shimmering pool views from your private terrace. The Pool-View Chalet combines comfort and convenience with direct access to the estate's swimming pool.",
    amenities: ["Pool View Terrace", "Pool Access", "Mini Bar", "Smart TV", "Air Conditioning", "Outdoor Shower"],
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=85",
    gallery: [],
    featured: false,
    href: "/accommodation/pool-chalet",
  },
  {
    id: "standard-deluxe",
    name: "Deluxe Room",
    category: "Standard",
    price: 120,
    beds: "1 Queen Bed",
    maxGuests: 2,
    size: "32m²",
    view: "Estate Grounds",
    description:
      "Our Deluxe Rooms offer an accessible entry point to the Chapungu experience without compromising on quality. Comfortable, stylish, and well-equipped for a great stay.",
    amenities: ["Queen Bed", "Ensuite Bathroom", "Smart TV", "Air Conditioning", "Tea & Coffee", "Free WiFi"],
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=85",
    gallery: [],
    featured: false,
    href: "/accommodation/deluxe-room",
  },
];

const categoryColors: Record<string, string> = {
  Suite: "bg-brand-500",
  Chalet: "bg-forest-600",
  Standard: "bg-earth-600",
};

const faq = [
  {
    q: "What is the check-in and check-out time?",
    a: "Check-in is from 2:00 PM. Check-out is by 11:00 AM. Early check-in and late check-out can be arranged subject to availability — please enquire at booking.",
  },
  {
    q: "Is breakfast included?",
    a: "Bed & Breakfast packages are available on request. Our restaurant serves a full African and continental breakfast from 7:00 AM.",
  },
  {
    q: "Do you allow pets?",
    a: "We are not a pet-friendly property, with the exception of registered service animals. Please contact us prior to arrival.",
  },
  {
    q: "Is there parking available?",
    a: "Yes, complimentary secure parking is available for all guests on the estate grounds.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept USD cash, RTGS, EcoCash, and major credit cards (Visa, Mastercard). Payment is required at check-in.",
  },
];

export default function AccommodationPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="relative h-72 md:h-96 bg-charcoal overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="Chapungu Estates accommodation"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-end container-site pb-12">
          <div>
            <div className="section-label text-brand-300 mb-2">Accommodation</div>
            <h1 className="font-display text-5xl md:text-6xl text-white font-light">
              Rooms & Suites
            </h1>
          </div>
        </div>
      </div>

      {/* Intro + Booking Bar */}
      <div className="bg-cream border-b border-earth-100">
        <div className="container-site py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="font-body text-earth-600 max-w-xl">
              {rooms.length} room types — from intimate chalets to lavish suites. 
              All rooms include free WiFi, air conditioning, and access to estate facilities.
            </p>
            <div className="flex gap-3 flex-wrap">
              {["All", "Suites", "Chalets", "Standard"].map((cat) => (
                <button
                  key={cat}
                  className="font-body text-xs font-medium px-4 py-2 border border-earth-200 hover:border-brand-400 hover:text-brand-600 transition-colors"
                  aria-label={`Filter by ${cat}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Room Listings */}
      <div className="container-site py-16 space-y-12">
        {rooms.map((room, index) => (
          <article
            key={room.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-0 card-luxury overflow-hidden ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
            aria-label={room.name}
          >
            {/* Image */}
            <div className={`relative h-64 lg:h-auto min-h-72 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <Image
                src={room.image}
                alt={`${room.name} at Chapungu Estates`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {room.featured && (
                <div className="absolute top-4 left-4 bg-brand-500 text-white font-body text-xs font-semibold px-3 py-1 tracking-wide">
                  Popular Choice
                </div>
              )}
              <div className={`absolute top-4 ${room.featured ? "left-32" : "left-4"}`}>
                <span className={`font-body text-xs text-white font-semibold px-3 py-1 ${categoryColors[room.category]}`}>
                  {room.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className={`p-8 lg:p-10 flex flex-col justify-between ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h2 className="font-display text-3xl text-charcoal">{room.name}</h2>
                  <div className="text-right">
                    <div className="font-display text-3xl text-brand-600 font-light">
                      ${room.price}
                    </div>
                    <div className="font-body text-xs text-earth-500">per night</div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-earth-100">
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-600">
                    <Bed className="w-3.5 h-3.5 text-brand-500" />
                    {room.beds}
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-600">
                    <Users className="w-3.5 h-3.5 text-brand-500" />
                    Up to {room.maxGuests} guests
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-600">
                    <Wifi className="w-3.5 h-3.5 text-brand-500" />
                    Free WiFi
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-600">
                    <Wind className="w-3.5 h-3.5 text-brand-500" />
                    Air Conditioned
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-xs text-earth-600">
                    <Coffee className="w-3.5 h-3.5 text-brand-500" />
                    Tea & Coffee
                  </span>
                </div>

                <p className="font-body text-sm text-earth-600 leading-relaxed mb-6">
                  {room.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities.slice(0, 6).map((a) => (
                    <span key={a} className="font-body text-xs bg-earth-50 border border-earth-100 text-earth-600 px-2.5 py-1">
                      {a}
                    </span>
                  ))}
                  {room.amenities.length > 6 && (
                    <span className="font-body text-xs text-brand-500 px-2.5 py-1">
                      +{room.amenities.length - 6} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link href={room.href} className="flex-1 btn-gold text-center justify-center text-sm py-3">
                  Book This Room
                </Link>
                <Link
                  href={room.href}
                  className="flex items-center gap-1 font-body text-sm text-earth-600 hover:text-brand-600 transition-colors font-medium px-4"
                >
                  Details
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Amenities Overview */}
      <div className="bg-earth-950 py-16">
        <div className="container-site text-center">
          <div className="section-label text-brand-400 mb-3">All Rooms Include</div>
          <h2 className="font-display text-4xl text-white font-light mb-12">
            Estate-Wide Amenities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Free High-Speed WiFi",
              "Swimming Pool Access",
              "Restaurant & Bar",
              "24/7 Reception",
              "Secure Parking",
              "Daily Housekeeping",
              "Laundry Service",
              "Airport Transfers",
            ].map((a) => (
              <div key={a} className="text-center p-4 border border-earth-800">
                <span className="font-body text-sm text-earth-300">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container-site py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-3">FAQ</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <details key={q} className="group border border-earth-100 bg-white">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-display text-lg text-charcoal">
                  {q}
                  <ChevronRight className="w-5 h-5 text-brand-500 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="font-body text-sm text-earth-600 leading-relaxed">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
