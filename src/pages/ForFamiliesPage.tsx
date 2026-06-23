import { ArrowRight, Check, Shield } from "lucide-react";
// import { Link } from "@tanstack/react-router";
// import { SiteHeader } from "@/components/site/SiteHeader";
// import { SiteFooter } from "@/components/site/SiteFooter";

// import { familiesContent, IMG } from "@/components/site/marketingContent";

import { Link } from "react-router-dom";
import AllImages from "../assets/AllImages";
import { PageHero, SectionHeader } from "../components/familiesPage/PageHero";
import {
  familiesContent
} from "../components/familiesPage/marketingContent";
import { useI18n } from "../lib/i18n";

export function ForFamiliesPage() {
  const { lang } = useI18n();
  const c = familiesContent(lang);
  return (
    <div className="min-h-screen bg-background">
      <PageHero {...c.hero} />
      <WhyWeligo c={c.why} />
      <Promise c={c.promise} />
      <Pricing c={c.pricing} />
      <FourChecks c={c.checks} />
      <DeserveCTA c={c.cta} />
    </div>
  );
}

/* ---- sliced sections ---- */

function WhyWeligo({ c }: { c: ReturnType<typeof familiesContent>["why"] }) {
  return (
    <section className="mx-auto max-w-430 px-4 py-16 sm:py-20 lg:px-8">
      <SectionHeader eyebrow={c.eyebrow} titleA={c.titleA} titleB={c.titleB} />
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_1.2fr] lg:items-start">
        <img
          src={AllImages.f1}
          alt=""
          className="aspect-square w-full rounded-2xl object-cover h-[494px]"
          loading="lazy"
        />
        <div className="flex items-center  h-full">
          <ul className="space-y-6">
            {c.items.map((it) => (
              <li key={it.title}>
                <h3 className="font-serif text-3xl font-semibold">
                  {it.title}
                </h3>
                <p className="mt-2 font-medium text-muted-foreground sm:text-base">
                  {it.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Promise({ c }: { c: ReturnType<typeof familiesContent>["promise"] }) {
  return (
    <section className="bg-secondary/60 py-16 sm:py-20">
      <div className="mx-auto max-w-430 px-4 lg:px-8 ">
        <div className="text-center">
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl font-semibold sm:text-4xl">
            {c.title}
          </h2>
        </div>

        <div className="flex flex-col justify-center items-center">
          <ol className="mt-10 space-y-7 ">
            {c.items.map((it, i) => (
              <li
                key={it.title}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 sm:gap-6"
              >
                <span className="font-serif text-3xl font-medium text-primary sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="">
                  <h3 className="text-base  sm:text-2xl">{it.title}</h3>
                  <p className="mt-1 text-sm  sm:text-base text-muted-foreground">
                    {it.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-xl bg-card px-10 py-6 text-center ">
            <p className="font-serif text-2xl italic sm:text-4xl">{c.quote}</p>
            <p className="mt-2 text-sm sm:text-lg font-medium ">
              {c.verifiedBy}
            </p>
          </div>{" "}
        </div>
      </div>
    </section>
  );
}

function Pricing({ c }: { c: ReturnType<typeof familiesContent>["pricing"] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionHeader
            eyebrow={c.eyebrow}
            titleA={c.titleA}
            titleB={c.titleB}
          />
          <p className="mt-4 text-sm md:text-lg text-muted-foreground sm:text-base">
            {c.body}
          </p>
          <ul className="mt-6 space-y-3">
            {c.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-xs sm:text-sm bg-white! border border-border rounded-2xl p-4 w-fit"
              >
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="mt-6 inline-flex  font-medium text-primary hover:underline"
          >
            {c.howLink} →
          </a>
        </div>
        <div className="rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground/80">
            {c.example.header}
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <Row label={c.example.rate} value="CHF 52.00" />
            <Row label={c.example.fee} value="CHF 2.60" />
            <div className="my-3 h-px bg-white/20" />
            <Row label={c.example.youPay} value="CHF 54.60" big />
          </div>
          <div className="mt-6 h-px bg-white/20" />
          <p className="mt-4 text-xs text-primary-foreground/80">
            {c.example.note}
          </p>
          <p className="mt-1 text-xs text-primary-foreground/70">
            {c.example.meta}
          </p>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  big,
}: {
  label: string;
  value: string;
  big?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={big ? "font-semibold" : "text-primary-foreground/90"}>
        {label}
      </span>
      <span
        className={big ? "font-serif text-xl font-semibold" : "font-medium"}
      >
        {value}
      </span>
    </div>
  );
}

function FourChecks({
  c,
}: {
  c: ReturnType<typeof familiesContent>["checks"];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
      <SectionHeader
        eyebrow={c.eyebrow}
        titleA={c.titleA}
        titleB={c.titleB}
        sub={c.sub}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {c.items.map((it) => (
          <article
            key={it.title}
            className="rounded-2xl p-5 bg-[#EDEFFF] border border-primary/60"
          >
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="mt-4 font-serif text-2xl font-semibold">
              {it.title}
            </h3>
            <p className="mt-2 text-lg text-muted-foreground sm:text-sm">
              {it.body}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-2xl bg-primary px-6 py-7 text-center text-primary-foreground">
        <p className="font-serif text-xl italic sm:text-3xl">{c.passRate}</p>
        <p className="mt-2 text-sm md:text-lg text-primary-foreground/80">
          {c.passSub}
        </p>
      </div>
    </section>
  );
}

function DeserveCTA({ c }: { c: ReturnType<typeof familiesContent>["cta"] }) {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        backgroundImage: `url(${AllImages.f2})`,
        // backgroundSize: "cover",
        backgroundSize: "100% 150%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      <div className="relative mx-auto max-w-430 px-4 py-20 text-center text-white sm:py-24 lg:px-8">
        <h2 className="font-serif text-3xl font-semibold italic sm:text-6xl">
          {c.title}
        </h2>
        <p className="mx-auto mt-4  text-sm sm:text-2xl">{c.sub}</p>
        <Link
          to={"/services" as any}
          className="mt-7 inline-flex h-14 items-center rounded-full bg-primary px-6  font-bold text-primary-foreground hover:opacity-90"
        >
          {c.button}
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
