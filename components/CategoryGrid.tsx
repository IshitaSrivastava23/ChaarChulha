"use client";

import {
  Soup,
  Sandwich,
  Pizza,
  CookingPot,
  UtensilsCrossed,
  BriefcaseBusiness,
} from "lucide-react";

const categories = [
  {
    title: "Starters",
    icon: Soup,
    desc: "Snacks, Maggi, Fries & More",
  },
  {
    title: "Sandwiches, Burgers & Wraps",
    icon: Sandwich,
    desc: "Grilled Sandwiches & Rolls",
  },
  {
    title: "Paratha Gali",
    icon: Pizza,
    desc: "Stuffed North Indian Parathas",
  },
  {
    title: "Main Course",
    icon: CookingPot,
    desc: "Fresh Home-style Meals",
  },
  {
    title: "Chaar Chulha Sangam",
    icon: UtensilsCrossed,
    desc: "Combos & Special Meals",
  },
  {
    title: "Thalis",
    icon: UtensilsCrossed,
    desc: "Traditional Indian Thalis",
  },
  {
    title: "Tiffins",
    icon: BriefcaseBusiness,
    desc: "Monthly Meal Plans",
  },
];

export function CategoryGrid() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="menu" className="bg-chaar-black py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section heading */}
        <div className="mb-14 text-center">
          <p className="font-body text-xs uppercase tracking-[0.5em] text-chaar-gold">
            Our Menu
          </p>
          <h2 className="mt-3 font-display text-4xl text-chaar-cream md:text-5xl">
            Explore Chaar Chulha
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-base leading-7 text-chaar-cream/50">
            Every meal is prepared with authentic recipes, fresh ingredients,
            and the warmth of a traditional Indian kitchen.
          </p>
        </div>

        {/* Category cards — clean grid, no decorative flourishes */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.title}
              type="button"
              onClick={() => scrollToSection(category.title)}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-chaar-gold/20 bg-chaar-charcoal/60 px-6 py-8 text-center transition-all duration-200 hover:border-chaar-gold/60 hover:-translate-y-1 hover:bg-chaar-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chaar-gold"
            >
              {/* Icon container */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-chaar-gold/30 bg-chaar-marble transition-colors duration-200 group-hover:border-chaar-gold/70">
                <category.icon
                  size={26}
                  strokeWidth={1.5}
                  className="text-chaar-gold"
                />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl text-chaar-cream leading-snug">
                {category.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-chaar-cream/50 leading-relaxed">
                {category.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}