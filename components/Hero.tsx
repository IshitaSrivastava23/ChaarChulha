import { ArrowRight, Leaf } from "lucide-react";
import { ChulhaMark } from "./ChulhaMark";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream-50">
      {/* Heat-shimmer glow — the hero's atmospheric signature, echoing warmth off a stove */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-br from-saffron-300/40 via-clay-400/20 to-transparent blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 md:grid-cols-2 md:items-center md:px-8 md:pb-24 md:pt-16">
        <div className="animate-rise">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-clay-100 bg-white/70 px-3.5 py-1.5">
            <ChulhaMark className="h-4 w-4" animate />
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-clay-600">
              Pune's home-style kitchen
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] text-charcoal-900 sm:text-5xl md:text-[3.4rem]">
            Fresh, Homely Meals
            <br />
            Delivered in <span className="text-clay-600">Pune</span>
          </h1>

          <p className="mt-5 max-w-md font-body text-[17px] leading-relaxed text-charcoal-700">
            Tiffins, breakfast, lunch, and dinner made the way your mother makes it — pure ingredients,
            honest recipes, no shortcuts. From our chulha to your table.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-clay-600 px-7 py-3.5 font-body text-[15px] font-semibold text-cream-50 shadow-warm transition-transform hover:scale-[1.03] active:scale-95"
            >
              Order Now
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <div className="flex items-center gap-2 font-body text-sm text-charcoal-700">
              <Leaf size={16} className="text-sage-600" />
              Pure & honest ingredients, always
            </div>
          </div>
        </div>

        {/* HERO IMAGE PLACEHOLDER — swap the backgroundImage URL in the
            style prop below for your own photography (a plated thali or
            the kitchen in action works best). Recommended: 1000x1200px,
            warm/natural lighting. */}
        <div className="relative animate-rise" style={{ animationDelay: "0.15s" }}>
          <div
            className="aspect-[4/5] w-full rounded-[2rem] bg-cover bg-center shadow-warm"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop')",
            }}
            role="img"
            aria-label="A home-style Maharashtrian thali"
          />
          <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card sm:-left-8">
            <ChulhaMark className="h-8 w-8" />
            <div>
              <p className="font-display text-sm font-semibold text-charcoal-900">4 kitchens, 1 promise</p>
              <p className="font-body text-xs text-charcoal-700">Cooked fresh, every single day</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
