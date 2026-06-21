export type TimeSlot = { start: string; end: string }; // "09:00", "13:00"
export type AvailableDay = { date: string; slots: TimeSlot[] }; // date "YYYY-MM-DD"

export type PurchaseProvider = {
  id: string;
  name: string;
  firstName: string;
  rating: number;
  reviewCount: number;
  city: string;
  postal: string;
  distanceKm: number;
  hourlyRate: number;
  serviceTag: string;
  serviceFeePct: number;
  commissionPct: number;
  address: string;
  availability: AvailableDay[];
};

// deterministic hash so the same providerId always yields the same data
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function fmt(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const NAMES = [
  { name: "Simon Keller", first: "Simon" },
  { name: "Laura Schäfer", first: "Laura" },
  { name: "Anna Müller", first: "Anna" },
  { name: "Lukas Weber", first: "Lukas" },
  { name: "Sophie Brunner", first: "Sophie" },
];

const TIME_PRESETS: TimeSlot[][] = [
  [{ start: "09:00", end: "13:00" }, { start: "13:00", end: "17:00" }, { start: "17:00", end: "21:00" }],
  [{ start: "08:00", end: "12:00" }, { start: "14:00", end: "18:00" }],
  [{ start: "09:00", end: "12:00" }, { start: "13:00", end: "16:00" }, { start: "17:00", end: "20:00" }],
];

function generateAvailability(seed: number): AvailableDay[] {
  const out: AvailableDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 1; i <= 90; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    // ~55% of days available
    const r = ((seed + i * 2654435761) >>> 0) % 100;
    if (r < 55) {
      const slots = TIME_PRESETS[r % TIME_PRESETS.length];
      out.push({ date: fmt(d), slots });
    }
  }
  return out;
}

export function getPurchaseProvider(serviceId: string, providerId: string): PurchaseProvider {
  const seed = hash(`${serviceId}:${providerId}`);
  const meta = NAMES[seed % NAMES.length];
  const rate = 25 + (seed % 5) * 5;
  return {
    id: providerId,
    name: meta.name,
    firstName: meta.first,
    rating: 5,
    reviewCount: 80 + (seed % 200),
    city: "Zürich",
    postal: "8001",
    distanceKm: Math.round(((seed % 30) / 10 + 0.4) * 10) / 10,
    hourlyRate: rate,
    serviceTag: serviceId === "tutoring" ? "Tutoring" : "Childcare",
    serviceFeePct: 5,
    commissionPct: 15,
    address: "Musterstrasse 12, 8001 Zürich",
    availability: generateAvailability(seed),
  };
}
