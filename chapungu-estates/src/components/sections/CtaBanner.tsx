import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" aria-label="Book your experience">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 to-transparent" />
      </div>

      <div className="relative z-10 container-site">
        <div className="max-w-2xl">
          <div className="section-label text-brand-300 mb-4">Begin Your Journey</div>
          <h2 className="font-display text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
            Ready to Experience
            <span className="block italic text-brand-300">Chapungu?</span>
          </h2>
          <p className="font-body text-white/80 text-lg leading-relaxed mb-10">
            Whether you&apos;re planning a romantic getaway, a dream wedding, a productive 
            conference, or simply a memorable family outing — we&apos;re ready to welcome you.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/accommodation" className="btn-gold">
              Book Accommodation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-white">
              Make an Enquiry
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 flex flex-wrap gap-6">
            {[
              { label: "Wedding Enquiry", href: "/weddings" },
              { label: "Conference Quote", href: "/conferences#quote" },
              { label: "Restaurant Booking", href: "/restaurant#reservations" },
              { label: "WhatsApp Us", href: "https://wa.me/2637123456789" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-body text-sm text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
