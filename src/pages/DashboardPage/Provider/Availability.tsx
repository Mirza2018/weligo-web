"use client";

import React, { useMemo, useState } from "react";
import { Plus, X, Clock } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useMyAvailabilityQuery,
  useUpdateAvailabilityRulesMutation,
  useAddDayAvailabilityMutation,
  useIsDayAvailabilityMutation,
  useUpdateTimeAvailabilityMutation,
  useDeleteTimeAvailabilityMutation,
} from "@/redux/api/websiteApi"; // TODO: adjust to your actual RTK Query api slice path

// ---- Types -----------------------------------------------------------

type Slot = {
  _id: string;
  startTime: string;
  endTime: string;
};

type DaySchedule = {
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  isAvailable: boolean;
  slots: Slot[];
};

type BookingRules = {
  minimumBookingHours: number;
  maxBookingsPerDay: number;
  acceptingBookings: boolean;
};

const DAY_ORDER: DaySchedule["day"][] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const DAY_LABEL: Record<DaySchedule["day"], string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const DAY_SHORT: Record<DaySchedule["day"], string> = {
  monday: "MON",
  tuesday: "TUE",
  wednesday: "WED",
  thursday: "THU",
  friday: "FRI",
  saturday: "SAT",
  sunday: "SUN",
};

const MIN_BOOKING_HOUR_OPTIONS = [1, 2, 3, 4, 6, 8, 12, 24];
const MAX_BOOKINGS_PER_DAY_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10];

// ---- Helpers -----------------------------------------------------------

function formatRange(startTime: string, endTime: string) {
  return `${startTime} – ${endTime}`;
}

