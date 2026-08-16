// src/types/providerDetails.ts
import type { GeoPoint } from "./website";

export interface ProviderPreferences {
  nonSmoker: boolean;
  driverLicense: boolean;
  ownVehicle: boolean;
  comfortableWithPets: boolean;
  hasChildren: boolean;
}

export interface Certificate {
  _id: string;
  type: string;
  description: string;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderProfile {
  _id: string;
  shortBioTitle: string;
  shortBio: string;
  longBioTitle: string;
  longBio: string;
  preferences: ProviderPreferences;
  certificates: Certificate[];
  createdAt: string;
  updatedAt: string;
}

export interface PersonRef {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profileImage: string;
}

export interface ReviewReply {
  comment: string;
  repliedAt: string;
}

export interface Review {
  _id: string;
  bookingId: string;
  reviewerId: PersonRef;
  receiverId: string;
  rating: number;
  comment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  reply?: ReviewReply;
}

export interface RatingBucket {
  rating: number;
  count: number;
  percentage: number;
}

export interface RatingSummary {
  totalReviews: number;
  averageRating: number;
  ratings: RatingBucket[];
}

export type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface TimeSlot {
  _id: string;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
}

export interface DaySchedule {
  day: WeekDay;
  isAvailable: boolean;
  slots: TimeSlot[];
}

export interface BookingRules {
  minimumBookingHours: number;
  maxBookingsPerDay: number;
  acceptingBookings: boolean;
}

export interface Availability {
  _id: string;
  user: string;
  weeklySchedule: DaySchedule[];
  bookingRules: BookingRules;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  _id: string;
  customer: PersonRef;
  bookingDate: string; // ISO date
  dayOfWeek: WeekDay;
  timeSlotId: string;
  timeSlot: { startTime: string; endTime: string };
  durationInHours: number;
  ageGroup: string;
  numberOfPersons: number;
  status: "pending" | "confirmed" | "completed" | "cancelled" | string;
  bookingReference: string;
}

export interface ProviderDetailsUser {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  profileImage: string;
  phone: string;
  city: string;
  postalCode: string;
  address: string;
  categoryId: string;
  category: string;
  hourlyRate: number;
  experience: number;
  lenguages: string[];
  averageRating: number;
  totalReview: number;
  location: GeoPoint;
}

export interface ProviderDetailsData {
  user: ProviderDetailsUser;
  profile: ProviderProfile;
  reviews: Review[];
  ratingSummary: RatingSummary;
  availability: Availability;
  bookings: Booking[];
}

export interface ProviderDetailsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProviderDetailsData;
}
