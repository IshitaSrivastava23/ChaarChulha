"use client";

import { MenuCategory } from "@/types";

interface CategoryTabsProps {
  categories: MenuCategory[];
  active: MenuCategory;
  onChange: (category: MenuCategory) => void;
}

export function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Menu categories"
    >
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={`shrink-0 rounded-full border px-5 py-2.5 font-body text-sm font-semibold transition-colors ${
              isActive
                ? "border-clay-600 bg-clay-600 text-cream-50"
                : "border-clay-100 bg-white text-charcoal-700 hover:border-clay-400"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
