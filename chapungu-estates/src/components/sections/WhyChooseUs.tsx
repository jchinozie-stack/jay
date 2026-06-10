import { Shield, MapPin, Clock, Award, Leaf, Heart } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const reasons = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Every aspect of your experience is crafted to the highest standard — from thread counts to table settings.",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Conveniently located in Norton with easy access from Harare, yet peacefully removed from city noise.",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Our dedicated team is available around the clock to ensure your every need is met with a smile.",
  },
  {
    icon: Leaf,
    title: "Natural Setting",
    description: "Set amidst lush African landscape with indigenous flora and fauna creating a serene sanctuary.",
  },
  {
    icon: Heart,
    title: "Authentic Hospitality",
    description: "Experience the warmth and generosity of true Zimbabwean hospitality — it's in our DNA.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your safety and privacy are paramount. Gated premises with 24-hour security give you complete peace of mind.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-cream" aria-labelledby="why-heading">
      <div className="container-site">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-label mb-3">Why Chapungu</div>
          <h2 id="why-heading" className="section-title">
            An Experience Like
            <span className="italic text-brand-500"> No Other</span>
          </h2>
          <p className="font-body text-earth-600 mt-4 leading-relaxed">
            We don&apos;t just offer accommodation — we curate memorable experiences 
            that connect you to the soul of Zimbabwe.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" interval={0.08}>
          {reasons.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title} className="group">
              <div className="w-12 h-12 bg-brand-50 border border-brand-100 flex items-center justify-center mb-4 group-hover:bg-brand-500 transition-colors duration-300">
                <Icon className="w-5 h-5 text-brand-500 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl text-charcoal mb-2">{title}</h3>
              <p className="font-body text-sm text-earth-600 leading-relaxed">{description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
import { Shield, MapPin, Clock, Award, Leaf, Heart } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Every aspect of your experience is crafted to the highest standard — from thread counts to table settings.",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Conveniently located in Norton with easy access from Harare, yet peacefully removed from city noise.",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Our dedicated team is available around the clock to ensure your every need is met with a smile.",
  },
  {
    icon: Leaf,
    title: "Natural Setting",
    description: "Set amidst lush African landscape with indigenous flora and fauna creating a serene sanctuary.",
  },
  {
    icon: Heart,
    title: "Authentic Hospitality",
    description: "Experience the warmth and generosity of true Zimbabwean hospitality — it's in our DNA.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your safety and privacy are paramount. Gated premises with 24-hour security give you complete peace of mind.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-cream" aria-labelledby="why-heading">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-label mb-3">Why Chapungu</div>
          <h2 id="why-heading" className="section-title">
            An Experience Like
            <span className="italic text-brand-500"> No Other</span>
          </h2>
          <p className="font-body text-earth-600 mt-4 leading-relaxed">
            We don&apos;t just offer accommodation — we curate memorable experiences 
            that connect you to the soul of Zimbabwe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div key={title} className="group">
              <div className="w-12 h-12 bg-brand-50 border border-brand-100 flex items-center justify-center mb-4 group-hover:bg-brand-500 transition-colors duration-300">
                <Icon className="w-5 h-5 text-brand-500 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl text-charcoal mb-2">{title}</h3>
              <p className="font-body text-sm text-earth-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
