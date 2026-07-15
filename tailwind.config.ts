import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────
// CHAAR CHULHA DESIGN TOKENS
// Palette born from the brand name (four hearths / four stoves):
//  - cream    → the plate / background, warm not sterile
//  - clay     → terracotta, the primary brand + CTA color
//  - saffron  → the accent, used sparingly for highlights & tags
//  - charcoal → text color, warm near-black (never pure #000)
//  - sage     → "pure ingredient" / trust accent, used sparingly
// ─────────────────────────────────────────────────────────────
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FBF6EE",
          100: "#F5EAD9",
          200: "#EEDCC2",
        },
        clay: {
          50: "#FBEDE4",
          100: "#F3D2BC",
          400: "#D98A55",
          500: "#C1702F",
          600: "#A85A24",
          700: "#8A481C",
          800: "#6B3815",
        },
        saffron: {
          300: "#F3C876",
          400: "#EEB44E",
          500: "#E6A233",
        },
        charcoal: {
          700: "#463B34",
          800: "#332A24",
          900: "#241D18",
        },
        sage: {
          500: "#7C8A5C",
          600: "#657049",
        },
        // Antique gold — pulled from the logo's metallic linework,
        // used for the navbar/footer (which sit on charcoal, echoing
        // the logo's own dark backdrop) and small premium accents.
        gold: {
          300: "#E4C77A",
          400: "#D3AE55",
          500: "#B8923C",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-work-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        warm: "0 20px 45px -20px rgba(107, 56, 21, 0.35)",
        card: "0 10px 30px -12px rgba(36, 29, 24, 0.18)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        rise: "rise 0.6s ease-out forwards",
        flicker: "flicker 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
