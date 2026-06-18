import { CalendarCheck, CheckCircle2, Star, Wallet } from "lucide-react";
import { OverviewTopCard } from "../../../components/Dashboard/Family/OverviewTopCard";
import { NextBookings } from "../../../components/Dashboard/Family/NextBookings";
import { RecentMessages } from "../../../components/Dashboard/Family/RecentMessages";
import { YourBookings } from "../../../components/Dashboard/Family/YourBookings";
import { YourFavorites } from "../../../components/Dashboard/Family/YourFavorites";
import { SpendingOverview } from "../../../components/Dashboard/Family/SpendingOverview";


import { useI18n } from "../../../lib/i18n";
import { currentUser } from "../../..//assets/data/user";
import { formatCHF } from "../../..//lib/format";
import { bookings } from "../../..//assets/data/bookings";
import { totalSpending } from "../../..//assets/data/spending";

export function OverviewPage() {
  const { t } = useI18n();
  const upcomingCount = bookings.filter((b) => b.status === "upcoming").length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;

  return (
    <div className=" flex flex-col gap-5">
      <h2 className="font-serif-italic  text-3xl ">
        {t("overview.hello")} {currentUser.firstName}
        <span className="ml-1">👋</span>
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewTopCard
          label={t("overview.upcomingBookings")}
          value={String(upcomingCount)}
          icon={CalendarCheck}
        />
        <OverviewTopCard
          label={t("overview.completedBookings")}
          value={String(completedCount + 10)}
          icon={CheckCircle2}
        />
        <OverviewTopCard
          label={t("overview.averageRating")}
          value="4.9"
          icon={Star}
        />
        <OverviewTopCard
          label={t("overview.totalSpent")}
          value={formatCHF(totalSpending + 0)}
          icon={Wallet}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <NextBookings />
        <RecentMessages />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <YourBookings />
        </div>
        <div className="flex flex-col gap-4">
          <YourFavorites />
          <SpendingOverview />
        </div>
      </div>
    </div>
  );
}
