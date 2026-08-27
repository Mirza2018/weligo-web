import type {
  BookingStatus,
  CategoryRef,
  NextBooking,
  RecentMessage,
  TimeSlot,
} from "./overview";

export type ProviderOverviewStats = {
  upcomingBookings: number;
  completedBookings: number;
  earnings: number;
  averageRating: number;
};

export type MonthlyEarningStat = {
  month: number;
  monthName: string;
  totalCustomerPayment: number;
  totalCommission: number;
  totalProviderEarning: number;
};

export type EarningOverview = {
  year: number;
  monthlyStats: MonthlyEarningStat[];
};

export type CalendarBookingCustomer = {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage?: string | null;
};

export type CalendarBooking = {
  _id: string;
  customer: CalendarBookingCustomer;
  bookingDate: string; // ISO date
  dayOfWeek: string;
  timeSlot: TimeSlot;
  durationInHours: number;
  address: string;
  paymentAmount: number;
  status: BookingStatus;
  bookingReference: string;
};

export type ProviderOverviewData = {
  stats: ProviderOverviewStats;
  nextBooking: NextBooking | null;
  recentMessages: RecentMessage[];
  earningOverview: EarningOverview;
  calendarBookings: CalendarBooking[];
};

export type ProviderOverviewResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProviderOverviewData;
};

// A booking as seen from the provider's side of /bookings/my — the
// counterparty is the customer, not another provider.
export type ProviderBooking = {
  _id: string;
  bookingReference: string;
  bookingDate: string;
  timeSlot: TimeSlot;
  durationInHours: number;
  address: string;
  paymentAmount: number;
  status: BookingStatus;
  customer: {
    _id: string;
    fullName: string;
    email?: string;
    profileImage?: string | null;
    phone?: string;
  };
  serviceProvider: {
    _id: string;
    categoryId?: CategoryRef;
  };
};

export type ProviderBookingsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  meta: { page: number; limit: number; total: number; totalPage: number };
  data: ProviderBooking[];
};
