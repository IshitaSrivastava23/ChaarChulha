"use client";

import { useState } from "react";
import { X, Loader2, CreditCard, MessageCircle, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/pricing";
import { createOrder } from "@/lib/payment";
import { openWhatsAppCheckout } from "@/lib/whatsapp";
import { CustomerDetails, Order } from "@/types";
import { PaymentProviderView } from "./PaymentProviderView";
import { OrderSubmittedView } from "./OrderSubmittedView";

type SubmitState = "idle" | "creating_order" | "pending_payment" | "payment_submitted" | "error";

export function CheckoutModal() {
  const { lines, totals, isCheckoutOpen, closeCheckout, clearCart } = useCart();
  const [form, setForm] = useState<CustomerDetails>({ name: "", phone: "", address: "", notes: "" });
  const [paymentState, setPaymentState] = useState<SubmitState>("idle");
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  // Strip spaces and validate phone
  const normalizedPhone = form.phone.trim().replace(/\s/g, "");
  const isFormValid =
    form.name.trim().length > 1 &&
    /^[6-9]\d{9}$/.test(normalizedPhone) &&
    form.address.trim().length > 5;

  function updateField<K extends keyof CustomerDetails>(field: K, value: CustomerDetails[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function onPayOnline() {
    if (!isFormValid) return;
    setPaymentState("creating_order");
    try {
      const result = await createOrder(
        { ...form, phone: normalizedPhone },
        lines,
        totals
      );
      if (result.success && result.order) {
        setActiveOrder(result.order);
        setPaymentState("pending_payment");
      } else {
        setPaymentState("error");
      }
    } catch (err) {
      console.error("Payment failed:", err);
      setPaymentState("error");
    }
  }

  function onWhatsAppOrder() {
    if (!isFormValid) return;
    // Open WhatsApp in a new tab and keep modal open
    openWhatsAppCheckout({ ...form, phone: normalizedPhone }, lines, totals);
    // Only clear after user sees confirmation
    clearCart();
    closeCheckout();
  }

  function handlePaymentSubmitted() {
    setPaymentState("payment_submitted");
    clearCart();
  }

  function handleClose() {
    setPaymentState("idle");
    setActiveOrder(null);
    closeCheckout();
  }

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: "rgba(44, 38, 35, 0.5)", backdropFilter: "blur(2px)" }}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ── Modal panel — always opaque ── */}
      <div
        className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl"
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0 20px 60px rgba(44, 38, 35, 0.2)",
            pointerEvents: "auto",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid #E8E2D5" }}
          >
            <h2 className="font-display text-xl" style={{ color: "#2C2623" }}>
              {paymentState === "payment_submitted" && "Order Request"}
              {paymentState === "pending_payment" && "Payment"}
              {(paymentState === "idle" || paymentState === "creating_order" || paymentState === "error") && "Checkout"}
            </h2>
            <button
              onClick={handleClose}
              aria-label="Close checkout"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{ color: "#5E524D" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F9F6F0")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <X size={20} />
            </button>
          </div>

          {/* ── Scrollable content ── */}
          <div className="overflow-y-auto" style={{ backgroundColor: "#FFFFFF" }}>

            {/* ── Dynamic States ── */}
            {paymentState === "payment_submitted" && activeOrder ? (
              <OrderSubmittedView order={activeOrder} onClose={handleClose} />
            ) : paymentState === "pending_payment" && activeOrder ? (
              <PaymentProviderView
                merchantName="Priyanka Mohit"
                upiId="priyamohit43@okicici"
                order={activeOrder}
                onSuccess={handlePaymentSubmitted}
                onCancel={() => setPaymentState("idle")}
              />
            ) : (
              <div className="px-4 py-5 sm:px-6" style={{ backgroundColor: "#FFFFFF" }}>

                {/* Delivery notice */}
                <div
                  className="mb-5 rounded-xl px-4 py-3 font-body text-xs leading-5"
                  style={{ backgroundColor: "#FDF4F1", color: "#877872" }}
                >
                  <span style={{ color: "#2C2623", fontWeight: 600 }}>Delivering within Pune city.</span>{" "}
                  Enter your details below and we'll confirm delivery availability.
                </div>

                {/* Form */}
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

                  <Field label="Phone Number" required hint="10-digit number, no country code">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="9876543210"
                      maxLength={10}
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

                  <Field label="Special Instructions (optional)">
                    <input
                      type="text"
                      value={form.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      placeholder="Less spicy, ring the bell, etc."
                      className="input-field"
                    />
                  </Field>
                </form>

                {/* Order summary */}
                <div
                  className="mt-5 flex flex-col gap-1.5 rounded-2xl p-4 font-body text-sm"
                  style={{ border: "1px solid #E8E2D5", backgroundColor: "#FAFAFA" }}
                >
                  <div className="flex justify-between" style={{ color: "#5E524D" }}>
                    <span>Subtotal</span>
                    <span>{formatINR(totals.subtotal)}</span>
                  </div>

                  <div className="flex justify-between" style={{ color: "#5E524D" }}>
                    <span>Delivery</span>
                    <span style={{ color: totals.deliveryFee === 0 ? "#657049" : "#5E524D", fontWeight: totals.deliveryFee === 0 ? 600 : 400 }}>
                      {totals.deliveryFee === 0 ? "Free" : formatINR(totals.deliveryFee)}
                    </span>
                  </div>
                  <div
                    className="mt-1.5 flex justify-between pt-2.5"
                    style={{ borderTop: "1px solid #E8E2D5", color: "#2C2623", fontWeight: 600 }}
                  >
                    <span className="font-display text-base">Grand Total</span>
                    <span className="font-display text-base">{formatINR(totals.grandTotal)}</span>
                  </div>
                </div>

                {/* Validation hint — shown before buttons */}
                {!isFormValid && (
                  <p className="mt-3 font-body text-xs" style={{ color: "#877872" }}>
                    Please enter your name, a valid 10-digit phone number, and delivery address.
                  </p>
                )}

                {/* Error state */}
                {paymentState === "error" && (
                  <div
                    className="mt-3 rounded-xl px-4 py-3 font-body text-xs"
                    style={{ backgroundColor: "#FFF0F0", color: "#B84A4A", border: "1px solid #FECACA" }}
                  >
                    Payment couldn't be completed. Please try again, or order via WhatsApp.
                  </div>
                )}

                {/* CTAs */}
                <div className="mt-5 flex flex-col gap-3 pb-6 sm:pb-2">
                  <button
                    onClick={onPayOnline}
                    disabled={!isFormValid || paymentState === "creating_order"}
                    className="flex items-center justify-center gap-2 rounded-full py-3.5 font-body text-[15px] font-semibold text-white transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ backgroundColor: "#C85A32" }}
                    onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "#AF4B26"; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#C85A32"; }}
                  >
                    {paymentState === "creating_order" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} />
                        Pay Online — {formatINR(totals.grandTotal)}
                      </>
                    )}
                  </button>

                  <button
                    onClick={onWhatsAppOrder}
                    disabled={!isFormValid}
                    className="flex items-center justify-center gap-2 rounded-full py-3.5 font-body text-[15px] font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ border: "1.5px solid #657049", color: "#657049", backgroundColor: "transparent" }}
                    onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "#F0F4EC"; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <MessageCircle size={16} />
                    Order via WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <span className="font-body text-sm font-medium" style={{ color: "#2C2623" }}>
          {label}
          {required && <span className="ml-0.5" style={{ color: "#C85A32" }}>*</span>}
        </span>
        {hint && (
          <span className="font-body text-xs" style={{ color: "#877872" }}>
            {hint}
          </span>
        )}
      </div>
      {children}
    </label>
  );
}
