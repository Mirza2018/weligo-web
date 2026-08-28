import { jwtDecode } from "jwt-decode";
import type { BookingStatus } from "@/types/overview";
import { getImageUrl } from "@/redux/getBaseUrl";

// TODO: point this at your actual file-storage base URL (S3/CDN/API origin).


export function resolveImageUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${getImageUrl(path)}`;
}

/** "2026-08-29T00:00:00.000Z" -> "Sat, 29 Aug" */
export function formatBookingDate(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export function formatTimeRange(start: string, end: string): string {
  return `${start} – ${end}`;
}

/** Same-day -> "14:32", otherwise -> "29 Aug" */
export function formatMessageTimestamp(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const isSameDay = date.toDateString() === now.toDateString();
  return isSameDay
    ? new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    : new Intl.DateTimeFormat(undefined, {
        day: "numeric",
        month: "short",
      }).format(date);
}

/** Falls back to a title-cased status when no translation exists for it. */
export function statusLabel(
  t: (key: string) => string,
  status: BookingStatus | string,
): string {
  const key = `bookingStatus.${status}`;
  const translated = t(key);
  if (!translated || translated === key) {
    return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return translated;
}

export type DecodedToken = {
  fullName?: string;
  email?: string;
  phone?: string;
  userId?: string;
  role?: string;
};

export function decodeAccessToken(
  accessToken?: string | null,
): DecodedToken | null {
  if (!accessToken) return null;
  try {
    return jwtDecode<DecodedToken>(accessToken);
  } catch {
    return null;
  }
}

export function firstNameOf(fullName?: string | null): string {
  if (!fullName) return "there";
  return fullName.trim().split(/\s+/)[0];
}
