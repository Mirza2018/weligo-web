import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Hourglass,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Smile,
  Home as HomeIcon,
  Star,
} from "lucide-react";
import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { UserAvatar } from "../components/common/UserAvatar";
// import { LanguageSwitcher } from "@/components/dashboard/LanguageSwitcher";
import { useI18n } from "../lib/i18n";
import { formatCHF } from "../lib/format";
import { cn } from "../lib/utils";
import {
  getPurchaseProvider,
  type PurchaseProvider,
  type TimeSlot,
} from "../assets/data/purchase-providers";

type Step = 1 | 2 | 3 | 4 | 5;

type Draft = {
  step: Step;
  date: string | null; // "YYYY-MM-DD"
  slot: TimeSlot | null;
  duration: number;
  ageGroup: string;
  persons: number;
  expect: string;
  location: "ourHome" | "providerPlace";
  meal: boolean;
  pets: boolean;
  payment: "twint" | "card";
  agree: boolean;
  bookingId: string | null;
};

const DEFAULT_DRAFT: Draft = {
  step: 1,
  date: null,
  slot: null,
  duration: 2,
  ageGroup: "",
  persons: 1,
  expect: "",
  location: "ourHome",
  meal: false,
  pets: false,
  payment: "twint",
  agree: false,
  bookingId: null,
};

function storageKey(serviceId: string, providerId: string) {
  return `weligo:purchase:${serviceId}:${providerId}`;
}

function loadDraft(key: string): Draft {
  if (typeof window === "undefined") return DEFAULT_DRAFT;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return DEFAULT_DRAFT;
    return { ...DEFAULT_DRAFT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_DRAFT;
  }
}

function saveDraft(key: string, draft: Draft) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(draft));
  } catch {
    /* ignore */
  }
}

