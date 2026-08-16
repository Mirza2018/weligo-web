// src/lib/providerDate.ts
import type { Availability, Booking, WeekDay } from "@/types/providerDetails";

const WEEKDAYS_MON_FIRST: WeekDay[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const JS_DAY_TO_WEEKDAY: WeekDay[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function weekdayFromDate(date: Date): WeekDay {
  return JS_DAY_TO_WEEKDAY[date.getDay()];
}

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatSlotRange(
  slots: { startTime: string; endTime: string }[],
): string {
  if (slots.length === 0) return "";
  return slots.map((s) => `${s.startTime} - ${s.endTime}`).join(", ");
}

/**
 * "available" -> has explicit open slots today
 * "partial"   -> marked available but no fixed slots (by arrangement)
 * "booked"    -> marked unavailable / closed
 */
export function dayStatus(schedule?: {
  isAvailable: boolean;
  slots: unknown[];
}) {
  if (!schedule || !schedule.isAvailable) return "booked" as const;
  if (schedule.slots.length === 0) return "partial" as const;
  return "available" as const;
}

export function formatRelativeTime(
  iso: string,
  locale: string = "en-US",
): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return locale.startsWith("de") ? "Heute" : "Today";
  if (diffDays === 1) return locale.startsWith("de") ? "Gestern" : "Yesterday";
  if (diffDays < 30) {
    return locale.startsWith("de")
      ? `vor ${diffDays} Tagen`
      : `${diffDays} days ago`;
  }
  const diffMonths = Math.floor(diffDays / 30);
  return locale.startsWith("de")
    ? `vor ${diffMonths} Monat${diffMonths > 1 ? "en" : ""}`
    : `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
}

export function isSameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export type CalendarDayStatus =
  | "available"
  | "partial"
  | "booked"
  | "past"
  | "empty";

export interface CalendarDay {
  day: number;
  date: Date | null;
  status: CalendarDayStatus;
}

/**
 * Builds a Monday-first grid for the given month, blending the provider's
 * weekly schedule with any confirmed/pending bookings on specific dates.
 */
export function buildCalendarGrid(
  monthDate: Date,
  availability: Availability | undefined,
  bookings: Booking[],
): CalendarDay[] {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // JS getDay(): 0=Sun..6=Sat. Convert to Monday-first offset (0=Mon..6=Sun).
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookedDates = new Set(
    bookings
      .filter((b) => b.status === "confirmed" || b.status === "pending")
      .map((b) => new Date(b.bookingDate).toDateString()),
  );

  const scheduleByDay = new Map(
    (availability?.weeklySchedule ?? []).map((d) => [d.day, d]),
  );

  const cells: CalendarDay[] = [];

  for (let i = 0; i < leadingBlanks; i++) {
    cells.push({ day: 0, date: null, status: "empty" });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    let status: CalendarDayStatus;

    if (date < today) {
      status = "past";
    } else if (bookedDates.has(date.toDateString())) {
      status = "booked";
    } else {
      status = dayStatus(scheduleByDay.get(weekdayFromDate(date)));
    }

    cells.push({ day, date, status });
  }

  return cells;
}

export { WEEKDAYS_MON_FIRST };
