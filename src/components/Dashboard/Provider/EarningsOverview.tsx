import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useI18n } from "../../../lib/i18n";
import { SectionCard } from "../../common/SectionCard";
import { formatCHF } from "../../../lib/format";
import { totalEarned } from "../../../assets/data/earnings";
// import { SectionCard } from "@/components/common/SectionCard";
// import { useI18n } from "@/lib/i18n";
// import { formatCHF } from "@/lib/format";
// import { totalEarned } from "@/assets/data/earnings";

const breakdown = [
  { category: "Tutoring", amount: 820, color: "#7c3aed" },
  { category: "Childcare", amount: 320, color: "#f472b6" },
  { category: "Other", amount: 108, color: "#fbbf24" },
];

export function EarningsOverview() {
  const { t } = useI18n();
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
        {formatCHF(totalEarned, true)}
      </p>
      <div className="mt-4 flex items-center gap-4">
        <div className="h-32 w-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdown}
                dataKey="amount"
                nameKey="category"
                innerRadius={36}
                outerRadius={60}
                paddingAngle={2}
                stroke="none"
              >
                {breakdown.map((s, i) => (
                  <Cell key={i} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex-1 space-y-1.5 text-sm">
          {breakdown.map((s, i) => (
            <li key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-muted-foreground">{s.category}</span>
              </div>
              <span className="font-medium text-foreground">{formatCHF(s.amount)}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
}
