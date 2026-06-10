import Image from "next/image";
import Link from "next/link";

export function OurStory() {
  return (
    <section id="story" className="py-32 lg:py-40 bg-earth-950 overflow-hidden" aria-labelledby="story-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          <div className="relative h-[600px] lg:h-[700px] order-2 lg:order-1">
            <div className="absolute top-0 left-0 w-4/5 h-4/5 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=85"
                alt="Chapungu Estates grounds — African landscape at golden hour"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-3/5 overflow-hidden border-4 border-earth-950">
              <Image
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=85"
                alt="Chapungu Estates — serene outdoor dining"
                fill
                className="object-cover"
                sizes="30vw"
              />
            </div>
            <div className="absolute bottom-12 left-8 bg-brand-500 p-6 text-white">
              <div className="font-display text-5xl font-light leading-none">10+</div>
              <div className="font-body text-xs tracking-[0.2em] uppercase mt-1 text-brand-100">Years of Hospitality</div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="section-label text-brand-400 mb-4">Our Story</div>
            <h2 id="story-heading" className="font-display text-5xl lg:text-6xl text-white font-light leading-tight mb-8">
              Born from a Love
              <span className="block italic text-brand-300">of Zimbabwe</span>
            </h2>

            <div className="space-y-6 font-body text-earth-300 leading-relaxed text-base">
              <p>
                Chapungu Estates was born from a simple but powerful belief: that Zimbabwe deserves a world-class hospitality experience that is authentically, unapologetically its own.
              </p>
              <p>
                Set on a beautiful estate in Norton — just 40 minutes from Harare — we created a sanctuary where the warmth of Zimbabwean culture meets the refinement of luxury hospitality. A place where guests don&apos;t just stay, they belong.
              </p>
              <p>
                Every room, every meal, every event at Chapungu is designed with one intention: to leave you with memories that linger long after you&apos;ve gone home.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-earth-800">
              {[
                { value: "10+", label: "Years serving Zimbabwe" },
                { value: "500+", label: "Weddings celebrated" },
                { value: "4.9★", label: "Guest satisfaction" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display text-3xl text-white font-light">{value}</div>
                  <div className="font-body text-xs text-earth-500 mt-1 leading-snug">{label}</div>
                </div>
              ))}
            </div>

            <Link href="/contact" className="inline-flex items-center gap-3 mt-12 font-body text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors group">
              <span className="tracking-wide">Get in touch with our team</span>
              <div className="h-px w-8 bg-brand-400 group-hover:w-12 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
