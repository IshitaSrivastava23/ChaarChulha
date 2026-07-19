import { CheckCircle2, PhoneCall, MessageCircle } from "lucide-react";

interface PaymentSuccessViewProps {
  orderId: string;
  onClose: () => void;
}

export function PaymentSuccessView({ orderId, onClose }: PaymentSuccessViewProps) {
  return (
    <div className="flex flex-col items-center animate-fadeIn px-8 py-10 text-center">
      <div
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full shadow-sm"
        style={{ backgroundColor: "#F0F4EC", border: "4px solid #FFFFFF" }}
      >
        <CheckCircle2 size={48} style={{ color: "#657049" }} />
      </div>
      
      <h3 className="font-display text-3xl" style={{ color: "#2C2623" }}>
        Payment successful.
      </h3>
      
      <p className="mt-4 max-w-sm font-body text-[15px] leading-relaxed" style={{ color: "#5E524D" }}>
        Thank you for choosing Chaar Chulha. We've received your request and are now preparing your order with care.
      </p>

      <div
        className="mt-6 flex w-full flex-col gap-2 rounded-2xl p-5"
        style={{ backgroundColor: "#FAFAFA", border: "1px solid #E8E2D5" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-body text-xs uppercase tracking-wider" style={{ color: "#877872" }}>
            Order ID
          </span>
          <span className="font-body text-sm font-semibold" style={{ color: "#2C2623" }}>
            #{orderId}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-body text-xs uppercase tracking-wider" style={{ color: "#877872" }}>
            Est. Confirmation
          </span>
          <span className="font-body text-sm font-medium" style={{ color: "#2C2623" }}>
            Within 5 mins
          </span>
        </div>
      </div>

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

      <div className="mt-8 flex flex-col items-center gap-2">
        <span className="font-body text-xs" style={{ color: "#877872" }}>
          Need Help?
        </span>
        <div className="flex gap-4">
          <a
            href="tel:+917888037948"
            className="flex items-center gap-1.5 font-body text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "#5E524D" }}
          >
            <PhoneCall size={14} /> Call
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
