// src/components/home/SearchBar.tsx
import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CategoryField } from "./CategoryField";
import { LocationField } from "./LocationField";
import { DateTimeField } from "./DateTimeField";
import { useI18n } from "@/lib/i18n";
import type { Category, HomeSearchState } from "@/types/website";

const EMPTY_STATE: HomeSearchState = {
  categoryId: null,
  categoryName: null,
  locationLabel: null,
  lat: null,
  lng: null,
  date: null,
  time: null,
};

export function SearchBar() {
  const router = useNavigate();
  const { t, lang } = useI18n();
  const [state, setState] = useState<HomeSearchState>(EMPTY_STATE);
  const [showCategoryError, setShowCategoryError] = useState(false);

  const handleCategorySelect = (category: Category) => {
    setShowCategoryError(false);
    setState((s) => ({
      ...s,
      categoryId: category._id,
      categoryName: category.name,
    }));
  };

  const handleLocationSelect = (result: {
    label: string;
    lat: number;
    lng: number;
  }) => {
    setState((s) => ({
      ...s,
      locationLabel: result.label,
      lat: result.lat,
      lng: result.lng,
    }));
  };

  const handleLocationClear = () => {
    setState((s) => ({ ...s, locationLabel: null, lat: null, lng: null }));
  };

  const handleDateTimeChange = (date: Date | null, time: string | null) => {
    setState((s) => ({ ...s, date, time }));
  };

  const handleSearch = () => {
    // Category is mandatory - the providers endpoint is not usable without it.
    if (!state.categoryId) {
      setShowCategoryError(true);
      return;
    }

    const params = new URLSearchParams();
    if (state.lat !== null) params.set("lat", String(state.lat));
    if (state.lng !== null) params.set("lng", String(state.lng));
    if (state.locationLabel) params.set("location", state.locationLabel);
    if (state.date) params.set("date", state.date.toISOString().slice(0, 10));
    if (state.time) params.set("time", state.time);

    const query = params.toString();
    router(
      `/services/${state.categoryId}/providers${query ? `?${query}` : ""}`,
    );
  };

  return (
    <div className="relative mx-auto mt-8 flex w-full max-w-4xl flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm lg:flex-row lg:items-center">
      <CategoryField
        value={
          state.categoryId
            ? ({ _id: state.categoryId, name: state.categoryName } as Category)
            : null
        }
        onChange={handleCategorySelect}
        label={t("home.search.categoryLabel")}
        placeholder={t("home.search.categoryPlaceholder")}
        comingSoonLabel={t("home.search.comingSoon")}
        hasError={showCategoryError}
        divider
      />

      <LocationField
        label={t("home.search.locationLabel")}
        placeholder={t("home.search.locationPlaceholder")}
        value={state.locationLabel ?? ""}
        onSelect={handleLocationSelect}
        onClear={handleLocationClear}
        divider
      />

      <DateTimeField
        label={t("home.search.dateLabel")}
        placeholder={t("home.search.datePlaceholder")}
        date={state.date}
        time={state.time}
        onChange={handleDateTimeChange}
        locale={lang === "de" ? "de-DE" : "en-US"}
      />

      <div className="shrink-0 px-1">
        <button
          onClick={handleSearch}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] whitespace-nowrap lg:w-auto"
        >
          <Search className="h-4 w-4" /> {t("home.search.button")}
        </button>
      </div>

      {showCategoryError && (
        <p className="px-2 text-xs font-medium text-destructive lg:absolute lg:-bottom-6">
          {t("home.search.categoryRequired")}
        </p>
      )}
    </div>
  );
}
