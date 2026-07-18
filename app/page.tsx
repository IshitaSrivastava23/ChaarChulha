import { Navbar } from "@/components/Navbar";
import { BrandHeader } from "@/components/BrandHeader";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { PremiumMenu } from "@/components/PremiumMenu";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";

export default function Home() {
  return (
    <main className="min-h-screen bg-chaar-cream">
      <Navbar />

      <BrandHeader />

      <Hero />

      {/* Luxury Transition */}
      <section className="relative h-44 overflow-hidden bg-chaar-cream">
        {/* Warm gold glow */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-24
            bg-[radial-gradient(circle_at_top,rgba(184,146,60,0.18),transparent_70%)]
          "
        />

        {/* Cream → Charcoal gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-chaar-cream
            via-[#E8DDC8]
            to-[#181512]
          "
        />

        {/* Decorative gold line */}
        <div className="absolute bottom-10 left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      </section>

      <CategoryGrid />

      <PremiumMenu />

      <Footer />

      <CartDrawer />

      <CheckoutModal />
    </main>
  );
}
