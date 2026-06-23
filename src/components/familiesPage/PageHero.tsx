import type { ReactNode } from "react";

/** Big centered hero used for For Families / For Providers / About / How It Works. */
export function PageHero({
  eyebrow,
  titleA,
  titleB,
  sub,
  children,
}: {
  eyebrow: string;
  titleA: string;
  titleB: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-secondary/60">
      <div className="fade-up mx-auto max-w-430 px-4 text-center sm:px-6 lg:max-w-3xl pt-13 pb-8.5">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {titleA}
          <br />
          <span className="font-serif-italic">{titleB}</span>
        </h1>
        {sub && (
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">{sub}</p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}

/** Small left-aligned section header. */
export function SectionHeader({
  eyebrow,
  titleA,
  titleB,
  align = "left",
  sub,
}: {
  eyebrow: string;
  titleA: string;
  titleB: string;
  align?: "left" | "center";
  sub?: string;
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-[44px]">
        {titleA} <span className="font-serif-italic text-primary">{titleB}</span>
      </h2>
      {sub && (
        <p className={`mt-4 max-w-2xl text-sm text-muted-foreground sm:text-lg ${align === "center" ? "mx-auto" : ""}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
