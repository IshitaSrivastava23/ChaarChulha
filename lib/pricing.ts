import { CartLine, OrderTotals } from "@/types";

// ─────────────────────────────────────────────────────────────
// Centralized pricing rules. Change GST rate / delivery fee /
// free-delivery threshold here — nothing else in the app should
// hardcode these numbers.
// ─────────────────────────────────────────────────────────────
const GST_RATE = 0.05; // 5% — typical for restaurant/food delivery in India. Confirm with your CA.
const BASE_DELIVERY_FEE = 25;
const FREE_DELIVERY_THRESHOLD = 499;

export function calculateSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
}

export function calculateTotals(lines: CartLine[]): OrderTotals {
  const subtotal = calculateSubtotal(lines);
  const tax = 0; // GST removed per user request
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : BASE_DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  return { subtotal, tax, deliveryFee, grandTotal };
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
