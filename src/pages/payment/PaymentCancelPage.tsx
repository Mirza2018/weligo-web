// src/pages/payment/PaymentCancelPage.tsx
import { XCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  clearPendingPaymentBookingId,
  getPendingPaymentBookingId,
} from "@/lib/paymentStorage";

const BOOKINGS_PATH = "/dashboard/family/bookings";

export function PaymentCancelPage() {
  // Read once, then clear immediately - a cancelled checkout is a resolved
  // outcome, unlike the still-pending states on the success page.
  const [bookingId] = useState<string | null>(() => {
    const id = getPendingPaymentBookingId();
    clearPendingPaymentBookingId();
    return id;
  });

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-lg rounded-3xl bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <XCircle className="h-7 w-7" />
        </div>
        <h1 className="mt-5 font-serif text-2xl font-medium">Payment Cancelled</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your payment was cancelled and no payment was confirmed. You can
          return to your booking and try again.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {bookingId && (
            <Button asChild className="h-11 rounded-full px-6">
              <Link to={`${BOOKINGS_PATH}/${bookingId}`}>Return to Booking</Link>
            </Button>
          )}
          <Button
            asChild
            variant={bookingId ? "outline" : "default"}
            className="h-11 rounded-full px-6"
          >
            <Link to={BOOKINGS_PATH}>View My Bookings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
