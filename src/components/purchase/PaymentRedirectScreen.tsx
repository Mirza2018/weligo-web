// src/components/purchase/PaymentRedirectScreen.tsx
import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface PaymentRedirectScreenProps {
  redirectUrl: string;
  bookingReference: string;
  totalLabel: string;
  providerPath: string; // /services/:serviceId/providers/:providerId
}

const COUNTDOWN_SECONDS = 3;

export function PaymentRedirectScreen({
  redirectUrl,
  bookingReference,
  totalLabel,
  providerPath,
}: PaymentRedirectScreenProps) {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [cancelled, setCancelled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (cancelled) return;

    if (secondsLeft <= 0) {
      // Same-tab redirect to the payment gateway - not a new window/tab.
      window.location.href = redirectUrl;
      return;
    }

    timerRef.current = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [secondsLeft, cancelled, redirectUrl]);

  function handleCancel() {
    setCancelled(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-card p-8 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <ShieldCheck className="h-7 w-7" />
      </div>

      <h1 className="mt-5 font-serif text-2xl font-medium">Booking created</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Reference <span className="font-mono">{bookingReference}</span> &middot;{" "}
        {totalLabel}
      </p>

      {!cancelled ? (
        <>
          <p className="mt-6 text-sm text-foreground">
            Taking you to secure payment in{" "}
            <span className="font-semibold text-primary">{secondsLeft}</span>
            {secondsLeft === 1 ? " second…" : " seconds…"}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => (window.location.href = redirectUrl)}
              className="h-11 rounded-full px-6"
            >
              Continue now
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="h-11 rounded-full px-6"
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-6 text-sm text-muted-foreground">
            No problem - your booking is saved as pending. You can complete
            payment any time from your bookings, or head to the provider page or
            home.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => (window.location.href = redirectUrl)}
              className="h-11 rounded-full px-6"
            >
              Actually, pay now
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(providerPath)}
              className="h-11 rounded-full px-6"
            >
              Back to provider
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="h-11 rounded-full px-6"
            >
              Home
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
