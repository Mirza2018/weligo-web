import { ArrowRight, ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useI18n } from "../../lib/i18n";
import { AuthLayout } from "../../components/authPage/AuthLayout";

type ServiceKey =
  | "childcare"
  | "seniorCare"
  | "petCare"
  | "houseCleaning"
  | "tutoring"
  | "everydayHelp";

type LanguageKey = "deutsch" | "english" | "francais" | "italiano";

const SERVICES: { key: ServiceKey; labelFallback: string }[] = [
  { key: "childcare", labelFallback: "Childcare" },
  { key: "seniorCare", labelFallback: "Senior Care" },
  { key: "petCare", labelFallback: "Pet Care" },
  { key: "houseCleaning", labelFallback: "House Cleaning" },
  { key: "tutoring", labelFallback: "Tutoring" },
  { key: "everydayHelp", labelFallback: "Everyday Help" },
];

const LANGUAGES: { key: LanguageKey; labelFallback: string }[] = [
  { key: "deutsch", labelFallback: "Deutsch" },
  { key: "english", labelFallback: "English" },
  { key: "francais", labelFallback: "Français" },
  { key: "italiano", labelFallback: "Italiano" },
];

const RATE_STEP = 1;
const RATE_MIN = 10;
const RATE_MAX = 200;

const EXPERIENCE_OPTIONS = [
  { value: "less-than-1", labelFallback: "Less than 1 year" },
  { value: "1-3", labelFallback: "1–3 years" },
  { value: "3-5", labelFallback: "3–5 years" },
  { value: "5-plus", labelFallback: "5+ years" },
];

export function ServiceSelection() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const [services, setServices] = useState<Set<ServiceKey>>(
    new Set(["childcare"]),
  );
  const [rate, setRate] = useState(30);
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState<Set<LanguageKey>>(
    new Set(["deutsch", "english"]),
  );

  const toggleService = (key: ServiceKey) => {
    setServices((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const toggleLanguage = (key: LanguageKey) => {
    setLanguages((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const decreaseRate = () => {
    setRate((prev) => Math.max(RATE_MIN, prev - RATE_STEP));
  };

  const increaseRate = () => {
    setRate((prev) => Math.min(RATE_MAX, prev + RATE_STEP));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    // TODO: persist { services, rate, experience, languages } and move to next step
    navigate("/add-certificates");
  };

  return (
    <AuthLayout
      title={t("auth.serviceSelectionA")}
      // italic={t("provider.whatDoYouB") ?? "offer?"}
      description={t("auth.serviceSelectionDesc")}
    >
      <div className="space-y-3.5">
        <div>
          <p className="mb-1.5 text-xs font-medium text-foreground">
            {t("auth.serviceProvide")}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SERVICES.map(({ key, labelFallback }) => {
              const selected = services.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleService(key)}
                  aria-pressed={selected}
                  className={`h-9 rounded-lg border text-xs font-semibold transition-colors ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-muted/40 text-primary hover:bg-muted/60"
                  }`}
                >
                  {key}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium text-foreground">
            {t("auth.hourlyCHF")}
          </p>
          <div className="flex h-10 items-center justify-between rounded-lg border border-input bg-white px-2.5">
            <button
              type="button"
              onClick={decreaseRate}
              aria-label="Decrease rate"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="font-serif text-sm font-bold text-foreground">
              CHF {rate}
            </span>
            <button
              type="button"
              onClick={increaseRate}
              aria-label="Increase rate"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium text-foreground">
            {t("auth.experience")}
          </p>
          <div className="relative">
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="h-9 w-full appearance-none rounded-lg border border-input bg-white px-3 pr-8 text-xs text-foreground outline-none focus:border-primary"
            >
              <option value="" disabled>
                {t("auth.select")}
              </option>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t(`provider.experience.${opt.value}`) ?? opt.labelFallback}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium text-foreground">
            {t("auth.language")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGES.map(({ key, labelFallback }) => {
              const selected = languages.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleLanguage(key)}
                  aria-pressed={selected}
                  className={`h-8 rounded-full border px-3 text-xs font-semibold transition-colors  ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-white text-primary hover:bg-muted/40"
                  }`}
                >
                  {labelFallback}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary/10 px-4 text-xs font-medium text-primary transition-colors hover:bg-primary/15"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("auth.back")}
          </button>
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary text-xs font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
          >
            {t("auth.continue")}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
