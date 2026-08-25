// src/pages/dashboard/provider/ProvidersBookingDetailsPage.tsx
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  Clock,
  CircleCheckBig,
  Flag,
  MapPin,
  MessageCircle,
  Star,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "../../../lib/i18n";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SendMessageDialog } from "../../../components/Dashboard/Family/SendMessageDialog";
import { ReportIssueDialog } from "@/components/Dashboard/Provider/ReportDialog";
import { UserAvatar } from "../../../components/common/UserAvatar";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";
import { SectionCard } from "../../../components/common/SectionCard";
import { formatCHF } from "../../../lib/format";
import { ReasonDialog } from "@/components/bookings/ReasonDialog";
import { ReviewDialog } from "@/components/bookings/ReviewDialog";
import { BookingMap } from "@/components/bookings/BookingMap";
import {
  formatBookingDate,
  formatTimeRange,
  hasBookingDateArrived,
  statusBadgeClass,
  statusLabel,
} from "@/lib/bookingHelpers";
import {
  useGetAllBookingsQuery,
  useAcceptBookingMutation,
  useDeclineBookingMutation,
  useCancelBookingMutation,
  useStartBookingMutation,
  useDoneBookingMutation,
  useGetSingleReviewsQuery,
  useReplyReviewMutation,
} from "@/redux/api/websiteApi";
import { getImageUrl } from "@/redux/getBaseUrl";
import type { BookingCustomerRef, BookingRecordFull } from "@/types/bookings";
import { isPopulatedPerson, type ReviewListItem } from "@/types/reviews";

export function ProvidersBookingDetailsPage() {
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
      <div className="py-12 text-center">
        <h2 className="font-serif text-2xl">Booking not found</h2>
        <Link
          to="/dashboard/provider/bookings"
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

  const customer =
    typeof booking.customer === "object" ? booking.customer : null;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
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
          <CustomerCard
            customer={customer}
            onMessage={() => setMsgOpen(true)}
          />
          <BookingDetailsCard booking={booking} />
          <PaymentCard booking={booking} />
        </div>

        <div className="flex flex-col gap-5">
          <ActionsPanel booking={booking} customer={customer} />
        </div>
      </div>

      <SendMessageDialog
        open={msgOpen}
        onOpenChange={setMsgOpen}
        recipientName={customer?.fullName ?? "Client"}
      />
      <ReportIssueDialog
        bookingId={booking._id}
        open={reportOpen}
        onOpenChange={setReportOpen}
      />
    </div>
  );
}

/* ---------------- Customer header ---------------- */

