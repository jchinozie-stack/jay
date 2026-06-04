import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@/components/Analytics";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chapunguEstates.co.zw";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chapungu Estates | Premium Accommodation, Restaurant & Events in Norton, Zimbabwe",
    template: "%s | Chapungu Estates",
  },
  description:
    "Chapungu Estates is Norton, Zimbabwe's premier hospitality destination. Experience luxury accommodation, fine dining, weddings, conferences, and family recreation in a tranquil African setting.",
  keywords: [
    "Chapungu Estates",
    "accommodation in Norton Zimbabwe",
    "hotels in Norton",
    "lodges in Norton Zimbabwe",
    "wedding venues Zimbabwe",
    "conference venues Norton",
    "restaurants in Norton Zimbabwe",
    "braai Norton",
    "family resort Zimbabwe",
    "corporate events Norton",
    "Norton Zimbabwe hotel",
    "Mashonaland West accommodation",
  ],
  authors: [{ name: "Chapungu Estates" }],
  creator: "Chapungu Estates",
  publisher: "Chapungu Estates",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: siteUrl,
    siteName: "Chapungu Estates",
    title: "Chapungu Estates | Premium Hospitality in Norton, Zimbabwe",
    description:
      "Luxury accommodation, fine dining, weddings, and conferences in the heart of Norton, Zimbabwe. Book your stay or enquire today.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chapungu Estates — Premium Hospitality in Norton, Zimbabwe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapungu Estates | Premium Hospitality in Norton, Zimbabwe",
    description: "Luxury accommodation, fine dining, weddings, and conferences in Norton, Zimbabwe.",
    images: ["/images/og-image.jpg"],
    creator: "@ChapunguEstates",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#c8832a" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#c8832a",
    "theme-color": "#faf6f0",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#faf6f0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded font-body text-sm font-medium"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
