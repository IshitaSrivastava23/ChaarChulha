import { CartLine, CustomerDetails, OrderTotals, Order } from "@/types";

export interface OrderCreationResult {
  success: boolean;
  order?: Order;
  errorMessage?: string;
}

// ─────────────────────────────────────────────────────────────
// ORDER CREATION INTEGRATION POINT
//
// Create the order on your backend before showing the payment UI.
// This ensures you have a valid Order ID to pass to Razorpay/UPI.
// ─────────────────────────────────────────────────────────────
export async function createOrder(
  customer: CustomerDetails,
  lines: CartLine[],
  totals: OrderTotals
): Promise<OrderCreationResult> {
  console.log("[createOrder] Simulating order creation for:", { customer, lines, totals });

  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network latency

  const newOrder: Order = {
    id: `CC-${Date.now().toString().slice(-8)}`,
    customer,
    lines,
    totals,
    status: "PENDING_PAYMENT",
    createdAt: Date.now(),
  };

  return {
    success: true,
    order: newOrder,
  };
}
