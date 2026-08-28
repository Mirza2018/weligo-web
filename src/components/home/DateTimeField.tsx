// src/components/home/DateTimeField.tsx
import { useState } from "react";
import { CalendarDays, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateTimeFieldProps {
  label: string;
  placeholder: string;
  date: Date | null;
  time: string | null;
  onChange: (date: Date | null, time: string | null) => void;
  locale?: string;
}

export function DateTimeField({
  label,
  placeholder,
  date,
  time,
  onChange,
  locale = "en-US",
}: DateTimeFieldProps) {
  const [open, setOpen] = useState(false);

  const display = date
    ? `${date.toLocaleDateString(locale, {
        weekday: "short",
        day: "2-digit",
        month: "short",
      })}${time ? `, ${time}` : ""}`
    : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex flex-1 min-w-0 items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-colors hover:bg-muted/60"
        >
          <CalendarDays className="h-5 w-5 shrink-0 text-primary" />
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-medium text-muted-foreground">
              {label}
            </span>
            <span
              className={cn(
                "block truncate text-sm font-semibold",
                !display && "font-normal text-muted-foreground",
              )}
            >
              {display ?? placeholder}
            </span>
          </span>
          {display && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onChange(null, null);
              }}
              className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-muted"
              aria-label="Clear date"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-3">
        <Calendar
          mode="single"
          selected={date ?? undefined}
          onSelect={(d) => onChange(d ?? null, time)}
          disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
          
        />
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
          <label className="text-sm font-medium text-muted-foreground">
            Time
          </label>
          <input
            type="time"
            value={time ?? ""}
            onChange={(e) => onChange(date, e.target.value || null)}
            className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-3 w-full rounded-lg bg-primary py-1.5 text-sm font-medium text-primary-foreground"
        >
          Done
        </button>
      </PopoverContent>
    </Popover>
  );
}
