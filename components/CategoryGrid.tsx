"use client";

import {
  Soup,
  Sandwich,
  Pizza,
  CookingPot,
  UtensilsCrossed,
  BriefcaseBusiness,
  ArrowRight,
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
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="bg-chaar-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.45em] text-chaar-gold">
            Our Menu
          </p>

          <h2 className="font-display text-5xl text-chaar-cream">
            Explore Chaar Chulha
          </h2>

          <div className="mx-auto mt-6 h-px w-28 bg-chaar-gold" />

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400">
            Every meal is prepared with authentic recipes, fresh ingredients,
            and the warmth of a traditional Indian kitchen.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category.title}
              type="button"
              onClick={() => scrollToSection(category.title)}
              className="group relative cursor-pointer overflow-hidden rounded-luxury border border-chaar-gold/40 bg-marble p-8 text-left shadow-card transition-all duration-500 hover:-translate-y-3 hover:border-chaar-gold hover:shadow-goldLg focus:outline-none focus:ring-2 focus:ring-chaar-gold"
            >
              {/* Decorative Border */}
              <div className="pointer-events-none absolute inset-3 rounded-[20px] border border-chaar-gold/20" />

              {/* Corners */}
              <span className="absolute left-4 top-4 h-5 w-5 border-l border-t border-chaar-gold" />
              <span className="absolute right-4 top-4 h-5 w-5 border-r border-t border-chaar-gold" />
              <span className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-chaar-gold" />
              <span className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-chaar-gold" />

              {/* Icon */}
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border-2 border-chaar-gold bg-chaar-charcoal transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-gold">
                <category.icon
                  size={42}
                  strokeWidth={1.6}
                  className="text-chaar-gold"
                />
              </div>

              {/* Title */}
              <h3 className="text-center font-display text-3xl text-chaar-cream">
                {category.title}
              </h3>

              {/* Divider */}
              <div className="mx-auto my-6 h-px w-16 bg-chaar-gold" />

              {/* Description */}
              <p className="text-center leading-7 text-gray-400">
                {category.desc}
              </p>

              {/* Footer */}
              <div className="mt-10 flex items-center justify-center gap-2 font-semibold tracking-wide text-chaar-gold transition-all duration-300 group-hover:gap-4">
                <span>Explore Menu</span>

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}