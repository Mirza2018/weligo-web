import { useState } from "react";
import { ArrowRight, Calendar, Clock, MessageCircle, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { VerifiedBadge } from "../../common/VerifiedBadge";
import { StatusBadge } from "../../common/StatusBadge";
import { Button } from "../../ui/button";
import { SendMessageDialog } from "./SendMessageDialog";
import { SectionCard } from "../../common/SectionCard";
import { UserAvatar } from "../../common/UserAvatar";
import { useI18n } from "../../../lib/i18n";
import {
  formatBookingDate,
  formatTimeRange,
  resolveImageUrl,
} from "../../../lib/overview-helpers";
import type { NextBooking } from "../../../types/overview";
import { useCreateChatMutation } from "@/redux/api/messageApi";
import { toast } from "sonner";

function InfoPill({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex-1 rounded-xl border border-border bg-muted-bg px-3 py-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span>{label}</span>
      </div>
      <p className="mt-1 truncate text-sm font-medium text-foreground">
        {value}
      </p>
    </div>
  );
}

export function NextBookings({ booking }: { booking: NextBooking | null }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [createChat] = useCreateChatMutation();

  if (!booking) {
    return (
      <SectionCard title={t("overview.nextBooking")}>
        <p className="py-8 text-center text-sm text-muted-foreground">
          No upcoming bookings yet.
        </p>
      </SectionCard>
    );
  }

  const { otherParty } = booking;



  const handleMessage = async () => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await createChat({ users: [otherParty?._id] }).unwrap();

      navigate(`/dashboard/family/message?chatId=/${res?.data?._id}`);

      toast.success(res?.message, {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error(error?.data?.message || "Couldn't create chat.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <SectionCard title={t("overview.nextBooking")}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <UserAvatar
            name={otherParty.fullName}
            imageUrl={resolveImageUrl(otherParty.profileImage)}
            size={44}
          />
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-medium text-foreground">
                {otherParty.fullName}
              </p>
              <VerifiedBadge />
            </div>
            {otherParty.categoryId?.name && (
              <p className="text-sm text-muted-foreground">
                {otherParty.categoryId.name}
              </p>
            )}
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <InfoPill
          icon={Calendar}
          label={t("overview.date")}
          value={formatBookingDate(booking.bookingDate)}
        />
        <InfoPill
          icon={Clock}
          label={t("overview.time")}
          value={formatTimeRange(
            booking.timeSlot.startTime,
            booking.timeSlot.endTime,
          )}
        />
        <InfoPill
          icon={Tag}
          label={t("overview.reference") /* falls back to key if missing */}
          value={booking.bookingReference}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button
          variant="secondary"
          className="flex-1 gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
          onClick={() => handleMessage()}
        >
          <MessageCircle className="h-4 w-4" />
          {t("overview.sendMessage")}
        </Button>
        <Button
          className="flex-1 gap-2"
          onClick={() => navigate(`/dashboard/family/bookings/${booking._id}`)}
        >
          {t("overview.viewDetails")}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <SendMessageDialog
        open={open}
        onOpenChange={setOpen}
        recipientName={otherParty.fullName}
      />
    </SectionCard>
  );
}
