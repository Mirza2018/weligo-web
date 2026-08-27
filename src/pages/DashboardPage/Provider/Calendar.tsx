import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  isSameDay,
  parseISO,
} from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useI18n } from "../../../lib/i18n";
import { cn } from "../../../lib/utils";
// adjust this path to wherever your websiteApi slice actually lives
import { useGetAllBookingsQuery } from "../../../redux/api/websiteApi";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

type Booking = {
  _id: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    profileImage?: string;
  };
  serviceProvider: {
    categoryId?: { name: string };
  };
  bookingDate: string;
  timeSlot: { startTime: string; endTime: string };
  durationInHours: number;
  address: string;
  paymentAmount: number;
  status: string;
  bookingReference: string;
  whatToExpect?: string;
  numberOfPersons?: number;
};

type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  startHour: number;
  endHour: number;
  booking: Booking;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-200 border-yellow-300 text-yellow-900",
  confirmed: "bg-emerald-200 border-emerald-300 text-emerald-900",
  completed: "bg-sky-200 border-sky-300 text-sky-900",
  cancelled: "bg-rose-200 border-rose-300 text-rose-900",
  rejected: "bg-rose-200 border-rose-300 text-rose-900",
};

const statusBadgeColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  completed: "bg-sky-100 text-sky-800",
  cancelled: "bg-rose-100 text-rose-800",
  rejected: "bg-rose-100 text-rose-800",
};

const parseHour = (time: string) => Number(time.split(":")[0]);

function bookingToEvent(b: Booking): CalendarEvent {
  return {
    id: b._id,
    title: `${b.serviceProvider?.categoryId?.name ?? "Booking"} · ${b.customer.fullName}`,
    date: b.bookingDate.slice(0, 10), // YYYY-MM-DD
    startHour: parseHour(b.timeSlot.startTime),
    endHour: parseHour(b.timeSlot.endTime),
    booking: b,
  };
}

export function ProviderCalendarPage() {
  const { t } = useI18n();
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );
  const [selected, setSelected] = useState<Booking | null>(null);

  const { data, isLoading, isError } = useGetAllBookingsQuery({
    limit: 100,
    sort: "bookingDate",
  });

  const events: CalendarEvent[] = useMemo(() => {
    const bookings: Booking[] = data?.data ?? [];
    return bookings.map(bookingToEvent);
  }, [data]);

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  const today = new Date();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-serif text-2xl font-medium">
            {format(weekStart, "MMMM yyyy")}
          </h2>
          <button
            type="button"
            onClick={() => setWeekStart(addWeeks(weekStart, -1))}
            className="rounded-md p-1.5 text-muted-foreground transition hover:bg-secondary"
            aria-label="Previous week"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setWeekStart(addWeeks(weekStart, 1))}
            className="rounded-md p-1.5 text-muted-foreground transition hover:bg-secondary"
            aria-label="Next week"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading bookings…
        </div>
      )}
      {isError && (
        <div className="rounded-2xl border border-border bg-card p-6 text-sm text-destructive">
          Failed to load bookings.
        </div>
      )}

      <div className="overflow-auto rounded-2xl border border-border bg-card shadow-sm">
        <div className="min-w-[900px]">
          {/* Header */}
          <div className="grid grid-cols-[64px_repeat(7,minmax(0,1fr))] border-b border-border bg-muted-bg">
            <div />
            {days.map((d) => {
              const isToday = isSameDay(d, today);
              return (
                <div
                  key={d.toISOString()}
                  className="flex flex-col items-center gap-1 py-3"
                >
                  <span className="text-xs text-muted-foreground">
                    {format(d, "EEE")}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                      isToday
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground",
                    )}
                  >
                    {format(d, "d")}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Time grid */}
          <div className="relative grid grid-cols-[64px_repeat(7,minmax(0,1fr))]">
            {HOURS.map((h) => (
              <div key={`row-${h}`} className="contents">
                <div className="h-14 border-b border-border pr-2 pt-1 text-right text-xs text-muted-foreground">
                  {h}:00
                </div>
                {days.map((d) => (
                  <div
                    key={`cell-${d.toISOString()}-${h}`}
                    className="relative h-14 border-b border-l border-border"
                  />
                ))}
              </div>
            ))}

            {/* Events overlay (read-only, click to view details) */}
            {events.map((ev) => {
              const dayIndex = days.findIndex((d) =>
                isSameDay(d, parseISO(ev.date)),
              );
              if (dayIndex === -1) return null;
              const top = ev.startHour * 56;
              const height = (ev.endHour - ev.startHour) * 56 - 4;
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelected(ev.booking)}
                  className={cn(
                    "absolute mx-1 rounded-md border px-2 py-1 text-left text-xs font-medium shadow-sm transition hover:opacity-90",
                    statusColors[ev.booking.status] ?? statusColors.pending,
                  )}
                  style={{
                    top,
                    height,
                    left: `calc(64px + ${dayIndex} * ((100% - 64px) / 7))`,
                    width: `calc((100% - 64px) / 7 - 8px)`,
                  }}
                >
                  {ev.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Read-only booking details dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">{selected.bookingReference}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                    statusBadgeColors[selected.status] ??
                      statusBadgeColors.pending,
                  )}
                >
                  {selected.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="font-medium">{selected.customer.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-medium">
                    {selected.serviceProvider?.categoryId?.name ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {format(parseISO(selected.bookingDate), "MMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-medium">
                    {selected.timeSlot.startTime} – {selected.timeSlot.endTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-medium">{selected.durationInHours}h</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Persons</p>
                  <p className="font-medium">
                    {selected.numberOfPersons ?? "—"}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium">{selected.address}</p>
                </div>
                {selected.whatToExpect && (
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Notes</p>
                    <p className="font-medium">{selected.whatToExpect}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground">Payment</p>
                  <p className="font-medium">${selected.paymentAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Contact</p>
                  <p className="font-medium">{selected.customer.phone}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
