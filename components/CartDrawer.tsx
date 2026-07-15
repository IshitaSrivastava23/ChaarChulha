"use client";

import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/pricing";

export function CartDrawer() {
  const { lines, isCartOpen, closeCart, increment, decrement, removeItem, totals, openCheckout } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <button
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-[2px]"
      />

      {/* Drawer panel */}
      <div className="relative flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl">
        <div className="flex items-center justify-between border-b border-clay-100 px-5 py-4">
          <h2 className="font-display text-xl font-semibold text-charcoal-900">Your Cart</h2>
          <button onClick={closeCart} aria-label="Close cart" className="rounded-full p-1.5 hover:bg-cream-100">
            <X size={20} className="text-charcoal-800" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag size={40} className="text-clay-200" />
            <p className="font-body text-charcoal-700">Your cart is empty — add something warm and homely.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {lines.map(({ item, quantity }) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream-100">
                      <Image src={item.imageURL} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-body text-sm font-semibold text-charcoal-900">{item.name}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="text-charcoal-700/50 hover:text-clay-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p className="font-body text-sm text-clay-600">{formatINR(item.price)}</p>
                      <div className="mt-1.5 flex items-center gap-2.5">
                        <button
                          onClick={() => decrement(item.id)}
                          aria-label={`Remove one ${item.name}`}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-cream-100 text-clay-600 active:scale-90"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="min-w-[1rem] text-center font-body text-xs font-bold text-charcoal-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => increment(item.id)}
                          aria-label={`Add one more ${item.name}`}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-cream-100 text-clay-600 active:scale-90"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-clay-100 px-5 py-4">
              <div className="flex flex-col gap-1.5 font-body text-sm text-charcoal-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatINR(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST)</span>
                  <span>{formatINR(totals.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{totals.deliveryFee === 0 ? "Free" : formatINR(totals.deliveryFee)}</span>
                </div>
                <div className="mt-1 flex justify-between border-t border-clay-100 pt-2 font-display text-base font-semibold text-charcoal-900">
                  <span>Total</span>
                  <span>{formatINR(totals.grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={openCheckout}
                className="mt-4 w-full rounded-full bg-clay-600 py-3.5 font-body text-[15px] font-semibold text-cream-50 shadow-warm transition-transform hover:scale-[1.02] active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
