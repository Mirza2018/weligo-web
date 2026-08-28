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
import { StatusBadge } from "../../common/StatusBadge";
import { SectionCard } from "../../common/SectionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { useGetAllBookingsQuery } from "@/redux/api/websiteApi"; // TODO: adjust to your actual RTK Query api slice path
import type { BookingStatus } from "../../../types/overview";
import type { ProviderBooking } from "../../../types/provider-overview";

// Five tabs, matching the mock: Requests / Upcoming / Completed / In Progress / Cancelled
type Tab = "requests" | "upcoming" | "completed" | "inProgress" | "cancelled";

const TAB_ORDER: Tab[] = [
  "requests",
  "upcoming",
  "completed",
  "inProgress",
  "cancelled",
];

const STATUS_TO_TAB: Record<BookingStatus, Tab> = {
  pending: "requests",
  confirmed: "upcoming",
  in_progress: "inProgress",
  provider_completed: "completed",
  completed: "completed",
  rejected: "cancelled",
  cancelled: "cancelled",
  expired: "cancelled",
  disputed: "cancelled",
};

// "requests" has no direct entry in the shared bookingStatus i18n table
// (it maps to "pending" there), so it gets its own key with a plain fallback.
const TAB_LABEL_KEY: Record<Tab, string> = {
  requests: "provider.tabs.requests",
  upcoming: "bookingStatus.upcoming",
  completed: "bookingStatus.completed",
  inProgress: "bookingStatus.inProgress",
  cancelled: "bookingStatus.cancelled",
};

const TAB_FALLBACK: Record<Tab, string> = {
  requests: "Requests",
  upcoming: "Upcoming",
  completed: "Completed",
  inProgress: "In Progress",
  cancelled: "Cancelled",
};

function tabLabel(t: (key: string) => string, tab: Tab) {
  const key = TAB_LABEL_KEY[tab];
  const translated = t(key);
  return !translated || translated === key ? TAB_FALLBACK[tab] : translated;
}

function BookingRow({ b }: { b: ProviderBooking }) {
  return (
    <li>
      <Link
        to={`/dashboard/provider/bookings/${b._id}`}
        className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-muted-bg"
      >
        <UserAvatar
          name={b.customer.fullName}
          imageUrl={resolveImageUrl(b.customer.profileImage)}
          size={44}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-foreground">
            {b.customer.fullName}
          </p>
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
  const bookings: ProviderBooking[] = data?.data ?? [];

  const byTab: Record<Tab, ProviderBooking[]> = {
    requests: [],
    upcoming: [],
    completed: [],
    inProgress: [],
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
          to="/dashboard/provider/bookings"
          className="text-sm font-medium text-primary hover:underline"
        >
          {t("overview.viewAll")}
        </Link>
      }
    >
      {isLoading ? (
        <div className="h-40 animate-pulse rounded-xl bg-muted-bg" />
      ) : (
        <Tabs defaultValue="requests">
          <TabsList className="h-auto flex-wrap bg-transparent p-0">
            {TAB_ORDER.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              >
                {tabLabel(t, tab)} ({byTab[tab].length})
              </TabsTrigger>
            ))}
          </TabsList>
          {TAB_ORDER.map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-3">
              <ul className="flex flex-col gap-1">
                {byTab[tab].slice(0, 6).map((b) => (
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
