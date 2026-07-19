import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────
// CHAAR CHULHA — MERGED DESIGN TOKEN SYSTEM
//
// Strategy: preserve ALL existing tokens so nothing breaks,
// while adding the new `brand.*` namespace for migrated
// components. Gradually move components to brand.* over time.
// ─────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── NEW BRAND NAMESPACE (warm light theme) ──────────────
        brand: {
          cream: "#F9F6F0",
          ivory: "#FFFCF8",
          terracotta: {
            DEFAULT: "#C85A32",
            hover: "#AF4B26",
            light: "#EBA38B",
            muted: "#FDF4F1",
          },
          brown: {
            900: "#2C2623",
            800: "#403732",
            700: "#5E524D",
            500: "#877872",
          },
          olive: {
            DEFAULT: "#657049",
            light: "#829063",
          },
          gold: {
            DEFAULT: "#C29F53",
            light: "#D4B87A",
            muted: "#E8E2D5",
          },
        },

        // ── DARK SECTION TOKENS (luxury dark menu) ─────────────
        chaar: {
          black: "#0D0D0D",
          charcoal: "#171717",
          marble: "#1F1F1F",
          cream: "#F8F4EC",
          gold: "#C8A45D",
          goldLight: "#E5C989",
          goldDark: "#8D6B2F",
        },

        // ── LEGACY TOKENS — kept for backward compat ──────────
        cream: {
          50: "#FBF6EE",
          100: "#F5EAD9",
          200: "#EEDCC2",
        },
        charcoal: {
          900: "#2C2623",
          800: "#403732",
          700: "#5E524D",
          600: "#877872",
        },
        clay: {
          50: "#FBEDE4",
          100: "#F3D2BC",
          200: "#EFC9A4",
          400: "#D98A55",
          500: "#C26E3D",
          600: "#C85A32",
        },
        saffron: {
          300: "#F3C876",
          400: "#F0C96C",
        },
        sage: {
          600: "#657049",
        },
        gold: {
          200: "#E8E2D5",
          300: "#D4B87A",
          400: "#D8B35C",
          500: "#C8A45D",
        },
        success: "#657049",
        danger: "#B84A4A",
      },

      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-plus-jakarta)", "sans-serif"],
      },

      borderRadius: {
        card: "20px",
        luxury: "28px",
      },

      boxShadow: {
        // New system
        sm: "0 2px 8px rgba(44, 38, 35, 0.04)",
        DEFAULT: "0 8px 24px rgba(44, 38, 35, 0.06)",
        lg: "0 16px 40px rgba(44, 38, 35, 0.08)",
        floating: "0 20px 50px rgba(44, 38, 35, 0.12)",
        // Legacy
        card: "0 10px 35px rgba(0,0,0,0.25)",
        warm: "0 16px 40px rgba(15, 15, 15, 0.18)",
        gold: "0 0 25px rgba(200,164,93,0.25)",
        goldLg: "0 0 40px rgba(200,164,93,0.35)",
        inner: "inset 0 1px 0 rgba(255,255,255,0.04)",
      },

      backgroundImage: {
        luxury: "linear-gradient(135deg,#0D0D0D 0%,#171717 50%,#1F1F1F 100%)",
        gold: "linear-gradient(135deg,#8D6B2F,#C8A45D,#E5C989)",
        border: "linear-gradient(135deg,#8D6B2F,#E5C989)",
        marble: "radial-gradient(circle at top,#232323 0%,#111111 100%)",
      },

      keyframes: {
        // New system
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        // Legacy (ChulhaMark etc.)
        rise: {
          "0%": { opacity: "0", transform: "translateY(25px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        glow: {
          "0%,100%": { boxShadow: "0 0 10px rgba(200,164,93,0.20)" },
          "50%": { boxShadow: "0 0 35px rgba(200,164,93,0.40)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
        slideUp: "slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        pulseSoft: "pulseSoft 2.5s ease-in-out infinite",
        rise: "rise 0.6s ease forwards",
        flicker: "flicker 2.4s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 1, 0.5, 1)",
        luxury: "cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;
