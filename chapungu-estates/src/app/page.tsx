import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { OurStory } from "@/components/sections/OurStory";
import { AccommodationPreview } from "@/components/sections/AccommodationPreview";
import { RestaurantPreview } from "@/components/sections/RestaurantPreview";
import { WeddingsPreview } from "@/components/sections/WeddingsPreview";
import { ConferencePreview } from "@/components/sections/ConferencePreview";
import { ExperiencePackages } from "@/components/sections/ExperiencePackages";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { JourneyBuilder } from "@/components/sections/JourneyBuilder";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { MapSection } from "@/components/sections/MapSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HomeStructuredData } from "@/components/seo/HomeStructuredData";

export const metadata: Metadata = {
  title: "Chapungu Estates | Premier Hospitality in Norton, Zimbabwe",
  description:
    "An extraordinary estate where luxury accommodation, exceptional dining, landmark weddings and world-class conferences come together in the heart of Zimbabwe.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <HeroSection />
      <OurStory />
      <AccommodationPreview />
      <RestaurantPreview />
      <WeddingsPreview />
      <ConferencePreview />
      <ExperiencePackages />
      <GalleryPreview />
      <JourneyBuilder />
      <TestimonialsSection />
      <MapSection />
      <CtaBanner />
    </>
  );
}
