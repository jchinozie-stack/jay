import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80", alt: "Chapungu Estates exterior and grounds", cols: 2, rows: 2 },
  { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80", alt: "Luxury suite interior", cols: 1, rows: 1 },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", alt: "Restaurant dining experience", cols: 1, rows: 1 },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", alt: "Wedding ceremony setup", cols: 2, rows: 1 },
  { src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80", alt: "Pool and recreation area", cols: 1, rows: 1 },
];

export function GalleryPreview() {
  return (
    <section className="py-24 lg:py-32 bg-cream" aria-labelledby="gallery-heading">
      <div className="container-site">
        <div className="text-center mb-16">
          <div className="section-label mb-3">Gallery</div>
          <h2 id="gallery-heading" className="section-title">
            See Chapungu
            <span className="italic text-brand-500"> in All Its Glory</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 h-[500px]">
          {galleryImages.slice(0, 5).map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300" />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/gallery" className="btn-outline-gold">View Full Gallery</Link>
        </div>
      </div>
    </section>
  );
}
