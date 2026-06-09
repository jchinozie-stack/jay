import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { AccommodationPreview } from "@/components/sections/AccommodationPreview";
import { RestaurantPreview } from "@/components/sections/RestaurantPreview";
import { WeddingsPreview } from "@/components/sections/WeddingsPreview";
import { ConferencePreview } from "@/components/sections/ConferencePreview";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { JourneyBuilder } from "@/components/sections/JourneyBuilder";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { MapSection } from "@/components/sections/MapSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HomeStructuredData } from "@/components/seo/HomeStructuredData";

export const metadata: Metadata = {
  title: "Chapungu Estates | Premium Accommodation & Events in Norton, Zimbabwe",
  description:
    "Discover Chapungu Estates — Norton's finest hospitality destination. Luxury rooms, award-winning restaurant, stunning wedding venues, and professional conference facilities set in beautiful African surroundings.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <HeroSection />
      <AccommodationPreview />
      <RestaurantPreview />
      <WeddingsPreview />
      <ConferencePreview />
      <GalleryPreview />
      <JourneyBuilder />
      <TestimonialsSection />
      <WhyChooseUs />
      <MapSection />
      <CtaBanner />
    </>
  );
}
