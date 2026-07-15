import { CartLine, CustomerDetails, OrderTotals } from "@/types";
import { formatINR } from "./pricing";

// ─────────────────────────────────────────────────────────────
// Business WhatsApp number for order intake.
// Format: country code + number, no "+", no spaces/dashes.
// ─────────────────────────────────────────────────────────────
const WHATSAPP_BUSINESS_NUMBER = "917888037948";

/**
 * Builds a clean, readable order summary string for WhatsApp.
 * Kept as a pure function (no DOM/window access) so it's easy
 * to unit test independently of the checkout UI.
 */
export function buildWhatsAppMessage(
  customer: CustomerDetails,
  lines: CartLine[],
  totals: OrderTotals
): string {
  const itemLines = lines
    .map((line) => `• ${line.quantity}x ${line.item.name} — ${formatINR(line.item.price * line.quantity)}`)
    .join("\n");

  const message = [
    "*New Order — Chaar Chulha*",
    "",
    `*Name:* ${customer.name}`,
    `*Phone:* ${customer.phone}`,
    `*Address:* ${customer.address}`,
    customer.notes ? `*Notes:* ${customer.notes}` : null,
    "",
    "*Items:*",
    itemLines,
    "",
    `Subtotal: ${formatINR(totals.subtotal)}`,
    `Tax: ${formatINR(totals.tax)}`,
    `Delivery: ${totals.deliveryFee === 0 ? "Free" : formatINR(totals.deliveryFee)}`,
    `*Grand Total: ${formatINR(totals.grandTotal)}*`,
  ]
    .filter(Boolean)
    .join("\n");

  return message;
}

/**
 * Opens WhatsApp (app on mobile, web.whatsapp.com on desktop)
 * with the order pre-filled in the message box.
 */
export function openWhatsAppCheckout(customer: CustomerDetails, lines: CartLine[], totals: OrderTotals) {
  const text = buildWhatsAppMessage(customer, lines, totals);
  const url = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
