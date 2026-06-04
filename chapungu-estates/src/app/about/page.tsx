import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Chapungu Estates — our vision, values, and commitment to delivering exceptional African hospitality in Norton, Zimbabwe.",
};

const values = [
  {
    title: "African Excellence",
    description:
      "We draw inspiration from the richness of African culture, nature, and tradition — infusing it into every experience we craft for our guests.",
  },
  {
    title: "Warm Hospitality",
    description:
      "Every guest is welcomed as family. Our team is trained to anticipate needs, attend to details, and create moments of genuine warmth.",
  },
  {
    title: "Sustainability",
    description:
      "We are committed to responsible stewardship of our land and environment — sourcing locally, minimising waste, and conserving our natural surroundings.",
  },
  {
    title: "Community",
    description:
      "Chapungu Estates is deeply rooted in the Norton community. We employ locally, support local suppliers, and invest in community development.",
  },
];

const team = [
  {
    name: "Tendai Moyo",
    role: "General Manager",
    bio: "With 15 years in Zimbabwe's hospitality industry, Tendai leads the estate's operations with passion and precision.",
  },
  {
    name: "Grace Chikwanda",
    role: "Head of Events",
    bio: "Grace brings creativity and meticulous planning to every wedding, conference, and celebration hosted at the estate.",
  },
  {
    name: "Chef Blessing Ncube",
    role: "Executive Chef",
    bio: "Chef Blessing's culinary philosophy blends traditional Zimbabwean flavours with contemporary international techniques.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-stone-950 overflow-hidden">
        <div className="grain-overlay" />
        <div className="relative z-10 container-site text-center text-white">
          <p className="section-label text-gold/80 mb-4">Our Story</p>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-6">
            About Chapungu Estates
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A sanctuary of luxury and warmth, set against the timeless beauty of the Zimbabwean landscape
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-24 bg-white">
        <div className="container-site grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label text-gold mb-4">How It Began</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              Born from a Love of<br />African Hospitality
            </h2>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                Chapungu Estates was founded over a decade ago with a simple but powerful vision: to create a world-class hospitality destination that celebrates the beauty, culture, and warmth of Zimbabwe.
              </p>
              <p>
                Named after the Chapungu — the majestic Bateleur eagle that holds deep significance in Zimbabwean culture and history — our estate embodies the strength, grace, and spirit of this iconic bird.
              </p>
              <p>
                Set on expansive grounds just off the Harare–Bulawayo Road in Norton, we have grown from a small guesthouse into a full-service hospitality estate offering accommodation, fine dining, event venues, a butchery, and grocery store.
              </p>
              <p>
                Today, Chapungu Estates is proud to serve hundreds of guests each year — from travellers seeking a peaceful retreat to couples celebrating the most important day of their lives.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] relative bg-stone-200">
              <Image
                src="/images/about/estate-aerial.jpg"
                alt="Chapungu Estates aerial view"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-stone-950 text-white rounded-xl p-6 shadow-xl">
              <p className="text-3xl font-display text-gold font-semibold">10+</p>
              <p className="text-stone-400 text-sm tracking-wide mt-1">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-stone-50">
        <div className="container-site">
          <div className="text-center mb-16">
            <p className="section-label text-gold mb-4">What Drives Us</p>
            <h2 className="font-display text-4xl md:text-5xl">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={value.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                  <span className="font-display text-gold text-xl font-semibold">{i + 1}</span>
                </div>
                <h3 className="font-display text-xl mb-3">{value.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="container-site">
          <div className="text-center mb-16">
            <p className="section-label text-gold mb-4">The People Behind the Magic</p>
            <h2 className="font-display text-4xl md:text-5xl">Meet Our Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-28 h-28 rounded-full bg-stone-200 mx-auto mb-5 overflow-hidden relative">
                  <Image
                    src={`/images/team/${member.name.toLowerCase().replace(" ", "-")}.jpg`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display text-xl mb-1">{member.name}</h3>
                <p className="text-gold text-sm tracking-wide mb-3">{member.role}</p>
                <p className="text-stone-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-stone-950">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Guests Monthly" },
              { value: "4.9★", label: "Average Rating" },
              { value: "200+", label: "Weddings Hosted" },
              { value: "10+", label: "Years in Operation" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl md:text-5xl text-gold font-semibold">{stat.value}</p>
                <p className="text-stone-400 text-sm tracking-widest uppercase mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container-site max-w-2xl">
          <p className="section-label text-gold mb-4">Experience It Yourself</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">Come Stay With Us</h2>
          <p className="text-stone-600 mb-10 leading-relaxed">
            Words can only go so far. The true magic of Chapungu Estates is something you have to experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/accommodation" className="btn-gold">Book a Stay</Link>
            <Link href="/contact" className="btn-outline-gold">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
