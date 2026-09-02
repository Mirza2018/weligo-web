// src/lib/paymentStorage.ts
// Single source of truth for the sessionStorage key that carries the booking
// id across the redirect to Stripe Checkout and back.

export const PENDING_PAYMENT_BOOKING_ID_KEY = "pendingPaymentBookingId";

export function setPendingPaymentBookingId(bookingId: string): void {
  try {
    sessionStorage.setItem(PENDING_PAYMENT_BOOKING_ID_KEY, bookingId);
  } catch {
    // sessionStorage unavailable (e.g. private browsing) - payment can still proceed
  }
}

export function getPendingPaymentBookingId(): string | null {
  try {
    return sessionStorage.getItem(PENDING_PAYMENT_BOOKING_ID_KEY);
  } catch {
    return null;
  }
}

export function clearPendingPaymentBookingId(): void {
  try {
    sessionStorage.removeItem(PENDING_PAYMENT_BOOKING_ID_KEY);
  } catch {
    // ignore
  }
}
