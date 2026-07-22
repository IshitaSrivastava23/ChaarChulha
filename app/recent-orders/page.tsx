"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OrderHistoryService, HistoricalOrder } from "@/lib/order-history";
import { OrderHistoryCard } from "@/components/ui/OrderHistoryCard";

export default function RecentOrdersPage() {
  const [orders, setOrders] = useState<HistoricalOrder[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOrders(OrderHistoryService.getRecentOrders());
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="min-h-screen bg-brand-cream/30 pt-24 pb-20 sm:pt-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        
        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl text-brand-brown-900 sm:text-5xl">Recent Orders</h1>
          <p className="mt-4 font-body text-[15px] text-brand-brown-700">
            View your recent history and quickly reorder your favorites.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white px-6 py-16 text-center shadow-sm border border-brand-gold-muted/30">
            <div className="relative mb-6 h-40 w-40">
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(200,164,93,0.15) 0%, transparent 70%)" }}
              />
              <Image
                src="/animations/Cooking svg.svg"
                alt="Empty history"
                width={160}
                height={160}
                className="relative z-10 object-contain"
                unoptimized
              />
            </div>
            <h3 className="font-display text-2xl text-brand-brown-900">No recent orders</h3>
            <p className="mt-2 max-w-sm font-body text-brand-brown-700">
              When you place your first order, it will appear here for quick reference.
            </p>
            <Link
              href="/#menu"
              className="mt-8 rounded-full bg-brand-terracotta px-8 py-3.5 font-body text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((order, idx) => (
              <OrderHistoryCard key={`${order.orderId}-${idx}`} order={order} />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}
