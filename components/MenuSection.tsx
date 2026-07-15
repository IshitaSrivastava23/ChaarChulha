"use client";

import { useMemo, useState } from "react";
import { MenuItem, MenuCategory } from "@/types";
import { CategoryTabs } from "./CategoryTabs";
import { MenuCard } from "./MenuCard";
import { SectionDivider } from "./ChulhaMark";

interface MenuSectionProps {
  items: MenuItem[];
  categories: MenuCategory[];
}

export function MenuSection({ items, categories }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(categories[0]);

  const filteredItems = useMemo(
    () => items.filter((item) => item.category === activeCategory),
    [items, activeCategory]
  );

  return (
    <section id="menu" className="bg-cream-100 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-clay-600">
            Curated Daily
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal-900 sm:text-4xl">
            Our Menu
          </h2>
          <p className="mt-3 font-body text-[15px] text-charcoal-700">
            Home-style dishes cooked fresh every morning — pick a category to see what's ready today.
          </p>
        </div>

        <SectionDivider />

        <div className="mb-8 flex justify-center" id="tiffins">
          <CategoryTabs categories={categories} active={activeCategory} onChange={setActiveCategory} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="py-12 text-center font-body text-charcoal-700">
            Nothing listed here yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
