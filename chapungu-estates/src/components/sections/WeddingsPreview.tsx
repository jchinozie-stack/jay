import Image from "next/image";
import Link from "next/link";
import { Heart, Users, Camera, Music } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const features = [
  { icon: Heart, text: "Romantic outdoor ceremonies" },
  { icon: Users, text: "Up to 300 guests capacity" },
  { icon: Camera, text: "Stunning photographic backdrops" },
  { icon: Music, text: "Full event coordination" },
];

export function WeddingsPreview() {
  return (
    <section className="py-24 lg:py-32 bg-cream" aria-labelledby="weddings-heading">
      <div className="container-site">
        <Reveal amount={0.12}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <Image src="/images/Tent 2.jpg" alt="Elegant wedding ceremony venue at Chapungu Estates" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 overflow-hidden hidden lg:block border-4 border-cream">
              <Image src="/images/Tent 4.jpg" alt="Wedding reception setup at Chapungu Estates" fill className="object-cover" sizes="200px" />
            </div>
            <div className="absolute top-6 -left-6 bg-brand-500 p-6 text-white hidden lg:block">
              <div className="font-display text-4xl font-light">300</div>
              <div className="font-body text-xs tracking-[0.2em] uppercase mt-1">Max Guests</div>
            </div>
          </div>
          <div className="lg:pl-8">
            <div className="section-label mb-3">Weddings & Events</div>
            <h2 id="weddings-heading" className="section-title mb-6">Your Perfect<span className="block italic text-brand-500">Wedding Day</span></h2>
            <p className="font-body text-earth-600 leading-relaxed mb-8 text-lg">Set against the natural beauty of Zimbabwe&apos;s landscape, Chapungu Estates creates the backdrop for weddings that are as timeless as love itself. Our dedicated events team handles every detail with grace and precision.</p>
            <ul className="space-y-4 mb-10" role="list">{features.map(({ icon: Icon, text }) => (<li key={text} className="flex items-center gap-3"><div className="w-8 h-8 bg-brand-50 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-brand-500" aria-hidden="true" /></div><span className="font-body text-earth-700">{text}</span></li>))}</ul>
            <div className="flex gap-4"><Link href="/weddings" className="btn-gold">Explore Packages</Link><Link href="/contact?type=wedding" className="btn-outline-gold">Send Enquiry</Link></div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
import Image from "next/image";
import Link from "next/link";
import { Heart, Users, Camera, Music } from "lucide-react";

const features = [
  { icon: Heart, text: "Romantic outdoor ceremonies" },
  { icon: Users, text: "Up to 300 guests capacity" },
  { icon: Camera, text: "Stunning photographic backdrops" },
  { icon: Music, text: "Full event coordination" },
];

export function WeddingsPreview() {
  return (
    <section className="py-24 lg:py-32 bg-cream" aria-labelledby="weddings-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <Image src="/images/Tent 2.jpg" alt="Elegant wedding ceremony venue at Chapungu Estates" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 overflow-hidden hidden lg:block border-4 border-cream">
              <Image src="/images/Tent 4.jpg" alt="Wedding reception setup at Chapungu Estates" fill className="object-cover" sizes="200px" />
            </div>
            <div className="absolute top-6 -left-6 bg-brand-500 p-6 text-white hidden lg:block">
              <div className="font-display text-4xl font-light">300</div>
              <div className="font-body text-xs tracking-[0.2em] uppercase mt-1">Max Guests</div>
            </div>
          </div>
          <div className="lg:pl-8">
            <div className="section-label mb-3">Weddings & Events</div>
            <h2 id="weddings-heading" className="section-title mb-6">Your Perfect<span className="block italic text-brand-500">Wedding Day</span></h2>
            <p className="font-body text-earth-600 leading-relaxed mb-8 text-lg">Set against the natural beauty of Zimbabwe&apos;s landscape, Chapungu Estates creates the backdrop for weddings that are as timeless as love itself. Our dedicated events team handles every detail with grace and precision.</p>
            <ul className="space-y-4 mb-10" role="list">{features.map(({ icon: Icon, text }) => (<li key={text} className="flex items-center gap-3"><div className="w-8 h-8 bg-brand-50 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-brand-500" aria-hidden="true" /></div><span className="font-body text-earth-700">{text}</span></li>))}</ul>
            <div className="flex gap-4"><Link href="/weddings" className="btn-gold">Explore Packages</Link><Link href="/contact?type=wedding" className="btn-outline-gold">Send Enquiry</Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}
