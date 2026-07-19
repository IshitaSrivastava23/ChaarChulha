import { PhoneCall, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Order } from "@/types";

interface OrderSubmittedViewProps {
  order: Order;
  onClose: () => void;
}

export function OrderSubmittedView({ order, onClose }: OrderSubmittedViewProps) {
  return (
    <div className="flex flex-col items-center animate-fadeIn px-6 py-8 text-center sm:px-10">
      
      {/* Premium Illustration */}
      <div className="relative mb-6 flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44">
        {/* Soft background glow */}
        <div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(200,164,93,0.15) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <Image
          src="/animations/Cooking svg.svg"
          alt="Chef preparing order"
          width={200}
          height={200}
          className="relative z-10 h-full w-full object-contain"
          unoptimized
        />
      </div>
      
      <h3 className="font-display text-2xl sm:text-3xl" style={{ color: "#2C2623" }}>
        Payment Request Submitted
      </h3>
      
      <p className="mt-3 max-w-sm font-body text-sm leading-relaxed sm:text-[15px]" style={{ color: "#5E524D" }}>
        Thank you for choosing Chaar Chulha. We'll manually verify your payment shortly and begin preparing your order.
      </p>

      {/* Order Context */}
      <div
        className="mt-6 flex w-full flex-col gap-2 rounded-2xl p-4 sm:p-5"
        style={{ backgroundColor: "#FAFAFA", border: "1px solid #E8E2D5" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-body text-xs uppercase tracking-wider" style={{ color: "#877872" }}>
            Order ID
          </span>
          <span className="font-body text-sm font-semibold" style={{ color: "#2C2623" }}>
            #{order.id}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-body text-xs uppercase tracking-wider" style={{ color: "#877872" }}>
            Status
          </span>
          <span className="font-body text-sm font-medium" style={{ color: "#C85A32" }}>
            Pending Verification
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex w-full flex-col gap-3">
        <button
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-full py-3.5 font-body text-[15px] font-semibold text-white transition-all active:scale-[0.98]"
          style={{ backgroundColor: "#C85A32" }}
        >
          Continue Browsing
        </button>
        <button
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-full py-3.5 font-body text-[15px] font-semibold transition-all active:scale-[0.98]"
          style={{ border: "1px solid #E8E2D5", color: "#2C2623" }}
        >
          Track Order
        </button>
      </div>

      {/* Support / Contact */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <span className="font-body text-xs" style={{ color: "#877872" }}>
          Need Help?
        </span>
        <div className="flex gap-5">
          <a
            href="tel:+917888037948"
            className="flex items-center gap-1.5 font-body text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "#5E524D" }}
          >
            <PhoneCall size={14} /> Call Us
          </a>
          <a
            href="https://wa.me/917888037948"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-body text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "#657049" }}
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
