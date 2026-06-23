import { Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { howItWorksContent } from "../components/familiesPage/marketingContent";
import { PageHero } from "../components/familiesPage/PageHero";
import { useI18n } from "../lib/i18n";
import { cn } from "../lib/utils";
// import { SiteHeader } from "@/components/site/SiteHeader";
// import { SiteFooter } from "@/components/site/SiteFooter";
// import { PageHero, SectionHeader } from "@/components/site/PageHero";
// import { howItWorksContent } from "@/components/site/marketingContent";
// import { useI18n } from "@/lib/i18n";
// import { cn } from "@/lib/utils";

// type Step = {
//   title: string;
//   body: string;
//   points: string[];
//   img: string;
// };

export function HowItWorksPage2() {
  const { lang } = useI18n();
  const c = howItWorksContent(lang);
  const [tab, setTab] = useState<"families" | "providers">("families");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* <SiteHeader active="howItWorks" /> */}
      <PageHero
        eyebrow={c.hero.eyebrow}
        titleA={c.hero.titleA}
        titleB={c.hero.titleB}
        sub={c.hero.sub}
      >
        <div className="inline-flex rounded  gap-4">
          <TabBtn
            active={tab === "families"}
            onClick={() => {
              setTab("families");
              navigate("#families");
            }}
          >
            {c.hero.tabFamilies}
          </TabBtn>
          <TabBtn
            active={tab === "providers"}
            onClick={() => {
              setTab("providers");
              navigate("#providers");
            }}
          >
            {c.hero.tabProviders}
          </TabBtn>
        </div>
      </PageHero>

      <div id="families">
        <HowItWorks />
      </div>

      <div id="providers">
        <HowProviderWorks />
      </div>
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
        "h-10 rounded px-5 text-sm font-medium transition",
        active
          ? "bg-primary text-primary-foreground"
          : "text-primary  border-2 border-primary",
      )}
    >
      {children}
    </button>
  );
}

function HowItWorks() {
  // const { t } = useI18n();
  const { lang } = useI18n();
  const c = howItWorksContent(lang);
  // const steps = [
  //   {
  //     n: "01",
  //     title: t("home.step1Title"),
  //     desc: t("home.step1Desc"),
  //     img: AllImages.ht1,
  //   },
  //   {
  //     n: "02",
  //     title: t("home.step2Title"),
  //     desc: t("home.step2Desc"),
  //     img: AllImages.ht2,
  //   },
  //   {
  //     n: "03",
  //     title: t("home.step3Title"),
  //     desc: t("home.step3Desc"),
  //     img: AllImages.ht3,
  //   },
  // ];
  return (
    <section className="mx-auto max-w-430 px-4 py-20 sm:px-6 lg:px-8">
      <div className="">
        <p className="eyebrow">
          {/* {t("home.howEyebrow")} */}
          {c.families.eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-[48px]">
          <span className="font-serif-italic">{c.families.titleA}</span>
          {c.families.titleB}
        </h2>
      </div>
      <div className="mt-12 space-y-8">
        {c.families.steps.map((s, i) => (
          <div
            key={i + 1}
            className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
          >
            <div>
              <p className="font-mono text-primary text-4xl font-bold">
                {i + 1}
              </p>
              <p className="mt-2 text-4xl font-bold">{s.title}</p>
              <p className="mt-3  text-xl font-medium  ">{s.body}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-1 size-7 shrink-0 text-[#9E77ED] bg-[#F4EBFF] rounded-full p-1 " />
                    <span className="text-lg">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-20/10 overflow-hidden rounded-3xl">
              <img
                src={s.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function HowProviderWorks() {
  // const { t } = useI18n();
  const { lang } = useI18n();
  const c = howItWorksContent(lang);
  // const steps = [
  //   {
  //     n: "01",
  //     title: t("home.step1Title"),
  //     desc: t("home.step1Desc"),
  //     img: AllImages.ht1,
  //   },
  //   {
  //     n: "02",
  //     title: t("home.step2Title"),
  //     desc: t("home.step2Desc"),
  //     img: AllImages.ht2,
  //   },
  //   {
  //     n: "03",
  //     title: t("home.step3Title"),
  //     desc: t("home.step3Desc"),
  //     img: AllImages.ht3,
  //   },
  // ];
  return (
    <section className="mx-auto max-w-430 px-4 py-20 sm:px-6 lg:px-8">
      <div className="">
        <p className="eyebrow">
          {/* {t("home.howEyebrow")} */}
          {c.providers.eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-[48px]">
          <span className="font-serif-italic">{c.providers.titleA}</span>
          {c.providers.titleB}
        </h2>
      </div>
      <div className="mt-12 space-y-8">
        {c.providers.steps.map((s, i) => (
          <div
            key={i + 1}
            className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
          >
            <div>
              <p className="font-mono text-primary text-4xl font-bold">
                {i + 1}
              </p>
              <p className="mt-2 text-4xl font-bold">{s.title}</p>
              <p className="mt-3  text-xl font-medium  ">{s.body}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-1 size-7 shrink-0 text-[#9E77ED] bg-[#F4EBFF] rounded-full p-1 " />
                    <span className="text-lg">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-20/10 overflow-hidden rounded-3xl">
              <img
                src={s.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
