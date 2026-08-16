// src/lib/purchaseAvailability.ts
import { weekdayFromDate } from "./providerDate";
import type { Availability, Booking, TimeSlot } from "@/types/providerDetails";

export interface SlotWithStatus extends TimeSlot {
  booked: boolean;
} 

function isActiveBooking(status: string) {
  return status === "confirmed" || status === "pending";
}

/**
 * The provider's schedule is weekly/recurring (isAvailable per weekday),
 * not per specific calendar date. A date is offer-able for booking when its
 * weekday is marked available AND has at least one concrete slot.
 */
export function isDateBookable(
  date: Date,
  availability: Availability,
): boolean {
  const schedule = availability.weeklySchedule.find(
    (d) => d.day === weekdayFromDate(date),
  );
  return !!schedule?.isAvailable && schedule.slots.length > 0;
}

/**
 * Returns this date's slots, each flagged `booked: true` if a confirmed or
 * pending booking already exists for that exact date + slot.
 */
export function getSlotsForDate(
  date: Date,
  availability: Availability,
  bookings: Booking[],
): SlotWithStatus[] {
  const schedule = availability.weeklySchedule.find(
    (d) => d.day === weekdayFromDate(date),
  );
  if (!schedule?.isAvailable) return [];

  const dateKey = date.toDateString();

  return schedule.slots.map((slot) => {
    const booked = bookings.some(
      (b) =>
        isActiveBooking(b.status) &&
        b.timeSlotId === slot._id &&
        new Date(b.bookingDate).toDateString() === dateKey,
    );
    return { ...slot, booked };
  });
}

/** True once every slot on that date is already booked. */
export function isDateFullyBooked(
  date: Date,
  availability: Availability,
  bookings: Booking[],
): boolean {
  const slots = getSlotsForDate(date, availability, bookings);
  return slots.length > 0 && slots.every((s) => s.booked);
}

export function slotHours(slot: {
  startTime: string;
  endTime: string;
}): number {
  const [sh] = slot.startTime.split(":").map(Number);
  const [eh] = slot.endTime.split(":").map(Number);
  return Math.max(1, eh - sh);
}

/**
 * Duration must never exceed the selected slot's own length (no booking
 * past the end of the slot), and never drop below the provider's minimum.
 */
export function clampDuration(
  slot: { startTime: string; endTime: string },
  minimumBookingHours: number,
  requested: number,
): number {
  const max = slotHours(slot);
  const min = Math.min(minimumBookingHours || 1, max);
  return Math.min(max, Math.max(min, requested));
}
