// src/pages/payment/PaymentSuccessPage.tsx
import { CheckCircle2, CircleAlert, Clock, Loader2, XCircle } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePaymentStatusPolling } from "@/hooks/usePaymentStatusPolling";
import { formatBookingDate, formatTimeRange } from "@/lib/bookingHelpers";
import { formatCHF } from "@/lib/format";
import {
  clearPendingPaymentBookingId,
  getPendingPaymentBookingId,
} from "@/lib/paymentStorage";
import type { PaymentStatusResponse } from "@/types/payment";

const BOOKINGS_PATH = "/dashboard/family/bookings";
const SUPPORT_PATH = "/dashboard/family/help";

export function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // Read once on mount - stable for the life of this page even if it's
  // cleared later (success/failed) so we don't lose the id mid-poll.
  const [bookingId] = useState<string | null>(() => getPendingPaymentBookingId());

  const polling = usePaymentStatusPolling(bookingId);

  useEffect(() => {
    if (polling.status === "success" || polling.status === "failed") {
      clearPendingPaymentBookingId();
    }
  }, [polling.status]);

  if (!bookingId) {
    return (
      <PageShell>
        <StatusCard
          tone="muted"
          icon={CircleAlert}
          title="We couldn't identify this payment"
          description="We couldn't identify the booking associated with this payment. Please check your bookings or contact support."
          actions={
            <>
              <PrimaryLink to={BOOKINGS_PATH}>View My Bookings</PrimaryLink>
              <OutlineLink to={SUPPORT_PATH}>Contact Support</OutlineLink>
            </>
          }
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      {polling.status === "polling" && <ConfirmingCard sessionId={sessionId} />}
      {polling.status === "success" && (
        <SuccessCard response={polling.response} bookingId={bookingId} />
      )}
      {polling.status === "failed" && <FailedCard response={polling.response} />}
      {polling.status === "timeout" && <TimeoutCard bookingId={bookingId} />}
    </PageShell>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-12">
      {children}
    </div>
  );
}

function ConfirmingCard({ sessionId }: { sessionId: string | null }) {
  return (
    <StatusCard
      tone="sky"
      icon={Loader2}
      iconClassName="animate-spin"
      title="Confirming your payment"
      description="Please wait while we confirm your payment. This usually takes just a few seconds - please don't close this page or pay again."
      footnote={sessionId ? `Session: ${sessionId}` : undefined}
    />
  );
}

function SuccessCard({
  response,
  bookingId,
}: {
  response: PaymentStatusResponse;
  bookingId: string;
}) {
  const data = response?.data;
  const payment = data?.payment ?? data;
  const booking =
    typeof data?.booking === "object" ? data.booking : undefined;

  const amount = payment?.amount ?? booking?.paymentAmount;
  const currency = payment?.currency;
  const providerName =
    booking && typeof booking.serviceProvider === "object"
      ? booking.serviceProvider?.fullName
      : undefined;

  const rows: Array<{ label: string; value: ReactNode }> = [];
  if (booking?.bookingReference)
    rows.push({ label: "Booking reference", value: booking.bookingReference });
  if (providerName) rows.push({ label: "Provider", value: providerName });
  if (booking?.bookingDate)
    rows.push({ label: "Date", value: formatBookingDate(booking.bookingDate) });
  if (booking?.timeSlot?.startTime && booking?.timeSlot?.endTime)
    rows.push({
      label: "Time",
      value: formatTimeRange({
        startTime: booking.timeSlot.startTime,
        endTime: booking.timeSlot.endTime,
      }),
    });
  if (amount != null)
    rows.push({
      label: "Amount",
      value: currency ? `${currency} ${amount}` : formatCHF(amount, true),
    });
  if (payment?.paymentStatus)
    rows.push({ label: "Payment status", value: payment.paymentStatus });

  return (
    <StatusCard
      tone="emerald"
      icon={CheckCircle2}
      title="Payment Successful"
      description="Your payment has been confirmed successfully. Your booking is now being processed."
      actions={
        <>
          <PrimaryLink to={`${BOOKINGS_PATH}/${bookingId}`}>View Booking</PrimaryLink>
          <OutlineLink to={BOOKINGS_PATH}>View My Bookings</OutlineLink>
        </>
      }
    >
      {rows.length > 0 && (
        <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-border bg-secondary/30 p-4 text-left text-sm">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-medium text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </StatusCard>
  );
}

function FailedCard({ response }: { response: PaymentStatusResponse }) {
  return (
    <StatusCard
      tone="red"
      icon={XCircle}
      title="Payment Failed"
      description={
        response?.message ||
        "We couldn't confirm your payment. Please try again or contact support."
      }
      actions={
        <>
          <PrimaryLink to={BOOKINGS_PATH}>View My Bookings</PrimaryLink>
          <OutlineLink to={SUPPORT_PATH}>Contact Support</OutlineLink>
        </>
      }
    />
  );
}

function TimeoutCard({ bookingId }: { bookingId: string }) {
  return (
    <StatusCard
      tone="amber"
      icon={Clock}
      title="Payment Confirmation Pending"
      description="We haven't received final confirmation yet. Please check your bookings shortly. If your payment was deducted, please do not make another payment until the payment status is confirmed."
      actions={
        <>
          <PrimaryLink to={`${BOOKINGS_PATH}/${bookingId}`}>View Booking</PrimaryLink>
          <OutlineLink to={SUPPORT_PATH}>Contact Support</OutlineLink>
        </>
      }
    />
  );
}

const TONE_CLASSES: Record<string, string> = {
  sky: "bg-sky-100 text-sky-600",
  emerald: "bg-emerald-100 text-emerald-600",
  red: "bg-red-100 text-red-600",
  amber: "bg-amber-100 text-amber-600",
  muted: "bg-muted text-muted-foreground",
};

function StatusCard({
  tone,
  icon: Icon,
  iconClassName,
  title,
  description,
  footnote,
  actions,
  children,
}: {
  tone: keyof typeof TONE_CLASSES;
  icon: typeof CheckCircle2;
  iconClassName?: string;
  title: string;
  description: string;
  footnote?: string;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-lg rounded-3xl bg-card p-8 text-center shadow-sm">
      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${TONE_CLASSES[tone]}`}
      >
        <Icon className={`h-7 w-7 ${iconClassName ?? ""}`} />
      </div>
      <h1 className="mt-5 font-serif text-2xl font-medium">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {footnote && (
        <p className="mt-4 font-mono text-xs break-all text-muted-foreground/70">
          {footnote}
        </p>
      )}
      {children}
      {actions && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}

function PrimaryLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Button asChild className="h-11 rounded-full px-6">
      <Link to={to}>{children}</Link>
    </Button>
  );
}

function OutlineLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Button asChild variant="outline" className="h-11 rounded-full px-6">
      <Link to={to}>{children}</Link>
    </Button>
  );
}
