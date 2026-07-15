import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chaar Chulha — Fresh, Homely Meals Delivered in Pune",
  description:
    "Pure, home-cooked tiffins, breakfast, lunch, and dinner delivered fresh across Pune. Order online or via WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="font-body">
        {/* CartProvider wraps the whole app so any component (navbar,
            menu cards, drawer, checkout modal) can read/update the cart
            via the useCart() hook — no prop drilling needed. */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
