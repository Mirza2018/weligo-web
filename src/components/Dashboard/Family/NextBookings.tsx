import { useState } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
} from "lucide-react";

import { VerifiedBadge } from "../../common/VerifiedBadge";
import { StatusBadge } from "../../common/StatusBadge";
import { Button } from "../../ui/button";
import { SendMessageDialog } from "./SendMessageDialog";
import { SectionCard } from "../../common/SectionCard";
import { UserAvatar } from "../../common/UserAvatar";
import { useI18n } from "../../../lib/i18n";
import { nextBooking } from "../../../assets/data/bookings";

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
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

export function NextBookings() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <SectionCard title={t("overview.nextBooking")}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <UserAvatar name={nextBooking.providerName} size={44} />
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-medium text-foreground">
                {nextBooking.providerName}
              </p>
              {nextBooking.verified && <VerifiedBadge />}
            </div>
            <p className="text-sm text-muted-foreground">
              {nextBooking.service}
            </p>
          </div>
        </div>
        <StatusBadge status={nextBooking.status} />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <InfoPill
          icon={Calendar}
          label={t("overview.date")}
          value={nextBooking.date}
        />
        <InfoPill
          icon={Clock}
          label={t("overview.time")}
          value={nextBooking.time}
        />
        <InfoPill
          icon={MapPin}
          label={t("overview.location")}
          value={nextBooking.location}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button
          variant="secondary"
          className="flex-1 gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
          onClick={() => setOpen(true)}
        >
          <MessageCircle className="h-4 w-4" />
          {t("overview.sendMessage")}
        </Button>
        <Button className="flex-1 gap-2">
          {t("overview.viewDetails")}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <SendMessageDialog
        open={open}
        onOpenChange={setOpen}
        recipientName={nextBooking.providerName}
      />
    </SectionCard>
  );
}
