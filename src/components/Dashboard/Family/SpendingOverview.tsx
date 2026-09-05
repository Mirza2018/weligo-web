import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { SectionCard } from "../../common/SectionCard";
import { formatCHF } from "../../../lib/format";
import { useI18n } from "../../../lib/i18n";
import type { SpendingSlice } from "../../../types/overview";

// Fallback palette used when the API doesn't send a color per category.
const PALETTE = ["#6d5df6", "#8a7df8", "#a99ffb", "#c4bcfc", "#dcd7fd"];

export function SpendingOverview({
  totalSpent,
  breakdown,
}: {
  totalSpent: number;
  breakdown: SpendingSlice[];
}) {
  const { t } = useI18n();
  const slices = breakdown.map((s, i) => ({
    ...s,
    color: s.color ?? PALETTE[i % PALETTE.length],
  }));

  return (
    <SectionCard
      title={t("overview.spendingOverview")}
      action={
        <button className="text-sm font-medium text-primary hover:underline">
          {t("overview.viewAll")}
        </button>
      }
    >
      <p className="font-serif text-3xl font-medium text-foreground">
        {formatCHF(totalSpent, true)}
      </p>

      {slices.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          {t("familyDashboard.nospending")}
        </p>
      ) : (
        <div className="mt-4 flex items-center gap-4">
          <div className="h-32 w-32 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={36}
                  outerRadius={60}
                  paddingAngle={2}
                  stroke="none"
                >
                  {slices.map((s, i) => (
                    <Cell key={i} fill={s.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="flex-1 space-y-1.5 text-sm">
            {slices.map((s, i) => (
              <li key={i} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-muted-foreground">{s.category}</span>
                </div>
                <span className="font-medium text-foreground">
                  {formatCHF(s.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionCard>
  );
}
