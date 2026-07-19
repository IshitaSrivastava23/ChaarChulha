import { menuItems } from "@/data/menuItems";
import { MenuCard } from "./MenuCard";

const sections = [
  {
    id: "starters",
    title: "Starters",
    subtitle: "Crispy bites and comforting favourites to begin your meal.",
  },
  {
    id: "sandwiches",
    title: "Sandwiches, Burgers & Wraps",
    subtitle: "Freshly grilled, generously filled and made to order.",
  },
  {
    id: "parathas",
    title: "Paratha Gali",
    subtitle: "Traditional stuffed parathas served with homemade accompaniments.",
  },
  {
    id: "main-course",
    title: "Main Course",
    subtitle: "Wholesome home-style meals prepared fresh every day.",
  },
  {
    id: "combos",
    title: "Chaar Chulha Sangam",
    subtitle: "Complete meals crafted for a satisfying experience.",
  },
  {
    id: "thalis",
    title: "Thalis",
    subtitle: "Traditional Indian thalis crafted for a complete dining experience.",
  },
  {
  id: "tiffins",
  title: "Tiffins",
  subtitle: "Nutritious daily meal plans delivered to your doorstep.",
  },
];

export function PremiumMenu() {
  return (
    <section className="bg-chaar-black py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}

        <div className="mb-20 text-center">

          <p className="text-sm uppercase tracking-[0.45em] text-chaar-gold">
            Signature Collection
          </p>

          <h2 className="mt-4 font-display text-5xl text-chaar-cream">
            Our Menu
          </h2>

          <div className="mx-auto mt-6 h-px w-32 bg-chaar-gold" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Every dish at Chaar Chulha is prepared with fresh ingredients,
            traditional recipes, and the warmth of home.
          </p>

        </div>

        {sections.map((section) => {
          const items = menuItems.filter(
            (item) => item.category === section.title
          );

          if (items.length === 0) return null;

          return (
            <section
                id={section.title}
                key={section.id}
                className="scroll-mt-32 py-24"
            >
              <div className="mb-20 text-center">

                <div className="mx-auto mb-8 h-px w-40 bg-gradient-to-r from-transparent via-[#B8923C] to-transparent" />

                <p className="uppercase tracking-[0.55em] text-sm text-chaar-gold">
                  Signature Collection
                </p>

                <h3 className="mt-5 font-display text-5xl md:text-6xl text-chaar-cream">
                  {section.title}
                </h3>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                  {section.subtitle}
                </p>

                <div className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-[#B8923C] to-transparent" />

              </div>

              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
              <div className="mt-24 mb-4 flex justify-center">
                <div className="h-px w-56 bg-gradient-to-r from-transparent via-chaar-gold/50 to-transparent" />
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}