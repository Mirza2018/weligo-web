// Shapes returned by /overview/my and /bookings/my.
// Adjust field names here if your backend response differs.

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

export type CategoryRef = {
  _id: string;
  name: string;
};

export type OtherParty = {
  _id: string;
  fullName: string;
  profileImage?: string | null;
  categoryId?: CategoryRef;
};

export type TimeSlot = {
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
};

export type NextBooking = {
  _id: string;
  bookingReference: string;
  bookingDate: string; // ISO date
  timeSlot: TimeSlot;
  status: BookingStatus;
  otherParty: OtherParty;
};

export type RecentMessageUser = {
  _id: string;
  fullName: string;
  profileImage?: string | null;
};

export type RecentMessage = {
  _id: string;
  text: string;
  images: string[];
  createdAt: string; // ISO date
  sender: RecentMessageUser;
  receiver: RecentMessageUser;
};

export type FavoriteProvider = {
  _id: string;
  fullName: string;
  profileImage?: string | null;
  role: string;
  averageRating: number;
  categoryId?: CategoryRef;
};

export type SpendingSlice = {
  category: string;
  amount: number;
  color?: string;
};

export type OverviewStats = {
  upcomingBookings: number;
  completedBookings: number;
  averageRating: number;
  totalSpent: number;
};

export type OverviewData = {
  stats: OverviewStats;
  nextBooking: NextBooking | null;
  recentMessages: RecentMessage[];
  spendingByCategory: SpendingSlice[];
  latestFavorites: FavoriteProvider[];
};

export type OverviewResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: OverviewData;
};

export type Booking = {
  _id: string;
  bookingReference: string;
  bookingDate: string;
  dayOfWeek: string;
  timeSlot: TimeSlot;
  durationInHours: number;
  address: string;
  paymentAmount: number;
  status: BookingStatus;
  serviceProvider: {
    _id: string;
    fullName: string;
    email?: string;
    profileImage?: string | null;
    phone?: string;
    categoryId?: CategoryRef;
  };
};

export type BookingsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  meta: { page: number; limit: number; total: number; totalPage: number };
  data: Booking[];
};
