// src/pages/PurchasePage.tsx
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home as HomeIcon,
  Hourglass,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Smile,
  Star,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { UserAvatar } from "../components/common/UserAvatar";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Skeleton } from "../components/ui/skeleton";
import { PaymentRedirectScreen } from "../components/purchase/PaymentRedirectScreen";
import {
  useProviderDetailsQuery,
  useBookingMutation,
} from "@/redux/api/websiteApi";
// import { getImageUrl } from "@/redux/slices/getBaseUrl";
import {
  getSlotsForDate,
  isDateBookable,
  clampDuration,
  slotHours,
  type SlotWithStatus,
} from "@/lib/purchaseAvailability";
import { useI18n } from "../lib/i18n";
import { cn } from "../lib/utils";
import type { RootState } from "@/redux/store";
import type {
  Availability,
  Booking,
  ProviderDetailsUser,
} from "@/types/providerDetails";
import type { BookingRequestBody } from "@/types/booking";
import { getImageUrl } from "@/redux/getBaseUrl";

type Step = 1 | 2 | 3 | 4 | 5;

type Draft = {
  step: Step;
  date: string | null; // "YYYY-MM-DD"
  slot: SlotWithStatus | null;
  duration: number;
  ageGroup: string;
  persons: number;
  expect: string;
  location: "ourHome" | "providerPlace";
  meal: boolean;
  pets: boolean;
  payment: "apple_pay" | "card";
  agree: boolean;
  bookingId: string | null;
};

const DEFAULT_DRAFT: Draft = {
  step: 1,
  date: null,
  slot: null,
  duration: 1,
  ageGroup: "",
  persons: 1,
  expect: "",
  location: "ourHome",
  meal: false,
  pets: false,
  payment: "apple_pay",
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
    const parsed = JSON.parse(raw);
    // never resume mid-payment-redirect or a stale bookingId
    return {
      ...DEFAULT_DRAFT,
      ...parsed,
      step: Math.min(parsed.step ?? 1, 4),
      bookingId: null,
    };
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
function formatCHF(amount: number) {
  return `CHF ${amount.toLocaleString("de-CH", { maximumFractionDigits: 2 })}`;
}

export function PurchasePage() {
  const { serviceId, providerId } = useParams<{
    serviceId: string;
    providerId: string;
  }>();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { data, isLoading, isError, refetch } = useProviderDetailsQuery(
    providerId ?? "",
    {
      skip: !providerId,
    },
  );

  if (isLoading) return <PurchaseSkeleton />;

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#f6f8fe] px-6 text-center">
        <p className="font-serif text-2xl font-medium">
          We couldn&apos;t load this provider
        </p>
        <p className="text-sm text-muted-foreground">
          Please go back and try again.
        </p>
      </div>
    );
  }

  return (
    <PurchaseFlow
      serviceId={serviceId ?? ""}
      providerId={providerId ?? ""}
      user={data.data.user}
      availability={data.data.availability}
      bookings={data.data.bookings}
      userInfo={userInfo}
      onRefetchProvider={refetch}
    />
  );
}

function PurchaseSkeleton() {
  return (
    <div className="min-h-screen bg-[#f6f8fe] px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_360px]">
        <Skeleton className="h-[500px] rounded-3xl" />
        <Skeleton className="h-[400px] rounded-3xl" />
      </div>
    </div>
  );
}

/* ---------- Flow (real data) ---------- */