function CustomerCard({
  customer,
  onMessage,
}: {
  customer: BookingCustomerRef | null;
  onMessage: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        <UserAvatar
          name={customer?.fullName ?? "Client"}
          imageUrl={
            customer?.profileImage
              ? (getImageUrl(customer.profileImage) ?? undefined)
              : undefined
          }
          size={96}
          className="h-24 w-24 text-xl"
        />
        <div className="flex-1">
          <h3 className="font-serif text-2xl font-medium text-foreground">
            {customer?.fullName ?? "Client"}
          </h3>
          {customer?.phone && (
            <p className="mt-1 text-sm text-muted-foreground">
              {customer.phone}
            </p>
          )}
          {customer?.email && (
            <p className="text-sm text-muted-foreground">{customer.email}</p>
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

function BookingDetailsCard({ booking }: { booking: BookingRecordFull }) {
  const { t } = useI18n();
  return (
    <SectionCard title={t("details.bookingDetails")}>
      <div className="flex flex-col">
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
        <DetailRow
          label="Group size"
          value={`${booking.numberOfPersons} · ${booking.ageGroup}`}
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
  return (
    <SectionCard title={t("details.payment")}>
      <div className="flex flex-col">
        <DetailRow
          label="Total booking value"
          value={formatCHF(booking.paymentAmount, true)}
        />
        <DetailRow
          label="Platform commission"
          value={`- ${formatCHF(booking.commissionAmount, true)}`}
        />
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-muted-foreground">
            {t("details.total")}
          </span>
          <span className="font-serif text-2xl font-medium text-primary">
            {formatCHF(booking.providerEarning, true)}
          </span>
        </div>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Your earning for this job, after the platform fee.
      </p>
    </SectionCard>
  );
}

/* ---------------- Actions panel - status-driven ---------------- */

function ActionsPanel({
  booking,
  customer,
}: {
  booking: BookingRecordFull;
  customer: BookingCustomerRef | null;
}) {
  const { t } = useI18n();
  const [declineOpen, setDeclineOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyComment, setReplyComment] = useState("");
  const [reviewId, setReviewId] = useState("");

  const [acceptBooking, { isLoading: isAccepting }] =
    useAcceptBookingMutation();
  const [declineBooking, { isLoading: isDeclining }] =
    useDeclineBookingMutation();
  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  const [startBooking, { isLoading: isStarting }] = useStartBookingMutation();
  const [doneBooking, { isLoading: isFinishing }] = useDoneBookingMutation();
  const [replyReview, { isLoading: isReplying }] = useReplyReviewMutation();

  // Every review tied to this booking (both directions), fully
  // server-verified - so "only one review/reply" holds even after a reload.
  const { data: bookingReviews } = useGetSingleReviewsQuery(booking._id, {
    skip: booking.status !== "completed",
  });
  const myReview = bookingReviews?.data.find(
    (r: ReviewListItem) =>
      isPopulatedPerson(r.receiverId) && r.receiverId._id === customer?._id,
  );
  const reviewFromFamily = bookingReviews?.data.find(
    (r: ReviewListItem) =>
      isPopulatedPerson(r.reviewerId) && r.reviewerId._id === customer?._id,
  );

  const dateArrived = hasBookingDateArrived(booking.bookingDate);

  const handleAccept = async () => {
    try {
      const res = await acceptBooking(booking._id).unwrap();
      toast.success(res?.message || "Booking accepted");
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't accept this booking.");
    }
  };

  const handleDecline = async (reason: string) => {
    try {
      const res = await declineBooking({
        id: booking._id,
        data: { reason },
      }).unwrap();
      toast.success(res?.message || "Booking declined");
      setDeclineOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't decline this booking.");
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

  const handleStart = async () => {
    try {
      const res = await startBooking(booking._id).unwrap();
      toast.success(res?.message || "Job started");
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't start this job.");
    }
  };

  const handleDone = async () => {
    try {
      const res = await doneBooking(booking._id).unwrap();
      toast.success(res?.message || "Job marked as done");
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't mark this job as done.");
    }
  };

  const handleReply = async () => {
    if (!replyComment.trim()) return;
    try {
      // `id` here is the BOOKING id - the backend resolves "the review for
      // this booking directed at me" and replies to that.
      const res = await replyReview({
        id: reviewId,
        data: { comment: replyComment.trim() },
      }).unwrap();
      toast.success(res?.message || "Reply added");
      setReplyOpen(false);
      setReplyComment("");
      setReviewId("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't save your reply.");
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
            className="h-11 rounded-xl gap-2 bg-[#23C56C]!"
            onClick={handleAccept}
            disabled={isAccepting}
          >
            <Check className="h-4 w-4" />
            {isAccepting ? "Accepting…" : "Accept Booking"}
          </Button>
          <Button
            variant="destructive"
            className="h-11 rounded-xl gap-2"
            onClick={() => setDeclineOpen(true)}
          >
            <X className="h-4 w-4" />
            Decline Booking
          </Button>
          <InfoNote>
            You have 24 hours to respond before this request expires
            automatically.
          </InfoNote>
          <InfoNote>
            Clients may cancel up to 24 hours before the booking for a full
            refund. After that, you receive 50% of the booking value.
          </InfoNote>
        </>
      )}

      {booking.status === "confirmed" && (
        <>
          <Button
            className="h-11 rounded-xl gap-2 bg-[#F88B08]!"
            onClick={handleStart}
            disabled={!dateArrived || isStarting}
          >
            {isStarting ? "Starting…" : "Start Job"}{" "}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            className="h-11 rounded-xl gap-2"
            onClick={() => setCancelOpen(true)}
          >
            {t("details.cancelBooking")}
          </Button>
          <InfoNote>
            {dateArrived
              ? "The booking date has arrived - you can start the job."
              : `This booking is confirmed for ${formatBookingDate(booking.bookingDate)} at ${booking.timeSlot.startTime}. You can start the job once that date arrives.`}
          </InfoNote>
          <InfoNote>{t("details.cancellationPolicy")}</InfoNote>
        </>
      )}

      {booking.status === "in_progress" && (
        <>
          <Button
            variant="default"
            className="h-11 rounded-xl gap-2"
            onClick={handleDone}
            disabled={isFinishing}
          >
            {isFinishing ? "Saving…" : t("details.doneBooking")}{" "}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <InfoNote>
            Tap done once you&apos;ve finished the job - the family will be
            asked to confirm.
          </InfoNote>
        </>
      )}

      {booking.status === "provider_completed" && (
        <div className="flex flex-col items-start gap-2 rounded-xl border border-[#E8943F] bg-[#E8943F]/10 px-3 py-2.5 text-[#E8943F]">
          <Clock size={40} />
          <div className="text-xl font-bold">Waiting for confirmation</div>
          <p className="text-sm font-semibold leading-snug">
            You&apos;ve marked this job as done.{" "}
            {customer?.fullName ?? "The family"} needs to confirm before payment
            is released.
          </p>
        </div>
      )}

      {booking.status === "completed" && (
        <>
          <div className="flex flex-col items-start gap-2 rounded-xl border border-[#23C56C] bg-[#23C56C]/10 px-3 py-2.5 text-[#23C56C]">
            <CircleCheckBig size={40} />
            <div className="text-xl font-bold">Payment released!</div>
            <p className="text-sm font-semibold leading-snug">
              {formatCHF(booking.providerEarning, true)} has been sent to your
              account.
            </p>
          </div>

          {reviewFromFamily && (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: reviewFromFamily.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-sm text-foreground">
                {reviewFromFamily.comment}
              </p>
              {reviewFromFamily.reply ? (
                <div className="mt-3 border-t border-border pt-3 text-sm text-primary">
                  <span className="font-semibold">You replied:</span>{" "}
                  {reviewFromFamily.reply.comment}
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="mt-3 h-9"
                  onClick={() => {
                    setReplyOpen(true);
                    setReviewId(reviewFromFamily._id);
                  }}
                >
                  Reply
                </Button>
              )}
            </div>
          )}

          {!myReview ? (
            <Button
              className="h-11 rounded-xl gap-2"
              onClick={() => setReviewOpen(true)}
              disabled={!customer}
            >
              <Star className="h-4 w-4" />
              Add Your Review
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground">
              Your review of {customer?.fullName ?? "the family"} has been
              submitted.
            </p>
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
        open={declineOpen}
        onOpenChange={setDeclineOpen}
        title="Decline this booking?"
        description="Let the family know why - this can't be undone."
        requireReason
        confirmLabel="Decline booking"
        isSubmitting={isDeclining}
        onSubmit={handleDecline}
      />
      <ReasonDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        title="Cancel this booking?"
        description="Let the family know why - this can't be undone."
        requireReason
        confirmLabel="Cancel booking"
        isSubmitting={isCancelling}
        onSubmit={handleCancel}
      />
      <ReviewDialog
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        bookingId={booking._id}
        revieweeId={customer?._id ?? ""}
        revieweeName={customer?.fullName}
      />

      <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to review</DialogTitle>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="reply">Your reply</Label>
            <Textarea
              id="reply"
              rows={4}
              value={replyComment}
              onChange={(e) => setReplyComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setReplyOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleReply}
              disabled={isReplying || !replyComment.trim()}
            >
              {isReplying ? "Saving…" : "Save Reply"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
