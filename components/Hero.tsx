import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";
import { ChulhaMark } from "./ChulhaMark";

export function Hero() {
  return (
    <section
      id="top"
      className="
        relative
        overflow-hidden
        bg-chaar-cream
        -mt-8
        pt-6
        pb-24
      "
    >
      {/* Warm glow connecting the Brand Header and Hero */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[520px]
          w-[520px]
          -translate-x-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(184,146,60,0.12),transparent_70%)]
          blur-3xl
        "
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:items-center">

        {/* LEFT SIDE */}

        <div className="animate-rise">

          {/* Premium Badge */}

          <div
            className="
              mb-8
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-gold-300/40
              bg-white/70
              px-5
              py-2.5
              backdrop-blur
            "
          >
            <ChulhaMark
              className="h-5 w-5"
              animate
            />

            <span
              className="
                font-body
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.45em]
                text-gold-500
              "
            >
              Four Chulhas • One Tradition
            </span>
          </div>

          {/* Mini Heading */}

          <p
            className="
              font-display
              text-xl
              italic
              text-gold-500
            "
          >
            Handcrafted with Tradition
          </p>

          {/* Main Heading */}

          <h2
            className="
              mt-5
              font-display
              text-5xl
              leading-[0.95]
              text-charcoal-900
              sm:text-6xl
              md:text-[4.6rem]
            "
          >
            Authentic
            <br />

            Home-Style Meals

            <br />

            Delivered Fresh

            <span className="text-gold-500">
              {" "}Across Pune
            </span>

          </h2>

          {/* Divider */}

          <div className="mt-8 flex items-center gap-4">

            <div className="h-px w-16 bg-gold-400" />

            <div className="h-2 w-2 rounded-full bg-gold-500" />

            <div className="h-px w-24 bg-gold-400" />

          </div>

          {/* Description */}

          <p
            className="
              mt-8
              max-w-xl
              font-body
              text-lg
              leading-9
              text-charcoal-700
            "
          >
            Every meal begins with carefully selected ingredients,
            traditional family recipes and the warmth of an Indian kitchen.

            Whether you're ordering lunch for today,
            dinner for your family or a monthly tiffin,
            every dish is freshly prepared and thoughtfully delivered across Pune.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-5">

            <a
              href="#menu"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-gold-500
                px-8
                py-4
                font-body
                font-semibold
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
              "
            >

              Explore Menu

              <ArrowRight
                size={18}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />

            </a>

            <a
              href="/menu/tiffin-subscription"
              className="
                rounded-full
                border
                border-gold-400
                px-8
                py-4
                font-body
                font-semibold
                text-gold-500
                transition
                hover:bg-white
              "
            >
              View Tiffin Plans
            </a>

          </div>

          {/* Highlights */}

          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-x-8
              gap-y-3
              text-sm
              font-medium
              text-charcoal-700
            "
          >

            <div className="flex items-center gap-2">

              <Leaf
                size={15}
                className="text-sage-600"
              />

              Freshly Prepared Daily

            </div>

            <div className="flex items-center gap-2">

              <Leaf
                size={15}
                className="text-sage-600"
              />

              Traditional Recipes

            </div>

            <div className="flex items-center gap-2">

              <Leaf
                size={15}
                className="text-sage-600"
              />

              Delivered Across Pune

            </div>

          </div>

        </div>

        {/* IMAGE */}

        <div
          className="relative flex justify-center animate-rise"
          style={{ animationDelay: "0.15s" }}
        >

          {/* Soft Gold Glow */}

          <div
            className="
              absolute
              inset-0
              rounded-full
              bg-[radial-gradient(circle,rgba(193,154,73,0.12),transparent_70%)]
              blur-3xl
              scale-125
            "
          />

          {/* Decorative Border */}

          <div
            className="
              relative
              rounded-[42px]
              border
              border-gold-300/40
              bg-white/40
              p-3
              shadow-2xl
              backdrop-blur
            "
          >

            <div
              className="
                rounded-[34px]
                border
                border-gold-300/40
                overflow-hidden
              "
            >

              <Image
                src="/hero-food.png"
                alt="Premium Chaar Chulha Thali"
                width={700}
                height={900}
                priority
                className="
                  aspect-[4/5]
                  object-cover
                  transition
                  duration-700
                  hover:scale-105
                "
              />

            </div>

          </div>

          {/* Premium Floating Card */}

          <div
            className="
              absolute
              -bottom-8
              left-1/2
              -translate-x-1/2
              rounded-3xl
              bg-white/95
              border
              border-gold-200
              px-8
              py-5
              shadow-2xl
              backdrop-blur
            "
          >

            <div className="flex items-center gap-6">

              <div className="text-center">

                <p className="font-display text-2xl text-gold-500">
                  Freshly
                </p>

                <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal-600">
                  Prepared Daily
                </p>

              </div>

              <div className="h-10 w-px bg-gold-200" />

              <div className="text-center">

                <p className="font-display text-2xl text-gold-500">
                  Homestyle
                </p>

                <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal-600">
                  Traditional Taste
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

