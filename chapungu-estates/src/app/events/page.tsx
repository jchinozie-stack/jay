import type { Metadata } from "next";
import Link from "next/link";
import { Cake, Users, PartyPopper, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Events | Chapungu Estates Norton Zimbabwe",
  description: "Host birthday parties, weddings, and workshops at Chapungu Estates in Norton, Zimbabwe. Venue, decor, and catering packages available.",
};

// ── PRICING DATA ────────────────────────────────────────────────────────────

const birthdayPricing = [
  { guests: 25, price: 150 },
  { guests: 50, price: 200 },
  { guests: 100, price: 300 },
];

const weddingPricing = [
  { guests: 75, price: 550 },
  { guests: 100, price: 750 },
  { guests: 150, price: 950 },
  { guests: 200, price: 1350 },
];

const eventTypes = [
  {
    icon: Cake,
    title: "Birthday Parties",
    description: "Mark milestone birthdays in style. Venue and decor included. Packages start from $150 for 25 guests.",
    features: ["Venue hire", "Decor included", "Flexible catering options", "Any age milestone"],
  },
  {
    icon: PartyPopper,
    title: "Weddings",
    description: "Your dream wedding at Chapungu Estates. Venue and decor included in all packages from $550.",
    features: ["Venue hire", "Decor included", "Flexible catering options", "Dedicated coordinator"],
  },
  {
    icon: BookOpen,
    title: "Workshops",
    description: "Professional workshop space with venue, decor, and lunch. Simple per-person pricing at $10 per head.",
    features: ["Venue hire", "Decor included", "Lunch included", "Projector & equipment"],
  },
  {
    icon: Users,
    title: "Other Events",
    description: "Corporate functions, family reunions, gala dinners, graduations and more. Contact us for a custom quote.",
    features: ["Flexible venue options", "Custom catering", "Decor & theming", "Events team support"],
  },
];

export default function EventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 to-charcoal/90" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <p className="section-label text-brand-300 mb-4">Celebrations & Gatherings</p>
          <h1 className="font-display text-5xl md:text-6xl font-light mb-4">Events at Chapungu</h1>
          <p className="text-earth-300 text-lg max-w-xl mx-auto">
            Birthday parties, weddings, workshops and more - all with venue and decor included.
          </p>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 bg-cream">
        <div className="container-site">
          <div className="text-center mb-14">
            <div className="section-label mb-3">What We Host</div>
            <h2 className="section-title">Events We Cater For</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((event) => (
              <div key={event.title} className="card-luxury p-8 group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                  <event.icon className="w-6 h-6 text-brand-500" />
                </div>
                <h3 className="font-display text-xl mb-3 text-charcoal">{event.title}</h3>
                <p className="text-earth-600 text-sm leading-relaxed mb-4">{event.description}</p>
                <ul className="space-y-2">
                  {event.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-earth-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-earth-950">
        <div className="container-site">
          <div className="text-center mb-16">
            <div className="section-label text-brand-400 mb-3">Transparent Pricing</div>
            <h2 className="font-display text-4xl text-white font-light">Event Packages</h2>
            <p className="text-earth-400 mt-3 max-w-xl mx-auto text-sm">
              All packages include venue and decor. These are basic fees - extras available at additional cost.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {/* BIRTHDAY */}
            <div className="bg-earth-900 border border-earth-800 p-8">
              <div className="flex items-center gap-3 mb-2">
                <Cake className="w-6 h-6 text-brand-400" />
                <h3 className="font-display text-2xl text-white">Birthday Party</h3>
              </div>
              <p className="text-earth-400 text-sm mb-6">Venue and decor included</p>
              <div className="space-y-3 mb-6">
                {birthdayPricing.map((tier) => (
                  <div key={tier.guests} className="flex justify-between items-center py-3 border-b border-earth-800">
                    <span className="font-body text-earth-300 text-sm">{tier.guests} people</span>
                    <span className="font-display text-xl text-brand-400">{"$"}{tier.price}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact?type=birthday" className="block text-center py-3 px-6 border border-earth-600 text-earth-200 hover:border-brand-400 hover:text-brand-400 text-sm font-medium transition-colors">
                Get a Quote
              </Link>
            </div>

            {/* WEDDING */}
            <div className="bg-gradient-to-b from-brand-900/30 to-earth-900 border border-brand-700/40 p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-brand-500 text-white text-xs font-semibold px-4 py-1 tracking-widest uppercase">
                  Most Popular
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <PartyPopper className="w-6 h-6 text-brand-400" />
                <h3 className="font-display text-2xl text-white">Wedding</h3>
              </div>
              <p className="text-earth-400 text-sm mb-6">Venue and decor included</p>
              <div className="space-y-3 mb-6">
                {weddingPricing.map((tier) => (
                  <div key={tier.guests} className="flex justify-between items-center py-3 border-b border-earth-800">
                    <span className="font-body text-earth-300 text-sm">{tier.guests} people</span>
                    <span className="font-display text-xl text-brand-400">{"$"}{tier.price}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact?type=wedding" className="block text-center py-3 px-6 bg-brand-500 text-white hover:bg-brand-600 text-sm font-medium transition-colors">
                Get a Quote
              </Link>
            </div>

            {/* WORKSHOP */}
            <div className="bg-earth-900 border border-earth-800 p-8">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-brand-400" />
                <h3 className="font-display text-2xl text-white">Workshop</h3>
              </div>
              <p className="text-earth-400 text-sm mb-6">Venue, decor and lunch included</p>
              <div className="flex flex-col items-center justify-center py-10 border border-earth-800 mb-6">
                <div className="font-display text-6xl text-brand-400 font-light">{"$"}10</div>
                <div className="font-body text-earth-400 text-sm mt-2">per person</div>
              </div>
              <Link href="/contact?type=workshop" className="block text-center py-3 px-6 border border-earth-600 text-earth-200 hover:border-brand-400 hover:text-brand-400 text-sm font-medium transition-colors">
                Get a Quote
              </Link>
            </div>

          </div>

          {/* Disclaimer */}
          <p className="text-center text-earth-500 text-xs mt-10 max-w-lg mx-auto">
            Please note these are basic fees. Extras such as catering upgrades, entertainment, photography, and additional decor are available at an extra cost.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container-site max-w-2xl">
          <div className="section-label mb-3">Let's Plan Together</div>
          <h2 className="font-display text-4xl md:text-5xl mb-6">Ready to Start Planning?</h2>
          <p className="text-earth-600 mb-10 leading-relaxed">
            Our events team is here to help. Contact us for a personalised quote or to check availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?type=event" className="btn-gold">Get in Touch</Link>
            <a
              href="https://wa.me/263780114318?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20hosting%20an%20event%20at%20Chapungu%20Estates"
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
