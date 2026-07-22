"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { MenuItem, MenuCategory } from "@/types";
import { CategoryTabs } from "./CategoryTabs";
import { MenuCard } from "./MenuCard";

interface MenuSectionProps {
  items: MenuItem[];
  categories: MenuCategory[];
}

export function MenuSection({ items, categories }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(categories[0]);

  // If the user navigates via a hash link (e.g., /#tiffins from Navbar), switch the active tab
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#tiffins") {
        setActiveCategory("Tiffins" as MenuCategory);
      } else if (window.location.hash === "#menu") {
        // Optional: Reset to first category when clicking "Menu"
        setActiveCategory(categories[0]);
      }
    };

    // Check on initial load
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [categories]);

  const filteredItems = useMemo(
    () => items.filter((item) => item.category === activeCategory),
    [items, activeCategory]
  );

  const isTiffins = activeCategory === "Tiffins";

  return (
    <section id="menu" className="py-16 md:py-24" style={{ backgroundColor: "#F5EAD9" }}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* ── Section header: heading + Food Choice animation side-by-side ── */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">

          {/* Left — heading text */}
          <div className="flex-1 text-center md:text-left">
            <p
              className="font-body text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#C85A32" }}
            >
              Curated Daily
            </p>
            <h2
              className="mt-2 font-display text-3xl sm:text-4xl"
              style={{ color: "#2C2623" }}
            >
              Our Menu
            </h2>
            <p className="mt-3 font-body text-[15px]" style={{ color: "#5E524D" }}>
              Home-style dishes cooked fresh every morning — pick a category to see what's ready today.
            </p>

            {/* Divider dots */}
            <div className="mt-6 flex items-center justify-center gap-2 md:justify-start" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#F0C96C" }} />
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#C85A32" }} />
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#F0C96C" }} />
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#C85A32" }} />
            </div>
          </div>

          {/* Right — Food Choice animation (girl thinking about food) */}
          {/* Purposefully kept small so it doesn't dominate; adds warmth and personality */}
          <div className="w-56 shrink-0 md:w-64 lg:w-72">
            <Image
              src="/animations/Food Choice svg.svg"
              alt="Thinking about what to eat today"
              width={400}
              height={400}
              className="h-auto w-full"
              unoptimized
            />
          </div>
        </div>

        {/* Sticky tabs */}
        <div
          className="sticky top-[72px] z-30 -mx-5 mt-8 flex justify-center px-5 py-3 md:-mx-8 md:px-8"
          style={{ backgroundColor: "#F5EAD9" }}
          id="tiffins"
        >
          <CategoryTabs
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Items grid or empty state */}
        <div className="mt-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : isTiffins ? (
            /* Specific coming-soon state for Tiffins */
            <div
              className="mx-auto max-w-sm rounded-2xl p-10 text-center"
              style={{ backgroundColor: "#FFFFFF", border: "1px dashed #E8E2D5" }}
            >
              <p className="font-display text-3xl" style={{ color: "#C85A32" }}>
                Coming Soon
              </p>
              <p className="mt-3 font-body text-sm leading-6" style={{ color: "#5E524D" }}>
                Our tiffin subscription plans are being finalized. We'll launch them very soon!
              </p>
              <p className="mt-4 font-body text-xs" style={{ color: "#877872" }}>
                📞 Meanwhile, order via WhatsApp: +91 78880 37948
              </p>
            </div>
          ) : (
            /* Generic empty state */
            <div className="py-12 text-center">
              <p className="font-body text-sm" style={{ color: "#5E524D" }}>
                Nothing listed here yet — check back soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
