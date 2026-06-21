import { useMemo, useState } from "react";

import { Check, IdCard } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { IMG, providersContent } from "../components/familiesPage/marketingContent";
import { PageHero, SectionHeader } from "../components/familiesPage/PageHero";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { SiteHeader } from "../components/familiesPage/SiteHeader";
import { SiteFooter } from "../components/familiesPage/SiteFooter";
import { Slider } from "../components/ui/slider";
// import { Slider } from "@/components/ui/slider";
// import { SiteHeader } from "@/components/site/SiteHeader";
// import { SiteFooter } from "@/components/site/SiteFooter";


export function ForProvidersPage() {
  const { lang } = useI18n();
  const c = providersContent(lang);
  return (
    <div className="min-h-screen bg-background">
      {/* <SiteHeader active="forProviders" /> */}
      <PageHero {...c.hero}>
        <Link
          to={"/services" as any}
          className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          {c.hero.cta} →
        </Link>
      </PageHero>
      <EarningsCalculator c={c.earnings} />
      <BuiltFor c={c.built} />
      <ProvidersFlow c={c.flow} />
      <HowCompares c={c.compare} />
      <Verify c={c.verify} />
      <NextChapterCTA c={c.cta} />
      <SiteFooter />
    </div>
  );
}

/* ---- Interactive earnings calculator ---- */

function EarningsCalculator({ c }: { c: ReturnType<typeof providersContent>["earnings"] }) {
  const [hours, setHours] = useState(15);
  const [rate, setRate] = useState(30);
  const [bookings, setBookings] = useState(4);

  const { monthly, takeHome, fee } = useMemo(() => {
    const weekly = hours * rate;
    const monthlyGross = (weekly * 50) / 12;
    const takeHome = monthlyGross * 0.85;
    const fee = monthlyGross * 0.15;
    return { monthly: monthlyGross, takeHome, fee };
  }, [hours, rate, bookings]);

  const takePct = (takeHome / Math.max(monthly, 1)) * 100;
  const formatCHF = (n: number) =>
    new Intl.NumberFormat("de-CH", { maximumFractionDigits: 0 }).format(Math.round(n));

  const estimated = c.estimated
    .replace("{hrs}", String(hours))
    .replace("{rate}", String(rate));

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
      <SectionHeader eyebrow={c.eyebrow} titleA={c.titleA} titleB={c.titleB} />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-7">
          <SliderRow
            label={c.hoursPerWeek}
            value={`${hours} hrs`}
            min={1}
            max={40}
            step={1}
            v={hours}
            onChange={setHours}
          />
          <SliderRow
            label={c.hourlyRate}
            value={`CHF ${rate}`}
            min={22}
            max={80}
            step={1}
            v={rate}
            onChange={setRate}
          />
          <SliderRow
            label={c.bookingsPerWeek}
            value={String(bookings)}
            min={1}
            max={15}
            step={1}
            v={bookings}
            onChange={setBookings}
          />
        </div>
        <div className="rounded-2xl bg-secondary/80 p-6 sm:p-8">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-5xl font-semibold text-primary sm:text-6xl">
              CHF {formatCHF(takeHome).replace(",", "'")}
            </span>
            <span className="text-base text-muted-foreground">{c.perMonth}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{estimated}</p>
          <div className="mt-6 flex items-start gap-2 text-sm">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full border border-primary" />
            <span className="text-muted-foreground">{c.afterFee}</span>
          </div>
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-primary/10">
            <div className="h-full bg-primary" style={{ width: `${takePct}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{c.takeHome}</span>
            <span>{c.platformFee}</span>
          </div>
          <p className="mt-2 text-right text-xs text-muted-foreground">
            CHF {formatCHF(fee)} / mo
          </p>
        </div>
      </div>
    </section>
  );
}

function SliderRow({
  label,
  value,
  v,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: string;
  v: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <Slider
        className="mt-3"
        min={min}
        max={max}
        step={step}
        value={[v]}
        onValueChange={(arr) => onChange(arr[0])}
      />
    </div>
  );
}

/* ---- Built for caregivers ---- */

function BuiltFor({ c }: { c: ReturnType<typeof providersContent>["built"] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
      <div>
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl lg:text-[44px]">
          {c.titleA} <span className="font-serif-italic text-primary">{c.titleB}</span>
          <br />
          {c.titleA2}
        </h2>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {c.items.map((it, i) => (
          <article key={it.title} className="rounded-2xl border border-border bg-card p-6">
            <p className="font-serif text-3xl font-medium text-primary">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-base font-semibold sm:text-lg">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---- Interactive flow (click to highlight) ---- */

function ProvidersFlow({ c }: { c: ReturnType<typeof providersContent>["flow"] }) {
  const [active, setActive] = useState(0);
  const step = c.steps[active];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
      <SectionHeader eyebrow={c.eyebrow} titleA={c.titleA} titleB={c.titleB} />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <ol className="relative space-y-3">
          {c.steps.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-start gap-4 rounded-xl p-3 text-left transition",
                    isActive ? "bg-primary/5" : "opacity-50 hover:opacity-100",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full font-serif text-sm font-medium",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card text-muted-foreground",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{s.title}</span>
                    <span className="block text-xs text-primary">{s.sub}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="aspect-square w-full overflow-hidden rounded-2xl bg-muted">
          <img
            key={active}
            src={
              [IMG.provider1, IMG.provider2, IMG.provider3, IMG.provider4][active] || IMG.provider1
            }
            alt={step?.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ---- How Weligo compares ---- */

function HowCompares({ c }: { c: ReturnType<typeof providersContent>["compare"] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
      <SectionHeader eyebrow={c.eyebrow} titleA={c.titleA} titleB={c.titleB} />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {c.cols.map((col) => (
          <article
            key={col.name}
            className={cn(
              "rounded-2xl border p-6",
              col.highlight ? "border-primary bg-secondary/60" : "border-border bg-card",
            )}
          >
            <h3
              className={cn(
                "font-serif text-lg font-semibold italic",
                col.highlight && "text-primary",
              )}
            >
              {col.name}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {col.items.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <Check
                    className={cn(
                      "mt-1 h-4 w-4 shrink-0",
                      col.highlight ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Verify({ c }: { c: ReturnType<typeof providersContent>["verify"] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:pb-20 lg:px-8">
      <SectionHeader eyebrow={c.eyebrow} titleA={c.titleA} titleB={c.titleB} />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {c.items.map((it) => (
          <article key={it.title} className="rounded-2xl border border-border bg-card p-5">
            <IdCard className="h-5 w-5 text-primary" />
            <h3 className="mt-4 font-serif text-base font-semibold">{it.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{it.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function NextChapterCTA({ c }: { c: ReturnType<typeof providersContent>["cta"] }) {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ backgroundImage: `url(${IMG.nextChapter})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center text-white sm:py-24 lg:px-8">
        <h2 className="font-serif text-3xl font-semibold italic sm:text-5xl">
          {c.title}
          <br />
          {c.titleB}
        </h2>
        <Link
          to={"/services" as any}
          className="mt-7 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          {c.button} →
        </Link>
      </div>
    </section>
  );
}
