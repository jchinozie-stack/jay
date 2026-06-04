import type { Metadata } from "next";
import Image from "next/image";
import { Monitor, Wifi, Coffee, Printer, Mic, Car } from "lucide-react";
import { ConferenceQuoteForm } from "@/components/forms/ConferenceQuoteForm";

export const metadata: Metadata = {
  title: "Conference Venues in Norton Zimbabwe | Chapungu Estates",
  description:
    "Professional conference and meeting facilities at Chapungu Estates in Norton, Zimbabwe. Up to 200 delegates, full AV setup, catering, and breakout rooms. Request a quote today.",
  keywords: ["conference venues Norton Zimbabwe", "meeting rooms Norton", "corporate events Zimbabwe", "conference facilities Norton"],
  alternates: { canonical: "/conferences" },
};

const rooms = [
  {
    name: "The Boardroom",
    capacity: 20,
    style: "Boardroom",
    size: "45m²",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80",
    features: ["Large boardroom table", "4K display screen", "Video conferencing", "Whiteboard", "Natural lighting"],
  },
  {
    name: "Savannah Suite",
    capacity: 80,
    style: "Theatre / Classroom / Banquet",
    size: "120m²",
    image: "https://images.unsplash.com/photo-1582192730841-2a682d7375f9?w=700&q=80",
    features: ["Stage & podium", "Full AV system", "Retractable seating", "Climate control", "Breakout area"],
  },
  {
    name: "The Great Hall",
    capacity: 200,
    style: "Theatre / Gala / Exhibition",
    size: "380m²",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=700&q=80",
    features: ["Full production AV", "Stage lighting", "Exhibition space", "Private cloakroom", "Pre-function area"],
  },
];

const equipment = [
  { icon: Monitor, label: "HD Projectors" },
  { icon: Mic, label: "Sound System" },
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Printer, label: "Printing & Copying" },
  { icon: Coffee, label: "Tea & Coffee Station" },
  { icon: Car, label: "Secure Parking" },
];

const packages = [
  {
    name: "Half Day",
    duration: "4 hours",
    price: "From $350",
    includes: ["Room hire", "AV equipment", "Tea/coffee break", "Water & stationery"],
  },
  {
    name: "Full Day",
    duration: "8 hours",
    price: "From $650",
    includes: ["Room hire", "AV equipment", "Morning & afternoon tea", "Working lunch", "Water & stationery"],
  },
  {
    name: "Residential",
    duration: "1–3 nights",
    price: "From $1,200/delegate",
    includes: ["Room hire", "AV equipment", "All meals", "Accommodation", "Evening dinner", "Team building activity"],
  },
];

export default function ConferencesPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1582192730841-2a682d7375f9?w=1920&q=80"
          alt="Professional conference facilities at Chapungu Estates"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 to-charcoal/85" />
        <div className="absolute inset-0 flex items-end container-site pb-14">
          <div>
            <div className="section-label text-brand-300 mb-2">Conferences & Corporate</div>
            <h1 className="font-display text-5xl md:text-6xl text-white font-light">
              Where Business
              <span className="block italic text-brand-300">Gets Done</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Meeting Rooms */}
      <div className="bg-cream py-20">
        <div className="container-site">
          <div className="text-center mb-16">
            <div className="section-label mb-3">Facilities</div>
            <h2 className="section-title">Our Conference Venues</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div key={room.name} className="card-luxury overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <Image src={room.image} alt={`${room.name} conference room at Chapungu Estates`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-charcoal mb-2">{room.name}</h3>
                  <div className="flex gap-3 mb-4">
                    <span className="font-body text-xs bg-brand-50 text-brand-700 px-2.5 py-1 border border-brand-100">{room.capacity} delegates</span>
                    <span className="font-body text-xs bg-earth-50 text-earth-600 px-2.5 py-1 border border-earth-100">{room.size}</span>
                  </div>
                  <div className="font-body text-xs text-earth-500 mb-4">{room.style}</div>
                  <ul className="space-y-1.5">
                    {room.features.map((f) => (
                      <li key={f} className="font-body text-xs text-earth-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-400 rounded-full shrink-0" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment */}
      <div className="bg-charcoal py-16">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="section-label text-brand-400 mb-3">Equipment</div>
            <h2 className="font-display text-4xl text-white font-light">
              Everything You Need,
              <span className="italic text-brand-300"> All Included</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {equipment.map(({ icon: Icon, label }) => (
              <div key={label} className="text-center p-4 border border-earth-800 hover:border-brand-600 transition-colors">
                <Icon className="w-6 h-6 text-brand-400 mx-auto mb-3" aria-hidden="true" />
                <div className="font-body text-xs text-earth-300">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="bg-cream py-20">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Packages</div>
            <h2 className="section-title">Conference Packages</h2>
            <p className="font-body text-earth-500 text-sm mt-2">Packages based on Savannah Suite. Request a quote for custom configurations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.name} className="card-luxury p-8">
                <div className="font-display text-2xl text-charcoal mb-1">{pkg.name}</div>
                <div className="font-body text-xs text-earth-500 mb-3">{pkg.duration}</div>
                <div className="font-display text-3xl text-brand-600 font-light mb-6">{pkg.price}</div>
                <ul className="space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="font-body text-xs text-earth-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-400 rounded-full mt-1.5 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Form */}
      <div id="quote" className="bg-earth-50 py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="section-label mb-3">Request a Quote</div>
              <h2 className="section-title mb-6">
                Plan Your
                <span className="italic text-brand-500"> Corporate Event</span>
              </h2>
              <p className="font-body text-earth-600 leading-relaxed mb-6">
                Tell us about your event and our corporate events team will prepare 
                a tailored proposal within 24 hours.
              </p>
              <div className="bg-white border border-earth-100 p-5">
                <div className="font-body text-sm font-semibold text-charcoal">Events Manager</div>
                <div className="font-body text-sm text-earth-600 mt-1">Solomon Chisoro</div>
                <a href="tel:+2637123456780" className="font-body text-sm text-brand-600 hover:text-brand-700 transition-colors block mt-1">+263 71 234 5680</a>
                <a href="mailto:conferences@chapunguEstates.co.zw" className="font-body text-sm text-brand-600 hover:text-brand-700 transition-colors block mt-1">conferences@chapunguEstates.co.zw</a>
              </div>
            </div>
            <div className="lg:col-span-3">
              <ConferenceQuoteForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
