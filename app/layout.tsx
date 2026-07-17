import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chaar Chulha — Fresh, Homely Meals Delivered in Pune",
  description:
    "Pure, home-cooked tiffins, breakfast, lunch, and dinner delivered fresh across Pune. Order online or via WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="font-body bg-chaar-cream text-chaar-black antialiased">
        {/* CartProvider wraps the whole app so any component
            can access the shopping cart without prop drilling. */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}