"use client";

import Image from "next/image";
import { Leaf, Flame, Plus, Minus } from "lucide-react";
import { MenuItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/pricing";

export function MenuCard({ item }: { item: MenuItem }) {
  const { lines, addItem, increment, decrement } = useCart();
  const line = lines.find((l) => l.item.id === item.id);
  const quantity = line?.quantity ?? 0;

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl border border-chaar-gold/20 bg-chaar-charcoal transition-all duration-300 hover:-translate-y-1 hover:border-chaar-gold/50 hover:shadow-gold"
    >
      {/* Food image — larger height for more visual impact */}
      <div className="relative h-52 w-full overflow-hidden bg-chaar-marble">
        <Image
          src={item.imageURL}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {item.isBestseller && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-saffron-400 px-2.5 py-1 font-body text-[11px] font-bold uppercase tracking-wide text-chaar-black">
            <Flame size={11} /> Bestseller
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Name + veg indicator */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[1.35rem] leading-snug text-chaar-cream">
            {item.name}
          </h3>
          {item.isPure && (
            <span title="Pure vegetarian" className="mt-0.5 shrink-0 text-emerald-500">
              <Leaf size={15} />
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-2 flex-1 font-body text-sm leading-6 text-chaar-cream/50">
          {item.description}
        </p>

        {/* Price + Add control */}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl text-chaar-gold">
            {formatINR(item.price)}
          </span>

          {quantity === 0 ? (
            <button
              onClick={() => addItem(item)}
              className="rounded-full border border-chaar-gold/40 px-4 py-1.5 font-body text-sm font-semibold text-chaar-gold transition-all duration-200 hover:border-chaar-gold hover:bg-chaar-gold/10 active:scale-95"
            >
              Add
            </button>
          ) : (
            // Quantity stepper — larger touch targets via padding, same visual size
            <div className="flex items-center gap-3">
              <button
                onClick={() => decrement(item.id)}
                aria-label={`Remove one ${item.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-chaar-gold/30 text-chaar-gold transition-colors hover:border-chaar-gold hover:bg-chaar-gold/10 active:scale-90"
              >
                <Minus size={14} />
              </button>
              <span className="min-w-[1.5rem] text-center font-body text-sm font-bold text-chaar-cream">
                {quantity}
              </span>
              <button
                onClick={() => increment(item.id)}
                aria-label={`Add one more ${item.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-chaar-gold text-chaar-black transition-all hover:opacity-90 active:scale-90"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
