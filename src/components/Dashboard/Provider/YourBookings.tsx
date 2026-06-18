import { ChevronRight } from "lucide-react";
import type { BookingStatus } from "../../../assets/data/bookings";
import { providerBookings, type ProviderBooking } from "../../../assets/data/provider-bookings";
import { UserAvatar } from "../../common/UserAvatar";
import { StatusBadge } from "../../common/StatusBadge";
import { formatCHF } from "../../../lib/format";
import { useI18n } from "../../../lib/i18n";
import { SectionCard } from "../../common/SectionCard";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

// import { Link } from "@tanstack/react-router";
// import { SectionCard } from "@/components/common/SectionCard";
// import { UserAvatar } from "@/components/common/UserAvatar";
// import { StatusBadge } from "@/components/common/StatusBadge";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { providerBookings, type ProviderBooking } from "@/assets/data/provider-bookings";
// import type { BookingStatus } from "@/assets/data/bookings";
// import { useI18n } from "@/lib/i18n";
// import { formatCHF } from "@/lib/format";

const tabs: BookingStatus[] = ["pending", "upcoming", "completed", "inProgress", "cancelled"];

function Row({ b }: { b: ProviderBooking }) {
  return (
    <li className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-muted-bg">
      <UserAvatar name={b.clientName} size={44} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{b.clientName}</p>
        <p className="truncate text-sm text-muted-foreground">
          {b.service} · {b.date} · {b.time}
        </p>
      </div>
      <StatusBadge status={b.status} />
      <span className="font-medium text-foreground">{formatCHF(b.amount)}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </li>
  );
}

export function YourBookings() {
  const { t } = useI18n();
  const counts: Record<string, number> = {};
  tabs.forEach((s) => {
    counts[s] = providerBookings.filter((b) => b.status === s).length;
  });

  return (
    <SectionCard
      title={t("overview.yourBookings")}
      action={
        <Link
          to="/dashboard/provider/bookings"
          className="text-sm font-medium text-primary hover:underline"
        >
          {t("overview.viewAll")}
        </Link>
      }
    >
      <Tabs defaultValue={tabs[0]}>
        <TabsList className="bg-transparent p-0 flex-wrap h-auto">
          {tabs.map((s) => (
            <TabsTrigger
              key={s}
              value={s}
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              {t(`bookingStatus.${s}`)} ({counts[s]})
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((s) => (
          <TabsContent key={s} value={s} className="mt-3">
            <ul className="flex flex-col gap-1">
              {providerBookings
                .filter((b) => b.status === s)
                .slice(0, 6)
                .map((b) => (
                  <Row key={b.id} b={b} />
                ))}
              {counts[s] === 0 && (
                <li className="py-6 text-center text-sm text-muted-foreground">No bookings</li>
              )}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </SectionCard>
  );
}
