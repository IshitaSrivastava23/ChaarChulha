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
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-warm">
      <div className="relative h-44 w-full overflow-hidden bg-cream-100">
        {/* IMAGE SOURCE: item.imageURL — replace mock URLs in /data/menuItems.ts */}
        <Image
          src={item.imageURL}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.isBestseller && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-saffron-400 px-2.5 py-1 font-body text-[11px] font-bold uppercase tracking-wide text-charcoal-900">
            <Flame size={11} /> Bestseller
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight text-charcoal-900">{item.name}</h3>
          {item.isPure && (
            <span title="Pure ingredients" className="mt-1 shrink-0 text-sage-600">
              <Leaf size={16} />
            </span>
          )}
        </div>

        <p className="mt-1.5 line-clamp-2 font-body text-sm leading-relaxed text-charcoal-700">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-clay-600">{formatINR(item.price)}</span>

          {quantity === 0 ? (
            <button
              onClick={() => addItem(item)}
              className="rounded-full bg-charcoal-900 px-4 py-2 font-body text-sm font-semibold text-cream-50 transition-transform hover:scale-105 active:scale-95"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-full bg-clay-50 px-1.5 py-1.5">
              <button
                onClick={() => decrement(item.id)}
                aria-label={`Remove one ${item.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-clay-600 shadow-sm active:scale-90"
              >
                <Minus size={14} />
              </button>
              <span className="min-w-[1.2rem] text-center font-body text-sm font-bold text-charcoal-900">
                {quantity}
              </span>
              <button
                onClick={() => increment(item.id)}
                aria-label={`Add one more ${item.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-clay-600 text-cream-50 shadow-sm active:scale-90"
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
