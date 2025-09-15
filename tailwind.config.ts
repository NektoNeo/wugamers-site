import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem"
      }
    }
  },
  plugins: []
} satisfies Config;