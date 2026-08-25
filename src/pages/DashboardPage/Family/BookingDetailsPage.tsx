// src/pages/dashboard/family/BookingDetailsPage.tsx
import { useState } from "react";
import {
  ArrowLeft,
  CircleAlert,
  Clock,
  Flag,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Star,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "../../../lib/i18n";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SendMessageDialog } from "../../../components/Dashboard/Family/SendMessageDialog";
import { ReportIssueDialog } from "@/components/Dashboard/Family/ReportDialog";
import { UserAvatar } from "../../../components/common/UserAvatar";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";
import { cn } from "../../../lib/utils";
import { SectionCard } from "../../../components/common/SectionCard";
import { formatCHF } from "../../../lib/format";
import { ReasonDialog } from "@/components/bookings/ReasonDialog";
import { ReviewDialog } from "@/components/bookings/ReviewDialog";
import { BookingMap } from "@/components/bookings/BookingMap";
import {
  formatBookingDate,
  formatTimeRange,
  statusBadgeClass,
  statusLabel,
} from "@/lib/bookingHelpers";
import {
  useGetAllBookingsQuery,
  useWithdrawBookingMutation,
  useCancelBookingMutation,
  useConfirmBookingMutation,
  useGetSingleReviewsQuery,
  useProviderDetailsQuery,
} from "@/redux/api/websiteApi";
import { getImageUrl } from "@/redux/getBaseUrl";
import type { BookingRecordFull } from "@/types/bookings";
import { isPopulatedPerson, type ReviewListItem } from "@/types/reviews";

export function BookingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetAllBookingsQuery({ limit: 100 });
  const booking = data?.data.find((b) => b._id === id);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (isError || !booking) {
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

  return (
    <BookingDetailsContent booking={booking} onBack={() => navigate(-1)} />
  );
}

function BookingDetailsContent({
  booking,
  onBack,
}: {
  booking: BookingRecordFull;
  onBack: () => void;
}) {
  const { t } = useI18n();
  const [msgOpen, setMsgOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const { data: providerData } = useProviderDetailsQuery(
    booking.serviceProvider,
  );
  const provider = providerData?.data.user;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl font-medium tracking-tight">
            {t("details.bookingHeading")} {booking.bookingReference}
          </h2>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            {t("details.bookedOn")} {formatBookingDate(booking.createdAt)}{" "}
            &middot; {booking.paymentMethod}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex h-9 items-center rounded-md border px-3 text-sm font-medium",
              statusBadgeClass[booking.status],
            )}
          >
            {statusLabel[booking.status]}
          </span>
          <span
            onClick={() => setReportOpen(true)}
            className="inline-flex h-9 cursor-pointer items-center rounded-md bg-red-500 px-4 text-sm font-medium text-white"
          >
            <Flag size={16} className="mr-1.5" />
            {t("bookingStatus.report")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <ProviderCard
            provider={booking?.serviceProvider}
            onMessage={() => setMsgOpen(true)}
          />
          <BookingDetailsCard
            booking={booking}
            categoryName={booking?.serviceProvider?.categoryId?.name}
          />
          <PaymentCard booking={booking} />
        </div>

        <div className="flex flex-col gap-5">
          <ActionsPanel
            booking={booking}
            providerId={booking?.serviceProvider?._id}
            providerName={booking?.serviceProvider?.fullName}
          />
        </div>
      </div>

      <SendMessageDialog
        open={msgOpen}
        onOpenChange={setMsgOpen}
        recipientName={provider?.fullName ?? "Provider"}
      />
      <ReportIssueDialog open={reportOpen} onOpenChange={setReportOpen} />
    </div>
  );
}

/* ---------------- Provider header ---------------- */

