import { ChevronRight } from "lucide-react";

import { useI18n } from "../../../lib/i18n";
import { formatCHF } from "../../../lib/format";
import { bookings, type Booking, type BookingStatus } from "../../../assets/data/bookings";
import { Link } from "react-router-dom";
import { UserAvatar } from "../../common/UserAvatar";
import { VerifiedBadge } from "../../common/VerifiedBadge";
import { StatusBadge } from "../../common/StatusBadge";
import { SectionCard } from "../../common/SectionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

const tabs: BookingStatus[] = ["upcoming", "completed", "inProgress", "cancelled"];

function BookingRow({ b }: { b: Booking }) {
  return (
    <li>
      <Link
        to={`/dashboard/family/bookings/${b.id}`}
        className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-muted-bg"
      >
        <UserAvatar name={b.providerName} size={44} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-medium text-foreground">
              {b.providerName}
            </p>
            {b.verified && <VerifiedBadge />}
          </div>
          <p className="truncate text-sm text-muted-foreground">
            {b.service} · {b.date} · {b.time}
          </p>
        </div>
        <StatusBadge status={b.status} />
        <span className="font-medium text-foreground">
          {formatCHF(b.total)}
        </span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    </li>
  );
}

export function YourBookings() {
  const { t } = useI18n();
  const counts: Record<BookingStatus, number> = {
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
    awaitingConfirmation: bookings.filter((b) => b.status === "awaitingConfirmation").length,
    awaitingPayment: bookings.filter((b) => b.status === "awaitingPayment").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    inProgress: bookings.filter((b) => b.status === "inProgress").length,
    requested: bookings.filter((b) => b.status === "requested").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };


  return (
    <SectionCard
      title={t("overview.yourBookings")}
      action={
        <Link
          to="/dashboard/family/bookings"
          className="text-sm font-medium text-primary hover:underline"
        >
          {t("overview.viewAll")}
        </Link>
      }
    >
      <Tabs defaultValue="upcoming">
        <TabsList className="bg-transparent p-0">
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
              {bookings
                .filter((b) => b.status === s)
                .map((b) => (
                  <BookingRow key={b.id} b={b} />
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
