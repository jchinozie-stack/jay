import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        brand: { 50: "#fdf8f0", 100: "#f9edda", 200: "#f2d9af", 300: "#e8bf7e", 400: "#dc9f4d", 500: "#c8832a", 600: "#a86621", 700: "#864e1c", 800: "#6b3f1a", 900: "#573318" },
        earth: { 50: "#f8f6f0", 100: "#ede8db", 200: "#d9d0b7", 300: "#c2b48d", 400: "#aa9866", 500: "#958050", 600: "#7a6742", 700: "#604f34", 800: "#4a3d2a", 900: "#3a3022" },
        charcoal: { DEFAULT: "#1a1714", 800: "#2a2420", 700: "#3a3430", 600: "#4a4440" },
        cream: { DEFAULT: "#fdf8f0", 50: "#fefcf8", 100: "#fdf8f0" },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-jost)", "system-ui", "sans-serif"],
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        luxury: "0 4px 24px -2px rgba(26,23,20,0.12), 0 2px 8px -2px rgba(26,23,20,0.08)",
        "luxury-lg": "0 12px 48px -4px rgba(26,23,20,0.18), 0 4px 16px -4px rgba(26,23,20,0.12)",
      },
      height: { 18: "4.5rem" },
      animation: { shimmer: "shimmer 2s linear infinite" },
      keyframes: { shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } } },
    },
  },
  plugins: [animate],
};

export default config;
