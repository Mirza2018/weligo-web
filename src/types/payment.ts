// src/types/payment.ts
// Response shape is defensive/optional throughout: the backend contract for
// GET /payments/booking/:bookingId isn't finalized, so every field is read
// with optional chaining at the call site rather than assumed present.

export interface PaymentBookingSummary {
  _id?: string;
  bookingReference?: string;
  bookingDate?: string;
  status?: string;
  paymentAmount?: number;
  timeSlot?: { startTime?: string; endTime?: string };
  serviceProvider?: { fullName?: string; _id?: string } | string;
}

export interface PaymentSummary {
  paymentStatus?: string;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  transactionId?: string;
  gatewayReference?: string;
}

export interface PaymentStatusData extends PaymentSummary {
  booking?: PaymentBookingSummary | string;
  payment?: PaymentSummary;
}

export interface PaymentStatusResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: PaymentStatusData;
}