// import { ArrowRight, Leaf } from "lucide-react";
// import { ChulhaMark } from "./ChulhaMark";

// export function Hero() {
//   return (
//     <section id="top" className="relative overflow-hidden bg-cream-50">
//       {/* Heat-shimmer glow — the hero's atmospheric signature, echoing warmth off a stove */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-br from-saffron-300/40 via-clay-400/20 to-transparent blur-3xl"
//       />

//       <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 md:grid-cols-2 md:items-center md:px-8 md:pb-24 md:pt-16">
//         <div className="animate-rise">
//           <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-clay-100 bg-white/70 px-3.5 py-1.5">
//             <ChulhaMark className="h-4 w-4" animate />
//             <span className="font-body text-xs font-semibold uppercase tracking-wider text-clay-600">
//               Pune's home-style kitchen
//             </span>
//           </div>

//           <h1 className="font-display text-4xl font-semibold leading-[1.08] text-charcoal-900 sm:text-5xl md:text-[3.4rem]">
//             Fresh, Homely Meals
//             <br />
//             Delivered in <span className="text-clay-600">Pune</span>
//           </h1>

//           <p className="mt-5 max-w-md font-body text-[17px] leading-relaxed text-charcoal-700">
//             Tiffins, breakfast, lunch, and dinner made the way your mother makes it — pure ingredients,
//             honest recipes, no shortcuts. From our chulha to your table.
//           </p>

//           <div className="mt-8 flex flex-wrap items-center gap-4">
//             <a
//               href="#menu"
//               className="group inline-flex items-center gap-2 rounded-full bg-clay-600 px-7 py-3.5 font-body text-[15px] font-semibold text-cream-50 shadow-warm transition-transform hover:scale-[1.03] active:scale-95"
//             >
//               Order Now
//               <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
//             </a>
//             <div className="flex items-center gap-2 font-body text-sm text-charcoal-700">
//               <Leaf size={16} className="text-sage-600" />
//               Pure & honest ingredients, always
//             </div>
//           </div>
//         </div>

//         {/* HERO IMAGE PLACEHOLDER — swap the backgroundImage URL in the
//             style prop below for your own photography (a plated thali or
//             the kitchen in action works best). Recommended: 1000x1200px,
//             warm/natural lighting. */}
//         <div className="relative animate-rise" style={{ animationDelay: "0.15s" }}>
//           <div
//             className="aspect-[4/5] w-full rounded-[2rem] bg-cover bg-center shadow-warm"
//             style={{
//               backgroundImage:
//                 "url('https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop')",
//             }}
//             role="img"
//             aria-label="A home-style Maharashtrian thali"
//           />
//           <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card sm:-left-8">
//             <ChulhaMark className="h-8 w-8" />
//             <div>
//               <p className="font-display text-sm font-semibold text-charcoal-900">Cooked fresh, every single day</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
