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
        brand: {
          50: "#fdf8f0",
          100: "#f9edda",
          200: "#f2d9af",
          300: "#e8bf7e",
          400: "#dc9f4d",
          500: "#c8832a",
          600: "#a86621",
          700: "#864e1c",
          800: "#6b3f1a",
          900: "#573318",
        },
        earth: {
          50: "#f8f6f0",
          100: "#ede8db",
          200: "#d9d0b7",
          300: "#c2b48d",
          400: "#aa9866",
          500: "#958050",
          600: "#7a6742",
          700: "#604f34",
          800: "#4a3d2a",
          900: "#3a3022",
        },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-jost)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
};

export default config;