function ProviderCard({
  provider,
  onMessage,
}: {
  provider?: {
    fullName: string;
    profileImage: string;
    averageRating: number;
    totalReview: number;
    city: string;
  };
  onMessage: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        <UserAvatar
          name={provider?.fullName ?? ""}
          imageUrl={
            provider?.profileImage
              ? (getImageUrl(provider.profileImage) ?? undefined)
              : undefined
          }
          size={96}
          className="h-24 w-24 text-xl"
        />
        <div className="flex-1">
          <h3 className="font-serif text-2xl font-medium text-foreground">
            {provider?.fullName ?? "Provider"}
          </h3>
          {provider && (
            <>
              <div className="mt-1 flex items-center gap-1.5 text-sm">
                <span className="font-medium text-foreground">
                  {provider.email}
                </span>
              </div>
            </>
          )}
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

function BookingDetailsCard({
  booking,
  categoryName,
}: {
  booking: BookingRecordFull;
  categoryName?: string;
}) {
  const { t } = useI18n();
  return (
    <SectionCard title={t("details.bookingDetails")}>
      <div className="flex flex-col">
        {categoryName && (
          <DetailRow label={t("details.service")} value={categoryName} />
        )}
        <DetailRow
          label={t("details.date")}
          value={formatBookingDate(booking.bookingDate)}
        />
        <DetailRow
          label={t("details.time")}
          value={formatTimeRange(booking.timeSlot)}
        />
        <DetailRow
          label={t("details.duration")}
          value={`${booking.durationInHours} hrs`}
        />
        <DetailRow label={t("details.address")} value={booking.address} />
      </div>
      <div className="mt-3 overflow-hidden rounded-xl border border-border">
        <BookingMap
          lat={booking.location.coordinates[1]}
          lng={booking.location.coordinates[0]}
        />
      </div>
      <DetailRow
        label={t("details.notes")}
        value={
          <span className="italic text-muted-foreground">
            {booking.whatToExpect || t("details.noNotes")}
          </span>
        }
        className="mt-1 border-t border-border pt-3"
      />
    </SectionCard>
  );
}

/* ---------------- Payment ---------------- */

function PaymentCard({ booking }: { booking: BookingRecordFull }) {
  const { t } = useI18n();
  const hourlyRate = booking.durationInHours
    ? Math.round((booking.paymentAmount / booking.durationInHours) * 100) / 100
    : 0;
  const paymentStatus =
    typeof booking.payment === "object"
      ? booking.payment.paymentStatus
      : undefined;

  return (
    <SectionCard title={t("details.payment")}>
      <div className="flex flex-col">
        <DetailRow
          label={t("details.hourlyRate")}
          value={`${formatCHF(hourlyRate, true)}/hr`}
        />
        <DetailRow
          label={`${booking.durationInHours} hours × ${formatCHF(hourlyRate, true)}`}
          value={formatCHF(booking.paymentAmount, true)}
        />
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-muted-foreground">
            {t("details.total")}
          </span>
          <span className="font-serif text-2xl font-medium text-primary">
            {formatCHF(booking.paymentAmount, true)}
          </span>
        </div>
      </div>
      {paymentStatus && (
        <p className="mt-1 text-xs text-muted-foreground">
          Payment status:{" "}
          <span className="font-medium text-foreground">{paymentStatus}</span>
        </p>
      )}
    </SectionCard>
  );
}

/* ---------------- Actions panel - status-driven ---------------- */

function ActionsPanel({
  booking,
  providerId,
  providerName,
}: {
  booking: BookingRecordFull;
  providerId: string;
  providerName?: string;
}) {
  const { t } = useI18n();
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const [withdrawBooking, { isLoading: isWithdrawing }] =
    useWithdrawBookingMutation();
  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();
  const [confirmBooking, { isLoading: isConfirming }] =
    useConfirmBookingMutation();

  // Only one review per booking - the booking-scoped endpoint returns every
  // review tied to this booking (both directions), so "my review" is the
  // one where the provider is the receiver.
  const { data: bookingReviews } = useGetSingleReviewsQuery(booking._id, {
    skip: booking.status !== "completed",
  });
  const existingReview = bookingReviews?.data.find(
    (r: ReviewListItem) =>
      isPopulatedPerson(r.receiverId) && r.receiverId._id === providerId,
  );

  const handleWithdraw = async (reason: string) => {
    try {
      const res = await withdrawBooking({
        id: booking._id,
        data: reason ? { reason } : undefined,
      }).unwrap();
      toast.success(res?.message || "Request withdrawn");
      setWithdrawOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't withdraw this request.");
    }
  };

  const handleCancel = async (reason: string) => {
    try {
      const res = await cancelBooking({
        id: booking._id,
        data: { reason },
      }).unwrap();
      toast.success(res?.message || "Booking cancelled");
      setCancelOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't cancel this booking.");
    }
  };

  const handleConfirm = async () => {
    try {
      const res = await confirmBooking(booking._id).unwrap();
      toast.success(res?.message || "Marked as complete");
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't confirm completion.");
    }
  };

  return (
    <SectionCard
      title={t("details.actions")}
      contentClassName="flex flex-col gap-3"
    >
      {booking.status === "pending" && (
        <>
          <Button
            variant="default"
            className="h-11 rounded-xl gap-2"
            onClick={() => setWithdrawOpen(true)}
          >
            <X className="h-4 w-4" />
            Withdraw Request
          </Button>
          <InfoNote>
            Waiting for the provider to accept your request. You won&apos;t be
            charged until they confirm.
          </InfoNote>
        </>
      )}

      {booking.status === "confirmed" && (
        <>
          <Button
            variant="destructive"
            className="h-11 rounded-xl gap-2"
            onClick={() => setCancelOpen(true)}
          >
            {t("details.cancelBooking")}
          </Button>
          <InfoNote>{t("details.cancellationPolicy")}</InfoNote>
        </>
      )}

      {booking.status === "in_progress" && (
        <InfoNote>
          Your session is currently in progress. You&apos;ll be asked to confirm
          once the provider marks it complete.
        </InfoNote>
      )}

      {booking.status === "provider_completed" && (
        <>
          <Button
            className="h-11 rounded-xl gap-2"
            onClick={handleConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? "Confirming…" : t("details.markComplete")}
          </Button>
          <InfoNote>
            The provider has marked this session as done. Confirm to release
            their payment.
          </InfoNote>
        </>
      )}

      {booking.status === "completed" && (
        <>
          <div className="flex flex-col items-start gap-2 rounded-xl border border-[#23C56C] bg-[#23C56C]/10 px-3 py-2.5 text-[#23C56C]">
            <Clock size={40} />
            <div className="text-xl font-bold">Session complete</div>
          </div>

          {existingReview ? (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: existingReview.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-foreground">
                {existingReview.comment}
              </p>
              {existingReview.reply && (
                <div className="mt-3 border-t border-border pt-3 text-sm text-primary">
                  <span className="font-semibold">Provider replied:</span>{" "}
                  {existingReview.reply.comment}
                </div>
              )}
            </div>
          ) : (
            <>
              <Button
                className="h-11 rounded-xl gap-2"
                onClick={() => setReviewOpen(true)}
              >
                <Star className="h-4 w-4" />
                {t("details.leaveReview")}
              </Button>
              <InfoNote icon={HeartHandshake}>
                Help other families by leaving an honest review.
              </InfoNote>
            </>
          )}
        </>
      )}

      {(booking.status === "cancelled" ||
        booking.status === "rejected" ||
        booking.status === "expired") && (
        <div className="flex flex-col items-start gap-2 rounded-xl border border-[#FB2C36] bg-[#FB2C36]/10 px-3 py-2.5 text-[#FB2C36]">
          <X size={40} />
          <div className="text-xl font-bold">
            {booking.status === "expired"
              ? "Expired"
              : `Cancelled${booking.cancelledBy ? ` by ${booking.cancelledBy}` : ""}`}
          </div>
          {booking.cancellationReason && (
            <p className="text-sm font-medium">{booking.cancellationReason}</p>
          )}
        </div>
      )}

      <ReasonDialog
        open={withdrawOpen}
        onOpenChange={setWithdrawOpen}
        title="Withdraw this request?"
        description="The provider will be notified. You won't be charged."
        requireReason={false}
        confirmLabel="Withdraw"
        isSubmitting={isWithdrawing}
        onSubmit={handleWithdraw}
      />
      <ReasonDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        title="Cancel this booking?"
        description="Please let the provider know why - this can't be undone."
        requireReason
        confirmLabel="Cancel booking"
        isSubmitting={isCancelling}
        onSubmit={handleCancel}
      />
      <ReviewDialog
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        bookingId={booking._id}
        revieweeId={providerId}
        revieweeName={providerName}
      />
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
