"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Tiffins", href: "#tiffins" },
  { label: "Our Story", href: "#story" },
  { label: "Contact", href: "#footer" },
];

export function Navbar() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-cream-50/95 shadow-card backdrop-blur-sm" : "bg-cream-50/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        {/* Brand mark: the uploaded logo is cut for a dark backdrop,
            so it sits on a small charcoal chip rather than directly
            on the cream navbar. Swap /public/logo.jpeg for a
            transparent-background PNG export later for a cleaner fit. */}
        <a href="#top" className="flex items-center gap-2">
          <Image src="/logo/logo-transparent.png" alt="Chaar Chulha Logo Emblem" width={48} height={48} className="h-12 w-auto" priority />
          <Image src="/logo/chaar_chulha_text_full.png" alt="Chaar Chulha Text Logo" width={160} height={44} className="h-8 w-auto -translate-y-[1px]" priority />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[15px] font-medium text-charcoal-700 transition-colors hover:text-clay-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative flex items-center gap-2 rounded-full bg-charcoal-900 px-4 py-2.5 text-cream-50 transition-transform hover:scale-[1.03] active:scale-95"
          >
            <ShoppingBag className="h-4.5 w-4.5" size={18} />
            <span className="hidden text-sm font-medium sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-saffron-400 px-1 text-xs font-bold text-charcoal-900">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full p-2.5 text-charcoal-900 md:hidden"
          >
            {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-clay-100 bg-cream-50 px-5 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-2 py-2.5 font-body text-[15px] font-medium text-charcoal-700 hover:bg-cream-100"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
