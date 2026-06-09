import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  { src: "/images/TIN05027.jpg", alt: "Chapungu Estates exterior and grounds", cols: 2, rows: 2 },
  { src: "/images/TIN05139 (1).jpg", alt: "Chapungu Estates room interior", cols: 1, rows: 1 },
  { src: "/images/TIN05190.jpg", alt: "Chapungu Grill restaurant", cols: 1, rows: 1 },
  { src: "/images/Tent 2.jpg", alt: "Wedding ceremony setup", cols: 2, rows: 1 },
  { src: "/images/TIN05061 (2).jpg", alt: "Garden seating and grounds", cols: 1, rows: 1 },
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
