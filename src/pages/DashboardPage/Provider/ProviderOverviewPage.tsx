import { CalendarCheck, CheckCircle2, Star, Wallet } from "lucide-react";
import { useSelector } from "react-redux";

import { OverviewTopCard } from "../../../components/Dashboard/Provider/OverviewTopCard";
import { NextBookings } from "../../../components/Dashboard/Provider/NextBookings";
import { YourCalendar } from "../../../components/Dashboard/Provider/YourCalendar";
import { YourBookings } from "../../../components/Dashboard/Provider/YourBookings";
import { EarningsOverview } from "../../../components/Dashboard/Provider/EarningsOverview";

import { useI18n } from "../../../lib/i18n";
import { formatCHF } from "../../../lib/format";
import { decodeAccessToken, firstNameOf } from "../../../lib/overview-helpers";
import { useMyOverviewQuery } from "@/redux/api/websiteApi"; // TODO: adjust to your actual RTK Query api slice path
import type { RootState } from "@/redux/store";

export function ProviderOverviewPage() {
  const { t } = useI18n();
  const { data, isLoading } = useMyOverviewQuery();

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const decoded = decodeAccessToken(accessToken);

  const overview = data?.data;
  const stats = overview?.stats;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5">
        <div className="h-8 w-56 animate-pulse rounded bg-muted-bg" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl border border-border bg-card"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="h-56 animate-pulse rounded-2xl border border-border bg-card" />
          <div className="h-56 animate-pulse rounded-2xl border border-border bg-card" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-serif-italic text-3xl">
          {t("overview.hello")} {firstNameOf(decoded?.fullName)}!
          <span className="ml-1">👋</span>
        </h2>
        <p className="text-sm text-muted-foreground">Good to see you again.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewTopCard
          label={t("overview.upcomingBookings")}
          value={String(stats?.upcomingBookings ?? 0)}
          icon={CalendarCheck}
        />
        <OverviewTopCard
          label={t("overview.completedBookings")}
          value={String(stats?.completedBookings ?? 0)}
          icon={CheckCircle2}
        />
        <OverviewTopCard
          label={t("provider.earnings")}
          value={formatCHF(stats?.earnings ?? 0)}
          icon={Wallet}
        />
        <OverviewTopCard
          label={t("overview.averageRating")}
          value={stats?.averageRating ? stats.averageRating.toFixed(1) : "—"}
          icon={Star}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <NextBookings booking={overview?.nextBooking ?? null} />
        <YourCalendar bookings={overview?.calendarBookings ?? []} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <YourBookings />
        </div>
        <div className="flex flex-col gap-4">
          <EarningsOverview
            totalEarnings={stats?.earnings ?? 0}
            overview={overview?.earningOverview}
          />
        </div>
      </div>
    </div>
  );
}
