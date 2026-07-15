# Chaar Chulha — Frontend

Production-ready Next.js (App Router) + Tailwind CSS storefront for Chaar Chulha's cloud kitchen.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000. (This build was verified to compile cleanly with `npm run build`.)

> Note: `app/layout.tsx` loads Google Fonts (Fraunces + Work Sans) via `next/font/google`,
> which fetches at build time. If you're building in a fully offline/sandboxed environment,
> that step needs network access to `fonts.googleapis.com` — it works normally on a real
> dev machine or deployment host (Vercel, etc.).

## Project structure

```
app/
  layout.tsx        → fonts, metadata, wraps app in <CartProvider>
  page.tsx           → assembles Navbar / Hero / MenuSection / Footer + overlays
  globals.css         → Tailwind directives + shared .input-field utility
components/
  Navbar.tsx          → sticky nav, cart icon + badge
  Hero.tsx            → headline + CTA + hero image
  CategoryTabs.tsx    → Breakfast/Lunch/Dinner/Tiffins filter
  MenuCard.tsx        → product card with Add to Cart / quantity stepper
  MenuSection.tsx     → combines tabs + card grid
  CartDrawer.tsx       → slide-out cart with line items + totals
  CheckoutModal.tsx   → customer form + dual Pay Online / WhatsApp actions
  Footer.tsx          → story, contact, social links
  ChulhaMark.tsx       → SVG "four hearths" signature mark + divider
context/
  CartContext.tsx      → all cart state (add/remove/qty) via useReducer — the
                        single source of truth every component reads from
data/
  menuItems.ts          → MOCK MENU DATA — replace with your real API/CMS call
lib/
  pricing.ts            → subtotal/tax/delivery/total calculation (edit GST rate here)
  whatsapp.ts            → builds the order message + opens wa.me link
  payment.ts             → handlePaymentSubmit() — YOUR RAZORPAY/STRIPE INTEGRATION GOES HERE
types/
  index.ts               → MenuItem, CartLine, CustomerDetails, OrderTotals
public/
  logo.jpeg               → your uploaded logo (used in Navbar + Footer)
```

## Where to plug in your own work

1. **Real menu data** — replace the array in `data/menuItems.ts` with a `fetch()` call
   to your API/CMS. The comment at the top of that file shows the exact shape expected.
2. **Payment gateway** — `lib/payment.ts` has a fully-commented walkthrough for both
   Razorpay and Stripe, with the exact spot to swap the simulated delay for a real
   `fetch()` to your backend. The function signature is designed to stay stable no
   matter which gateway you choose, so `CheckoutModal.tsx` never needs to change.
3. **WhatsApp number** — set in `lib/whatsapp.ts` (`WHATSAPP_BUSINESS_NUMBER`), currently `917888037948`.
4. **Images** — swap the Unsplash placeholder URLs in `data/menuItems.ts` and the hero
   background in `components/Hero.tsx`. If you host images elsewhere, add that domain
   to `next.config.js` under `images.remotePatterns`.
5. **Logo** — `public/logo.jpeg` is your uploaded artwork. It's cut for a dark backdrop,
   so it currently sits inside a small charcoal circle in the navbar/footer. For a
   cleaner edge-to-edge fit, export a transparent-background PNG/SVG version later and
   swap the file (same filename, or update the `src` in `Navbar.tsx` / `Footer.tsx`).
6. **Pricing rules** — GST rate, delivery fee, and free-delivery threshold are all
   named constants at the top of `lib/pricing.ts`.

## Design tokens

Colors, fonts, shadows, and animation are all defined in `tailwind.config.ts` — change
them there and they propagate everywhere (no hardcoded hex values in components).
