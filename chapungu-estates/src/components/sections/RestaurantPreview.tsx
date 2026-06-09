import Image from "next/image";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed, Flame } from "lucide-react";

export function RestaurantPreview() {
  return (
    <section className="py-24 lg:py-32 bg-charcoal grain-overlay overflow-hidden" aria-labelledby="restaurant-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <div className="section-label text-brand-400 mb-4">Restaurant & Braai</div>
            <h2 id="restaurant-heading" className="font-display text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
              Flavours of
              <span className="block italic text-brand-300">Zimbabwe</span>
            </h2>
            <p className="font-body text-earth-300 leading-relaxed mb-8 text-lg">
              Our kitchen celebrates the rich tapestry of Zimbabwean cuisine — from
              traditional slow-braised meats to contemporary African fusion. Every dish
              tells a story, every meal creates a memory.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="border-l-2 border-brand-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <UtensilsCrossed className="w-4 h-4 text-brand-400" />
                  <span className="font-body text-sm font-semibold text-white tracking-wide">Restaurant</span>
                </div>
                <p className="font-body text-xs text-earth-400">Fine dining, family meals, and everything in between. Open daily 7am–10pm.</p>
              </div>
              <div className="border-l-2 border-brand-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-brand-400" />
                  <span className="font-body text-sm font-semibold text-white tracking-wide">Braai & Grill</span>
                </div>
                <p className="font-body text-xs text-earth-400">Authentic wood-fired grilling with the finest cuts from our own butchery.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/restaurant" className="btn-gold">View Menu</Link>
              <Link href="/restaurant#reservations" className="btn-outline-gold border-white/30 text-white hover:bg-white/10">
                Reserve a Table
              </Link>
            </div>
          </div>

          <div className="relative h-[500px] lg:h-[600px]">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 overflow-hidden">
              <Image
                src="/images/TIN05190.jpg"
                alt="Chapungu Grill chef at the charcoal grill"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 60vw, 30vw"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 overflow-hidden border-4 border-charcoal">
              <Image
                src="/images/TIN05178 (1).jpg"
                alt="Freshly grilled chicken at Chapungu Grill"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="absolute bottom-8 right-8 bg-brand-500 p-4 text-white font-body text-center">
              <div className="text-3xl font-display font-light">50+</div>
              <div className="text-xs tracking-[0.15em] uppercase mt-1">Menu Items</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
