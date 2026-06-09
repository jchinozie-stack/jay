import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Phone, MapPin } from "lucide-react";
import { RestaurantReservationForm } from "@/components/forms/RestaurantReservationForm";

export const metadata: Metadata = {
  title: "Restaurant & Grill in Norton Zimbabwe | Chapungu Estates",
  description: "Dine at Chapungu Grill in Norton, Zimbabwe. Charcoal-grilled meats, breakfast menus, and sides. Customised menus for events.",
  keywords: ["restaurant Norton Zimbabwe", "grill Norton", "braai Norton Zimbabwe", "Chapungu Grill"],
  alternates: { canonical: "/restaurant" },
};

// ── BREAKFAST PACKAGES ──────────────────────────────────────────────────────
const breakfastOptions = [
  {
    option: "Option 1",
    price: 5,
    items: [
      "Chicken liver",
      "2 eggs (boiled, scrambled or fried)",
      "1 piece sausage",
      "Fresh milk",
      "Bread (toast optional)",
      "Margarine",
      "Tea / Coffee",
    ],
  },
  {
    option: "Option 2",
    price: 7,
    items: [
      "Chicken liver",
      "2 eggs (boiled, scrambled or fried)",
      "1 piece sausage",
      "Fresh milk",
      "Cereals (Cornflakes / Cerevita)",
      "Bread (toast optional)",
      "Tea / Coffee",
    ],
  },
  {
    option: "Option 3",
    price: 10,
    items: [
      "Chicken liver",
      "2 eggs (boiled, scrambled or fried)",
      "Sausage",
      "Fresh milk",
      "Cereals (Cornflakes / Cerevita)",
      "Bread",
      "Tea / Coffee",
      "Juice",
      "Fruits",
    ],
  },
];

// ── GRILL MENU ───────────────────────────────────────────────────────────────
const grillMeat = [
  { name: "Full Chicken", price: "7", unit: "" },
  { name: "Half Chicken", price: "4", unit: "" },
  { name: "Quarter Chicken", price: "2", unit: "" },
  { name: "Beef Steak", price: "6", unit: "/Kg" },
  { name: "Beef Sausage", price: "6", unit: "/Kg" },
  { name: "Pork", price: "6", unit: "/Kg" },
];

const sides = [
  { name: "Plain Chips", price: "1" },
  { name: "Rice", price: "1" },
  { name: "Sadza", price: "1" },
  { name: "Green Salad", price: "0.50" },
];

const hours = [
  { day: "Breakfast", time: "7:00 AM – 10:30 AM" },
  { day: "Lunch", time: "12:00 PM – 3:00 PM" },
  { day: "Dinner", time: "6:00 PM – 10:00 PM" },
  { day: "Grill", time: "12:00 PM – 9:00 PM" },
];

