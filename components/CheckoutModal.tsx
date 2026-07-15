"use client";

import { useState } from "react";
import { X, Loader2, CreditCard, MessageCircle, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/pricing";
import { handlePaymentSubmit } from "@/lib/payment";
import { openWhatsAppCheckout } from "@/lib/whatsapp";
import { CustomerDetails } from "@/types";

type SubmitState = "idle" | "paying" | "success" | "error";

export function CheckoutModal() {
  const { lines, totals, isCheckoutOpen, closeCheckout, clearCart } = useCart();

  const [form, setForm] = useState<CustomerDetails>({ name: "", phone: "", address: "", notes: "" });
  const [paymentState, setPaymentState] = useState<SubmitState>("idle");
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const isFormValid = form.name.trim().length > 1 && /^[6-9]\d{9}$/.test(form.phone.trim()) && form.address.trim().length > 5;

  function updateField<K extends keyof CustomerDetails>(field: K, value: CustomerDetails[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // ── OPTION A: Pay Online ──
  // See /lib/payment.ts for exactly where to wire in Razorpay/Stripe.
  async function onPayOnline() {
    if (!isFormValid) return;
    setPaymentState("paying");
    try {
      const result = await handlePaymentSubmit(form, lines, totals);
      if (result.success) {
        setOrderId(result.orderId ?? null);
        setPaymentState("success");
        clearCart();
      } else {
        setPaymentState("error");
      }
    } catch (err) {
      console.error("Payment failed:", err);
      setPaymentState("error");
    }
  }

  // ── OPTION B: Order via WhatsApp ──
  function onWhatsAppOrder() {
    if (!isFormValid) return;
    openWhatsAppCheckout(form, lines, totals);
    clearCart();
    closeCheckout();
  }

  function handleClose() {
    setPaymentState("idle");
    setOrderId(null);
    closeCheckout();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button
        aria-label="Close checkout"
        onClick={handleClose}
        className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-[2px]"
      />

      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-cream-50 shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-clay-100 px-6 py-4">
          <h2 className="font-display text-xl font-semibold text-charcoal-900">Checkout</h2>
          <button onClick={handleClose} aria-label="Close checkout" className="rounded-full p-1.5 hover:bg-cream-100">
            <X size={20} className="text-charcoal-800" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          {paymentState === "success" ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <CheckCircle2 size={48} className="text-sage-600" />
              <h3 className="font-display text-lg font-semibold text-charcoal-900">Order placed!</h3>
              <p className="font-body text-sm text-charcoal-700">
                {orderId ? `Order ID: ${orderId}. ` : ""}We'll send a confirmation shortly.
              </p>
              <button
                onClick={handleClose}
                className="mt-2 rounded-full bg-charcoal-900 px-6 py-2.5 font-body text-sm font-semibold text-cream-50"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <Field label="Full Name" required>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Priya Sharma"
                    className="input-field"
                  />
                </Field>

                <Field label="Phone Number" required>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="98765 43210"
                    className="input-field"
                  />
                </Field>

                <Field label="Delivery Address" required>
                  <textarea
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="Flat / Building, Street, Area, Pune"
                    rows={3}
                    className="input-field resize-none"
                  />
                </Field>

                <Field label="Notes (optional)">
                  <input
                    type="text"
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    placeholder="Less spicy, ring the bell, etc."
                    className="input-field"
                  />
                </Field>
              </form>

              <div className="mt-5 flex flex-col gap-1.5 rounded-2xl bg-white p-4 font-body text-sm text-charcoal-700">
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
                  <span>Grand Total</span>
                  <span>{formatINR(totals.grandTotal)}</span>
                </div>
              </div>

              {!isFormValid && (
                <p className="mt-3 font-body text-xs text-clay-600">
                  Enter your name, a valid 10-digit phone number, and address to continue.
                </p>
              )}
              {paymentState === "error" && (
                <p className="mt-3 font-body text-xs text-red-600">
                  Payment couldn't be completed. Please try again, or order via WhatsApp instead.
                </p>
              )}

              <div className="mt-5 flex flex-col gap-3">
                <button
                  onClick={onPayOnline}
                  disabled={!isFormValid || paymentState === "paying"}
                  className="flex items-center justify-center gap-2 rounded-full bg-clay-600 py-3.5 font-body text-[15px] font-semibold text-cream-50 shadow-warm transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {paymentState === "paying" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Processing payment…
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} /> Pay Online — {formatINR(totals.grandTotal)}
                    </>
                  )}
                </button>

                <button
                  onClick={onWhatsAppOrder}
                  disabled={!isFormValid}
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-sage-600 py-3 font-body text-[15px] font-semibold text-sage-600 transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  <MessageCircle size={18} /> Order via WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-sm font-medium text-charcoal-800">
        {label} {required && <span className="text-clay-600">*</span>}
      </span>
      {children}
    </label>
  );
}
