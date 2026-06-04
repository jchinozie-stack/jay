import { MetadataRoute } from "next";

const BASE_URL = "https://chapunguestates.co.zw";

const roomSlugs = [
  "presidential-suite",
  "executive-suite",
  "family-suite",
  "garden-chalet",
  "pool-chalet",
  "deluxe-room",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/accommodation`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/restaurant`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/weddings`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/conferences`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/events`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/butchery`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/gallery`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/about`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/contact`, priority: 0.8, changeFrequency: "yearly" as const },
  ];

  const roomPages = roomSlugs.map((slug) => ({
    url: `${BASE_URL}/accommodation/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...roomPages].map((page) => ({
    ...page,
    lastModified: new Date(),
  }));
}
