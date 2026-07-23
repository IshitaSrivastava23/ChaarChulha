"use client";

import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/pricing";

export function CartDrawer() {
  const { lines, isCartOpen, closeCart, increment, decrement, removeItem, totals, openCheckout } = useCart();

  if (!isCartOpen) return null;

  const totalItems = lines.reduce((s, l) => s + l.quantity, 0);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(44, 38, 35, 0.5)", backdropFilter: "blur(2px)" }}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* ── Drawer panel — always opaque white ── */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] w-full flex-col rounded-t-3xl md:inset-x-auto md:inset-y-0 md:right-0 md:h-full md:max-w-md md:rounded-none"
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0 -4px 40px rgba(44, 38, 35, 0.15)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid #E8E2D5" }}
        >
          <div>
            <h2 className="font-display text-xl" style={{ color: "#2C2623" }}>
              Your Cart
            </h2>
            {lines.length > 0 && (
              <p className="mt-0.5 font-body text-xs" style={{ color: "#877872" }}>
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            style={{ color: "#5E524D" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F9F6F0")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Empty state ── */}
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: "#F9F6F0" }}
            >
              <ShoppingBag size={28} style={{ color: "#877872" }} />
            </div>
            <div>
              <p className="font-display text-lg" style={{ color: "#2C2623" }}>
                Your cart is empty
              </p>
              <p className="mt-1 font-body text-sm" style={{ color: "#877872" }}>
                Add something warm and homely.
              </p>
            </div>
            <button
              onClick={closeCart}
              className="mt-2 rounded-full px-6 py-2 font-body text-sm font-medium transition-colors"
              style={{ border: "1px solid #E8E2D5", color: "#5E524D" }}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            {/* ── Line items ── */}
            <div className="flex-1 overflow-y-auto px-5 py-2" style={{ backgroundColor: "#FFFFFF" }}>
              <ul className="flex flex-col">
                {lines.map(({ item, quantity }) => (
                  <li
                    key={item.id}
                    className="flex gap-3 py-4"
                    style={{ borderBottom: "1px solid #F3D2BC" }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl"
                      style={{ backgroundColor: "#F5EAD9" }}
                    >
                      {item.imageURL ? (
                        <Image
                          src={item.imageURL}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        /* Placeholder when no image is available */
                        <div
                          className="flex h-full w-full items-center justify-center"
                          style={{ backgroundColor: "#F5EAD9" }}
                        >
                          <span className="font-display text-lg" style={{ color: "#C85A32" }}>
                            {item.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-body text-sm font-semibold leading-snug" style={{ color: "#2C2623" }}>
                          {item.name}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="shrink-0 rounded p-0.5 transition-colors"
                          style={{ color: "#877872" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#C85A32")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#877872")}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="font-body text-sm font-semibold" style={{ color: "#C85A32" }}>
                          {formatINR(item.price * quantity)}
                        </p>

                        {/* Quantity stepper */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrement(item.id)}
                            aria-label={`Remove one ${item.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
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
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                            style={{ backgroundColor: "#2C2623", color: "#FFFFFF" }}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Free delivery nudge */}
              {totals.subtotal < 499 && totals.subtotal > 0 && (
                <div
                  className="mt-3 rounded-xl px-4 py-2.5 font-body text-xs"
                  style={{ backgroundColor: "#FDF4F1", color: "#C85A32" }}
                >
                  Add ₹{499 - totals.subtotal} more for{" "}
                  <span className="font-semibold">free delivery</span>
                </div>
              )}
            </div>

            {/* ── Order summary + checkout ── */}
            <div
              className="px-5 py-4"
              style={{
                borderTop: "1px solid #E8E2D5",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div className="flex flex-col gap-1.5 font-body text-sm">
                <div className="flex justify-between" style={{ color: "#5E524D" }}>
                  <span>Subtotal</span>
                  <span>{formatINR(totals.subtotal)}</span>
                </div>

                <div className="flex justify-between" style={{ color: "#5E524D" }}>
                  <span>Delivery</span>
                  <span style={{ color: totals.deliveryFee === 0 ? "#657049" : "#5E524D", fontWeight: totals.deliveryFee === 0 ? 600 : 400 }}>
                    {totals.deliveryFee === 0 ? "Free 🎉" : formatINR(totals.deliveryFee)}
                  </span>
                </div>
                <div
                  className="mt-2 flex justify-between pt-2.5"
                  style={{ borderTop: "1px solid #E8E2D5", color: "#2C2623", fontWeight: 600 }}
                >
                  <span className="font-display text-base">Total</span>
                  <span className="font-display text-base">{formatINR(totals.grandTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={openCheckout}
                className="mt-4 w-full rounded-full py-3.5 font-body text-[15px] font-semibold text-white transition-all duration-200 active:scale-[0.98]"
                style={{ backgroundColor: "#C85A32" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#AF4B26")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#C85A32")}
              >
                Proceed to Checkout · {formatINR(totals.grandTotal)}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
