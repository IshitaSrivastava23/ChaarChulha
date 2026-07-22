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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

  const payload = {
    customer_name: customer.name,
    phone: customer.phone,
    address: customer.address,
    instructions: customer.notes || null,
    items: lines.map(line => ({
      item_id: line.item.id,
      name: line.item.name,
      quantity: line.quantity,
      price: line.item.price
    })),
    subtotal: totals.subtotal,
    delivery_charge: totals.deliveryFee,
    total_amount: totals.grandTotal
  };

  try {
    const response = await fetch(`${apiUrl}/orders/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("API Error:", errorData);
      return { success: false, errorMessage: "Failed to create order. Please try again." };
    }

    const data = await response.json();
    
    // Map the backend response back to the frontend Order type
    const newOrder: Order = {
      id: `CC${data.id}`, // Format the backend's integer ID
      customer,
      lines,
      totals,
      status: "PENDING_PAYMENT",
      createdAt: new Date(data.created_at).getTime(),
    };

    // Save to local storage for Recent Orders feature
    import("@/lib/order-history").then(({ OrderHistoryService }) => {
      OrderHistoryService.saveOrder({
        orderId: newOrder.id,
        placedAt: newOrder.createdAt,
        customer: newOrder.customer,
        items: newOrder.lines,
        totals: newOrder.totals,
        status: "Awaiting Confirmation", // Snapshot status
      });
    }).catch(err => console.warn("Could not save to order history", err));

    return { success: true, order: newOrder };
  } catch (error) {
    console.error("Network Error:", error);
    return { success: false, errorMessage: "Network error occurred. Please check your connection." };
  }
}
