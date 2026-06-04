export function HomeStructuredData() {
  const hotel = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Chapungu Estates",
    description:
      "Premium hospitality destination in Norton, Zimbabwe offering luxury accommodation, restaurant, weddings, conferences, and events.",
    url: "https://chapunguestates.co.zw",
    telephone: "+263772123456",
    email: "info@chapunguestates.co.zw",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Off Harare-Bulawayo Road",
      addressLocality: "Norton",
      addressRegion: "Mashonaland West",
      addressCountry: "ZW",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -17.8833,
      longitude: 30.7,
    },
    starRating: { "@type": "Rating", ratingValue: "4" },
    priceRange: "$$$",
    checkinTime: "14:00",
    checkoutTime: "10:00",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Conference Facilities", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wedding Venue", value: true },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
    },
  };

  const restaurant = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Chapungu Estates Restaurant",
    servesCuisine: ["African", "International", "Braai"],
    priceRange: "$$",
    url: "https://chapunguestates.co.zw/restaurant",
    telephone: "+263772123456",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Off Harare-Bulawayo Road",
      addressLocality: "Norton",
      addressCountry: "ZW",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "07:00",
        closes: "23:00",
      },
    ],
  };

  const eventVenue = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: "Chapungu Estates Event Venue",
    description: "Stunning wedding and event venue in Norton, Zimbabwe with capacity up to 500 guests.",
    url: "https://chapunguestates.co.zw/weddings",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Off Harare-Bulawayo Road",
      addressLocality: "Norton",
      addressCountry: "ZW",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Chapungu Estates",
    image: "https://chapunguestates.co.zw/og-image.jpg",
    url: "https://chapunguestates.co.zw",
    telephone: "+263772123456",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Off Harare-Bulawayo Road",
      addressLocality: "Norton",
      addressRegion: "Mashonaland West",
      addressCountry: "ZW",
    },
    sameAs: [
      "https://facebook.com/chapunguestates",
      "https://instagram.com/chapunguestates",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotel) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurant) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventVenue) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
    </>
  );
}
