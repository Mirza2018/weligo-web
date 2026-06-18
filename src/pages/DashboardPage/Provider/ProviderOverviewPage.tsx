import { CalendarCheck, CheckCircle2, Star, Wallet } from "lucide-react";
import { OverviewTopCard } from "../../../components/Dashboard/Provider/OverviewTopCard";
import { NextBookings } from "../../../components/Dashboard/Provider/NextBookings";
import { YourCalendar } from "../../../components/Dashboard/Provider/YourCalendar";
import { YourBookings } from "../../../components/Dashboard/Provider/YourBookings";
import { YourFavorites } from "../../../components/Dashboard/Provider/YourFavorites";
import { EarningsOverview } from "../../../components/Dashboard/Provider/EarningsOverview";
import { useI18n } from "../../../lib/i18n";
import { formatCHF } from "../../../lib/format";
import { providerBookings } from "../../../assets/data/provider-bookings";
import { totalEarned } from "../../../assets/data/earnings";

export function ProviderOverviewPage() {
  const { t } = useI18n();
  const upcoming = providerBookings.filter((b) => b.status === "upcoming").length;
  const completed = providerBookings.filter((b) => b.status === "completed").length;

  return (
    <div className=" flex flex-col gap-5">
      <h2 className="font-serif-italic text-3xl">
        {t("overview.hello")} Simon!<span className="ml-1">👋</span>
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewTopCard
          label={t("overview.upcomingBookings")}
          value={String(upcoming + 4)}
          icon={CalendarCheck}
        />
        <OverviewTopCard
          label={t("overview.completedBookings")}
          value={String(completed + 9)}
          icon={CheckCircle2}
        />
        <OverviewTopCard
          label={t("provider.earnings")}
          value={formatCHF(totalEarned)}
          icon={Wallet}
        />
        <OverviewTopCard label={t("overview.averageRating")} value="4.9" icon={Star} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <NextBookings />
        <YourCalendar />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <YourBookings />
        </div>
        <div className="flex flex-col gap-4">
          <YourFavorites />
          <EarningsOverview />
        </div>
      </div>
    </div>
  );
}
