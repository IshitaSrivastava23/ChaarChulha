"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, RotateCw } from "lucide-react";
import { HistoricalOrder } from "@/lib/order-history";
import { useCart } from "@/context/CartContext";

interface OrderHistoryCardProps {
  order: HistoricalOrder;
}

export function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { clearCart, addItem, openCart, closeHistory } = useCart();

  const handleReorder = () => {
    clearCart();
    
    // Repopulate cart
    order.items.forEach(line => {
      // Add each item multiple times based on quantity, or adjust context if it supports quantity directly.
      // Assuming addItem adds 1 quantity at a time, we loop.
      for (let i = 0; i < line.quantity; i++) {
        addItem(line.item);
      }
    });

    // Notify user visually that cart was updated by sliding it open.
    closeHistory();
    openCart();
  };

  const orderDate = new Date(order.placedAt);
  const now = new Date();
  
  const isToday = orderDate.getDate() === now.getDate() &&
    orderDate.getMonth() === now.getMonth() &&
    orderDate.getFullYear() === now.getFullYear();
    
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = orderDate.getDate() === yesterday.getDate() &&
    orderDate.getMonth() === yesterday.getMonth() &&
    orderDate.getFullYear() === yesterday.getFullYear();

  const timeStr = orderDate.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  const dateStr = isToday ? "Today" : isYesterday ? "Yesterday" : orderDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <div 
      className="flex w-full flex-col overflow-hidden rounded-2xl transition-all"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E2D5", boxShadow: "0 2px 8px rgba(44, 38, 35, 0.02)" }}
    >
      {/* Header Summary (Always Visible) */}
      <div 
        className="flex cursor-pointer flex-col p-5 sm:p-6"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <span className="font-body text-xs uppercase tracking-wider" style={{ color: "#877872" }}>
              Order ID
            </span>
            <h4 className="font-display text-lg font-semibold" style={{ color: "#2C2623" }}>
              #{order.orderId}
            </h4>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: "#FDF4F1", color: "#C85A32" }}>
              {order.status}
            </span>
            <div className="mt-1 font-body text-xs" style={{ color: "#877872" }}>
              {dateStr} • {timeStr}
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-1 font-body text-sm" style={{ color: "#5E524D" }}>
          {order.items.map((line, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span style={{ color: "#C85A32" }}>•</span>
              <span>{line.item.name} ×{line.quantity}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "#F5F2EC" }}>
          <div>
            <span className="font-body text-xs uppercase tracking-wider" style={{ color: "#877872" }}>
              Total
            </span>
            <div className="font-display text-lg font-semibold" style={{ color: "#2C2623" }}>
              ₹{order.totals.grandTotal}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-xs font-medium" style={{ color: "#877872" }}>
              {expanded ? "Hide Details" : "View Details"}
            </span>
            {expanded ? <ChevronUp size={16} color="#877872" /> : <ChevronDown size={16} color="#877872" />}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <div 
        className={`flex flex-col transition-all duration-300 ${expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{ backgroundColor: "#FAFAFA", borderTop: expanded ? "1px solid #E8E2D5" : "none" }}
      >
        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            {/* Customer Details */}
            <div className="flex flex-col gap-3">
              <div>
                <span className="font-body text-[10px] uppercase tracking-wider" style={{ color: "#877872" }}>Deliver To</span>
                <p className="font-body text-sm font-medium" style={{ color: "#2C2623" }}>{order.customer.name}</p>
                <p className="mt-0.5 font-body text-xs leading-relaxed" style={{ color: "#5E524D" }}>{order.customer.address}</p>
              </div>
              
              {order.customer.notes && (
                <div>
                  <span className="font-body text-[10px] uppercase tracking-wider" style={{ color: "#877872" }}>Instructions</span>
                  <p className="font-body text-xs italic" style={{ color: "#5E524D" }}>"{order.customer.notes}"</p>
                </div>
              )}
            </div>

            {/* Billing Breakdown */}
            <div className="flex flex-col gap-2 rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E2D5" }}>
              <div className="flex justify-between font-body text-xs" style={{ color: "#5E524D" }}>
                <span>Subtotal</span>
                <span>₹{order.totals.subtotal}</span>
              </div>
              <div className="flex justify-between font-body text-xs" style={{ color: "#5E524D" }}>
                <span>Delivery Charge</span>
                <span>₹{order.totals.deliveryFee}</span>
              </div>
              <div className="my-1 border-t" style={{ borderColor: "#F5F2EC" }} />
              <div className="flex justify-between font-body text-sm font-bold" style={{ color: "#2C2623" }}>
                <span>Grand Total</span>
                <span>₹{order.totals.grandTotal}</span>
              </div>
            </div>
            
          </div>

          <button
            onClick={handleReorder}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 font-body text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "#2C2623", color: "#FFFFFF" }}
          >
            <RotateCw size={16} />
            Reorder These Items
          </button>
        </div>
      </div>

    </div>
  );
}
