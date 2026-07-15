import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { menuItems, CATEGORIES } from "@/data/menuItems";

// This page is a Server Component by default. If you switch
// menuItems to a real API call (see /data/menuItems.ts), fetch it
// here with `await getMenuItems()` and pass the result down —
// MenuSection can stay a client component for the tab interactivity.
export default function Home() {
  return (
    <main className="min-h-screen bg-cream-50">
      <Navbar />
      <Hero />
      <MenuSection items={menuItems} categories={CATEGORIES} />
      <Footer />

      {/* Overlay components: render conditionally based on cart state,
          mounted once at the page root so they can appear over anything. */}
      <CartDrawer />
      <CheckoutModal />
    </main>
  );
}
