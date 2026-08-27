import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useI18n } from "../../../lib/i18n";
import { SectionCard } from "../../common/SectionCard";
import { formatCHF } from "../../../lib/format";
import type { EarningOverview as EarningOverviewData } from "../../../types/provider-overview";

// Only show every other month label on the x-axis, matching the mock
// (Jan, Mar, May, Jul, Sep, Nov).
const SHOWN_MONTHS = new Set([1, 3, 5, 7, 9, 11]);

export function EarningsOverview({
  totalEarnings,
  overview,
}: {
  totalEarnings: number;
  overview: EarningOverviewData | undefined;
}) {
  const { t } = useI18n();
  const monthly = overview?.monthlyStats ?? [];

  const chartData = monthly.map((m) => ({
    month: m.month,
    label: m.monthName.slice(0, 3),
    earnings: m.totalProviderEarning,
  }));

  return (
    <SectionCard
      title={t("provider.earningsOverview")}
      action={
        <button className="text-sm font-medium text-primary hover:underline">
          {t("overview.viewAll")}
        </button>
      }
    >
      <p className="font-serif text-3xl font-medium text-foreground">
        {formatCHF(totalEarnings, true)}
      </p>

      {chartData.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No earnings recorded yet.
        </p>
      ) : (
        <div className="mt-4 h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                tickFormatter={(_, i) =>
                  SHOWN_MONTHS.has(chartData[i]?.month)
                    ? chartData[i].label
                    : ""
                }
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={36}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              />
              <Tooltip
                formatter={(value: number) => formatCHF(value)}
                labelFormatter={(label) => label}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </SectionCard>
  );
}
