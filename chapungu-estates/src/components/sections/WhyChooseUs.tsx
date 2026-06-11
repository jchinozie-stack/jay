import Image from "next/image";
import { Heart, MapPin, Award } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const pillars = [
  {
    icon: Heart,
    title: "Authentic Hospitality",
    tags: ["Family Warmth", "24/7 Service", "Zimbabwean Soul", "Gated & Secure"],
    body: "Service that feels like family. Our team carries the warmth of Zimbabwe into every welcome, every meal, every detail of your stay.",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    tags: ["40 Min from Harare", "Norton Lakeside", "Natural Setting", "Easy Access"],
    body: "Peacefully removed from the city yet effortlessly reachable — set among indigenous gardens just off the Bulawayo Road.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    tags: ["Fine Dining", "Estate Butchery", "Luxury Linen", "Event-Ready"],
    body: "From thread counts to table settings, every aspect of the estate is held to a single standard: would we offer this to our own family?",
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-charcoal"
      aria-labelledby="why-heading"
    >
      {/* Full-bleed estate backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/TIN05061 (2).jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/55" />
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-20 pt-28 pb-12 flex flex-col min-h-screen">
        {/* Header */}
        <div className="mb-auto">
          <Reveal>
            <p className="text-sm font-body text-white/80 mb-6">// Why Chapungu</p>
            <h2
              id="why-heading"
              className="font-display italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-tight"
            >
              Hospitality
              <br />
              elevated
            </h2>
          </Reveal>
        </div>

        {/* Glass pillar cards */}
        <Stagger
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          interval={0.12}
        >
          {pillars.map(({ icon: Icon, title, tags, body }) => (
            <StaggerItem key={title}>
              <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col h-full">
                <div className="flex items-start justify-between gap-4">
                  <span className="liquid-glass rounded-[0.75rem] w-11 h-11 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </span>
                  <span className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </div>

                <div className="flex-1" />

                <div className="mt-6">
                  <h3 className="font-display italic text-white text-3xl md:text-4xl tracking-tight leading-none">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                    {body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
