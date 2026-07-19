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
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-sm border-b border-brand-gold-muted"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        {/* Logo mark + text logo, adjacent — matches the original HTML design */}
        <a href="#top" className="flex items-center gap-2">
          <Image
            src="/logo/logo-transparent.png"
            alt="Chaar Chulha Logo Emblem"
            width={48}
            height={48}
            className="h-12 w-auto"
            priority
          />
          <Image
            src="/logo/chaar_chulha_text_full.png"
            alt="Chaar Chulha Text Logo"
            width={160}
            height={44}
            className="h-8 w-auto -translate-y-[1px]"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative font-body text-[14px] font-medium text-brand-brown-700 transition-colors hover:text-brand-brown-900 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-brand-terracotta after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Cart button */}
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative flex items-center gap-2 rounded-full bg-brand-brown-900 px-4 py-2.5 font-body text-sm font-medium text-brand-cream transition-all duration-200 hover:bg-brand-terracotta active:scale-95"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-terracotta px-1 font-body text-xs font-bold text-white ring-2 ring-white">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full p-2.5 text-brand-brown-900 transition-colors hover:bg-brand-cream md:hidden"
          >
            {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-brand-gold-muted bg-white px-5 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 font-body text-[15px] font-medium text-brand-brown-700 transition-colors hover:bg-brand-cream hover:text-brand-brown-900"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
