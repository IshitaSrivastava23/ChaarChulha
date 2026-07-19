import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";
import { ChulhaMark } from "./ChulhaMark";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-brand-ivory -mt-8 pt-10 pb-24"
    >
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">

        {/* ── LEFT COPY ── */}
        <div className="animate-slideUp">

          {/* Eyebrow badge */}
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-brand-gold-muted bg-white px-4 py-2">
            <ChulhaMark className="h-4 w-4" animate />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.4em] text-brand-gold">
              Four Chulhas · One Tradition
            </span>
          </div>

          {/* Italic sub-heading */}
          <p className="font-display text-lg italic text-brand-gold">
            Handcrafted with Tradition
          </p>

          {/* Main heading — tightened leading for better rhythm */}
          <h2 className="mt-4 font-display text-5xl leading-[1.05] text-brand-brown-900 sm:text-6xl md:text-[4.25rem]">
            Authentic
            <br />
            Home-Style Meals
            <br />
            Delivered Fresh
            <span className="text-brand-terracotta"> Across Pune</span>
          </h2>

          {/* Thin gold rule */}
          <div className="mt-7 h-px w-24 bg-brand-gold opacity-60" />

          {/* Description */}
          <p className="mt-7 max-w-xl font-body text-[17px] leading-8 text-brand-brown-700">
            Every meal begins with carefully selected ingredients, traditional
            family recipes, and the warmth of an Indian kitchen. Whether you're
            ordering lunch for today, dinner for your family, or a monthly
            tiffin — every dish is freshly prepared and thoughtfully delivered
            across Pune.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-terracotta px-7 py-3.5 font-body text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-terracotta-hover active:scale-95"
            >
              Explore Menu
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="/menu/tiffin-subscription"
              className="inline-flex items-center rounded-full border border-brand-gold-muted px-7 py-3.5 font-body text-[15px] font-semibold text-brand-brown-900 transition-all duration-200 hover:border-brand-gold hover:bg-white active:scale-95"
            >
              View Tiffin Plans
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2.5 text-sm font-medium text-brand-brown-700">
            {["Freshly Prepared Daily", "Traditional Recipes", "Delivered Across Pune"].map(
              (label) => (
                <div key={label} className="flex items-center gap-2">
                  <Leaf size={14} className="text-brand-olive shrink-0" />
                  {label}
                </div>
              )
            )}
          </div>
        </div>

        {/* ── RIGHT IMAGE ── */}
        <div
          className="relative flex justify-center animate-slideUp"
          style={{ animationDelay: "0.12s" }}
        >
          {/* Single clean border frame — removes the double-border noise */}
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-brand-gold-muted shadow-lg">
            <Image
              src="/hero-food.png"
              alt="Premium Chaar Chulha Thali — freshly prepared home-style meal"
              width={700}
              height={875}
              priority
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
