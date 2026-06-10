import Link from "next/link";
import Image from "next/image";

const packages = [
  {
    name: "The Romantic Escape",
    for: "Couples",
    image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=85",
    price: "from $160",
    duration: "2 nights",
    emoji: "💑",
    highlights: [
      "Deluxe Room · 2 nights",
      "Breakfast both mornings",
      "Candlelit dinner for two",
      "Garden walk at sunset",
      "Late checkout included",
    ],
    href: "/contact",
    accent: "bg-brand-500",
  },
  {
    name: "The Family Retreat",
    for: "Families",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=85",
    price: "from $200",
    duration: "2 nights",
    emoji: "👨‍👩‍👧‍👦",
    highlights: [
      "Standard Twin Room · 2 nights",
      "Breakfast for the family",
      "2× Grill dinners",
      "Playground & estate access",
      "Memories that last a lifetime",
    ],
    href: "/contact",
    accent: "bg-earth-700",
    featured: true,
  },
  {
    name: "The Corporate Retreat",
    for: "Teams",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=85",
    price: "from $120 pp",
    duration: "1–3 days",
    emoji: "💼",
    highlights: [
      "Group accommodation",
      "Conference facilities",
      "All meals included",
      "Team dinner nightly",
      "Customised to your needs",
    ],
    href: "/conferences",
    accent: "bg-charcoal",
  },
  {
    name: "The Wedding Weekend",
    for: "Weddings",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85",
    price: "Custom quote",
    duration: "Full weekend",
    emoji: "💍",
    highlights: [
      "Exclusive venue hire",
      "Catering for all guests",
      "Accommodation for wedding party",
      "Garden & tent setup",
      "Dedicated coordinator",
    ],
    href: "/weddings",
    accent: "bg-brand-700",
  },
];

export function ExperiencePackages() {
  return (
    <section className="py-32 lg:py-40 bg-earth-50" aria-labelledby="packages-heading">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="section-label mb-4">Curated Experiences</div>
          <h2 id="packages-heading" className="font-display text-5xl lg:text-6xl text-charcoal font-light leading-tight">
            We&apos;ve Thought of
            <span className="block italic text-brand-500"> Everything</span>
          </h2>
          <p className="font-body text-earth-600 mt-6 text-lg leading-relaxed">
            Each package is crafted to take the guesswork out of planning. All that&apos;s left for you to do is arrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <article key={pkg.name} className={`group relative overflow-hidden ${pkg.featured ? "ring-2 ring-brand-500" : ""}`}>
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`font-body text-xs font-semibold tracking-[0.15em] uppercase ${pkg.accent} text-white px-3 py-1.5`}>
                    {pkg.for}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 text-right">
                  <div className="font-display text-2xl text-white">{pkg.price}</div>
                  <div className="font-body text-xs text-white/60">{pkg.duration}</div>
                </div>
                <div className="absolute bottom-4 left-4 text-3xl">{pkg.emoji}</div>
              </div>

              <div className="bg-white p-8">
                <h3 className="font-display text-2xl text-charcoal mb-5">{pkg.name}</h3>
                <ul className="space-y-2 mb-8">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 font-body text-sm text-earth-600">
                      <span className="text-brand-500 mt-0.5 shrink-0">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <Link href={pkg.href} className="btn-gold w-full text-center justify-center text-sm py-3">
                  {pkg.name === "The Wedding Weekend" ? "Request a Quote" : "Book This Package"}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center font-body text-sm text-earth-500 mt-8">
          All packages are flexible — contact us and we&apos;ll tailor everything to your exact needs.
        </p>
      </div>
    </section>
  );
}
