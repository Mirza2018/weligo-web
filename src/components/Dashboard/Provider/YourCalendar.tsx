import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useI18n } from "../../../lib/i18n";
import { SectionCard } from "../../common/SectionCard";
import {
  formatTimeRange,
  resolveImageUrl,
} from "../../../lib/overview-helpers";
import { UserAvatar } from "../../common/UserAvatar";
import type { CalendarBooking } from "../../../types/provider-overview";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function toDateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Monday..Sunday of the week containing `today`. */
function currentWeek(today: Date) {
  const day = today.getDay(); // 0 = Sunday
  const mondayOffset = day === 0 ? -6 : 1 - day;
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + mondayOffset + i);
    return d;
  });
}

export function YourCalendar({ bookings }: { bookings: CalendarBooking[] }) {
  const { t } = useI18n();
  const today = useMemo(() => new Date(), []);
  const week = useMemo(() => currentWeek(today), [today]);

  const byDate = useMemo(() => {
    const map = new Map<string, CalendarBooking[]>();
    for (const b of bookings) {
      const key = b.bookingDate.slice(0, 10);
      map.set(key, [...(map.get(key) ?? []), b]);
    }
    return map;
  }, [bookings]);

  // Default to today if it falls in this week, otherwise the first day that
  // actually has a booking, otherwise just Monday.
  const defaultKey =
    week.map(toDateKey).find((k) => k === toDateKey(today)) ??
    week.map(toDateKey).find((k) => byDate.has(k)) ??
    toDateKey(week[0]);

  const [selectedKey, setSelectedKey] = useState(defaultKey);
  const appointments = byDate.get(selectedKey) ?? [];

  return (
    <SectionCard
      title={t("provider.yourCalendar")}
      action={
        <Link
          to="/dashboard/provider/calendar"
          className="text-sm font-medium text-primary hover:underline"
        >
          {t("provider.openCalendar") /* falls back to key if missing */}
        </Link>
      }
    >
      <div className="grid grid-cols-7 gap-1.5 text-center">
        {week.map((d, i) => {
          const key = toDateKey(d);
          const isSelected = key === selectedKey;
          const hasBookings = byDate.has(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedKey(key)}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="text-[10px] font-medium tracking-wide text-muted-foreground">
                {DAY_LABELS[i]}
              </span>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted-bg"
                }`}
              >
                {d.getDate()}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  hasBookings && !isSelected ? "bg-primary" : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {appointments.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No appointments this day.
          </p>
        ) : (
          appointments.map((b) => (
            <div
              key={b._id}
              className="flex items-center gap-3 rounded-xl border-l-4 border-primary bg-secondary/60 px-3 py-2"
            >
              <UserAvatar
                name={`${b.customer.firstName} ${b.customer.lastName}`}
                imageUrl={resolveImageUrl(b.customer.profileImage)}
                size={36}
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {formatTimeRange(b.timeSlot.startTime, b.timeSlot.endTime)}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {b.customer.firstName} {b.customer.lastName} ·{" "}
                  {b.durationInHours}h
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
}
