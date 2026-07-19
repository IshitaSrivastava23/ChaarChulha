import { Briefcase, Cake, Users, Cat, ConciergeBell } from "lucide-react";

const cateringOptions = [
  {
    title: "Tiffins",
    description: "Daily nutritious & homemade tiffin services.",
    icon: Briefcase,
  },
  {
    title: "Birthday Parties",
    description: "Delicious food to make your celebrations special.",
    icon: Cake,
  },
  {
    title: "Get Togethers",
    description: "Perfect food for family & friends get togethers.",
    icon: Users,
  },
  {
    title: "Kitty Parties",
    description: "Exclusive menus for your kitty party gatherings.",
    icon: Cat,
  },
  {
    title: "Customised Thali",
    description: "Events and all occasions.",
    icon: ConciergeBell,
  },
];

export function CateringSection() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#F9F6F0" }}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="font-body text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#C85A32" }}
          >
            We Cater To
          </p>
          <h2
            className="mt-3 font-display text-4xl sm:text-5xl"
            style={{ color: "#2C2623" }}
          >
            Every Moment!
          </h2>
          
          <div className="mt-6 flex items-center justify-center gap-2" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#F0C96C" }} />
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#C85A32" }} />
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#F0C96C" }} />
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#C85A32" }} />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {cateringOptions.map((option, idx) => {
            const Icon = option.icon;
            return (
              <div
                key={idx}
                className="group flex w-full max-w-sm flex-col items-center rounded-2xl p-8 text-center transition-all hover:-translate-y-1 sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8E2D5",
                  boxShadow: "0 2px 8px rgba(44, 38, 35, 0.04)",
                }}
              >
                <div
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-full transition-colors group-hover:bg-[#C85A32] group-hover:text-white"
                  style={{ backgroundColor: "#F5EAD9", color: "#C85A32" }}
                >
                  <Icon size={28} />
                </div>
                <h3 className="font-display text-xl" style={{ color: "#2C2623" }}>
                  {option.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: "#5E524D" }}>
                  {option.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
