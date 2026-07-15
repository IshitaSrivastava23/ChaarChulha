import { CartLine, CustomerDetails, OrderTotals } from "@/types";

export interface PaymentResult {
  success: boolean;
  orderId?: string;
  errorMessage?: string;
}

// ─────────────────────────────────────────────────────────────
// PAYMENT GATEWAY INTEGRATION POINT
//
// This is a dummy async function that simulates a payment call.
// Replace the body with your real Razorpay/Stripe integration.
// The function signature (inputs/outputs) is designed to stay
// the same regardless of which gateway you plug in, so the UI
// layer (CheckoutModal) never needs to change.
//
// ── Razorpay (recommended default for India/UPI) ──
//   1. Create an order server-side:
//        const order = await fetch('/api/razorpay/create-order', {
//          method: 'POST',
//          body: JSON.stringify({ amount: totals.grandTotal * 100 }), // paise
//        }).then(r => r.json());
//
//   2. Open Razorpay Checkout on the client:
//        const rzp = new (window as any).Razorpay({
//          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//          amount: order.amount,
//          currency: 'INR',
//          order_id: order.id,
//          name: 'Chaar Chulha',
//          prefill: { name: customer.name, contact: customer.phone },
//          handler: (response) => { /* verify signature server-side, then resolve */ },
//        });
//        rzp.open();
//     (Load the checkout script in app/layout.tsx via <Script src="https://checkout.razorpay.com/v1/checkout.js" />)
//
//   3. Verify payment signature on your backend before marking
//      the order as paid — never trust the client-side callback alone.
//
// ── Stripe (alternative, good for cards/international) ──
//   1. Create a PaymentIntent server-side with totals.grandTotal.
//   2. Use @stripe/stripe-js + @stripe/react-stripe-js on the client
//      to collect card details and confirm the payment.
//   3. Listen for the `payment_intent.succeeded` webhook server-side
//      as the source of truth, not just the client confirmation.
//
// In both cases: this function should ultimately call YOUR backend
// (e.g. `/api/checkout`) which talks to the gateway, persists the
// order, and returns an orderId. Do not call gateway secret-key
// endpoints directly from the browser.
// ─────────────────────────────────────────────────────────────
export async function handlePaymentSubmit(
  customer: CustomerDetails,
  lines: CartLine[],
  totals: OrderTotals
): Promise<PaymentResult> {
  // TODO: replace this simulated delay + response with a real
  // fetch() call to your backend/payment gateway as described above.
  console.log("[handlePaymentSubmit] Simulating payment for:", { customer, lines, totals });

  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulated success response — swap for the real gateway result.
  return {
    success: true,
    orderId: `CC-${Date.now().toString().slice(-8)}`,
  };
}
