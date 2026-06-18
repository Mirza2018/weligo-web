import { useState } from "react";
import { ArrowRight, Calendar, Clock, MapPin, MessageCircle } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { providerNextBooking } from "../../../assets/data/provider-bookings";
import { SectionCard } from "../../common/SectionCard";
import { UserAvatar } from "../../common/UserAvatar";
import { StatusBadge } from "../../common/StatusBadge";
import { Button } from "../../ui/button";
import { SendMessageDialog } from "../Family/SendMessageDialog";
// import { SectionCard } from "@/components/common/SectionCard";
// import { UserAvatar } from "@/components/common/UserAvatar";
// import { StatusBadge } from "@/components/common/StatusBadge";
// import { Button } from "@/components/ui/button";
// import { providerNextBooking } from "@/assets/data/provider-bookings";
// import { useI18n } from "@/lib/i18n";
// import { SendMessageDialog } from "@/components/Dashboard/Family/SendMessageDialog";

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
  const nb = providerNextBooking;

  return (
    <SectionCard title={t("overview.nextBooking")}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <UserAvatar name={nb.clientName} size={44} />
          <div>
            <p className="font-medium text-foreground">{nb.clientName}</p>
            <p className="text-sm text-muted-foreground">{nb.location}</p>
          </div>
        </div>
        <StatusBadge status="completed" className="bg-emerald-500 text-white border-emerald-500" />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <InfoPill icon={Calendar} label={t("overview.date")} value={nb.date} />
        <InfoPill icon={Clock} label={t("overview.time")} value={nb.time} />
        <InfoPill icon={MapPin} label={t("overview.location")} value={nb.address} />
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

      <SendMessageDialog open={open} onOpenChange={setOpen} recipientName={nb.clientName} />
    </SectionCard>
  );
}
