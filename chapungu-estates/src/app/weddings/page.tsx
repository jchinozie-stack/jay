import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { WeddingEnquiryForm } from "@/components/forms/WeddingEnquiryForm";

export const metadata: Metadata = {
  title: "Wedding Venues Zimbabwe | Weddings at Chapungu Estates Norton",
  description: "Create your dream wedding at Chapungu Estates in Norton, Zimbabwe. Venue and decor included. Packages from $550.",
  keywords: ["wedding venues Zimbabwe", "wedding venues Norton", "outdoor weddings Zimbabwe"],
  alternates: { canonical: "/weddings" },
};

const packages = [
  { name: "75 Guests", guests: "Up to 75", price: 550, featured: false,
    description: "A beautiful intimate wedding. Venue and decor included. Basic package - extras at additional cost.",
    includes: ["Venue hire", "Decor included", "Up to 75 guests"] },
  { name: "100 Guests", guests: "Up to 100", price: 750, featured: true,
    description: "Our most popular wedding package. Venue and decor included. Basic package - extras at additional cost.",
    includes: ["Venue hire", "Decor included", "Up to 100 guests"] },
  { name: "150 Guests", guests: "Up to 150", price: 950, featured: false,
    description: "A grand celebration for 150 guests. Venue and decor included. Basic package - extras at additional cost.",
    includes: ["Venue hire", "Decor included", "Up to 150 guests"] },
  { name: "200 Guests", guests: "Up to 200", price: 1350, featured: false,
    description: "The full Chapungu Estates wedding for 200 guests. Venue and decor included. Basic package - extras at additional cost.",
    includes: ["Venue hire", "Decor included", "Up to 200 guests"] },
];

const gallery = [
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", alt: "Outdoor ceremony" },
  { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80", alt: "Reception table setup" },
  { src: "https://images.unsplash.com/photo-1547765045-b6e1d9d4f12c?w=600&q=80", alt: "Wedding couple in garden" },
  { src: "https://images.unsplash.com/photo-1525243498357-b9d6c1e4b1b3?w=600&q=80", alt: "Bride and bridesmaids" },
];

export default function WeddingsPage() {
  return (
    <>
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80" alt="Wedding ceremony at Chapungu Estates" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 to-charcoal/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <div className="section-label text-brand-300 mb-3">Weddings</div>
            <h1 className="font-display text-6xl md:text-7xl text-white font-light leading-tight">Your Perfect<span className="block italic text-brand-300">Wedding Day</span></h1>
            <p className="font-body text-white/80 text-lg mt-4 max-w-xl mx-auto">Where love stories become timeless memories</p>
          </div>
        </div>
      </div>

      <div className="bg-cream py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="section-label mb-3">The Venue</div>
              <h2 className="section-title mb-6">A Setting as Beautiful as<span className="italic text-brand-500"> Your Love</span></h2>
              <p className="font-body text-earth-600 leading-relaxed mb-4 text-lg">Set within expansive grounds in the heart of Norton, Chapungu Estates provides a beautiful canvas for your wedding day.</p>
              <p className="font-body text-earth-600 leading-relaxed mb-8">All wedding packages include venue and decor. Contact us to discuss catering, entertainment, photography, and any extras to make your day perfect.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {gallery.map((img, i) => (
                <div key={i} className={"relative overflow-hidden " + (i === 0 ? "col-span-2 h-64" : "h-40")}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 400px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="packages" className="bg-earth-950 py-20">
        <div className="container-site">
          <div className="text-center mb-16">
            <div className="section-label text-brand-400 mb-3">Packages</div>
            <h2 className="font-display text-5xl text-white font-light">Wedding<span className="italic text-brand-300"> Packages</span></h2>
            <p className="font-body text-earth-400 mt-3">Venue and decor included. Basic fees - extras at additional cost.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.name} className={"relative p-8 border " + (pkg.featured ? "border-brand-500 bg-charcoal" : "border-earth-800 bg-earth-900")}>
                {pkg.featured && (<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white font-body text-xs font-semibold px-4 py-1 tracking-wide">Most Popular</div>)}
                <div className="font-display text-2xl text-white mb-1">{pkg.name}</div>
                <div className="font-body text-xs text-brand-400 font-medium tracking-wide mb-3">{pkg.guests} guests</div>
                <div className="font-display text-4xl text-brand-400 font-light mb-1">{"$"}{pkg.price}</div>
                <div className="font-body text-xs text-earth-500 mb-5">venue + decor</div>
                <p className="font-body text-sm text-earth-400 mb-6 leading-relaxed">{pkg.description}</p>
                <ul className="space-y-2.5 mb-8">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-2 font-body text-xs text-earth-300">
                      <Check className="w-3.5 h-3.5 text-brand-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#enquiry" className={pkg.featured ? "btn-gold w-full text-center justify-center" : "btn-outline-gold border-earth-600 text-earth-300 hover:text-white hover:border-brand-500 w-full text-center justify-center"}>Enquire Now</a>
              </div>
            ))}
          </div>
          <p className="text-center text-earth-500 text-xs mt-10 max-w-lg mx-auto">Please note these are basic fees. Extras such as catering, entertainment, photography, and additional decor are available at an extra cost.</p>
        </div>
      </div>

      <div id="enquiry" className="bg-cream py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="section-label mb-3">Get in Touch</div>
              <h2 className="section-title mb-4">Start Planning Your<span className="italic text-brand-500"> Dream Wedding</span></h2>
              <p className="font-body text-earth-600 leading-relaxed mb-6">Complete the form and our team will be in touch within 24 hours.</p>
              <div className="bg-brand-50 border border-brand-100 p-6">
                <div className="font-display text-lg text-charcoal mb-2">Contact Us</div>
                <div className="font-body text-sm text-earth-600 mt-1"><a href="tel:+263780114318" className="hover:text-brand-600 transition-colors">+263 78 011 4318</a></div>
                <div className="font-body text-sm text-earth-600 mt-1"><a href="tel:+263788734125" className="hover:text-brand-600 transition-colors">+263 788 734 125</a></div>
              </div>
            </div>
            <div className="lg:col-span-3"><WeddingEnquiryForm /></div>
          </div>
        </div>
      </div>
    </>
  );
}
