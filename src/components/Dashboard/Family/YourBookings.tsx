import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useI18n } from "../../../lib/i18n";
import { formatCHF } from "../../../lib/format";
import {
  formatBookingDate,
  formatTimeRange,
  resolveImageUrl,
} from "../../../lib/overview-helpers";
import { UserAvatar } from "../../common/UserAvatar";
import { VerifiedBadge } from "../../common/VerifiedBadge";
import { StatusBadge } from "../../common/StatusBadge";
import { SectionCard } from "../../common/SectionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { useGetAllBookingsQuery } from "@/redux/api/websiteApi"; // TODO: adjust to your actual RTK Query api slice path
import type { Booking, BookingStatus } from "../../../types/overview";

// The four tabs shown in the UI, each mapped from one or more real statuses.
type Tab = "upcoming" | "inProgress" | "completed" | "cancelled";

const TAB_ORDER: Tab[] = ["upcoming", "inProgress", "completed", "cancelled"];

const STATUS_TO_TAB: Record<BookingStatus, Tab> = {
  pending: "upcoming",
  confirmed: "upcoming",
  in_progress: "inProgress",
  provider_completed: "completed",
  completed: "completed",
  rejected: "cancelled",
  cancelled: "cancelled",
  expired: "cancelled",
  disputed: "cancelled",
};

const TAB_LABEL_KEY: Record<Tab, string> = {
  upcoming: "bookingStatus.upcoming",
  inProgress: "bookingStatus.inProgress",
  completed: "bookingStatus.completed",
  cancelled: "bookingStatus.cancelled",
};

function BookingRow({ b }: { b: Booking }) {
  return (
    <li>
      <Link
        to={`/dashboard/family/bookings/${b._id}`}
        className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-muted-bg"
      >
        <UserAvatar
          name={b.serviceProvider.fullName}
          imageUrl={resolveImageUrl(b.serviceProvider.profileImage)}
          size={44}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-medium text-foreground">
              {b.serviceProvider.fullName}
            </p>
            <VerifiedBadge />
          </div>
          <p className="truncate text-sm text-muted-foreground">
            {b.serviceProvider.categoryId?.name ?? "Service"} ·{" "}
            {formatBookingDate(b.bookingDate)} ·{" "}
            {formatTimeRange(b.timeSlot.startTime, b.timeSlot.endTime)}
          </p>
        </div>
        <StatusBadge status={b.status} />
        <span className="shrink-0 font-medium text-foreground">
          {formatCHF(b.paymentAmount)}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </Link>
    </li>
  );
}

export function YourBookings() {
  const { t } = useI18n();
  const { data, isLoading } = useGetAllBookingsQuery({});
  const bookings: Booking[] = data?.data ?? [];

  const byTab: Record<Tab, Booking[]> = {
    upcoming: [],
    inProgress: [],
    completed: [],
    cancelled: [],
  };
  for (const b of bookings) {
    byTab[STATUS_TO_TAB[b.status] ?? "cancelled"].push(b);
  }

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
      {isLoading ? (
        <div className="h-40 animate-pulse rounded-xl bg-muted-bg" />
      ) : (
        <Tabs defaultValue="upcoming">
          {/* <TabsList className="bg-transparent p-0">
            {TAB_ORDER.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              >
                {t(TAB_LABEL_KEY[tab])} ({byTab[tab].length})
              </TabsTrigger>
            ))}
          </TabsList> */}
          {TAB_ORDER.map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-3">
              <ul className="flex flex-col gap-1">
                {byTab[tab].map((b) => (
                  <BookingRow key={b._id} b={b} />
                ))}
                {byTab[tab].length === 0 && (
                  <li className="py-6 text-center text-sm text-muted-foreground">
                    No bookings
                  </li>
                )}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </SectionCard>
  );
}
