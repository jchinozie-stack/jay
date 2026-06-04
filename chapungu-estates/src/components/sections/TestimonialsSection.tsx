import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Tendai Moyo",
    location: "Harare, Zimbabwe",
    rating: 5,
    text: "Our honeymoon at Chapungu Estates was absolutely magical. The suite was beautifully appointed, the staff were incredibly attentive, and the restaurant served some of the finest food we've had in Zimbabwe. We'll be back for our anniversary!",
    stay: "Presidential Suite, November 2024",
  },
  {
    id: 2,
    name: "James & Sarah Kimani",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "We held our company's annual conference at Chapungu Estates and couldn't be more impressed. The facilities were world-class, the catering was exceptional, and the team handled every logistical detail perfectly. Highly recommend for corporate events.",
    stay: "Conference Package, September 2024",
  },
  {
    id: 3,
    name: "Rudo Chikwanda",
    location: "Bulawayo, Zimbabwe",
    rating: 5,
    text: "Our family reunion at Chapungu was a dream come true. The kids loved the recreation facilities, the braai was phenomenal, and the garden chalets gave everyone their own private space. The whole family is already planning a return visit.",
    stay: "Family Chalets, December 2024",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-earth-950" aria-labelledby="testimonials-heading">
      <div className="container-site">
        <div className="text-center mb-16">
          <div className="section-label text-brand-400 mb-3">Testimonials</div>
          <h2 id="testimonials-heading" className="font-display text-5xl text-white font-light">
            What Our Guests
            <span className="block italic text-brand-300">Are Saying</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="bg-earth-900 border border-earth-800 p-8 relative"
              aria-label={`Review by ${t.name}`}
            >
              <Quote className="w-8 h-8 text-brand-700 mb-4" aria-hidden="true" />
              
              <div className="flex gap-1 mb-4" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-400 text-brand-400" aria-hidden="true" />
                ))}
              </div>

              <p className="font-body text-earth-300 leading-relaxed mb-6 text-sm">
                {t.text}
              </p>

              <footer>
                <div className="font-display text-white text-lg">{t.name}</div>
                <div className="font-body text-xs text-earth-500 mt-1">{t.location}</div>
                <div className="font-body text-xs text-brand-600 mt-1">{t.stay}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
