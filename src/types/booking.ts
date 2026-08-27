// src/types/booking.ts
import type { GeoPoint } from "./website";

export interface BookingRequestBody {
  customer: string;
  serviceProvider: string;
  bookingDate: string; // "YYYY-MM-DD"
  timeSlotId: string;
  durationInHours: number;
  ageGroup: string;
  numberOfPersons: number;
  whatToExpect: string;
  address: string;
  location: GeoPoint;
  paymentMethod: "card" | "apple_pay";
  amount: number;
}

export interface BookingRecord {
  customer: string;
  serviceProvider: string;
  bookingDate: string;
  dayOfWeek: string;
  timeSlotId: string;
  timeSlot: { startTime: string; endTime: string };
  durationInHours: number;
  ageGroup: string;
  numberOfPersons: number;
  paymentAmount: number;
  commissionAmount: number;
  providerEarning: number;
  whatToExpect: string;
  address: string;
  location: GeoPoint;
  paymentMethod: "card" | "apple_pay";
  status: string;
  _id: string;
  bookingReference: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  booking: string;
  payer: string;
  amount: number;
  commissionAmount: number;
  providerEarning: number;
  currency: string;
  paymentMethod: "card" | "apple_pay";
  paymentStatus: string;
  gatewayReference: string;
  refundedAmount: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  transactionId: string;
}

export interface BookingMutationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    booking: BookingRecord;
    payment: PaymentRecord;
    redirectUrl: string;
  };
}
