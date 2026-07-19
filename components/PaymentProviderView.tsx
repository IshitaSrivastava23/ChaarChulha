import { useState, useEffect } from "react";
import { Copy, Check, Loader2, Info } from "lucide-react";
import { formatINR } from "@/lib/pricing";
import { Order } from "@/types";

interface PaymentProviderViewProps {
  order: Order;
  merchantName: string;
  upiId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PaymentProviderView({
  order,
  merchantName,
  upiId,
  onSuccess,
  onCancel,
}: PaymentProviderViewProps) {
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // Generate standard UPI intent URI
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&am=${order.totals.grandTotal.toFixed(2)}&cu=INR&tn=${encodeURIComponent(order.id)}`;

  function handleCopy() {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleComplete() {
    setSubmitting(true);
    // Simulate payment submission (e.g., checking backend webhook/status)
    setTimeout(() => {
      onSuccess();
    }, 2000);
  }

  return (
    <div className="flex flex-col animate-fadeIn px-6 py-5">
      <div className="mb-4 text-center">
        <h3 className="font-display text-2xl" style={{ color: "#2C2623" }}>
          Complete Payment
        </h3>
        <p className="mt-1 font-body text-sm" style={{ color: "#5E524D" }}>
          Please complete your payment within <span className="font-semibold text-[#C85A32]">{timeString}</span>
        </p>
      </div>

      {/* Payment Summary */}
      <div
        className="mb-6 flex flex-col gap-2 rounded-xl px-5 py-4"
        style={{ backgroundColor: "#FAFAFA", border: "1px solid #E8E2D5" }}
      >
        <div className="flex justify-between font-body text-[13px]" style={{ color: "#5E524D" }}>
          <span>Order Reference</span>
          <span className="font-semibold" style={{ color: "#2C2623" }}>#{order.id}</span>
        </div>
        <div className="my-2 h-px w-full" style={{ backgroundColor: "#E8E2D5" }} />
        <div className="flex justify-between font-body text-[13px]" style={{ color: "#5E524D" }}>
          <span>Subtotal</span>
          <span>{formatINR(order.totals.subtotal)}</span>
        </div>
        <div className="flex justify-between font-body text-[13px]" style={{ color: "#5E524D" }}>
          <span>Taxes & Delivery</span>
          <span>{formatINR(order.totals.tax + order.totals.deliveryFee)}</span>
        </div>
        <div className="mt-1 flex justify-between font-display text-lg font-semibold" style={{ color: "#2C2623" }}>
          <span>Amount to Pay</span>
          <span>{formatINR(order.totals.grandTotal)}</span>
        </div>
      </div>

      {/* Capability-First Payment Options (Both Deep link & QR) */}
      <div className="mb-6 flex flex-col items-center">
        {/* Deep Link (Primary for mobile browsers) */}
        <a
          href={upiUri}
          className="mb-4 flex w-full items-center justify-center rounded-full py-3.5 font-body text-base font-semibold text-white transition-all active:scale-[0.98]"
          style={{ backgroundColor: "#C85A32", boxShadow: "0 4px 14px rgba(200, 90, 50, 0.3)" }}
        >
          Open UPI App
        </a>

        <div className="flex items-center gap-2 font-body text-xs" style={{ color: "#877872" }}>
          <span className="h-px w-8" style={{ backgroundColor: "#E8E2D5" }} />
          <span>or scan to pay</span>
          <span className="h-px w-8" style={{ backgroundColor: "#E8E2D5" }} />
        </div>

        {/* QR Code (Fallback/Desktop) */}
        <div className="mt-4 flex flex-col items-center justify-center">
          <div
            className="overflow-hidden rounded-2xl bg-white p-3"
            style={{ border: "1px solid #E8E2D5", boxShadow: "0 8px 24px rgba(44, 38, 35, 0.05)" }}
          >
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUri)}`}
              alt="UPI Payment QR Code"
              className="h-32 w-32 object-contain sm:h-40 sm:w-40"
            />
          </div>
        </div>
      </div>

      {/* Manual UPI ID Copy */}
      <div
        className="mb-8 flex items-center justify-between rounded-xl px-4 py-3"
        style={{ backgroundColor: "#F9F6F0" }}
      >
        <div className="flex flex-col">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#877872" }}>
            Paying to
          </span>
          <span className="font-body text-sm font-medium" style={{ color: "#2C2623" }}>
            {upiId}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex h-9 min-w-[72px] items-center justify-center gap-1.5 rounded-lg px-3 font-body text-xs font-semibold transition-colors"
          style={{
            backgroundColor: copied ? "#F0F4EC" : "#FFFFFF",
            color: copied ? "#657049" : "#C85A32",
            border: `1px solid ${copied ? "#657049" : "#C85A32"}`,
          }}
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleComplete}
          disabled={submitting || timeLeft <= 0}
          className="flex items-center justify-center gap-2 rounded-full py-4 font-body text-[15px] font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          style={{ backgroundColor: "#2C2623" }}
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Submitting payment...
            </>
          ) : (
            "I've Completed Payment"
          )}
        </button>
        <button
          onClick={onCancel}
          disabled={submitting}
          className="flex items-center justify-center rounded-full py-3.5 font-body text-sm font-semibold transition-colors hover:bg-gray-50 disabled:opacity-50"
          style={{ color: "#5E524D" }}
        >
          Cancel Payment
        </button>
      </div>
    </div>
  );
}