function slotHours(s: TimeSlot) {
  const [sh] = s.start.split(":").map(Number);
  const [eh] = s.end.split(":").map(Number);
  return eh - sh;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function fmtKey(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function parseKey(k: string): Date {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function PurchasePage() {
  const serviceId = "2739823981098";
  const providerId = "2739823981098";
  const { t } = useI18n();
  const provider = useMemo(
    () => getPurchaseProvider(serviceId, providerId),
    [serviceId, providerId],
  );
  const key = storageKey(serviceId, providerId);
  const [draft, setDraft] = useState<Draft>(() => loadDraft(key));

  useEffect(() => {
    saveDraft(key, draft);
  }, [key, draft]);

  // derived totals
  const hours = draft.duration;
  const subtotal = provider.hourlyRate * hours;
  const fee = Math.round(subtotal * (provider.serviceFeePct / 100));
  const total = subtotal + fee;

  function setStep(s: Step) {
    setDraft((d) => ({ ...d, step: s }));
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f8fe]">
      {/* <PublicHeader /> */}
      <Stepper current={draft.step} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-8">
        {draft.step === 5 ? (
          <StepConfirmation
            provider={provider}
            draft={draft}
            total={total}
            onReset={() => {
              window.localStorage.removeItem(key);
              setDraft({ ...DEFAULT_DRAFT });
            }}
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <section className="rounded-3xl bg-card p-6 shadow-sm lg:p-10">
              {draft.step === 1 && (
                <Step1 provider={provider} onNext={() => setStep(2)} />
              )}
              {draft.step === 2 && (
                <Step2
                  provider={provider}
                  draft={draft}
                  setDraft={setDraft}
                  onBack={() => setStep(1)}
                  onNext={() => setStep(3)}
                />
              )}
              {draft.step === 3 && (
                <Step3
                  provider={provider}
                  draft={draft}
                  setDraft={setDraft}
                  onBack={() => setStep(2)}
                  onNext={() => setStep(4)}
                />
              )}
              {draft.step === 4 && (
                <Step4
                  provider={provider}
                  draft={draft}
                  setDraft={setDraft}
                  total={total}
                  subtotal={subtotal}
                  fee={fee}
                  onBack={() => setStep(3)}
                  onConfirm={() => {
                    const id = `WB-${Math.floor(1000 + Math.random() * 9000)}`;
                    setDraft((d) => ({ ...d, bookingId: id, step: 5 }));
                    toast.success(t("purchase.toast.bookingConfirmed"));
                    if (typeof window !== "undefined")
                      window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              )}
            </section>
            <aside>
              <SummaryCard
                provider={provider}
                draft={draft}
                subtotal={subtotal}
                fee={fee}
                total={total}
              />
            </aside>
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}

/* ---------- Header / Stepper / Footer ---------- */

// function PublicHeader() {
//   const { t } = useI18n();
//   return (
//     <header className="border-b border-border/60 bg-card">
//       <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
//         <Link
//           to="/"
//           className="font-serif text-2xl font-semibold tracking-tight text-foreground"
//         >
//           <span className="text-primary">W</span>eligo
//         </Link>
//         <nav className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
//           <a href="#" className="hover:text-foreground">
//             {t("purchase.nav.home")}
//           </a>
//           <a href="#" className="font-medium text-primary">
//             {t("purchase.nav.services")}
//           </a>
//           <a href="#" className="hover:text-foreground">
//             {t("purchase.nav.forFamilies")}
//           </a>
//           <a href="#" className="hover:text-foreground">
//             {t("purchase.nav.forProviders")}
//           </a>
//           <a href="#" className="hover:text-foreground">
//             {t("purchase.nav.howItWorks")}
//           </a>
//           <a href="#" className="hover:text-foreground">
//             {t("purchase.nav.aboutUs")}
//           </a>
//         </nav>
//         <div className="flex items-center gap-3">
//           {/* <LanguageSwitcher /> */}
//           <button className="hidden h-9 rounded-full border border-primary/40 px-4 text-sm font-medium text-primary hover:bg-primary/5 sm:inline-flex sm:items-center">
//             {t("purchase.nav.login")}
//           </button>
//           <button className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">
//             {t("purchase.nav.signup")}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

function Stepper({ current }: { current: Step }) {
  const { t } = useI18n();
  const items: { n: Step; label: string }[] = [
    { n: 1, label: t("purchase.steps.chooseProvider") },
    { n: 2, label: t("purchase.steps.dateTime") },
    { n: 3, label: t("purchase.steps.careDetails") },
    { n: 4, label: t("purchase.steps.review") },
    { n: 5, label: t("purchase.steps.confirmation") },
  ];
  return (
    <div className="border-b border-border/60 bg-card">
      <div className="mx-auto flex max-w-5xl items-start justify-between gap-2 px-4 py-6 lg:px-8">
        {items.map((s, i) => {
          const done = current > s.n;
          const active = current === s.n;
          return (
            <div key={s.n} className="flex flex-1 items-start gap-2">
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-xs font-medium",
                    done && "bg-emerald-500 text-white",
                    active && "bg-primary text-primary-foreground",
                    !done && !active && "bg-muted text-muted-foreground",
                  )}
                >
                  {done ? <Check className="h-5 w-5" /> : pad(s.n)}
                </div>
                <span
                  className={cn(
                    "mt-2 max-w-[110px] font-serif text-xs",
                    active
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < items.length - 1 && (
                <div className="mt-5 h-px flex-1 bg-border" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PublicFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-12 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-1">
          <div className="font-serif text-2xl font-semibold">Weligo</div>
          <p className="mt-3 text-sm text-primary-foreground/80">
            {t("purchase.footer.tagline")}
          </p>
        </div>
        <FooterCol
          title={t("purchase.footer.platform")}
          links={[
            t("purchase.footer.howItWorks"),
            t("purchase.footer.aboutUs"),
            t("purchase.footer.trust"),
            t("purchase.footer.contact"),
          ]}
        />
        <FooterCol
          title={t("purchase.footer.families")}
          links={[
            t("purchase.footer.forFamilies"),
            t("purchase.footer.findChildcare"),
            t("purchase.footer.findSenior"),
          ]}
        />
        <FooterCol
          title={t("purchase.footer.providers")}
          links={[
            t("purchase.footer.forProviders"),
            t("purchase.footer.becomeCaregiver"),
            t("purchase.footer.helpCenter"),
          ]}
        />
        <FooterCol
          title={t("purchase.footer.legal")}
          links={[
            t("purchase.footer.terms"),
            t("purchase.footer.privacy"),
            t("purchase.footer.cookies"),
          ]}
        />
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-primary-foreground/80 lg:px-8">
          {t("purchase.footer.copyright")}
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-white">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Summary ---------- */

function SummaryCard({
  provider,
  draft,
  subtotal,
  fee,
  total,
}: {
  provider: PurchaseProvider;
  draft: Draft;
  subtotal: number;
  fee: number;
  total: number;
}) {
  const { t, lang } = useI18n();
  const dateLabel = draft.date
    ? parseKey(draft.date).toLocaleDateString(
        lang === "de" ? "de-CH" : "en-GB",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        },
      )
    : t("purchase.summary.notSelected");
  const timeLabel = draft.slot
    ? `${draft.slot.start}–${draft.slot.end}`
    : t("purchase.summary.notSelected");
  return (
    <div className="rounded-3xl bg-card p-6 shadow-sm">
      <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
        {t("purchase.summary.title")}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <UserAvatar name={provider.name} size={44} />
        <div>
          <div className="font-serif text-lg font-medium">{provider.name}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{" "}
            {provider.rating}
            <span className="ml-1">· {provider.city}</span>
          </div>
        </div>
      </div>
      <div className="my-5 h-px bg-border" />
      <div className="space-y-4 text-sm">
        <SumRow
          icon={<CalendarIcon className="h-4 w-4" />}
          label={t("purchase.summary.date")}
          value={dateLabel}
        />
        <SumRow
          icon={<Clock className="h-4 w-4" />}
          label={t("purchase.summary.time")}
          value={timeLabel}
        />
        <SumRow
          icon={<Hourglass className="h-4 w-4" />}
          label={t("purchase.summary.duration")}
          value={`${draft.duration} ${t("purchase.s2.hours")}`}
        />
        <SumRow
          icon={<MapPin className="h-4 w-4" />}
          label={t("purchase.summary.location")}
          value={
            draft.step >= 3
              ? draft.location === "ourHome"
                ? t("purchase.s3.atOurHome")
                : t("purchase.s3.atProviderPlace", { name: provider.firstName })
              : t("purchase.summary.notSelected")
          }
        />
      </div>
      <div className="my-5 h-px bg-border" />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>{t("purchase.summary.subtotal")}</span>
          <span className="font-mono">{formatCHF(subtotal, true)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>{t("purchase.summary.serviceFee")}</span>
          <span className="font-mono">{formatCHF(fee, true)}</span>
        </div>
      </div>
      <div className="my-5 h-px bg-border" />
      <div className="flex items-center justify-between">
        <span className="text-base font-medium">
          {t("purchase.summary.total")}
        </span>
        <span className="font-mono text-xl font-semibold text-primary">
          {formatCHF(total, true)}
        </span>
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
        {t("purchase.summary.paymentHeld", { name: provider.firstName })}
      </div>
    </div>
  );
}

function SumRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}

/* ---------- Step 1 ---------- */

function Step1({
  provider,
  onNext,
}: {
  provider: PurchaseProvider;
  onNext: () => void;
}) {
  const { t } = useI18n();
  return (
    <div>
      <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
        {t("purchase.s1.tag")}
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium leading-tight lg:text-5xl">
        {t("purchase.s1.heading", { name: provider.firstName })}
      </h1>

      <div className="mt-8 rounded-2xl bg-secondary/60 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <UserAvatar name={provider.name} size={72} />
            <div>
              <div className="font-serif text-xl font-medium">
                {provider.name}
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="ml-1 font-medium">{provider.rating}</span>
                <span className="ml-1 text-muted-foreground">
                  ({provider.reviewCount} {t("purchase.s1.reviews")})
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {provider.city},{" "}
                {provider.postal} · {provider.distanceKm}{" "}
                {t("purchase.s1.kmAway")}
              </div>
              <div className="mt-2 inline-flex rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground">
                {provider.serviceTag}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-serif text-3xl font-semibold text-primary">
              {formatCHF(provider.hourlyRate)}
            </div>
            <div className="text-xs text-muted-foreground">
              {t("purchase.s1.perHour")}
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
              {t("purchase.s1.availableToday")}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="text-sm font-medium text-primary hover:underline">
            {t("purchase.s1.viewFullProfile")} →
          </button>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="mt-8 h-14 w-full rounded-full text-base"
      >
        {t("purchase.s1.sendRequest")} <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}

/* ---------- Step 2 ---------- */

function Step2({
  provider,
  draft,
  setDraft,
  onBack,
  onNext,
}: {
  provider: PurchaseProvider;
  draft: Draft;
  setDraft: React.Dispatch<React.SetStateAction<Draft>>;
  onBack: () => void;
  onNext: () => void;
}) {
  const { t, lang } = useI18n();
  const todayKey = fmtKey(new Date(new Date().setHours(0, 0, 0, 0)));
  const availableSet = useMemo(
    () => new Set(provider.availability.map((a) => a.date)),
    [provider],
  );
  const slotsByDate = useMemo(() => {
    const m = new Map<string, TimeSlot[]>();
    for (const a of provider.availability) m.set(a.date, a.slots);
    return m;
  }, [provider]);

  // viewMonth based on selected date or first available
  const initialMonth = draft.date
    ? parseKey(draft.date)
    : provider.availability[0]
      ? parseKey(provider.availability[0].date)
      : new Date();
  const [viewMonth, setViewMonth] = useState<Date>(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  );

  const monthLabel = viewMonth.toLocaleString(
    lang === "de" ? "de-CH" : "en-GB",
    { month: "long", year: "numeric" },
  );
  const monthDays = useMemo(() => buildMonthGrid(viewMonth), [viewMonth]);

  const selectedSlots = draft.date ? (slotsByDate.get(draft.date) ?? []) : [];

  function selectDate(dateKey: string) {
    if (dateKey < todayKey) return;
    if (!availableSet.has(dateKey)) return;
    setDraft((d) => ({ ...d, date: dateKey, slot: null }));
  }

  function selectSlot(s: TimeSlot) {
    const max = slotHours(s);
    const dur = Math.min(draft.duration, max);
    setDraft((d) => ({ ...d, slot: s, duration: Math.max(1, dur) }));
  }

  function changeDuration(delta: number) {
    if (!draft.slot) {
      toast.error(t("purchase.s2.pickSlot"));
      return;
    }
    const max = slotHours(draft.slot);
    const next = draft.duration + delta;
    if (next < 1) {
      toast.error(t("purchase.s2.minDuration"));
      return;
    }
    if (next > max) {
      toast.warning(t("purchase.s2.maxDuration", { n: max }));
      return;
    }
    setDraft((d) => ({ ...d, duration: next }));
  }

  function handleNext() {
    if (!draft.date) return toast.error(t("purchase.s2.pickDateFirst"));
    if (!draft.slot) return toast.error(t("purchase.s2.pickSlot"));
    onNext();
  }

  const weekdayKeys = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
  ] as const;

  return (
    <div>
      <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
        {t("purchase.s2.tag")}
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium leading-tight lg:text-4xl">
        {t("purchase.s2.heading", { name: provider.firstName })}
      </h1>

      <div className="mt-8">
        <div className="text-sm font-medium">{t("purchase.s2.selectDate")}</div>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-serif text-xl">{monthLabel}</div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() =>
                setViewMonth(
                  (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1),
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setViewMonth(
                  (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1),
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
          {weekdayKeys.map((k) => (
            <div key={k}>{t(`purchase.s2.weekday.${k}`)}</div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {monthDays.map((d, idx) => {
            if (!d) return <div key={`e-${idx}`} className="aspect-square" />;
            const dateKey = fmtKey(d);
            const past = dateKey < todayKey;
            const available = availableSet.has(dateKey) && !past;
            const selected = draft.date === dateKey;
            return (
              <button
                key={dateKey}
                type="button"
                disabled={!available}
                onClick={() => selectDate(dateKey)}
                className={cn(
                  "aspect-square rounded-2xl border text-sm transition",
                  past && "border-transparent text-muted-foreground/40",
                  !past &&
                    !available &&
                    "border-border bg-card text-muted-foreground/60",
                  available &&
                    !selected &&
                    "border-emerald-300 bg-emerald-50 text-foreground hover:bg-emerald-100",
                  selected &&
                    "border-primary bg-primary text-primary-foreground font-semibold",
                )}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>

        {draft.date && (
          <div className="mt-4 text-sm text-emerald-600">
            ✓ {t("purchase.s2.availableOn", { name: provider.firstName })}{" "}
            {parseKey(draft.date).toLocaleDateString(
              lang === "de" ? "de-CH" : "en-GB",
              {
                weekday: "long",
                day: "numeric",
                month: "long",
              },
            )}
          </div>
        )}
      </div>

      {draft.date && (
        <div className="mt-8">
          <div className="text-sm font-medium">
            {t("purchase.s2.chooseSlot")}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {selectedSlots.map((s) => {
              const sel =
                draft.slot &&
                draft.slot.start === s.start &&
                draft.slot.end === s.end;
              return (
                <button
                  key={s.start}
                  type="button"
                  onClick={() => selectSlot(s)}
                  className={cn(
                    "rounded-full border px-4 py-3 text-sm font-medium transition",
                    sel
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50",
                  )}
                >
                  {s.start} – {s.end}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {draft.slot && (
        <div className="mt-8">
          <div className="text-sm font-medium">{t("purchase.s2.duration")}</div>
          <div className="mt-3 flex items-center gap-4">
            <button
              type="button"
              onClick={() => changeDuration(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="font-serif text-3xl font-medium">
              {draft.duration}
            </div>
            <button
              type="button"
              onClick={() => changeDuration(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary"
            >
              <Plus className="h-4 w-4" />
            </button>
            <span className="text-sm text-muted-foreground">
              {t("purchase.s2.hours")}
            </span>
          </div>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-12 rounded-full px-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> {t("purchase.s2.back")}
        </Button>
        <Button
          onClick={handleNext}
          className="h-12 flex-1 rounded-full text-base"
        >
          {t("purchase.s2.next")} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function buildMonthGrid(month: Date): (Date | null)[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  // Monday-first
  const firstDayIdx = (first.getDay() + 6) % 7;
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDayIdx; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    cells.push(new Date(month.getFullYear(), month.getMonth(), d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/* ---------- Step 3 ---------- */

function Step3({
  provider,
  draft,
  setDraft,
  onBack,
  onNext,
}: {
  provider: PurchaseProvider;
  draft: Draft;
  setDraft: React.Dispatch<React.SetStateAction<Draft>>;
  onBack: () => void;
  onNext: () => void;
}) {
  const { t } = useI18n();

  function handleNext() {
    if (!draft.ageGroup.trim())
      return toast.error(t("purchase.s3.ageRequired"));
    onNext();
  }

  return (
    <div>
      <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
        {t("purchase.s3.tag")}
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium leading-tight lg:text-4xl">
        {t("purchase.s3.heading", { name: provider.firstName })}
      </h1>

      <div className="mt-8 space-y-6">
        <div>
          <label className="text-sm font-medium">
            {t("purchase.s3.ageGroup")}
          </label>
          <Input
            value={draft.ageGroup}
            onChange={(e) =>
              setDraft((d) => ({ ...d, ageGroup: e.target.value }))
            }
            placeholder={t("purchase.s3.ageGroupPlaceholder")}
            className="mt-2 h-12 rounded-xl bg-card"
          />
        </div>
        <div>
          <label className="text-sm font-medium">
            {t("purchase.s3.numberOfPerson")}
          </label>
          <div className="mt-2 flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                setDraft((d) => ({ ...d, persons: Math.max(1, d.persons - 1) }))
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-secondary"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="font-serif text-3xl font-medium">
              {draft.persons}
            </div>
            <button
              type="button"
              onClick={() =>
                setDraft((d) => ({ ...d, persons: d.persons + 1 }))
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-secondary"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">
            {t("purchase.s3.tellWhat", { name: provider.firstName })}
          </label>
          <Textarea
            value={draft.expect}
            onChange={(e) =>
              setDraft((d) => ({ ...d, expect: e.target.value.slice(0, 500) }))
            }
            placeholder={t("purchase.s3.expectPlaceholder")}
            className="mt-2 min-h-[140px] rounded-xl bg-card"
          />
          <div className="mt-1 text-right text-xs text-muted-foreground">
            {draft.expect.length}/500
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">
            {t("purchase.s3.location")}
          </label>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <LocationOption
              active={draft.location === "ourHome"}
              onClick={() => setDraft((d) => ({ ...d, location: "ourHome" }))}
              icon={<HomeIcon className="h-6 w-6" />}
              label={t("purchase.s3.atOurHome")}
            />
            <LocationOption
              active={draft.location === "providerPlace"}
              onClick={() =>
                setDraft((d) => ({ ...d, location: "providerPlace" }))
              }
              icon={<Smile className="h-6 w-6" />}
              label={t("purchase.s3.atProviderPlace", {
                name: provider.firstName,
              })}
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-sm">
            <Checkbox
              checked={draft.meal}
              onCheckedChange={(v) => setDraft((d) => ({ ...d, meal: !!v }))}
            />
            {t("purchase.s3.willMeal")}
          </label>
          <label className="flex items-center gap-3 text-sm">
            <Checkbox
              checked={draft.pets}
              onCheckedChange={(v) => setDraft((d) => ({ ...d, pets: !!v }))}
            />
            {t("purchase.s3.havePets")}
          </label>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-12 rounded-full px-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> {t("purchase.s3.back")}
        </Button>
        <Button
          onClick={handleNext}
          className="h-12 flex-1 rounded-full text-base"
        >
          {t("purchase.s3.next")} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function LocationOption({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border px-4 py-6 text-sm font-medium transition",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-card text-foreground hover:border-primary/40",
      )}
    >
      <span className={cn("text-primary", !active && "opacity-70")}>
        {icon}
      </span>
      {label}
    </button>
  );
}

/* ---------- Step 4 ---------- */

function Step4({
  provider,
  draft,
  setDraft,
  total,
  subtotal,
  fee,
  onBack,
  onConfirm,
}: {
  provider: PurchaseProvider;
  draft: Draft;
  setDraft: React.Dispatch<React.SetStateAction<Draft>>;
  total: number;
  subtotal: number;
  fee: number;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const { t, lang } = useI18n();
  const dateLabel = draft.date
    ? parseKey(draft.date).toLocaleDateString(
        lang === "de" ? "de-CH" : "en-GB",
        {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      )
    : "";
  const providerNet = Math.round(subtotal * (1 - provider.commissionPct / 100));

  function handleConfirm() {
    if (!draft.agree) return toast.error(t("purchase.s4.mustAgree"));
    onConfirm();
  }

  return (
    <div>
      <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
        {t("purchase.s4.tag")}
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium leading-tight lg:text-4xl">
        {t("purchase.s4.heading")}
      </h1>

      <div className="mt-6 rounded-2xl bg-secondary/60 p-5">
        <div className="flex items-center gap-3">
          <UserAvatar name={provider.name} size={48} />
          <div>
            <div className="flex items-center gap-2 font-serif text-lg font-medium">
              {provider.name}{" "}
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-xs text-muted-foreground">{provider.city}</div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label={t("purchase.s5.date")} value={dateLabel} />
          <Field
            label={t("purchase.s5.time")}
            value={draft.slot ? `${draft.slot.start} – ${draft.slot.end}` : ""}
          />
          <Field
            label={t("purchase.summary.duration")}
            value={`${draft.duration} ${t("purchase.s2.hours")}`}
          />
          <Field
            label={t("purchase.s5.location")}
            value={
              draft.location === "ourHome"
                ? t("purchase.s3.atOurHome")
                : t("purchase.s3.atProviderPlace", { name: provider.firstName })
            }
          />
          <Field
            label={t("purchase.s4.children")}
            value={`${draft.persons} ${draft.persons === 1 ? t("purchase.s4.person") : t("purchase.s4.persons")}${draft.ageGroup ? ` (${draft.ageGroup})` : ""}`}
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border p-5">
        <h3 className="font-serif text-lg font-medium">
          {t("purchase.s4.paymentSummary")}
        </h3>
        <div className="mt-4 space-y-3 font-mono text-sm">
          <div className="flex justify-between">
            <span>
              {provider.firstName}'s service — {draft.duration} hrs ×{" "}
              {formatCHF(provider.hourlyRate)}/hr
            </span>
            <span>{formatCHF(subtotal, true)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>{t("purchase.s4.serviceFee")}</span>
            <span>{formatCHF(fee, true)}</span>
          </div>
        </div>
        <div className="my-4 h-px bg-border" />
        <div className="flex items-center justify-between">
          <span className="text-base font-medium">
            {t("purchase.s4.total")}
          </span>
          <span className="font-mono text-2xl font-semibold text-primary">
            {formatCHF(total, true)}
          </span>
        </div>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {t("purchase.s4.receivesAfter", {
            name: provider.firstName,
            amount: formatCHF(providerNet, true),
          })}
        </p>
      </div>

      <div className="mt-6">
        <div className="text-sm font-medium">
          {t("purchase.s4.paymentMethod")}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <PayOption
            active={draft.payment === "twint"}
            onClick={() => setDraft((d) => ({ ...d, payment: "twint" }))}
            title={t("purchase.s4.twint")}
            sub={t("purchase.s4.twintSub")}
          />
          <PayOption
            active={draft.payment === "card"}
            onClick={() => setDraft((d) => ({ ...d, payment: "card" }))}
            title={t("purchase.s4.card")}
            sub={t("purchase.s4.cardSub")}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 rounded-xl bg-emerald-50 px-5 py-3 text-sm text-emerald-700">
        <span>✓ {t("purchase.s4.payOnly", { name: provider.firstName })}</span>
        <span>✓ {t("purchase.s4.cancel24")}</span>
        <span>✓ {t("purchase.s4.encrypted")}</span>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm">
        <Checkbox
          checked={draft.agree}
          onCheckedChange={(v) => setDraft((d) => ({ ...d, agree: !!v }))}
          className="mt-0.5"
        />
        <span>
          {t("purchase.s4.iAgree")}{" "}
          <a className="text-primary underline" href="#">
            {t("purchase.s4.terms")}
          </a>{" "}
          {t("purchase.s4.and")}{" "}
          <a className="text-primary underline" href="#">
            {t("purchase.s4.cancellation")}
          </a>
        </span>
      </label>

      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-12 rounded-full px-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> {t("purchase.s4.back")}
        </Button>
        <Button
          onClick={handleConfirm}
          className="h-12 flex-1 rounded-full text-base"
        >
          {t("purchase.s4.confirm")} · {formatCHF(total, true)}{" "}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium text-foreground">{value}</div>
    </div>
  );
}

function PayOption({
  active,
  onClick,
  title,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-5 py-5 text-center transition",
        active
          ? "border-primary bg-primary/10"
          : "border-border bg-card hover:border-primary/40",
      )}
    >
      <div className="font-serif text-lg font-medium">{title}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </button>
  );
}

/* ---------- Step 5 ---------- */

function StepConfirmation({
  provider,
  draft,
  total,
  onReset,
}: {
  provider: PurchaseProvider;
  draft: Draft;
  total: number;
  onReset: () => void;
}) {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const dayName = draft.date
    ? parseKey(draft.date).toLocaleDateString(
        lang === "de" ? "de-CH" : "en-GB",
        { weekday: "long" },
      )
    : "";
  const dateLabel = draft.date
    ? parseKey(draft.date).toLocaleDateString(
        lang === "de" ? "de-CH" : "en-GB",
        {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      )
    : "";

  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="font-serif text-5xl font-medium text-foreground lg:text-6xl">
        {t("purchase.s5.allBooked")}
      </h1>
      <h2 className="mt-2 font-serif text-4xl font-medium italic text-primary lg:text-5xl">
        {t("purchase.s5.seeYou", { day: dayName })}
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground">
        {t("purchase.s5.notified", { name: provider.firstName })}
        <br />
        {t("purchase.s5.paymentHeld")}
      </p>

      <div className="mt-8 rounded-3xl bg-secondary/60 p-6 text-left">
        <div className="flex items-center gap-3">
          <UserAvatar name={provider.name} size={48} />
          <div>
            <div className="flex items-center gap-2 font-serif text-lg font-medium">
              {provider.name}{" "}
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-xs text-muted-foreground">{provider.city}</div>
          </div>
        </div>
        <div className="my-5 h-px bg-border" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t("purchase.s5.date")} value={dateLabel} />
          <Field
            label={t("purchase.s5.time")}
            value={draft.slot ? `${draft.slot.start} – ${draft.slot.end}` : ""}
          />
          <Field
            label={t("purchase.s5.location")}
            value={
              draft.location === "ourHome"
                ? t("purchase.s3.atOurHome")
                : t("purchase.s3.atProviderPlace", { name: provider.firstName })
            }
          />
          <div>
            <div className="text-xs text-muted-foreground">
              {t("purchase.s5.totalPaid")}
            </div>
            <div className="mt-1 font-mono text-xl font-semibold text-primary">
              {formatCHF(total, true)}
            </div>
          </div>
        </div>
        <div className="mt-5 font-mono text-xs text-muted-foreground">
          {t("purchase.s5.bookingId")}: {draft.bookingId}
        </div>
      </div>

      <h3 className="mt-12 font-serif text-2xl font-medium">
        {t("purchase.s5.whatHappens")}
      </h3>
      <div className="mt-6 grid gap-4 text-left sm:grid-cols-3">
        <NextStep
          n="01"
          title={t("purchase.s5.step1Title", { name: provider.firstName })}
          desc={t("purchase.s5.step1Desc")}
        />
        <NextStep
          n="02"
          title={t("purchase.s5.step2Title")}
          desc={t("purchase.s5.step2Desc")}
        />
        <NextStep
          n="03"
          title={t("purchase.s5.step3Title")}
          desc={t("purchase.s5.step3Desc")}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={() => {
            onReset();
            navigate("/dashboard/family/overview");
          }}
          className="h-12 rounded-full px-6"
        >
          {t("purchase.s5.browseMore")} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
        <button
          onClick={() => {
            onReset();
            navigate("/dashboard/family/overview");
          }}
          className="text-sm font-medium text-primary hover:underline"
        >
          {t("purchase.s5.backHome")}
        </button>
      </div>
    </div>
  );
}

function NextStep({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-5">
      <div className="font-serif text-3xl font-medium text-primary">{n}</div>
      <div className="mt-3 font-serif text-lg font-medium">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
    </div>
  );
}
