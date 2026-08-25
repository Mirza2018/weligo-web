// src/types/bookings.ts
import type { ApiMeta, GeoPoint } from "./website";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "provider_completed"
  | "completed"
  | "rejected"
  | "cancelled"
  | "expired"
  | "disputed";

export interface BookingCustomerRef {
  _id: string;
  fullName: string;
  email: string;
  profileImage: string;
  phone: string;
}

export interface StatusHistoryEntry {
  status: string;
  actionBy: string;
  actionByRole: "family" | "provider" | string;
  actionAt: string;
  note: string;
}

export interface BookingPaymentSummary {
  _id: string;
  booking: string;
  payer: string;
  amount: number;
  commissionAmount: number;
  providerEarning: number;
  currency: string;
  paymentMethod: "card" | "twint";
  paymentStatus: string;
  gatewayReference: string;
  refundedAmount: number;
  createdAt: string;
  updatedAt: string;
  transactionId?: string;
  capturedAt?: string;
}

export interface BookingRecordFull {
  _id: string;
  // Populated in the list endpoint; plain id strings in most action responses.
  customer: BookingCustomerRef | string;
  serviceProvider: string;
  bookingDate: string;
  dayOfWeek: string;
  timeSlotId: string;
  timeSlot: { startTime: string; endTime: string };
  durationInHours: number;
  ageGroup: string;
  numberOfPersons: number;
  whatToExpect: string;
  address: string;
  location: GeoPoint;
  paymentAmount: number;
  commissionAmount: number;
  providerEarning: number;
  paymentMethod: "card" | "twint";
  status: BookingStatus;
  statusHistory: StatusHistoryEntry[];
  bookingReference: string;
  createdAt: string;
  updatedAt: string;
  acceptedAt?: string;
  startedAt?: string;
  providerCompletedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelledBy?: "provider" | "customer" | string;
  cancellationReason?: string;
  rejectedAt?: string;
  payment?: BookingPaymentSummary | string;
}

export interface GetAllBookingsParams {
  status?: BookingStatus;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface GetAllBookingsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: ApiMeta;
  data: BookingRecordFull[];
}

export interface BookingActionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: BookingRecordFull;
}

export interface DeclineBookingPayload {
  id: string;
  data: { reason: string };
}

export interface WithdrawBookingPayload {
  id: string;
  data?: { reason?: string };
}

export interface CancelBookingPayload {
  id: string;
  data: { reason: string };
}

export interface CreateReviewPayload {
  bookingId: string;
  receiverId: string;
  rating: number;
  comment: string;
}