function durationLabel(startTime: string, endTime: string) {
  if (!startTime || !endTime) return null;
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  let minutes = eh * 60 + em - (sh * 60 + sm);
  if (Number.isNaN(minutes)) return null;
  if (minutes <= 0) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h}h ${m}m duration`;
  if (h) return `${h}h duration`;
  return `${m}m duration`;
}

/** Builds the next 7 calendar days starting today, keyed to weekday schedule. */
function useWeekAtAGlance(weeklySchedule: DaySchedule[] | undefined) {
  return useMemo(() => {
    if (!weeklySchedule) return [];
    const byDay = new Map(weeklySchedule.map((d) => [d.day, d]));
    const today = new Date();
    const jsDayToKey: DaySchedule["day"][] = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const key = jsDayToKey[date.getDay()];
      const sched = byDay.get(key);
      return {
        date,
        dayKey: key,
        isAvailable: sched?.isAvailable ?? false,
        slotCount: sched?.slots.length ?? 0,
      };
    });
  }, [weeklySchedule]);
}

// ---- Edit / add slot dialog -----------------------------------------------------------

type SlotDialogState = {
  open: boolean;
  day: DaySchedule["day"] | null;
  slotId: string | null; // null = creating a new slot
  startTime: string;
  endTime: string;
};

const EMPTY_DIALOG: SlotDialogState = {
  open: false,
  day: null,
  slotId: null,
  startTime: "",
  endTime: "",
};

function SlotDialog({
  state,
  onClose,
  onSave,
  saving,
  error,
}: {
  state: SlotDialogState;
  onClose: () => void;
  onSave: (startTime: string, endTime: string) => void;
  saving: boolean;
  error: string | null;
}) {
  const [startTime, setStartTime] = useState(state.startTime);
  const [endTime, setEndTime] = useState(state.endTime);

  React.useEffect(() => {
    setStartTime(state.startTime);
    setEndTime(state.endTime);
  }, [state.startTime, state.endTime, state.open]);

  const duration = durationLabel(startTime, endTime);
  const isNew = state.slotId === null;

  return (
    <Dialog open={state.open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm p-0 overflow-hidden">
        <DialogHeader className="flex-row items-start gap-3 space-y-0 px-6 pt-6 pb-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--secondary-foreground)]">
            <Clock className="h-4 w-4" />
          </span>
          <div>
            <DialogTitle className="text-base font-semibold">
              {isNew ? "Add time slot" : "Edit time slot"}
            </DialogTitle>
            <p className="text-sm text-[var(--muted-foreground)]">
              {state.day ? DAY_LABEL[state.day] : ""}
            </p>
          </div>
        </DialogHeader>

        <div className="border-t border-[var(--border)] px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
                Start time
              </Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
                End time
              </Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {duration && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--secondary)] px-2.5 py-1 text-xs font-medium text-[var(--secondary-foreground)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              {duration}
            </span>
          )}

          {error && (
            <p className="text-sm text-[var(--destructive)]">{error}</p>
          )}
        </div>

        <DialogFooter className="border-t border-[var(--border)] px-6 py-4 sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={() => onSave(startTime, endTime)}
            disabled={saving || !startTime || !endTime || startTime >= endTime}
          >
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---- Main component -----------------------------------------------------------

const Availability = () => {
  const { t } = useI18n();

  const { data, isLoading, isFetching } = useMyAvailabilityQuery({});
  const [updateRules] = useUpdateAvailabilityRulesMutation();
  const [addDaySlot, { isLoading: adding }] = useAddDayAvailabilityMutation();
  const [toggleDay] = useIsDayAvailabilityMutation();
  const [updateSlot, { isLoading: updating }] =
    useUpdateTimeAvailabilityMutation();
  const [deleteSlot] = useDeleteTimeAvailabilityMutation();

  const [dialog, setDialog] = useState<SlotDialogState>(EMPTY_DIALOG);
  const [dialogError, setDialogError] = useState<string | null>(null);

  const weeklySchedule: DaySchedule[] = data?.data?.weeklySchedule ?? [];
  const bookingRules: BookingRules | undefined = data?.data?.bookingRules;
  const weekAtAGlance = useWeekAtAGlance(weeklySchedule);

  const sortedSchedule = useMemo(() => {
    const byDay = new Map(weeklySchedule.map((d) => [d.day, d]));
    return DAY_ORDER.map((day) => byDay.get(day)).filter(
      Boolean,
    ) as DaySchedule[];
  }, [weeklySchedule]);

  // ---- Handlers -----------------------------------------------------------

  /** Pulls a readable message out of an RTK Query error, falling back to a default. */
  const errorMessage = (err: any, fallback: string) =>
    err?.data?.message ?? err?.error ?? fallback;

  const handleToggleDay = async (
    day: DaySchedule["day"],
    isAvailable: boolean,
  ) => {
    try {
      const res = await toggleDay({ day, data: { isAvailable } }).unwrap();
      toast.success(res?.message ?? `${DAY_LABEL[day]} updated`);
    } catch (err: any) {
      toast.error(errorMessage(err, `Couldn't update ${DAY_LABEL[day]}`));
    }
  };

  const handleAcceptingBookingsToggle = async (checked: boolean) => {
    if (!bookingRules) return;
    try {
      const res = await updateRules({
        minimumBookingHours: bookingRules.minimumBookingHours,
        maxBookingsPerDay: bookingRules.maxBookingsPerDay,
        acceptingBookings: checked,
      }).unwrap();
      toast.success(
        res?.message ??
          (checked ? "Now accepting bookings" : "Bookings paused"),
      );
    } catch (err: any) {
      toast.error(errorMessage(err, "Couldn't update booking rules"));
    }
  };

  const handleMinimumBookingHours = async (value: string) => {
    if (!bookingRules) return;
    try {
      const res = await updateRules({
        minimumBookingHours: Number(value),
        maxBookingsPerDay: bookingRules.maxBookingsPerDay,
        acceptingBookings: bookingRules.acceptingBookings,
      }).unwrap();
      toast.success(res?.message ?? "Minimum booking hour updated");
    } catch (err: any) {
      toast.error(errorMessage(err, "Couldn't update minimum booking hour"));
    }
  };

  const handleMaxBookingsPerDay = async (value: string) => {
    if (!bookingRules) return;
    try {
      const res = await updateRules({
        minimumBookingHours: bookingRules.minimumBookingHours,
        maxBookingsPerDay: Number(value),
        acceptingBookings: bookingRules.acceptingBookings,
      }).unwrap();
      toast.success(res?.message ?? "Max bookings per day updated");
    } catch (err: any) {
      toast.error(errorMessage(err, "Couldn't update max bookings per day"));
    }
  };

  const openAddSlot = (day: DaySchedule["day"]) => {
    setDialogError(null);
    setDialog({ open: true, day, slotId: null, startTime: "", endTime: "" });
  };

  const openEditSlot = (day: DaySchedule["day"], slot: Slot) => {
    setDialogError(null);
    setDialog({
      open: true,
      day,
      slotId: slot._id,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });
  };

  const closeDialog = () => {
    setDialog(EMPTY_DIALOG);
    setDialogError(null);
  };

  const handleSaveSlot = async (startTime: string, endTime: string) => {
    if (!dialog.day) return;
    setDialogError(null);
    try {
      if (dialog.slotId) {
        const res = await updateSlot({
          id: dialog.slotId,
          day: dialog.day,
          data: { startTime, endTime },
        }).unwrap();
        toast.success(res?.message ?? "Time slot updated");
      } else {
        const res = await addDaySlot({
          day: dialog.day,
          data: { startTime, endTime },
        }).unwrap();
        toast.success(res?.message ?? "Time slot added");
      }
      closeDialog();
    } catch (err: any) {
      const message = errorMessage(
        err,
        "Something went wrong. Please try again.",
      );
      setDialogError(message);
      toast.error(message);
    }
  };

  const handleDeleteSlot = async (day: DaySchedule["day"], slotId: string) => {
    try {
      const res = await deleteSlot({ day, id: slotId }).unwrap();
      toast.success(res?.message ?? "Time slot deleted");
    } catch (err: any) {
      toast.error(errorMessage(err, "Couldn't delete time slot"));
    }
  };

  // ---- Render -----------------------------------------------------------

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5">
        <h2 className="font-serif text-3xl font-medium">
          {t("navbar.availability")}
        </h2>
        <div className="h-48 animate-pulse rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-3xl font-medium">
          {t("navbar.availability")}
        </h2>
        <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full rounded-full ${
                bookingRules?.acceptingBookings
                  ? "bg-emerald-500"
                  : "bg-[var(--muted-foreground)]"
              }`}
            />
          </span>
          <span className="text-sm font-medium">Accepting bookings</span>
          <Switch
            checked={!!bookingRules?.acceptingBookings}
            onCheckedChange={handleAcceptingBookingsToggle}
            disabled={isFetching}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
        {/* Weekly schedule */}
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="text-base font-semibold mb-4">Weekly schedule</h3>

          <div className="flex flex-col divide-y divide-[var(--border)]">
            {sortedSchedule.map((day) => (
              <div
                key={day.day}
                className="flex flex-wrap items-center gap-4 py-4"
              >
                <div className="flex items-center gap-3 w-40 shrink-0">
                  <Switch
                    checked={day.isAvailable}
                    onCheckedChange={(checked) =>
                      handleToggleDay(day.day, checked)
                    }
                  />
                  <div className="leading-tight">
                    <p className="text-sm font-medium">{DAY_LABEL[day.day]}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {day.isAvailable ? "Available" : "Off"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-wrap items-center gap-2">
                  {day.isAvailable ? (
                    <>
                      {day.slots.map((slot) => (
                        <button
                          key={slot._id}
                          type="button"
                          onClick={() => openEditSlot(day.day, slot)}
                          className="group flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted-bg)] px-3 py-1.5 text-sm hover:border-[var(--ring)] transition-colors"
                        >
                          {formatRange(slot.startTime, slot.endTime)}
                          <span
                            role="button"
                            tabIndex={-1}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSlot(day.day, slot._id);
                            }}
                            className="flex h-4 w-4 items-center justify-center rounded-full text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--destructive)]"
                          >
                            <X className="h-3 w-3" />
                          </span>
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => openAddSlot(day.day)}
                        className="flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:opacity-80 px-2 py-1.5"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add slot
                      </button>
                    </>
                  ) : (
                    <span className="text-sm text-[var(--muted-foreground)]">
                      —
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-base font-semibold mb-4">Booking rules</h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-sm text-[var(--muted-foreground)]">
                  Minimum booking hour
                </Label>
                <Select
                  value={String(bookingRules?.minimumBookingHours ?? "")}
                  onValueChange={handleMinimumBookingHours}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {MIN_BOOKING_HOUR_OPTIONS.map((h) => (
                      <SelectItem key={h} value={String(h)}>
                        {h} {h === 1 ? "hour" : "hours"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm text-[var(--muted-foreground)]">
                  Max bookings per day
                </Label>
                <Select
                  value={String(bookingRules?.maxBookingsPerDay ?? "")}
                  onValueChange={handleMaxBookingsPerDay}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {MAX_BOOKINGS_PER_DAY_OPTIONS.map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-base font-semibold mb-4">
              This week at a glance
            </h3>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {weekAtAGlance.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-medium tracking-wide text-[var(--muted-foreground)]">
                    {DAY_SHORT[d.dayKey]}
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      d.isAvailable
                        ? "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
                        : "text-[var(--muted-foreground)]"
                    }`}
                  >
                    {d.date.getDate()}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      d.isAvailable ? "bg-emerald-500" : "bg-transparent"
                    }`}
                  />
                  <span className="text-[10px] text-[var(--muted-foreground)]">
                    {d.isAvailable
                      ? `${d.slotCount} slot${d.slotCount === 1 ? "" : "s"}`
                      : "Off"}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 text-sm font-medium text-[var(--primary)] hover:opacity-80"
            >
              Open full calendar →
            </button>
          </div>
        </div>
      </div>

      <SlotDialog
        state={dialog}
        onClose={closeDialog}
        onSave={handleSaveSlot}
        saving={adding || updating}
        error={dialogError}
      />
    </div>
  );
};

export default Availability;
