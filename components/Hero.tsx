"use client";

import { ArrowRight, Leaf } from "lucide-react";
import { ChulhaMark } from "./ChulhaMark";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden -mt-8 pt-10 pb-20"
      style={{ backgroundColor: "#F9F6F0" }}
    >
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center">

        {/* ── LEFT COPY ── */}
        <div className="animate-slideUp">

          {/* Eyebrow badge */}
          <div
            className="mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
            style={{ border: "1px solid #E8E2D5", backgroundColor: "#FFFFFF" }}
          >
            <ChulhaMark className="h-4 w-4" animate />
            <span
              className="font-body text-[11px] font-semibold uppercase"
              style={{ letterSpacing: "0.4em", color: "#C8A45D" }}
            >
              Four Chulhas · One Tradition
            </span>
          </div>

          {/* Main heading */}
          <h2
            className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl md:text-[4rem]"
            style={{ color: "#2C2623" }}
          >
            Authentic
            <br />
            Home-Style Meals
            <br />
            Delivered Fresh
            <span style={{ color: "#C85A32" }}> Across Pune</span>
          </h2>

          {/* Tagline */}
          <p className="mt-5 font-display text-2xl italic tracking-wide" style={{ color: "#C85A32" }}>
            "Ghar jaisa swaad, har order ke saath"
          </p>

          {/* Thin rule */}
          <div
            className="mt-6 h-px w-20"
            style={{ backgroundColor: "#C8A45D", opacity: 0.5 }}
          />

          {/* Description */}
          <p
            className="mt-6 max-w-xl font-body text-[16px] leading-8"
            style={{ color: "#5E524D" }}
          >
            Every meal begins with carefully selected ingredients, traditional
            family recipes, and the warmth of an Indian kitchen. Whether
            you're ordering lunch for today, dinner for your family, or a
            monthly tiffin — every dish is freshly prepared and thoughtfully
            delivered across Pune.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#menu"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-all duration-200 active:scale-95"
              style={{ backgroundColor: "#C85A32" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#AF4B26")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#C85A32")}
            >
              Explore Menu
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#tiffins"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 font-body text-[15px] font-semibold transition-all duration-200 active:scale-95"
              style={{
                border: "1px solid #E8E2D5",
                color: "#2C2623",
                backgroundColor: "transparent",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#C8A45D";
                e.currentTarget.style.backgroundColor = "#FFFFFF";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#E8E2D5";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              View Tiffin Plans
            </a>
          </div>

          {/* Trust signals */}
          <div
            className="mt-7 flex flex-wrap gap-x-7 gap-y-2.5 font-body text-sm font-medium"
            style={{ color: "#5E524D" }}
          >
            {["Freshly Prepared Daily", "Traditional Recipes", "Delivered Across Pune"].map(
              (label) => (
                <div key={label} className="flex items-center gap-2">
                  <Leaf size={13} style={{ color: "#657049" }} className="shrink-0" />
                  {label}
                </div>
              )
            )}
          </div>
        </div>

        {/* ── RIGHT — Cooking SVG animation ── */}
        <div
          className="relative flex items-center justify-center animate-slideUp"
          style={{ animationDelay: "0.12s" }}
        >
          {/* Soft warm glow behind the illustration */}
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(200,164,93,0.12) 0%, transparent 70%)",
              transform: "scale(1.2)",
            }}
            aria-hidden="true"
          />

          {/* The cooking animation — fills its natural square frame */}
          <div className="relative w-full max-w-lg">
            <Image
              src="/animations/Cooking svg.svg"
              alt="Chef cooking fresh homely food at Chaar Chulha"
              width={600}
              height={600}
              priority
              className="h-auto w-full"
              unoptimized
            />
          </div>
        </div>

      </div>
    </section>
  );
}
