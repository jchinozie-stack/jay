import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const footerLinks = {
  explore: [
    { name: "Accommodation", href: "/accommodation" },
    { name: "Restaurant & Braai", href: "/restaurant" },
    { name: "Weddings", href: "/weddings" },
    { name: "Conferences", href: "/conferences" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
  ],
  services: [
    { name: "Butchery", href: "/butchery" },
    { name: "Grocery Store", href: "/butchery#grocery" },
    { name: "Family Recreation", href: "/events#family" },
    { name: "Corporate Packages", href: "/conferences#packages" },
    { name: "Wedding Packages", href: "/weddings#packages" },
  ],
  info: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Book Now", href: "/accommodation" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-earth-300" role="contentinfo">
      {/* Main Footer */}
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <div className="font-display text-3xl font-semibold text-white">Chapungu</div>
              <div className="font-body text-[10px] tracking-[0.3em] uppercase text-brand-400 font-medium">
                Estates
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed text-earth-400">
              A premium hospitality and lifestyle destination nestled in Norton, Zimbabwe. 
              Where African warmth meets refined elegance.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/ChapunguEstates"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-earth-700 text-earth-400 hover:text-white hover:border-brand-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/ChapunguEstates"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-earth-700 text-earth-400 hover:text-white hover:border-brand-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/ChapunguEstates"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-earth-700 text-earth-400 hover:text-white hover:border-brand-500 transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/2637123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-earth-700 text-earth-400 hover:text-white hover:border-brand-500 transition-colors"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-brand-400 mb-6">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-earth-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-brand-400 mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-earth-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-brand-400 mb-6">
              Find Us
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <div className="font-body text-sm text-earth-400 leading-relaxed">
                  Chapungu Estates<br />
                  Norton, Mashonaland West<br />
                  Zimbabwe
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Phone className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <div className="font-body text-sm text-earth-400 space-y-1">
                  <a href="tel:+2637123456789" className="hover:text-white transition-colors block">
                    +263 71 234 5678
                  </a>
                  <a href="tel:+2638612345678" className="hover:text-white transition-colors block">
                    +263 86 1234 5678
                  </a>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a
                  href="mailto:info@chapunguEstates.co.zw"
                  className="font-body text-sm text-earth-400 hover:text-white transition-colors"
                >
                  info@chapunguEstates.co.zw
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Clock className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <div className="font-body text-sm text-earth-400">
                  <div>Reception: 24/7</div>
                  <div>Restaurant: 7am – 10pm</div>
                  <div>Butchery: Mon–Sat 8am – 6pm</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Gold Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-700 to-transparent" />

      {/* Bottom Bar */}
      <div className="container-site py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs text-earth-600">
          © {new Date().getFullYear()} Chapungu Estates. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="font-body text-xs text-earth-600 hover:text-earth-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="font-body text-xs text-earth-600 hover:text-earth-400 transition-colors">
            Terms
          </Link>
          <span className="font-body text-xs text-earth-700">
            Norton, Zimbabwe
          </span>
        </div>
      </div>
    </footer>
  );
}
