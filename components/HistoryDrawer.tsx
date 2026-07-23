"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { OrderHistoryService, HistoricalOrder } from "@/lib/order-history";
import { OrderHistoryCard } from "@/components/ui/OrderHistoryCard";

export function HistoryDrawer() {
  const { isHistoryOpen, closeHistory } = useCart();
  const [orders, setOrders] = useState<HistoricalOrder[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Only read from localStorage when the drawer opens
  useEffect(() => {
    if (isHistoryOpen) {
      setOrders(OrderHistoryService.getRecentOrders());
      setExpandedOrderId(null);
    }
  }, [isHistoryOpen]);

  if (!isHistoryOpen) return null;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(44, 38, 35, 0.5)", backdropFilter: "blur(2px)" }}
        onClick={closeHistory}
        aria-hidden="true"
      />

      {/* ── Drawer panel ── */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] w-full flex-col rounded-t-3xl md:inset-x-auto md:inset-y-0 md:right-0 md:h-full md:max-w-md md:rounded-none"
        style={{ backgroundColor: "#F9F6F0", boxShadow: "0 -4px 40px rgba(44, 38, 35, 0.15)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Recent Orders History"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 bg-white"
          style={{ borderBottom: "1px solid #E8E2D5" }}
        >
          <div>
            <h2 className="font-display text-xl" style={{ color: "#2C2623" }}>
              Recent Orders
            </h2>
            {orders.length > 0 && (
              <p className="mt-0.5 font-body text-xs" style={{ color: "#877872" }}>
                {orders.length} order{orders.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <button
            onClick={closeHistory}
            aria-label="Close history"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            style={{ color: "#5E524D" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F9F6F0")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Empty state ── */}
        {orders.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center bg-white">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: "#F9F6F0" }}
            >
              <Clock size={28} style={{ color: "#877872" }} />
            </div>
            <div>
              <p className="font-display text-lg" style={{ color: "#2C2623" }}>
                No recent orders
              </p>
              <p className="mt-1 font-body text-sm" style={{ color: "#877872" }}>
                When you place an order, it will appear here.
              </p>
            </div>
            <button
              onClick={closeHistory}
              className="mt-2 rounded-full px-6 py-2 font-body text-sm font-medium transition-colors"
              style={{ border: "1px solid #E8E2D5", color: "#5E524D" }}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
            {orders.map((order, idx) => (
              <OrderHistoryCard 
                key={`${order.orderId}-${idx}`} 
                order={order}
                isExpanded={expandedOrderId === order.orderId}
                onToggle={() => setExpandedOrderId(expandedOrderId === order.orderId ? null : order.orderId)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
