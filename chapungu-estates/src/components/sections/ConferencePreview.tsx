import Image from "next/image";
import Link from "next/link";
import { Monitor, Wifi, Coffee, Users, ChevronRight } from "lucide-react";

const features = [
  { icon: Monitor, label: "AV Equipment", desc: "HD projectors, sound system, video conferencing" },
  { icon: Wifi, label: "High-Speed WiFi", desc: "Dedicated business-grade fibre connectivity" },
  { icon: Coffee, label: "Catering", desc: "Full catering packages, tea breaks & meals" },
  { icon: Users, label: "Flexible Layouts", desc: "Theatre, boardroom, classroom & banquet styles" },
];

export function ConferencePreview() {
  return (
    <section className="py-24 lg:py-32 bg-earth-950" aria-labelledby="conference-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-white">
            <div className="section-label text-brand-400 mb-4">Conferences & Corporate</div>
            <h2 id="conference-heading" className="font-display text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
              Where Business
              <span className="block italic text-brand-300">Gets Done</span>
            </h2>
            <p className="font-body text-earth-300 leading-relaxed mb-10 text-lg">
              From intimate boardroom meetings to large-scale conferences, our professional 
              facilities and dedicated events team ensure your corporate event exceeds expectations.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              {features.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="space-y-2">
                  <Icon className="w-5 h-5 text-brand-400" aria-hidden="true" />
                  <div className="font-body text-sm font-semibold text-white">{label}</div>
                  <div className="font-body text-xs text-earth-400 leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/conferences" className="btn-gold">View Facilities</Link>
              <Link href="/conferences#quote" className="inline-flex items-center gap-2 font-body text-sm text-brand-400 hover:text-brand-300 transition-colors font-medium">
                Request a Quote <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1582192730841-2a682d7375f9?w=800&q=80"
              alt="Professional conference room at Chapungu Estates Norton"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-charcoal/80 backdrop-blur-sm p-4 border-l-2 border-brand-500">
              <div className="font-body text-white text-sm font-semibold">Up to 200 delegates</div>
              <div className="font-body text-earth-400 text-xs mt-1">Multiple room configurations available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
