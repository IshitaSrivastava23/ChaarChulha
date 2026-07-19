"use client";

import Image from "next/image";
import { Leaf, Flame, Plus, Minus } from "lucide-react";
import { MenuItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/pricing";

// Category placeholder colors for when imageURL is empty
const CATEGORY_COLORS: Record<string, string> = {
  "Starters": "#C85A32",
  "Sandwiches, Burgers & Wraps": "#C26E3D",
  "Paratha Gali": "#8D6B2F",
  "Main Course": "#657049",
  "Chaar Chulha Sangam": "#C85A32",
  "Thalis": "#8D6B2F",
  "Tiffins": "#5E524D",
};

export function MenuCard({ item }: { item: MenuItem }) {
  const { lines, addItem, increment, decrement } = useCart();
  const line = lines.find((l) => l.item.id === item.id);
  const quantity = line?.quantity ?? 0;
  const placeholderColor = CATEGORY_COLORS[item.category] ?? "#C85A32";

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8E2D5",
        boxShadow: "0 2px 8px rgba(44, 38, 35, 0.04)",
      }}
    >
      {/* Food image — 208px height for visual prominence */}
      <div
        className="relative h-52 w-full overflow-hidden"
        style={{ backgroundColor: "#F5EAD9" }}
      >
        {item.imageURL ? (
          <Image
            src={item.imageURL}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          /* Elegant placeholder when no photo is provided */
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2"
            style={{ backgroundColor: "#F9F6F0" }}
          >
            <span
              className="font-display text-4xl"
              style={{ color: placeholderColor, opacity: 0.6 }}
            >
              {item.name.split(" ").map(w => w.charAt(0)).join("").slice(0, 2)}
            </span>
            <span
              className="font-body text-xs uppercase tracking-widest"
              style={{ color: "#C8A45D", opacity: 0.7 }}
            >
              {item.category}
            </span>
          </div>
        )}

        {/* Bestseller badge */}
        {item.isBestseller && (
          <span
            className="absolute left-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 font-body text-[11px] font-bold uppercase tracking-wide"
            style={{ backgroundColor: "#F0C96C", color: "#2C2623" }}
          >
            <Flame size={11} /> Bestseller
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Name + veg indicator */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[1.25rem] leading-snug" style={{ color: "#2C2623" }}>
            {item.name}
          </h3>
          {item.isPure && (
            <span title="Pure vegetarian" className="mt-0.5 shrink-0">
              <Leaf size={15} style={{ color: "#657049" }} />
            </span>
          )}
        </div>

        {/* Description */}
        {item.description && item.description !== "Plate" ? (
          <p className="mt-1.5 flex-1 font-body text-sm leading-6" style={{ color: "#877872" }}>
            {item.description}
          </p>
        ) : item.description === "Plate" ? (
          <p className="mt-1.5 flex-1 font-body text-xs" style={{ color: "#C8A45D" }}>
            Served as a plate
          </p>
        ) : null}

        {/* Price + Add control */}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl" style={{ color: "#2C2623" }}>
            {formatINR(item.price)}
          </span>

          {quantity === 0 ? (
            <button
              onClick={() => addItem(item)}
              className="rounded-full px-4 py-2 font-body text-sm font-semibold transition-all duration-200 active:scale-95"
              style={{
                border: "1.5px solid #C85A32",
                color: "#C85A32",
                backgroundColor: "transparent",
                minHeight: "36px",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#C85A32";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#C85A32";
              }}
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrement(item.id)}
                aria-label={`Remove one ${item.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors active:scale-90"
                style={{ borderColor: "#E8E2D5", color: "#5E524D" }}
              >
                <Minus size={13} />
              </button>
              <span
                className="min-w-[1.5rem] text-center font-body text-sm font-bold"
                style={{ color: "#2C2623" }}
              >
                {quantity}
              </span>
              <button
                onClick={() => increment(item.id)}
                aria-label={`Add one more ${item.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-all active:scale-90"
                style={{ backgroundColor: "#C85A32", color: "#FFFFFF" }}
              >
                <Plus size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
