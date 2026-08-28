import type { BookingStatus } from "./bookings";

export type ProviderBooking = {
  id: string;
  code: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  amount: number;
  status: BookingStatus;
};

const statuses: BookingStatus[] = ["pending", "completed", "cancelled"];

export const providerBookings: ProviderBooking[] = statuses.map(
  (status, i) => ({
    id: `pb-${2345 + i}`,
    code: `${2345 + i}`,
    clientName: "Nina Collin",
    service: "Tutoring",
    date: "2nd June, 2016",
    time: "10:00 AM - 12:00 PM",
    amount: 63,
    status,
  }),
);

export const providerNextBooking = {
  id: "pb-next",
  clientName: "Simon Keller",
  location: "Zürich",
  date: "Sat, 18 May",
  time: "09:00 - 13:00",
  address: "Bahnhofweg 17",
  status: "confirmed" as BookingStatus,
};