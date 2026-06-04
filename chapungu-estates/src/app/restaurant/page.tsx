import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Phone, MapPin } from "lucide-react";
import { RestaurantReservationForm } from "@/components/forms/RestaurantReservationForm";

export const metadata: Metadata = {
  title: "Restaurant & Braai in Norton Zimbabwe | Chapungu Estates",
  description:
    "Dine at Chapungu Estates restaurant in Norton, Zimbabwe. Authentic Zimbabwean cuisine, wood-fired braai, and fine dining. Reserve your table today.",
  keywords: ["restaurants in Norton Zimbabwe", "braai Norton", "dining Norton Zimbabwe", "restaurant Norton"],
  alternates: { canonical: "/restaurant" },
};

const menuCategories = [
  {
    name: "Breakfast",
    icon: "🌅",
    items: [
      { name: "Full African Breakfast", description: "Eggs, sadza fritters, boerewors, tomatoes, mushrooms", price: 12 },
      { name: "Continental Basket", description: "Freshly baked pastries, yoghurt, seasonal fruit, juice", price: 9 },
      { name: "Omelette Station", description: "Made-to-order with your choice of fillings", price: 10 },
      { name: "Chapungu Pancakes", description: "Fluffy pancakes with syrup, cream, and fresh berries", price: 8 },
    ],
  },
  {
    name: "Starters",
    icon: "🥗",
    items: [
      { name: "Biltong Board", description: "Sliced game biltong with chutneys and pickles", price: 14 },
      { name: "Muriwo Soup", description: "Traditional leafy greens soup with fresh cream", price: 8 },
      { name: "Prawn Peri-Peri", description: "Grilled prawns in house peri-peri sauce, served with crusty bread", price: 18 },
      { name: "Caprese Salad", description: "Buffalo mozzarella, heirloom tomatoes, fresh basil, aged balsamic", price: 11 },
    ],
  },
  {
    name: "Mains",
    icon: "🍽️",
    items: [
      { name: "Beef Tenderloin", description: "250g grass-fed tenderloin, served with garlic mash and seasonal veg", price: 32 },
      { name: "Nyama Choma Platter", description: "Mixed grill of short ribs, chicken, and boerewors with pap and chakalaka", price: 28 },
      { name: "Nile Perch", description: "Pan-fried Nile perch with lemon butter, jasmine rice, and greens", price: 24 },
      { name: "Sadza & Oxtail", description: "Slow-braised oxtail stew served with traditional sadza", price: 22 },
      { name: "Chicken Muamba", description: "Traditional palm nut chicken stew with steamed rice", price: 20 },
      { name: "Vegetable Curry", description: "Fragrant coconut vegetable curry with basmati rice (V)", price: 16 },
    ],
  },
  {
    name: "Braai Specialties",
    icon: "🔥",
    items: [
      { name: "T-Bone Steak 400g", description: "Dry-aged on the bone, grilled over hardwood, with chimichurri", price: 38 },
      { name: "Boerewors Supreme", description: "500g coiled wors, pap, tomato relish, and caramelised onions", price: 18 },
      { name: "Braai Chicken Half", description: "Marinated half chicken slow-grilled to perfection", price: 16 },
      { name: "Pork Ribs Rack", description: "Full rack baby back ribs, honey-glaze, coleslaw, and fries", price: 34 },
    ],
  },
  {
    name: "Desserts",
    icon: "🍮",
    items: [
      { name: "Malva Pudding", description: "Classic South African sticky pudding with vanilla custard", price: 8 },
      { name: "Chocolate Fondant", description: "Warm dark chocolate fondant, vanilla ice cream", price: 10 },
      { name: "Seasonal Fruit Plate", description: "Selection of fresh tropical fruits with sorbet (V)", price: 7 },
    ],
  },
];

const hours = [
  { day: "Breakfast", time: "7:00 AM – 10:30 AM" },
  { day: "Lunch", time: "12:00 PM – 3:00 PM" },
  { day: "Dinner", time: "6:00 PM – 10:00 PM" },
  { day: "Braai", time: "12:00 PM – 9:00 PM" },
];

export default function RestaurantPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          alt="Chapungu Estates restaurant dining room"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/80" />
        <div className="absolute inset-0 flex items-end container-site pb-16">
          <div>
            <div className="section-label text-brand-300 mb-2">Restaurant & Braai</div>
            <h1 className="font-display text-6xl text-white font-light">
              Flavours of
              <span className="block italic text-brand-300">Zimbabwe</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
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

      {/* Intro */}
      <div className="bg-cream py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-3">Our Story</div>
              <h2 className="section-title mb-6">
                A Celebration of
                <span className="italic text-brand-500"> African Cuisine</span>
              </h2>
              <p className="font-body text-earth-600 leading-relaxed mb-4">
                At Chapungu Estates, food is more than sustenance — it&apos;s culture, 
                community, and celebration. Our executive chef draws on decades of 
                experience to craft menus that honour Zimbabwe&apos;s rich culinary heritage 
                while embracing contemporary technique.
              </p>
              <p className="font-body text-earth-600 leading-relaxed mb-6">
                We source ingredients locally wherever possible — our butchery supplies 
                premium cuts, local farmers provide fresh produce, and traditional recipes 
                inspire every dish.
              </p>
              <Link href="#reservations" className="btn-gold">Reserve a Table</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80"
                alt="Grilled meats at Chapungu Estates"
                width={400}
                height={300}
                className="object-cover w-full h-48"
              />
              <Image
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80"
                alt="Traditional Zimbabwean dishes"
                width={400}
                height={300}
                className="object-cover w-full h-48 mt-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div id="menu" className="bg-earth-50 py-16">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Menu</div>
            <h2 className="section-title">What&apos;s On the Table</h2>
            <p className="font-body text-earth-500 text-sm mt-2">All prices in USD. Menu subject to seasonal changes.</p>
          </div>

          <div className="space-y-12">
            {menuCategories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
                  <h3 className="font-display text-3xl text-charcoal">{cat.name}</h3>
                  <div className="flex-1 h-px bg-earth-200" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex justify-between gap-4 p-4 bg-white border border-earth-100">
                      <div>
                        <div className="font-display text-lg text-charcoal">{item.name}</div>
                        <div className="font-body text-xs text-earth-500 mt-1">{item.description}</div>
                      </div>
                      <div className="font-display text-xl text-brand-600 whitespace-nowrap">${item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Braai Experience */}
      <div id="braai" className="bg-charcoal grain-overlay py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80"
                alt="Traditional wood-fired braai at Chapungu Estates"
                width={800}
                height={600}
                className="w-full object-cover"
              />
            </div>
            <div className="text-white">
              <div className="section-label text-brand-400 mb-3">The Braai Experience</div>
              <h2 className="font-display text-5xl text-white font-light mb-6">
                Wood-Fired
                <span className="block italic text-brand-300">Perfection</span>
              </h2>
              <p className="font-body text-earth-300 leading-relaxed mb-6">
                Nothing connects people quite like gathering around a fire. Our braai 
                is more than a meal — it&apos;s an event. We use hardwood fires to slow-cook 
                premium cuts from our own butchery, creating flavours that define 
                the Zimbabwean outdoor experience.
              </p>
              <p className="font-body text-earth-300 leading-relaxed mb-8">
                Available daily from noon, our braai masters are on hand to guide you 
                through cuts, marinades, and the art of the perfect braai.
              </p>
              <Link href="#reservations" className="btn-gold">Book Braai Experience</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Reservations */}
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
                    <a href="tel:+2637123456789" className="font-body text-sm text-earth-600 hover:text-brand-600 transition-colors">+263 71 234 5678</a>
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
