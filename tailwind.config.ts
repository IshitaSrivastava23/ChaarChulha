import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────
// CHAAR CHULHA LUXURY DESIGN SYSTEM
//
// Brand Identity:
// Chaar Chulha is a premium cloud kitchen inspired by the elegance of
// royal Indian hospitality. The design language focuses on luxury,
// warmth and timeless aesthetics rather than modern fast-food styling.
//
// Design Inspiration:
// • Taj Hotels
// • ITC Hotels
// • Royal Indian Palaces
// • Antique Invitations
// • Black Marble
// • Antique Gold
//
// Color Philosophy:
//
// • Black      → Luxury, sophistication, premium feel
// • Charcoal   → Rich surface color for cards
// • Marble     → Elegant gradients & section backgrounds
// • Cream      → Soft readable backgrounds
// • Gold       → Primary brand accent
// • Gold Light → Hover states & highlights
// • Gold Dark  → Borders & subtle metallic depth
//
// Everything in this file acts as the single source of truth for the
// entire Chaar Chulha website.
// ─────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      // ─────────────────────────────────────────────
      // Brand Colors
      // ─────────────────────────────────────────────
      colors: {
        chaar: {
          black: "#0D0D0D",
          charcoal: "#171717",
          marble: "#1F1F1F",
          cream: "#F8F4EC",
          gold: "#C8A45D",
          goldLight: "#E5C989",
          goldDark: "#8D6B2F",
        },
        cream: {
          50: "#FBF6EE",
          100: "#F5EAD9",
          200: "#EEDCC2",
        },
        charcoal: {
          900: "#171717",
          800: "#2F2F2F",
          700: "#4B4B4B",
        },
        clay: {
          50: "#FBEDE4",
          100: "#F3D2BC",
          200: "#EFC9A4",
          400: "#D98A55",
          500: "#C26E3D",
          600: "#A85220",
        },
        saffron: {
          400: "#F0C96C",
        },
        sage: {
          600: "#5E8C61",
        },
        gold: {
          400: "#D8B35C",
          500: "#C8A45D",
        },
        success: "#5E8C61",
        danger: "#B84A4A",
      },

      // ─────────────────────────────────────────────
      // Typography
      //
      // Display Font:
      // Used for headings, titles and luxury branding.
      //
      // Body Font:
      // Used for paragraphs, descriptions and buttons.
      //
      // (These fonts will be connected later using next/font.)
      // ─────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },

      // ─────────────────────────────────────────────
      // Border Radius
      //
      // card    → Standard premium cards
      // luxury  → Hero cards & featured sections
      // ─────────────────────────────────────────────
      borderRadius: {
        card: "20px",
        luxury: "28px",
      },

      // ─────────────────────────────────────────────
      // Shadows
      //
      // card     → Soft floating card shadow
      // gold     → Elegant golden glow
      // gold-lg  → Strong hover glow
      // inner    → Slight inset highlight
      // ─────────────────────────────────────────────
      boxShadow: {
        card: "0 10px 35px rgba(0,0,0,0.25)",
        warm: "0 16px 40px rgba(15, 15, 15, 0.18)",
        gold: "0 0 25px rgba(200,164,93,0.25)",
        goldLg: "0 0 40px rgba(200,164,93,0.35)",
        inner: "inset 0 1px 0 rgba(255,255,255,0.04)",
      },

      // ─────────────────────────────────────────────
      // Background Utilities
      //
      // luxury → Main premium page gradient
      // gold   → Metallic gold gradient
      // border → Decorative gold border gradient
      // marble → Rich marble-inspired background
      // ─────────────────────────────────────────────
      backgroundImage: {
        luxury:
          "linear-gradient(135deg,#0D0D0D 0%,#171717 50%,#1F1F1F 100%)",

        gold:
          "linear-gradient(135deg,#8D6B2F,#C8A45D,#E5C989)",

        border:
          "linear-gradient(135deg,#8D6B2F,#E5C989)",

        marble:
          "radial-gradient(circle at top,#232323 0%,#111111 100%)",
      },

      // ─────────────────────────────────────────────
      // Custom Animations
      //
      // rise     → Components fade in while moving upward
      // glow     → Slow premium golden glow animation
      // shimmer  → Metallic shimmer for premium buttons
      // ─────────────────────────────────────────────
      keyframes: {
        rise: {
          "0%": {
            opacity: "0",
            transform: "translateY(25px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        glow: {
          "0%,100%": {
            boxShadow: "0 0 10px rgba(200,164,93,0.20)",
          },

          "50%": {
            boxShadow: "0 0 35px rgba(200,164,93,0.40)",
          },
        },

        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },

          "100%": {
            backgroundPosition: "200% 0",
          },
        },
      },

      animation: {
        rise: "rise 0.6s ease forwards",

        glow: "glow 3s ease-in-out infinite",

        shimmer: "shimmer 2.5s linear infinite",
      },

      // ─────────────────────────────────────────────
      // Custom Transition Curve
      //
      // Used throughout the website to create slower,
      // smoother luxury animations.
      // ─────────────────────────────────────────────
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },

  plugins: [],
};

