import { useState, useEffect } from "react";
import { Copy, Check, Info, Loader2 } from "lucide-react";
import { formatINR } from "@/lib/pricing";

interface UpiPaymentViewProps {
  merchantName: string;
  upiId: string;
  amount: number;
  orderId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpiPaymentView({
  merchantName,
  upiId,
  amount,
  orderId,
  onSuccess,
  onCancel,
}: UpiPaymentViewProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Generate the standard UPI intent URI
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(orderId)}`;

  useEffect(() => {
    // Basic mobile detection
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
      setIsMobile(true);
    }
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleComplete() {
    setVerifying(true);
    // Simulate verification delay
    setTimeout(() => {
      onSuccess();
    }, 2500);
  }

  return (
    <div className="flex flex-col animate-fadeIn px-6 py-5">
      <div className="mb-4 text-center">
        <h3 className="font-display text-2xl" style={{ color: "#2C2623" }}>
          Pay Securely
        </h3>
        <p className="mt-1 font-body text-sm" style={{ color: "#5E524D" }}>
          Complete your payment using any UPI app.
        </p>
      </div>

      <div
        className="mb-6 flex items-center justify-between rounded-xl px-5 py-4"
        style={{ backgroundColor: "#FAFAFA", border: "1px solid #E8E2D5" }}
      >
        <div className="flex flex-col gap-1">
          <span className="font-body text-xs uppercase tracking-wider" style={{ color: "#877872" }}>
            Order Total
          </span>
          <span className="font-display text-2xl" style={{ color: "#2C2623" }}>
            {formatINR(amount)}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-body text-xs uppercase tracking-wider" style={{ color: "#877872" }}>
            Order ID
          </span>
          <span className="font-body text-sm font-semibold" style={{ color: "#5E524D" }}>
            #{orderId}
          </span>
        </div>
      </div>

      {isMobile ? (
        <div className="mb-6 flex flex-col items-center">
          <a
            href={upiUri}
            className="mb-4 flex w-full items-center justify-center rounded-full py-4 font-body text-base font-semibold text-white transition-all active:scale-[0.98]"
            style={{ backgroundColor: "#C85A32", boxShadow: "0 4px 14px rgba(200, 90, 50, 0.3)" }}
          >
            Open UPI App
          </a>
          <div className="flex items-center gap-2 font-body text-xs" style={{ color: "#877872" }}>
            <span className="h-px w-8" style={{ backgroundColor: "#E8E2D5" }} />
            <span>or scan QR</span>
            <span className="h-px w-8" style={{ backgroundColor: "#E8E2D5" }} />
          </div>
          <div className="mt-4 overflow-hidden rounded-xl bg-white p-2" style={{ border: "1px solid #E8E2D5" }}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUri)}`}
              alt="UPI Payment QR Code"
              className="h-32 w-32 object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="mb-6 flex flex-col items-center justify-center">
          <div
            className="relative overflow-hidden rounded-2xl bg-white p-4"
            style={{ border: "1px solid #E8E2D5", boxShadow: "0 8px 24px rgba(44, 38, 35, 0.05)" }}
          >
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(upiUri)}`}
              alt="UPI Payment QR Code"
              className="h-48 w-48 object-contain sm:h-56 sm:w-56"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 font-body text-xs font-medium" style={{ color: "#5E524D" }}>
            <span>Google Pay</span>
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: "#C8A45D" }} />
            <span>PhonePe</span>
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: "#C8A45D" }} />
            <span>Paytm</span>
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: "#C8A45D" }} />
            <span>BHIM</span>
          </div>
        </div>
      )}

      <div
        className="mb-8 flex items-center justify-between rounded-xl px-4 py-3"
        style={{ backgroundColor: "#F9F6F0" }}
      >
        <div className="flex flex-col">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#877872" }}>
            UPI ID
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

      <div className="flex flex-col gap-3">
        <button
          onClick={handleComplete}
          disabled={verifying}
          className="flex items-center justify-center gap-2 rounded-full py-4 font-body text-[15px] font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          style={{ backgroundColor: "#2C2623" }}
        >
          {verifying ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Verifying payment...
            </>
          ) : (
            "I've Completed Payment"
          )}
        </button>
        <button
          onClick={onCancel}
          disabled={verifying}
          className="flex items-center justify-center rounded-full py-3.5 font-body text-sm font-semibold transition-colors hover:bg-gray-50 disabled:opacity-50"
          style={{ color: "#5E524D" }}
        >
          Cancel Payment
        </button>
      </div>
    </div>
  );
}
