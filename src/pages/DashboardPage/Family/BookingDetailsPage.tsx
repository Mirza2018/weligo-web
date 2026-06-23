import { useState } from "react";
// import { Link, useRouter } from "@tanstack/react-router";
// import { getBooking, type Booking, type Review } from "@/assets/data/bookings";
// import { SectionCard } from "@/components/common/SectionCard";
// import { UserAvatar } from "@/components/common/UserAvatar";
// import { SendMessageDialog } from "@/components/Dashboard/Family/SendMessageDialog";
// import { Button } from "@/components/ui/button";
// import { formatCHF } from "@/lib/format";
// import { useI18n } from "@/lib/i18n";
// import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Check,
  CircleAlert,
  Download,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Star,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "../../../lib/i18n";
import { getBooking, type Booking } from "../../../assets/data/bookings";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SendMessageDialog } from "../../../components/Dashboard/Family/SendMessageDialog";
import { UserAvatar } from "../../../components/common/UserAvatar";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { SectionCard } from "../../../components/common/SectionCard";
import { formatCHF } from "../../../lib/format";
// import type { Review } from "@/assets/data/reviews";

export function BookingDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { t } = useI18n();
  const router = useNavigate();
  const booking = getBooking(id ?? "");
  const [msgOpen, setMsgOpen] = useState(false);

  if (!booking) {
    return (
      <div className="mx-auto max-w-7xl py-12 text-center">
        <h2 className="font-serif text-2xl">Booking not found</h2>
        <Link
          to="/dashboard/family/bookings"
          className="mt-4 inline-block text-sm text-primary hover:underline"
        >
          Back to bookings
        </Link>
      </div>
    );
  }

  const firstName = booking.providerName.split(" ")[0];

  return (
    <div className=" flex  flex-col gap-5">
      <div>
        <button
          type="button"
          onClick={() => router(-1)}
          aria-label="Back"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl font-medium tracking-tight">
            {t("details.bookingHeading")} {booking.code}
          </h2>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            {t("details.bookedOn")} {booking.date} · {booking.paymentMethod} ·{" "}
            <span className="text-emerald-600">paid</span>
          </p>
        </div>
        {booking.paid && (
          <span className="inline-flex h-9 items-center rounded-md bg-emerald-500 px-4 text-sm font-medium text-white">
            {t("bookingStatus.paid")}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <ProviderCard booking={booking} onMessage={() => setMsgOpen(true)} />
          <BookingDetailsCard booking={booking} />
          <PaymentCard booking={booking} />
        </div>

        <div className="flex flex-col gap-5">
          <ActionsPanel
            booking={booking}
            firstName={firstName}
            onMessage={() => setMsgOpen(true)}
          />
          {booking.status === "completed" && booking.reviews && (
            <ReviewsPanel reviews={booking.reviews} firstName={firstName} />
          )}
        </div>
      </div>

      <SendMessageDialog
        open={msgOpen}
        onOpenChange={setMsgOpen}
        recipientName={booking.providerName}
      />
    </div>
  );
}

/* ---------------- Provider header ---------------- */

function ProviderCard({
  booking,
  onMessage,
}: {
  booking: Booking;
  onMessage: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        <UserAvatar
          name={booking.providerName}
          size={96}
          className="h-24 w-24 text-xl"
        />
        <div className="flex-1">
          <h3 className="font-serif text-2xl font-medium text-foreground">
            {booking.providerName}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-sm">
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <span className="font-medium text-foreground">
              {booking.providerRating}
            </span>
            <span className="text-muted-foreground">
              ({booking.providerReviewCount} reviews)
            </span>
          </div>
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {booking.providerLocation} · {booking.providerDistanceKm}km away
          </p>
          <div className="mt-3 inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
            {booking.service}
          </div>
          <div className="mt-4">
            <Button onClick={onMessage} className="h-9 gap-2 rounded-lg px-4">
              <MessageCircle className="h-4 w-4" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Booking details ---------------- */

function DetailRow({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-border py-3 last:border-b-0",
        className,
      )}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

function BookingDetailsCard({ booking }: { booking: Booking }) {
  const { t } = useI18n();
  return (
    <SectionCard title={t("details.bookingDetails")}>
      <div className="flex flex-col">
        <DetailRow label={t("details.service")} value={booking.service} />
        <DetailRow label={t("details.date")} value={booking.date} />
        <DetailRow label={t("details.time")} value={booking.time} />
        <DetailRow label={t("details.duration")} value={booking.duration} />
        <DetailRow label={t("details.location")} value={booking.location} />
        <DetailRow label={t("details.address")} value={booking.address} />
      </div>
      <div className="mt-3 overflow-hidden rounded-xl border border-border">
        <MapPlaceholder />
      </div>
      <DetailRow
        label={t("details.notes")}
        value={
          <span className="italic text-muted-foreground">
            {booking.notes ?? t("details.noNotes")}
          </span>
        }
        className="mt-1 border-t border-border pt-3"
      />
    </SectionCard>
  );
}

function MapPlaceholder() {
  return (
    <div
      className="h-44 w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #e8eef5 0%, #d8e4f0 40%, #e2ebd8 100%)",
      }}
      aria-label="Map preview"
    >
      <div className="flex h-full items-center justify-center text-xs uppercase tracking-wider text-muted-foreground">
        Map preview
      </div>
    </div>
  );
}

/* ---------------- Payment ---------------- */

function PaymentCard({ booking }: { booking: Booking }) {
  const { t } = useI18n();
  const subtotal = booking.hourlyRate * booking.hours;
  return (
    <SectionCard title={t("details.payment")}>
      <div className="flex flex-col">
        <DetailRow
          label={t("details.hourlyRate")}
          value={`${formatCHF(booking.hourlyRate, true)}/hr`}
        />
        <DetailRow
          label={`${booking.service}  — ${booking.hours} hours × ${formatCHF(booking.hourlyRate, true)}`}
          value={formatCHF(subtotal, true)}
        />
        <DetailRow
          label={`${t("details.serviceFee")} (5%)`}
          value={formatCHF(booking.serviceFee, true)}
        />
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-muted-foreground">
            {t("details.total")}
          </span>
          <span className="font-serif text-2xl font-medium text-primary">
            {formatCHF(booking.total, true)}
          </span>
        </div>
      </div>

      {(booking.status === "awaitingConfirmation" ||
        booking.status === "upcoming") && (
        <button
          type="button"
          onClick={() => toast.success(t("toast.invoiceDownloaded"))}
          className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Download className="h-4 w-4" />
          {t("details.downloadInvoice")}
        </button>
      )}

      {booking.status === "requested" && (
        <p className="mt-3 text-xs text-muted-foreground">
          {t("details.paymentHeld")}
        </p>
      )}
    </SectionCard>
  );
}

/* ---------------- Actions panel — status-driven ---------------- */

function ActionsPanel({
  booking,
  firstName,
  onMessage,
}: {
  booking: Booking;
  firstName: string;
  onMessage: () => void;
}) {
  const { t } = useI18n();

  return (
    <SectionCard
      title={t("details.actions")}
      contentClassName="flex flex-col gap-3"
    >
      {booking.status === "upcoming" && (
        <>
          <Button
            className="h-11 rounded-xl gap-2"
            onClick={() => toast(t("toast.rescheduleSoon"))}
          >
            {t("details.rescheduleBooking")} <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            className="h-11 rounded-xl gap-2"
            onClick={() => toast.success(t("toast.bookingCancelled"))}
          >
            {t("details.cancelBooking")} <ArrowRight className="h-4 w-4" />
          </Button>
          <InfoNote>
            {t("details.cancellationPolicy")}{" "}
            <a className="font-medium text-primary hover:underline" href="#">
              {t("details.learnMore")} →
            </a>
          </InfoNote>
        </>
      )}

      {booking.status === "awaitingConfirmation" && (
        <>
          <Button
            className="h-11 rounded-xl gap-2"
            onClick={() => toast.success(t("toast.markedComplete"))}
          >
            <Check className="h-4 w-4" />
            {t("details.markComplete")}
          </Button>
          <InfoNote>
            <span className="font-semibold text-foreground">Sarah</span> has
            marked this session as complete. Please confirm to release their
            payment.
          </InfoNote>
        </>
      )}

      {booking.status === "inProgress" && (
        <>
          <Button className="h-11 rounded-xl gap-2" onClick={onMessage}>
            <MessageCircle className="h-4 w-4" />
            Message {firstName}
          </Button>
          <InfoNote>
            Your session is currently in progress. You'll be asked to confirm
            once{" "}
            <span className="font-semibold text-foreground">{firstName}</span>{" "}
            marks it complete.
          </InfoNote>
        </>
      )}

      {booking.status === "completed" && !booking.reviews && (
        <>
          <Button className="h-11 rounded-xl gap-2">
            <Star className="h-4 w-4" />
            {t("details.leaveReview")}
          </Button>
          <Button variant="secondary" className="h-11 rounded-xl gap-2">
            <CalendarClock className="h-4 w-4" />
            Rebook {firstName}
          </Button>
          <InfoNote icon={HeartHandshake}>
            Your session is complete. Help other families by leaving an honest
            review for {firstName}.
          </InfoNote>
        </>
      )}

      {booking.status === "completed" && booking.reviews && (
        <p className="text-sm text-muted-foreground">
          Thank you for sharing your review for {firstName}.
        </p>
      )}

      {booking.status === "requested" && (
        <>
          <Button className="h-11 rounded-xl gap-2" onClick={onMessage}>
            <MessageCircle className="h-4 w-4" />
            Message {firstName}
          </Button>
          <Button
            variant="secondary"
            className="h-11 rounded-xl gap-2"
            onClick={() => toast.success(t("toast.requestWithdrawn"))}
          >
            <X className="h-4 w-4" />
            {t("details.withdrawRequest")}
          </Button>
          <InfoNote>
            Waiting for{" "}
            <span className="font-semibold text-foreground">{firstName}</span>{" "}
            to accept your request. You won't be charged until they confirm.
          </InfoNote>
        </>
      )}

      {booking.status === "cancelled" && (
        <>
          <Button variant="secondary" className="h-11 rounded-xl gap-2">
            <CalendarClock className="h-4 w-4" />
            Rebook {firstName}
          </Button>
          <InfoNote>This booking was cancelled. You were not charged.</InfoNote>
        </>
      )}
    </SectionCard>
  );
}

function InfoNote({
  children,
  icon: Icon = CircleAlert,
}: {
  children: React.ReactNode;
  icon?: typeof CircleAlert;
}) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground">
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="leading-snug">{children}</p>
    </div>
  );
}

/* ---------------- Reviews ---------------- */


interface Review {
  rating: number;
  date: string;
  text: string;
  providerReply?: string;
}

function ReviewsPanel({
  reviews,
  firstName,
}: {
  reviews: Review[];
  firstName: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      {reviews.map((r, i) => (
        <SectionCard key={i} title="Your Review">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: r.rating }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{r.date}</span>
          </div>
          <p className="mt-3 text-sm text-foreground">{r.text}</p>
          {r.providerReply && (
            <div className="mt-3 border-t border-border pt-3 text-sm">
              <p className="inline-flex items-start gap-1.5 text-primary">
                <span className="text-base leading-none">↳</span>
                <span>
                  <span className="font-semibold">{firstName} replied:</span>{" "}
                  {r.providerReply}
                </span>
              </p>
            </div>
          )}
        </SectionCard>
      ))}
    </div>
  );
}
