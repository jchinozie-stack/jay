import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PartyPopper, Cake, Users, Music, UtensilsCrossed, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Host memorable events at Chapungu Estates — birthday celebrations, corporate functions, family gatherings, and private parties in Norton, Zimbabwe.",
};

const eventTypes = [
  {
    icon: Cake,
    title: "Birthday Celebrations",
    description:
      "Mark milestone birthdays in style. From intimate family gatherings to lavish parties, we handle every detail — décor, catering, cake, and entertainment.",
    features: ["Custom décor & theming", "Dedicated events coordinator", "Full catering packages", "Entertainment options"],
    capacity: "10 – 500 guests",
    image: "/images/events/birthday.jpg",
  },
  {
    icon: Users,
    title: "Family Reunions",
    description:
      "Bring the whole family together in the serene beauty of Chapungu Estates. Enjoy our grounds, pool, and restaurant while we accommodate all generations.",
    features: ["Group accommodation rates", "Family activity planning", "Children's entertainment", "Braai & outdoor dining"],
    capacity: "20 – 300 guests",
    image: "/images/events/reunion.jpg",
  },
  {
    icon: PartyPopper,
    title: "Private Parties",
    description:
      "Celebrate life's special moments — anniversaries, graduations, retirement parties, and more. Our team crafts bespoke experiences for every occasion.",
    features: ["Exclusive venue hire", "Custom menu design", "Bar & beverage packages", "Live music coordination"],
    capacity: "20 – 500 guests",
    image: "/images/events/private.jpg",
  },
  {
    icon: UtensilsCrossed,
    title: "Gala Dinners",
    description:
      "Impress your guests with an elegant gala dinner under the African sky. Our restaurant team delivers world-class cuisine in a breathtaking setting.",
    features: ["Multi-course menu design", "Wine & cocktail pairing", "Themed table settings", "Awards ceremony support"],
    capacity: "50 – 400 guests",
    image: "/images/events/gala.jpg",
  },
  {
    icon: Music,
    title: "Cultural & Entertainment Events",
    description:
      "Host concerts, cultural showcases, art exhibitions, and entertainment events on our expansive grounds or in our versatile indoor venues.",
    features: ["Large outdoor grounds", "Sound & lighting support", "Stage setup", "Vendor coordination"],
    capacity: "100 – 1,000+ guests",
    image: "/images/events/entertainment.jpg",
  },
  {
    icon: Camera,
    title: "Photoshoots & Film",
    description:
      "Our estate's natural beauty and elegant architecture make it a stunning backdrop for photography, film productions, and content creation.",
    features: ["Multiple scenic locations", "Flexible booking", "Facility access", "Professional liaison"],
    capacity: "Any size",
    image: "/images/events/photo.jpg",
  },
];

const packages = [
  {
    name: "Essentials",
    price: "From $500",
    description: "Perfect for small gatherings and intimate celebrations",
    includes: [
      "Venue hire (4 hours)",
      "Basic décor setup",
      "Catering for up to 30 guests",
      "Welcome drinks",
      "Dedicated event host",
    ],
  },
  {
    name: "Signature",
    price: "From $1,500",
    popular: true,
    description: "Our most popular package for mid-size events",
    includes: [
      "Venue hire (8 hours)",
      "Premium themed décor",
      "3-course dinner for up to 100 guests",
      "Cocktail hour",
      "Bar package (4 hours)",
      "Dedicated events team",
      "Sound system",
    ],
  },
  {
    name: "Grand Estate",
    price: "From $4,000",
    description: "Full-service luxury events for large celebrations",
    includes: [
      "Full estate exclusive hire",
      "Bespoke event design",
      "5-course gourmet dinner",
      "Unlimited drinks package",
      "Live entertainment",
      "Professional photography",
      "Full events management team",
      "Overnight accommodation (10 rooms)",
    ],
  },
];

export default function EventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/30 to-stone-950/80" />
        <div className="grain-overlay" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <p className="section-label text-gold/80 mb-4">Celebrations & Gatherings</p>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-6">
            Events at Chapungu
          </h1>
          <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From intimate birthdays to grand galas — we create experiences that are talked about for years
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="container-site max-w-3xl text-center">
          <p className="section-label text-gold mb-4">Why Choose Chapungu</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Every Event, Perfectly Executed
          </h2>
          <p className="text-stone-600 leading-relaxed text-lg">
            At Chapungu Estates, we understand that every event is unique. Our experienced events team works closely with you to understand your vision and bring it to life — combining our beautiful venue, exceptional catering, and meticulous attention to detail.
          </p>
        </div>
      </section>

      {/* Event types */}
      <section className="py-20 bg-stone-50">
        <div className="container-site">
          <div className="text-center mb-16">
            <p className="section-label text-gold mb-4">What We Host</p>
            <h2 className="font-display text-4xl md:text-5xl">Event Types</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventTypes.map((event) => (
              <div key={event.title} className="card-luxury p-8 group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <event.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-2xl mb-3">{event.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-5">{event.description}</p>
                <ul className="space-y-2 mb-5">
                  {event.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-stone-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-stone-100">
                  <p className="text-xs text-stone-400 tracking-widest uppercase">Capacity</p>
                  <p className="text-sm font-medium text-stone-700 mt-1">{event.capacity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 bg-stone-950">
        <div className="container-site">
          <div className="text-center mb-16">
            <p className="section-label text-gold/80 mb-4">Transparent Pricing</p>
            <h2 className="font-display text-4xl md:text-5xl text-white">Event Packages</h2>
            <p className="text-stone-400 mt-4 max-w-xl mx-auto">
              All packages are fully customisable. Contact us for a tailored quote.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-8 border ${
                  pkg.popular
                    ? "bg-gradient-to-b from-gold/20 to-stone-900 border-gold/40"
                    : "bg-stone-900 border-stone-800"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gold text-stone-950 text-xs font-semibold px-4 py-1 rounded-full tracking-widest uppercase">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="font-display text-2xl text-white mb-1">{pkg.name}</h3>
                <p className="text-2xl font-semibold text-gold mb-2">{pkg.price}</p>
                <p className="text-stone-400 text-sm mb-6">{pkg.description}</p>
                <ul className="space-y-3">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-stone-300">
                      <span className="text-gold mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact?type=event"
                  className={`block text-center mt-8 py-3 px-6 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                    pkg.popular
                      ? "bg-gold text-stone-950 hover:bg-gold/90"
                      : "border border-stone-600 text-stone-200 hover:border-gold hover:text-gold"
                  }`}
                >
                  Get a Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container-site max-w-2xl">
          <p className="section-label text-gold mb-4">Let's Plan Together</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">Ready to Start Planning?</h2>
          <p className="text-stone-600 mb-10 leading-relaxed">
            Our dedicated events team is here to guide you from concept to execution. Reach out today for a complimentary consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?type=event" className="btn-gold">
              Get in Touch
            </Link>
            <a
              href="https://wa.me/263772123456?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20hosting%20an%20event%20at%20Chapungu%20Estates"
              className="btn-outline-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
