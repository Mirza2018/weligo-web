import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { statusLabel } from "@/lib/overview-helpers";
import type { BookingStatus } from "@/types/overview";

const styles: Record<BookingStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  // "confirmed" and "provider_completed" both translate to "Confirmed" in
  // the i18n table, so they share the same green treatment seen in the mocks.
  confirmed: "bg-emerald-500 text-white border border-emerald-500",
  provider_completed: "bg-emerald-500 text-white border border-emerald-500",
  in_progress: "bg-violet-50 text-violet-700 border border-violet-200",
  completed: "bg-sky-50 text-sky-700 border border-sky-200",
  rejected: "bg-rose-50 text-rose-700 border border-rose-200",
  cancelled: "bg-rose-50 text-rose-700 border border-rose-200",
  expired: "bg-slate-100 text-slate-600 border border-slate-200",
  disputed: "bg-red-50 text-red-700 border border-red-200",
};

export function StatusBadge({
  status,
  className,
}: {
  status: BookingStatus | string;
  className?: string;
}) {
  const { t } = useI18n();
  const style =
    styles[status as BookingStatus] ??
    "bg-muted text-muted-foreground border border-border";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        style,
        className,
      )}
    >
      {statusLabel(t, status)}
    </span>
  );
}
