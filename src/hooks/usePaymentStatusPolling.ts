// src/hooks/usePaymentStatusPolling.ts
import { useEffect, useRef, useState } from "react";
import { useLazyGetPaymentByBookingIdQuery } from "@/redux/api/websiteApi";
import type { PaymentStatusResponse } from "@/types/payment";

const POLL_INTERVAL_MS = 2000;
const MAX_ATTEMPTS = 15;

export type PaymentPollingState =
  | { status: "polling"; attempt: number }
  | { status: "success"; response: PaymentStatusResponse }
  | { status: "failed"; response: PaymentStatusResponse }
  | { status: "timeout" };

function extractPaymentStatus(res: PaymentStatusResponse): string | undefined {
  return res?.data?.paymentStatus ?? res?.data?.payment?.paymentStatus;
}

/**
 * Polls GET /payments/booking/:bookingId every ~2s (max 15 attempts / ~30s)
 * until the payment reaches a final state (authorized/captured -> success,
 * failed -> failed) or attempts run out (-> timeout). A single interval is
 * kept per hook instance and is always cleared on stop/unmount.
 */
export function usePaymentStatusPolling(
  bookingId: string | null,
): PaymentPollingState {
  const [trigger] = useLazyGetPaymentByBookingIdQuery();
  const [state, setState] = useState<PaymentPollingState>({
    status: "polling",
    attempt: 0,
  });

  const attemptRef = useRef(0);
  const stoppedRef = useRef(false);
  const inFlightRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!bookingId) return;

    stoppedRef.current = false;
    attemptRef.current = 0;

    function stop() {
      stoppedRef.current = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    async function poll() {
      if (stoppedRef.current || inFlightRef.current) return;
      inFlightRef.current = true;
      attemptRef.current += 1;
      setState({ status: "polling", attempt: attemptRef.current });

      try {
        const res = await trigger(bookingId).unwrap();
        if (stoppedRef.current) return;

        const paymentStatus = extractPaymentStatus(res);
        if (paymentStatus === "authorized" || paymentStatus === "captured") {
          stop();
          setState({ status: "success", response: res });
          return;
        }
        if (paymentStatus === "failed") {
          stop();
          setState({ status: "failed", response: res });
          return;
        }
      } catch {
        // Network/API error on this attempt - treated as still-pending and
        // retried on the next tick rather than surfaced immediately.
      } finally {
        inFlightRef.current = false;
      }

      if (attemptRef.current >= MAX_ATTEMPTS) {
        stop();
        setState({ status: "timeout" });
      }
    }

    poll();
    intervalRef.current = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      stop();
    };
  }, [bookingId, trigger]);

  return state;
}
