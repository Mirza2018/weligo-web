// src/lib/bookingHelpers.ts
import type { BookingStatus } from "@/types/bookings";

export function formatBookingDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTimeRange(slot: {
  startTime: string;
  endTime: string;
}): string {
  return `${slot.startTime} - ${slot.endTime}`;
}

/** True once the booking's calendar date has arrived (ignores time-of-day). */
export function hasBookingDateArrived(bookingDateIso: string): boolean {
  const bookingDay = new Date(bookingDateIso);
  bookingDay.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return bookingDay <= today;
}

export const statusLabel: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  provider_completed: "Awaiting Confirmation",
  completed: "Completed",
  rejected: "Declined",
  cancelled: "Cancelled",
  expired: "Expired",
  disputed: "Disputed",
};

export const statusBadgeClass: Record<BookingStatus, string> = {
  pending: "bg-sky-100 text-sky-700 border-sky-300",
  confirmed: "bg-emerald-100 text-emerald-700 border-emerald-300",
  in_progress: "bg-amber-100 text-amber-700 border-amber-300",
  provider_completed: "bg-orange-100 text-orange-700 border-orange-300",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-300",
  rejected: "bg-red-100 text-red-700 border-red-300",
  cancelled: "bg-red-100 text-red-700 border-red-300",
  expired: "bg-muted text-muted-foreground border-border",
  disputed: "bg-red-100 text-red-700 border-red-300",
};
