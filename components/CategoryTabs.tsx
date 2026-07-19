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
            className="shrink-0 rounded-full px-5 py-2.5 font-body text-sm font-semibold transition-colors"
            style={
              isActive
                ? { backgroundColor: "#C85A32", color: "#FFFFFF", border: "1px solid #C85A32" }
                : { backgroundColor: "#FFFFFF", color: "#5E524D", border: "1px solid #E8E2D5" }
            }
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