function PurchaseFlow({
  serviceId,
  providerId,
  user,
  availability,
  bookings,
  userInfo,
  onRefetchProvider,
}: {
  serviceId: string;
  providerId: string;
  user: ProviderDetailsUser;
  availability: Availability;
  bookings: Booking[];
  userInfo: any;
  onRefetchProvider: () => void;
}) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const key = storageKey(serviceId, providerId);
  const [draft, setDraft] = useState<Draft>(() => loadDraft(key));
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [createBooking, { isLoading: isBooking }] = useBookingMutation();

  useEffect(() => {
    saveDraft(key, draft);
  }, [key, draft]);

  // Price scales only with duration (hours), never with number of persons.
  const total = user.hourlyRate * draft.duration;

  function setStep(s: Step) {
    setDraft((d) => ({ ...d, step: s }));
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleConfirm() {
    if (!draft.agree) return toast.error(t("purchase.s4.mustAgree"));
    if (!draft.date || !draft.slot)
      return toast.error(t("purchase.s2.pickSlot"));
    if (!userInfo?._id) {
      toast.error("Please log in to complete this booking.");
      return;
    }

    const address =
      draft.location === "ourHome"
        ? userInfo.address ||
          `${userInfo.city ?? ""} ${userInfo.postalCode ?? ""}`.trim()
        : user.address || `${user.city ?? ""} ${user.postalCode ?? ""}`.trim();

    const location =
      draft.location === "ourHome"
        ? (userInfo.location ?? {
            type: "Point" as const,
            coordinates: [0, 0] as [number, number],
          })
        : user.location;

    const body: BookingRequestBody = {
      customer: userInfo._id,
      serviceProvider: user._id,
      bookingDate: draft.date,
      timeSlotId: draft.slot._id,
      durationInHours: draft.duration,
      ageGroup: draft.ageGroup,
      numberOfPersons: draft.persons,
      whatToExpect: draft.expect,
      address,
      location,
      paymentMethod: draft.payment,
      amount: total,
    };

    try {
      const res = await createBooking(body).unwrap();
      setDraft((d) => ({
        ...d,
        bookingId: res.data.booking.bookingReference,
        step: 5,
      }));
      setRedirectUrl(res.data.redirectUrl);
      localStorage.removeItem(`weligo:purchase:${serviceId}:${providerId}`);
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      const message =
        err?.data?.message || "Something went wrong creating this booking.";
      toast.error(message);
      // Slot got taken in the meantime - refresh availability and send the
      // user back to pick a different date/time.
      if (err?.data?.err?.statusCode === 409 || err?.status === 409) {
        onRefetchProvider();
        setDraft((d) => ({ ...d, slot: null, step: 2 }));
      }
    }
  }

  const providerPath = `/services/${serviceId}/providers/${providerId}`;

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f8fe]">
      <Stepper current={draft.step} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-8">
        {draft.step === 5 && redirectUrl ? (
          <PaymentRedirectScreen
            redirectUrl={redirectUrl}
            bookingReference={draft.bookingId ?? ""}
            totalLabel={formatCHF(total)}
            providerPath={providerPath}
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <section className="rounded-3xl bg-card p-6 shadow-sm lg:p-10">
              {draft.step === 1 && (
                <Step1
                  user={user}
                  onNext={() => setStep(2)}
                  onBack={() => navigate(providerPath)}
                />
              )}
              {draft.step === 2 && (
                <Step2
                  user={user}
                  availability={availability}
                  bookings={bookings}
                  draft={draft}
                  setDraft={setDraft}
                  onBack={() => setStep(1)}
                  onNext={() => setStep(3)}
                />
              )}
              {draft.step === 3 && (
                <Step3
                  user={user}
                  draft={draft}
                  setDraft={setDraft}
                  onBack={() => setStep(2)}
                  onNext={() => setStep(4)}
                />
              )}
              {draft.step === 4 && (
                <Step4
                  user={user}
                  draft={draft}
                  setDraft={setDraft}
                  total={total}
                  isBooking={isBooking}
                  onBack={() => setStep(3)}
                  onConfirm={handleConfirm}
                />
              )}
            </section>
            <aside>
              <SummaryCard user={user} draft={draft} total={total} />
            </aside>
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}

/* ---------- Stepper / Footer ---------- */

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
  user,
  draft,
  total,
}: {
  user: ProviderDetailsUser;
  draft: Draft;
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
    ? `${draft.slot.startTime}–${draft.slot.endTime}`
    : t("purchase.summary.notSelected");

  return (
    <div className="rounded-3xl bg-card p-6 shadow-sm">
      <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
        {t("purchase.summary.title")}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <UserAvatar
          name={user.fullName}
          imageUrl={getImageUrl(user.profileImage) ?? undefined}
          size={44}
        />
        <div>
          <div className="font-serif text-lg font-medium">{user.fullName}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{" "}
            {user.averageRating}
            <span className="ml-1">&middot; {user.city}</span>
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
                : t("purchase.s3.atProviderPlace", { name: user.firstName })
              : t("purchase.summary.notSelected")
          }
        />
      </div>
      <div className="my-5 h-px bg-border" />
      <div className="flex items-center justify-between">
        <span className="text-base font-medium">
          {t("purchase.summary.total")}
        </span>
        <span className="font-mono text-xl font-semibold text-primary">
          {formatCHF(total)}
        </span>
      </div>
      <p className="mt-1 text-right text-xs text-muted-foreground">
        {user.hourlyRate}/hr &times; {draft.duration}h
      </p>
      <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
        {t("purchase.summary.paymentHeld", { name: user.firstName })}
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
  user,
  onNext,
  onBack,
}: {
  user: ProviderDetailsUser;
  onNext: () => void;
  onBack: () => void;
}) {
  const { t } = useI18n();
  return (
    <div>
      <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
        {t("purchase.s1.tag")}
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium leading-tight lg:text-5xl">
        {t("purchase.s1.heading", { name: user.firstName })}
      </h1>

      <div className="mt-8 rounded-2xl bg-secondary/60 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <UserAvatar
              name={user.fullName}
              imageUrl={getImageUrl(user.profileImage) ?? undefined}
              size={72}
            />
            <div>
              <div className="font-serif text-xl font-medium">
                {user.fullName}
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.round(user.averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-none text-muted-foreground/30",
                    )}
                  />
                ))}
                <span className="ml-1 font-medium">{user.averageRating}</span>
                <span className="ml-1 text-muted-foreground">
                  ({user.totalReview} {t("purchase.s1.reviews")})
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {user.city}
                {user.postalCode ? `, ${user.postalCode}` : ""}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-serif text-3xl font-semibold text-primary">
              {formatCHF(user.hourlyRate)}
            </div>
            <div className="text-xs text-muted-foreground">
              {t("purchase.s1.perHour")}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-14 rounded-full px-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> {t("purchase.s2.back")}
        </Button>
        <Button onClick={onNext} className="h-14 flex-1 rounded-full text-base">
          {t("purchase.s1.sendRequest")} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

