import { useState } from "react";
import { Check } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { howItWorksContent } from "../components/familiesPage/marketingContent";
import { PageHero, SectionHeader } from "../components/familiesPage/PageHero";
import { cn } from "../lib/utils";
// import { SiteHeader } from "@/components/site/SiteHeader";
// import { SiteFooter } from "@/components/site/SiteFooter";
// import { PageHero, SectionHeader } from "@/components/site/PageHero";
// import { howItWorksContent } from "@/components/site/marketingContent";
// import { useI18n } from "@/lib/i18n";
// import { cn } from "@/lib/utils";

type Step = {
  title: string;
  body: string;
  points: string[];
  img: string;
};

export function HowItWorksPage() {
  const { lang } = useI18n();
  const c = howItWorksContent(lang);
  const [tab, setTab] = useState<"families" | "providers">("families");

  return (
    <div className="min-h-screen bg-background">
      {/* <SiteHeader active="howItWorks" /> */}
      <PageHero
        eyebrow={c.hero.eyebrow}
        titleA={c.hero.titleA}
        titleB={c.hero.titleB}
        sub={c.hero.sub}
      >
        <div className="inline-flex rounded-full bg-card p-1 shadow-sm">
          <TabBtn active={tab === "families"} onClick={() => setTab("families")}>
            {c.hero.tabFamilies}
          </TabBtn>
          <TabBtn active={tab === "providers"} onClick={() => setTab("providers")}>
            {c.hero.tabProviders}
          </TabBtn>
        </div>
      </PageHero>

      {tab === "families" ? (
        <InteractiveFlow
          eyebrow={c.families.eyebrow}
          titleA={c.families.titleA}
          titleB={c.families.titleB}
          steps={c.families.steps}
        />
      ) : (
        <InteractiveFlow
          eyebrow={c.providers.eyebrow}
          titleA={c.providers.titleA}
          titleB={c.providers.titleB}
          steps={c.providers.steps}
        />
      )}

      {/* <SiteFooter /> */}
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-full px-5 text-sm font-medium transition",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

/* Interactive flow — clicking a step changes the image and lowers opacity on others */
function InteractiveFlow({
  eyebrow,
  titleA,
  titleB,
  steps,
}: {
  eyebrow: string;
  titleA: string;
  titleB: string;
  steps: Step[];
}) {
  const [active, setActive] = useState(0);
  const cur = steps[active];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
      <SectionHeader eyebrow={eyebrow} titleA={titleA} titleB={titleB} />
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Step list */}
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <StepCard
                step={s}
                index={i}
                active={active === i}
                onClick={() => setActive(i)}
              />
            </li>
          ))}
        </ol>

        {/* Sticky preview image */}
        <div className="lg:sticky lg:top-24">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted">
            <img
              key={cur.img}
              src={cur.img}
              alt={cur.title}
              className="fade-up h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  active,
  onClick,
}: {
  step: Step;
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "block w-full rounded-2xl border p-5 text-left transition",
        active
          ? "border-primary/30 bg-card opacity-100 shadow-sm"
          : "border-border bg-card opacity-50 hover:opacity-90",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full font-serif text-xs font-medium",
            active ? "bg-primary text-primary-foreground" : "bg-secondary text-primary",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-serif text-lg font-semibold">{step.title}</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{step.body}</p>
      <ul className="mt-3 space-y-1.5 text-sm">
        {step.points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="text-muted-foreground">{p}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}
