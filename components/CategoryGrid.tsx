import Link from "next/link";
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
    href: "/menu/starters",
    icon: Soup,
    desc: "Snacks, Maggi, Fries & More",
  },
  {
    title: "Sandwiches, Burgers & Wraps",
    href: "/menu/sandwiches-burgers-wraps",
    icon: Sandwich,
    desc: "Grilled Sandwiches & Rolls",
  },
  {
    title: "Paratha Gali",
    href: "/menu/paratha-gali",
    icon: Pizza,
    desc: "Stuffed North Indian Parathas",
  },
  {
    title: "Main Course",
    href: "/menu/main-course",
    icon: CookingPot,
    desc: "Fresh Home-style Meals",
  },
  {
    title: "Chaar Chulha Sangam",
    href: "/menu/chaar-chulha-sangam",
    icon: UtensilsCrossed,
    desc: "Combos & Special Meals",
  },
  {
    title: "Tiffin Subscription",
    href: "/menu/tiffin-subscription",
    icon: BriefcaseBusiness,
    desc: "Monthly Meal Plans",
  },
];

export function CategoryGrid() {
  return (
    <section className="bg-chaar-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <p className="mb-3 uppercase tracking-[0.45em] text-sm text-chaar-gold">
            Our Menu
          </p>

          <h2 className="font-display text-5xl text-chaar-cream">
            Explore Chaar Chulha
          </h2>

          <div className="mx-auto mt-6 h-px w-28 bg-chaar-gold"></div>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400">
            Every meal is prepared with authentic recipes, fresh ingredients,
            and the warmth of a traditional Indian kitchen.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-luxury border border-chaar-gold/40 bg-marble p-8 shadow-card transition-all duration-500 ease-luxury hover:-translate-y-3 hover:border-chaar-gold hover:shadow-goldLg"
            >
              {/* Decorative Outer Border */}
              <div className="pointer-events-none absolute inset-3 rounded-[20px] border border-chaar-gold/20"></div>

              {/* Corner Decorations */}
              <span className="absolute left-4 top-4 h-5 w-5 border-l border-t border-chaar-gold"></span>

              <span className="absolute right-4 top-4 h-5 w-5 border-r border-t border-chaar-gold"></span>

              <span className="absolute bottom-4 left-4 h-5 w-5 border-l border-b border-chaar-gold"></span>

              <span className="absolute bottom-4 right-4 h-5 w-5 border-r border-b border-chaar-gold"></span>

              {/* Icon */}
              <div
                className="
                  mx-auto
                  mb-8
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-chaar-gold
                  bg-chaar-charcoal
                  transition-all
                  duration-500
                  group-hover:scale-110
                  group-hover:rotate-6
                  group-hover:shadow-gold
                "
              >
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
              <div className="mx-auto my-6 h-px w-16 bg-chaar-gold"></div>

              {/* Description */}
              <p className="text-center leading-7 text-gray-400">
                {category.desc}
              </p>

              {/* Button */}
              <div className="mt-10 flex items-center justify-center gap-2 font-semibold tracking-wide text-chaar-gold transition-all duration-300 group-hover:gap-4">
                <span>Explore Menu</span>

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}