import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Butchery & Grocery | Chapungu Estates Norton Zimbabwe",
  description:
    "Premium cuts of meat, fresh produce, and grocery staples at Chapungu Estates butchery in Norton, Zimbabwe. Open Monday to Saturday.",
  alternates: { canonical: "/butchery" },
};

const categories = [
  {
    name: "Premium Beef",
    items: [
      { name: "Beef Tenderloin", price: 12.50, unit: "per kg", description: "Prime cut, aged 21 days" },
      { name: "T-Bone Steak", price: 10.00, unit: "per kg", description: "Classic thick-cut steak" },
      { name: "Ribeye", price: 11.50, unit: "per kg", description: "Well-marbled, full flavour" },
      { name: "Beef Short Ribs", price: 7.50, unit: "per kg", description: "Ideal for slow braai" },
      { name: "Beef Mince", price: 5.00, unit: "per kg", description: "Fresh ground daily" },
      { name: "Brisket", price: 6.50, unit: "per kg", description: "Perfect for slow cooking" },
    ],
  },
  {
    name: "Pork",
    items: [
      { name: "Pork Chops", price: 6.00, unit: "per kg", description: "Thick-cut loin chops" },
      { name: "Baby Back Ribs", price: 8.00, unit: "per kg", description: "Tender and flavourful" },
      { name: "Boerewors", price: 7.00, unit: "per kg", description: "Traditional spiced sausage" },
      { name: "Pork Belly", price: 6.50, unit: "per kg", description: "Great for slow roasting" },
    ],
  },
  {
    name: "Poultry",
    items: [
      { name: "Whole Chicken", price: 8.00, unit: "each", description: "Free-range, fresh daily" },
      { name: "Chicken Breasts", price: 5.50, unit: "per kg", description: "Boneless, skinless" },
      { name: "Chicken Wings", price: 4.50, unit: "per kg", description: "Perfect for braai" },
      { name: "Turkey (seasonal)", price: 12.00, unit: "each", description: "Free-range whole bird" },
    ],
  },
  {
    name: "Game Meat",
    items: [
      { name: "Kudu Steak", price: 18.00, unit: "per kg", description: "Tender, lean game meat" },
      { name: "Impala Chops", price: 15.00, unit: "per kg", description: "Traditional Zimbabwean game" },
      { name: "Biltong (beef)", price: 20.00, unit: "per kg", description: "Air-dried, house seasoned" },
      { name: "Game Biltong", price: 25.00, unit: "per kg", description: "Mixed game, premium quality" },
    ],
  },
];

export default function ButcheryPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1920&q=80"
          alt="Chapungu Estates butchery — premium meats"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="absolute inset-0 flex items-end container-site pb-12">
          <div>
            <div className="section-label text-brand-300 mb-2">Butchery & Grocery</div>
            <h1 className="font-display text-5xl text-white font-light">
              Premium Cuts,
              <span className="block italic text-brand-300">Fresh Daily</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-brand-500">
        <div className="container-site py-4 flex flex-wrap gap-6">
          <div className="font-body text-white text-sm">
            <span className="font-semibold">Hours:</span> Mon–Sat 8:00 AM – 6:00 PM | Sun 9:00 AM – 1:00 PM
          </div>
          <div className="font-body text-white text-sm">
            <span className="font-semibold">Location:</span> Main Estate Entrance, Norton
          </div>
          <a href="tel:+2637123456789" className="font-body text-white text-sm font-semibold hover:text-brand-100 transition-colors ml-auto">
            Call to Order: +263 71 234 5678
          </a>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-cream py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="section-label mb-3">Our Butchery</div>
              <h2 className="section-title mb-6">
                Farm to Fork
                <span className="italic text-brand-500"> Excellence</span>
              </h2>
              <p className="font-body text-earth-600 leading-relaxed mb-4 text-lg">
                Chapungu Estates Butchery is the beating heart of our culinary operation. 
                We source premium beef, pork, poultry, and game meat from trusted local 
                farmers, ensuring quality, freshness, and ethical standards at every step.
              </p>
              <p className="font-body text-earth-600 leading-relaxed mb-6">
                Our master butcher has over 20 years of experience and can assist you in 
                selecting the perfect cuts for any occasion — whether you&apos;re hosting a 
                braai or stocking up for the week.
              </p>
              <div className="bg-brand-50 border-l-4 border-brand-500 p-4">
                <p className="font-body text-sm text-brand-800 font-medium">
                  🥩 Call ahead to reserve specific cuts or for bulk orders over 10kg
                </p>
              </div>
            </div>
            <div>
              <Image
                src="https://images.unsplash.com/photo-1588347785102-2944a739a52f?w=400&q=80"
                alt="Master butcher at Chapungu Estates"
                width={400}
                height={500}
                className="object-cover w-full h-72"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Catalog */}
      <div className="bg-earth-50 py-16">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Products</div>
            <h2 className="section-title">What We Offer</h2>
            <p className="font-body text-earth-500 text-sm mt-2">All prices in USD. Prices subject to market fluctuation. Call to confirm availability.</p>
          </div>

          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="font-display text-3xl text-charcoal">{cat.name}</h3>
                  <div className="flex-1 h-px bg-earth-200" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.items.map((item) => (
                    <div key={item.name} className="card-luxury p-5 flex justify-between items-start gap-4">
                      <div>
                        <div className="font-display text-lg text-charcoal">{item.name}</div>
                        <div className="font-body text-xs text-earth-500 mt-1">{item.description}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display text-xl text-brand-600">${item.price.toFixed(2)}</div>
                        <div className="font-body text-xs text-earth-400">{item.unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grocery section */}
      <div id="grocery" className="bg-cream py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-3">Grocery Store</div>
              <h2 className="section-title mb-4">
                Everyday
                <span className="italic text-brand-500"> Essentials</span>
              </h2>
              <p className="font-body text-earth-600 leading-relaxed mb-6">
                Adjacent to our butchery, the Chapungu Grocery Store stocks a curated 
                selection of everyday essentials — dry goods, condiments, beverages, 
                fresh produce, dairy, and locally sourced specialty items.
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {["Fresh Produce", "Dairy & Eggs", "Dry Goods & Grains", "Condiments & Sauces", "Cold Beverages", "Snacks & Confectionery", "Local Specialties", "Braai Supplies"].map((item) => (
                  <li key={item} className="font-body text-sm text-earth-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-400 rounded-full" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=80"
              alt="Fresh produce at Chapungu Estates grocery store"
              width={700}
              height={500}
              className="object-cover w-full h-80"
            />
          </div>
        </div>
      </div>
    </>
  );
}
