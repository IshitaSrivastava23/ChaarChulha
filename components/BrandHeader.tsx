import Image from "next/image";

export function BrandHeader() {
  return (
    <section className="relative overflow-hidden bg-chaar-cream pt-32 pb-20">

      {/* Large Ambient Glow */}
      <div
        aria-hidden
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(184,146,60,0.10),transparent_72%)]
        "
      />

      {/* Soft Gold Aura */}
      <div
        aria-hidden
        className="
          absolute
          left-1/2
          top-10
          h-[720px]
          w-[720px]
          -translate-x-1/2
          rounded-full
          bg-gold-400/10
          blur-[140px]
        "
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center px-6">

        {/* Brand Emblem */}

        <div className="relative">

          {/* Halo */}

          <div
            className="
              absolute
              inset-0
              scale-[1.8]
              rounded-full
              bg-gold-400/25
              blur-[120px]
            "
          />

          <Image
              src="/LogoEmblem.png"
              alt="Chaar Chulha"
              width={420}
              height={420}
              priority
              className="
                relative
                w-80
                md:w-[24rem]
                lg:w-[30rem]
                xl:w-[34rem]
                h-auto
                drop-shadow-[0_35px_70px_rgba(184,146,60,0.45)]
                transition-transform
                duration-700
                hover:scale-105
              "
          />

        </div>

        {/* Brand Name */}

        <h1
          className="
            mt-8
            font-display
            text-6xl
            md:text-7xl
            lg:text-[5.8rem]
            leading-none
            tracking-[0.08em]
            text-charcoal-900
          "
        >
          Chaar Chulha
        </h1>

        {/* Subtitle */}

        <p
          className="
            mt-8
            uppercase
            tracking-[0.8em]
            font-semibold
            text-[13px]
            text-gold-500
          "
        >
          PREMIUM CLOUD KITCHEN
        </p>

        {/* Tagline */}

        <p
          className="
            mt-8
            max-w-xl
            font-display
            text-[2rem]
            italic
            text-charcoal-700
          "
        >
          Crafting Culinary Traditions
        </p>

        {/* Luxury Divider */}

        <div className="mt-14 flex items-center gap-5">

          <div className="h-px w-40 bg-gradient-to-r from-transparent via-gold-400 to-gold-300" />

          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30">

            <div className="h-2 w-2 rounded-full bg-gold-500" />

          </div>

          <div className="h-px w-40 bg-gradient-to-l from-transparent via-gold-400 to-gold-300" />

        </div>

      </div>
    </section>
  );
}