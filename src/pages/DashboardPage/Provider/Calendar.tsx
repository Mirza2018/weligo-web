import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, isSameDay } from "date-fns";
// import { Button } from "@/components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  initialCalendarEvents,
  eventColors,
  type CalendarEvent,
} from "../../../assets/data/calendar-events";
import { useI18n } from "../../../lib/i18n";
import { cn } from "../../../lib/utils";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

type EditingEvent = Partial<CalendarEvent> & { isNew?: boolean };

export function ProviderCalendarPage() {
  const { t } = useI18n();
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );
  const [events, setEvents] = useState<CalendarEvent[]>(initialCalendarEvents);
  const [editing, setEditing] = useState<EditingEvent | null>(null);

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  const today = new Date();

  const openNew = (day: Date, hour: number) => {
    setEditing({
      isNew: true,
      title: "",
      date: format(day, "yyyy-MM-dd"),
      startHour: hour,
      endHour: hour + 1,
      color: "violet",
    });
  };

  const openEdit = (ev: CalendarEvent) => setEditing({ ...ev });

  const save = () => {
    if (!editing?.title?.trim() || editing.startHour == null || editing.endHour == null) {
      toast.error("Please fill in all fields");
      return;
    }
    if (editing.endHour <= editing.startHour) {
      toast.error("End must be after start");
      return;
    }
    const ev: CalendarEvent = {
      id: editing.id ?? `ev-${Date.now()}`,
      title: editing.title!,
      date: editing.date!,
      startHour: editing.startHour!,
      endHour: editing.endHour!,
      color: (editing.color as CalendarEvent["color"]) ?? "violet",
    };
    setEvents((prev) =>
      editing.isNew ? [...prev, ev] : prev.map((e) => (e.id === ev.id ? ev : e)),
    );
    toast.success(t("provider.eventSaved"));
    setEditing(null);
  };

  const remove = () => {
    if (!editing?.id) return;
    setEvents((prev) => prev.filter((e) => e.id !== editing.id));
    toast.success(t("provider.eventDeleted"));
    setEditing(null);
  };

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
        <Button onClick={() => openNew(days[0], 9)} className="gap-2">
          <Plus className="h-4 w-4" />
          {t("provider.addEvent")}
        </Button>
      </div>

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
                  <span className="text-xs text-muted-foreground">{format(d, "EEE")}</span>
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
                  <button
                    key={`cell-${d.toISOString()}-${h}`}
                    type="button"
                    onClick={() => openNew(d, h)}
                    className="relative h-14 border-b border-l border-border transition hover:bg-muted-bg/50"
                  />
                ))}
              </div>
            ))}

            {/* Events overlay */}
            {events.map((ev) => {
              const dayIndex = days.findIndex((d) =>
                isSameDay(d, new Date(ev.date)),
              );
              if (dayIndex === -1) return null;
              const top = ev.startHour * 56;
              const height = (ev.endHour - ev.startHour) * 56 - 4;
              const colStart = dayIndex + 2;
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => openEdit(ev)}
                  className={cn(
                    "absolute mx-1 rounded-md border px-2 py-1 text-left text-xs font-medium shadow-sm transition hover:opacity-90",
                    eventColors[ev.color],
                  )}
                  style={{
                    top,
                    height,
                    gridColumn: colStart,
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

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing?.isNew ? t("provider.addEvent") : "Edit event"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>{t("provider.eventTitle")}</Label>
              <Input
                value={editing?.title ?? ""}
                onChange={(e) =>
                  setEditing((p) => (p ? { ...p, title: e.target.value } : p))
                }
              />
            </div>
            <div>
              <Label>{t("provider.eventDate")}</Label>
              <Input
                type="date"
                value={editing?.date ?? ""}
                onChange={(e) =>
                  setEditing((p) => (p ? { ...p, date: e.target.value } : p))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>{t("provider.eventStart")}</Label>
                <Select
                  value={String(editing?.startHour ?? 9)}
                  onValueChange={(v) =>
                    setEditing((p) => (p ? { ...p, startHour: Number(v) } : p))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {HOURS.map((h) => (
                      <SelectItem key={h} value={String(h)}>
                        {h}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t("provider.eventEnd")}</Label>
                <Select
                  value={String(editing?.endHour ?? 10)}
                  onValueChange={(v) =>
                    setEditing((p) => (p ? { ...p, endHour: Number(v) } : p))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {HOURS.map((h) => (
                      <SelectItem key={h} value={String(h)}>
                        {h}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Color</Label>
              <Select
                value={editing?.color ?? "violet"}
                onValueChange={(v) =>
                  setEditing((p) =>
                    p ? { ...p, color: v as CalendarEvent["color"] } : p,
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(eventColors).map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-between">
            {!editing?.isNew ? (
              <Button variant="ghost" onClick={remove} className="text-destructive gap-1">
                <Trash2 className="h-4 w-4" />
                {t("provider.delete")}
              </Button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button onClick={save}>{t("provider.save")}</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