export default function RestaurantPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1920&q=80"
          alt="Chapungu Grill charcoal meats"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/90" />
        <div className="absolute inset-0 flex items-end container-site pb-16">
          <div>
            <div className="section-label text-brand-300 mb-2">Restaurant &amp; Grill</div>
            <h1 className="font-display text-6xl text-white font-light">
              Chapungu
              <span className="block italic text-brand-300">Grill</span>
            </h1>
            <p className="font-body text-earth-300 mt-3 max-w-md">
              All our meats are freshly prepared and charcoal grilled for that rich, smoky flavour.
            </p>
          </div>
        </div>
      </div>

      {/* Hours Bar */}
      <div className="bg-charcoal">
        <div className="container-site py-5">
          <div className="flex flex-wrap gap-6 md:gap-12">
            {hours.map(({ day, time }) => (
              <div key={day} className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-400" />
                <span className="font-body text-xs text-earth-400">
                  <span className="text-white font-medium">{day}:</span> {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BREAKFAST ─────────────────────────────────────────────────── */}
      <div id="breakfast" className="bg-cream py-16">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Breakfast</div>
            <h2 className="section-title">Chapungu Grill Breakfast</h2>
            <p className="font-body text-earth-500 text-sm mt-2">Choose a package — all prices in USD.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {breakfastOptions.map((opt) => (
              <div
                key={opt.option}
                className={"card-luxury p-8 flex flex-col " + (opt.price === 10 ? "border-brand-400 border-2" : "")}
              >
                {opt.price === 10 && (
                  <div className="bg-brand-500 text-white font-body text-xs font-semibold px-3 py-1 self-start mb-4 tracking-wide">
                    Best Value
                  </div>
                )}
                <div className="font-display text-xl text-charcoal mb-1">{opt.option}</div>
                <div className="font-display text-5xl text-brand-600 font-light mb-6">${opt.price}</div>
                <ul className="space-y-2 flex-1">
                  {opt.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-body text-sm text-earth-600">
                      <span className="text-brand-500 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="#reservations" className="btn-gold mt-8 text-center text-sm py-3">
                  Book Breakfast
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GRILL FOOD MENU ───────────────────────────────────────────── */}
      <div id="menu" className="bg-earth-950 py-16">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="section-label text-brand-400 mb-3">Food Menu</div>
            <h2 className="font-display text-4xl text-white font-light">Grill &amp; Sides</h2>
            <p className="font-body text-earth-400 text-sm mt-2">
              Charcoal grilled · Freshly prepared · All prices in USD
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* MEAT */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🔥</span>
                <h3 className="font-display text-3xl text-white">Meat</h3>
                <div className="flex-1 h-px bg-earth-800" />
              </div>
              <div className="space-y-3">
                {grillMeat.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center p-4 bg-earth-900 border border-earth-800"
                  >
                    <span className="font-display text-lg text-white">{item.name}</span>
                    <span className="font-display text-xl text-brand-400 whitespace-nowrap">
                      ${item.price}{item.unit}
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-body text-xs text-earth-500 mt-4">
                Customised menus available for special events — contact us to discuss.
              </p>
            </div>

            {/* SIDES + DRINKS */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🍟</span>
                  <h3 className="font-display text-3xl text-white">Sides</h3>
                  <div className="flex-1 h-px bg-earth-800" />
                </div>
                <div className="space-y-3">
                  {sides.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between items-center p-4 bg-earth-900 border border-earth-800"
                    >
                      <span className="font-display text-lg text-white">{item.name}</span>
                      <span className="font-display text-xl text-brand-400">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🥤</span>
                  <h3 className="font-display text-3xl text-white">Drinks</h3>
                  <div className="flex-1 h-px bg-earth-800" />
                </div>
                <div className="p-6 bg-earth-900 border border-earth-800 text-center">
                  <div className="font-display text-3xl text-brand-400 mb-2">$0.50 – $2.00</div>
                  <div className="font-body text-sm text-earth-400">
                    Wide selection of soft drinks, juices &amp; water
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTACT / LOCATION ────────────────────────────────────────── */}
      <div className="bg-brand-600 py-10">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-display text-2xl text-white font-light mb-2">Come eat with us</p>
              <p className="font-body text-sm text-brand-100">
                Customised menus available for weddings, conferences &amp; special events.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white" />
                <a href="tel:+263780114318" className="font-body text-sm text-white hover:underline">
                  0780 114 318 · 0788 734 125
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-white" />
                <span className="font-body text-sm text-white">
                  Plot 1201, RG Mugabe Highway (Murombedzi Rd), Norton
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RESERVATIONS ──────────────────────────────────────────────── */}
      <div id="reservations" className="bg-cream py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="section-label mb-3">Reservations</div>
              <h2 className="section-title mb-6">Reserve Your Table</h2>
              <p className="font-body text-earth-600 leading-relaxed mb-8">
                We recommend booking ahead, especially for weekends and special occasions.
                Walk-ins are welcome subject to availability.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-brand-500 mt-0.5" />
                  <div>
                    <div className="font-body font-semibold text-charcoal text-sm">By Phone</div>
                    <a href="tel:+263780114318" className="font-body text-sm text-earth-600 hover:text-brand-600 transition-colors">
                      +263 78 011 4318
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-brand-500 mt-0.5" />
                  <div>
                    <div className="font-body font-semibold text-charcoal text-sm">In Person</div>
                    <div className="font-body text-sm text-earth-600">Reception is open 24/7</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <RestaurantReservationForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