/* ---------- Step 2 (real calendar + red-marked booked slots) ---------- */

function Step2({
  user,
  availability,
  bookings,
  draft,
  setDraft,
  onBack,
  onNext,
}: {
  user: ProviderDetailsUser;
  availability: Availability;
  bookings: Booking[];
  draft: Draft;
  setDraft: React.Dispatch<React.SetStateAction<Draft>>;
  onBack: () => void;
  onNext: () => void;
}) {
  const { t, lang } = useI18n();
  const todayKey = fmtKey(new Date(new Date().setHours(0, 0, 0, 0)));

  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const base = draft.date ? parseKey(draft.date) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const monthLabel = viewMonth.toLocaleString(
    lang === "de" ? "de-CH" : "en-GB",
    { month: "long", year: "numeric" },
  );
  const monthDays = useMemo(() => buildMonthGrid(viewMonth), [viewMonth]);

  const selectedDate = draft.date ? parseKey(draft.date) : null;
  const selectedSlots = selectedDate
    ? getSlotsForDate(selectedDate, availability, bookings)
    : [];

  function selectDate(date: Date) {
    const dateKey = fmtKey(date);
    if (dateKey < todayKey) return;
    if (!isDateBookable(date, availability)) return;
    setDraft((d) => ({ ...d, date: dateKey, slot: null }));
  }

  function selectSlot(slot: SlotWithStatus) {
    if (slot.booked) return; // already taken - shown red, not selectable
    const duration = clampDuration(
      slot,
      availability.bookingRules.minimumBookingHours,
      draft.duration,
    );
    setDraft((d) => ({ ...d, slot, duration }));
  }

  function changeDuration(delta: number) {
    if (!draft.slot) {
      toast.error(t("purchase.s2.pickSlot"));
      return;
    }
    const max = slotHours(draft.slot);
    const min = Math.min(
      availability.bookingRules.minimumBookingHours || 1,
      max,
    );
    const next = draft.duration + delta;
    if (next < min) {
      toast.error(t("purchase.s2.minDuration"));
      return;
    }
    if (next > max) {
      // No one can book more hours than the slot actually offers.
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
        {t("purchase.s2.heading", { name: user.firstName })}
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
            const bookable = !past && isDateBookable(d, availability);
            const fullyBooked =
              bookable &&
              getSlotsForDate(d, availability, bookings).every((s) => s.booked);
            const selected = draft.date === dateKey;
            return (
              <button
                key={dateKey}
                type="button"
                disabled={!bookable || fullyBooked}
                onClick={() => selectDate(d)}
                className={cn(
                  "aspect-square rounded-2xl border text-sm transition",
                  past && "border-transparent text-muted-foreground/40",
                  !past &&
                    !bookable &&
                    "border-border bg-card text-muted-foreground/60",
                  bookable &&
                    fullyBooked &&
                    "border-red-200 bg-red-50 text-red-400",
                  bookable &&
                    !fullyBooked &&
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
            &#10003; {t("purchase.s2.availableOn", { name: user.firstName })}{" "}
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
              const sel = draft.slot && draft.slot._id === s._id;
              return (
                <button
                  key={s._id}
                  type="button"
                  disabled={s.booked}
                  onClick={() => selectSlot(s)}
                  title={s.booked ? "Already booked" : undefined}
                  className={cn(
                    "rounded-full border px-4 py-3 text-sm font-medium transition",
                    s.booked &&
                      "cursor-not-allowed border-red-200 bg-red-50 text-red-400 line-through",
                    !s.booked &&
                      (sel
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/50"),
                  )}
                >
                  {s.startTime} – {s.endTime}
                  {s.booked && (
                    <span className="ml-1 text-[10px] normal-case no-underline">
                      (booked)
                    </span>
                  )}
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
              {t("purchase.s2.hours")} &middot; max {slotHours(draft.slot)}h for
              this slot
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
  const firstDayIdx = (first.getDay() + 6) % 7; // Monday-first
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDayIdx; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    cells.push(new Date(month.getFullYear(), month.getMonth(), d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/* ---------- Step 3 ---------- */

function Step3({
  user,
  draft,
  setDraft,
  onBack,
  onNext,
}: {
  user: ProviderDetailsUser;
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
        {t("purchase.s3.heading", { name: user.firstName })}
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
            <span className="text-xs text-muted-foreground">
              Doesn&apos;t change the price - only hours do.
            </span>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">
            {t("purchase.s3.tellWhat", { name: user.firstName })}
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
              label={t("purchase.s3.atProviderPlace", { name: user.firstName })}
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
  user,
  draft,
  setDraft,
  total,
  isBooking,
  onBack,
  onConfirm,
}: {
  user: ProviderDetailsUser;
  draft: Draft;
  setDraft: React.Dispatch<React.SetStateAction<Draft>>;
  total: number;
  isBooking: boolean;
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
          <UserAvatar
            name={user.fullName}
            imageUrl={getImageUrl(user.profileImage) ?? undefined}
            size={48}
          />
          <div>
            <div className="flex items-center gap-2 font-serif text-lg font-medium">
              {user.fullName}{" "}
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-xs text-muted-foreground">{user.city}</div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label={t("purchase.s5.date")} value={dateLabel} />
          <Field
            label={t("purchase.s5.time")}
            value={
              draft.slot
                ? `${draft.slot.startTime} – ${draft.slot.endTime}`
                : ""
            }
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
                : t("purchase.s3.atProviderPlace", { name: user.firstName })
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
              {user.firstName}&apos;s service — {draft.duration} hrs &times;{" "}
              {formatCHF(user.hourlyRate)}/hr
            </span>
            <span>{formatCHF(total)}</span>
          </div>
        </div>
        <div className="my-4 h-px bg-border" />
        <div className="flex items-center justify-between">
          <span className="text-base font-medium">
            {t("purchase.s4.total")}
          </span>
          <span className="font-mono text-2xl font-semibold text-primary">
            {formatCHF(total)}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm font-medium">
          {t("purchase.s4.paymentMethod")}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <PayOption
            active={draft.payment === "apple_pay"}
            onClick={() => setDraft((d) => ({ ...d, payment: "apple_pay" }))}
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
        <span>
          &#10003; {t("purchase.s4.payOnly", { name: user.firstName })}
        </span>
        <span>&#10003; {t("purchase.s4.cancel24")}</span>
        <span>&#10003; {t("purchase.s4.encrypted")}</span>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm">
        <Checkbox
          checked={draft.agree}
          onCheckedChange={(v) => setDraft((d) => ({ ...d, agree: !!v }))}
          className="mt-0.5"
        />
        <span>
          {t("purchase.s4.iAgree")}{" "}
          <a className="text-primary underline" href="/terms">
            {t("footer.terms")}
          </a>{" "}
          {t("purchase.s4.and")}{" "}
          <a className="text-primary underline" href="/policy">
            {t("footer.privacy")}
          </a>
        </span>
      </label>

      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-12 rounded-full px-6"
          disabled={isBooking}
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> {t("purchase.s4.back")}
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isBooking}
          className="h-12 flex-1 rounded-full text-base"
        >
          {isBooking
            ? "Booking…"
            : `${t("purchase.s4.confirm")} · ${formatCHF(total)}`}
          {!isBooking && <ArrowRight className="ml-1 h-4 w-4" />}
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

export default PurchasePage;