export default config;

// import type { Config } from "tailwindcss";

// // ─────────────────────────────────────────────────────────────
// // CHAAR CHULHA DESIGN TOKENS
// // Palette born from the brand name (four hearths / four stoves):
// //  - cream    → the plate / background, warm not sterile
// //  - clay     → terracotta, the primary brand + CTA color
// //  - saffron  → the accent, used sparingly for highlights & tags
// //  - charcoal → text color, warm near-black (never pure #000)
// //  - sage     → "pure ingredient" / trust accent, used sparingly
// // ─────────────────────────────────────────────────────────────
// const config: Config = {
//   content: [
//     "./app/**/*.{ts,tsx}",
//     "./components/**/*.{ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         cream: {
//           50: "#FBF6EE",
//           100: "#F5EAD9",
//           200: "#EEDCC2",
//         },
//         clay: {
//           50: "#FBEDE4",
//           100: "#F3D2BC",
//           400: "#D98A55",
//           500: "#C1702F",
//           600: "#A85A24",
//           700: "#8A481C",
//           800: "#6B3815",
//         },
//         saffron: {
//           300: "#F3C876",
//           400: "#EEB44E",
//           500: "#E6A233",
//         },
//         charcoal: {
//           700: "#463B34",
//           800: "#332A24",
//           900: "#241D18",
//         },
//         sage: {
//           500: "#7C8A5C",
//           600: "#657049",
//         },
//         // Antique gold — pulled from the logo's metallic linework,
//         // used for the navbar/footer (which sit on charcoal, echoing
//         // the logo's own dark backdrop) and small premium accents.
//         gold: {
//           300: "#E4C77A",
//           400: "#D3AE55",
//           500: "#B8923C",
//         },
//       },
//       fontFamily: {
//         display: ["var(--font-fraunces)", "Georgia", "serif"],
//         body: ["var(--font-work-sans)", "system-ui", "sans-serif"],
//       },
//       boxShadow: {
//         warm: "0 20px 45px -20px rgba(107, 56, 21, 0.35)",
//         card: "0 10px 30px -12px rgba(36, 29, 24, 0.18)",
//       },
//       keyframes: {
//         rise: {
//           "0%": { opacity: "0", transform: "translateY(14px)" },
//           "100%": { opacity: "1", transform: "translateY(0)" },
//         },
//         flicker: {
//           "0%, 100%": { opacity: "0.55" },
//           "50%": { opacity: "1" },
//         },
//       },
//       animation: {
//         rise: "rise 0.6s ease-out forwards",
//         flicker: "flicker 2.4s ease-in-out infinite",
//       },
//     },
//   },
//   plugins: [],
// };

// export default config;
