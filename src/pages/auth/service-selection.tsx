// src/routes/auth/provider/ServiceSelection.tsx
import { ArrowRight, ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


import { useGetCategoriesQuery } from "@/redux/api/websiteApi";
import { useProviderOnboarding } from "@/context/ProviderOnboardingContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n";
import { AuthLayout } from "@/components/authPage/AuthLayout";

const LANGUAGES = ["Deutsch", "English", "Français", "Italiano"];

const RATE_STEP = 1;
const RATE_MIN = 10;
const RATE_MAX = 200;
const EXP_MIN = 0;
const EXP_MAX = 40;

export function ServiceSelection() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { state, update } = useProviderOnboarding();
  const { data: categoryData, isLoading: categoriesLoading } =
    useGetCategoriesQuery({});
  const categories = categoryData?.data ?? [];

  const [categoryId, setCategoryId] = useState<string | null>(state.categoryId);
  const [rate, setRate] = useState(state.hourlyRate);
  const [experience, setExperience] = useState(state.experience);
  const [languages, setLanguages] = useState<Set<string>>(
    new Set(state.languages),
  );

  const toggleLanguage = (lang: string) => {
    setLanguages((prev) => {
      const next = new Set(prev);
      if (next.has(lang)) next.delete(lang);
      else next.add(lang);
      return next;
    });
  };

  const decreaseRate = () =>
    setRate((prev) => Math.max(RATE_MIN, prev - RATE_STEP));
  const increaseRate = () =>
    setRate((prev) => Math.min(RATE_MAX, prev + RATE_STEP));
  const decreaseExp = () =>
    setExperience((prev) => Math.max(EXP_MIN, prev - 1));
  const increaseExp = () =>
    setExperience((prev) => Math.min(EXP_MAX, prev + 1));

  const handleBack = () => navigate(-1);

  const handleContinue = () => {
    // Only one category can be selected - the backend takes a single
    // categoryId, not a set of services.
    if (!categoryId) {
      toast.error(
        t("auth.categoryRequired") ?? "Please select the service you provide.",
      );
      return;
    }
    const category = categories.find((c) => c._id === categoryId);
    update({
      categoryId,
      categoryName: category?.name ?? null,
      hourlyRate: rate,
      experience,
      languages: Array.from(languages),
    });
    navigate("/add-certificates");
  };

  return (
    <AuthLayout
      title={t("auth.serviceSelectionA")}
      description={t("auth.serviceSelectionDesc")}
    >
      <div className="space-y-3.5">
        <div>
          <p className="mb-1.5 text-xs font-medium text-foreground">
            {t("auth.serviceProvide")}
          </p>
          {categoriesLoading ? (
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => {
                const selected = categoryId === category._id;
                const disabled = category.status !== "active";
                return (
                  <button
                    key={category._id}
                    type="button"
                    disabled={disabled}
                    onClick={() => setCategoryId(category._id)}
                    aria-pressed={selected}
                    className={`h-9 rounded-lg border text-xs font-semibold transition-colors ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : disabled
                          ? "cursor-not-allowed border-input bg-muted/20 text-muted-foreground/60"
                          : "border-input bg-muted/40 text-primary hover:bg-muted/60"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          )}
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
          <div className="flex h-10 items-center justify-between rounded-lg border border-input bg-white px-2.5">
            <button
              type="button"
              onClick={decreaseExp}
              aria-label="Decrease experience"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="font-serif text-sm font-bold text-foreground">
              {experience} {experience === 1 ? "year" : "years"}
            </span>
            <button
              type="button"
              onClick={increaseExp}
              aria-label="Increase experience"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium text-foreground">
            {t("auth.language")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGES.map((lang) => {
              const selected = languages.has(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  aria-pressed={selected}
                  className={`h-8 rounded-full border px-3 text-xs font-semibold transition-colors ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-white text-primary hover:bg-muted/40"
                  }`}
                >
                  {lang}
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
