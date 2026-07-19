import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { CateringSection } from "@/components/CateringSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { menuItems, CATEGORIES } from "@/data/menuItems";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F9F6F0" }}>
      <Navbar />

      <Hero />

      {/* Single unified menu section — tabs + items in one clean flow */}
      <MenuSection items={menuItems} categories={CATEGORIES} />

      <CateringSection />

      <Footer />

      <CartDrawer />
      <CheckoutModal />
    </main>
  );
}
