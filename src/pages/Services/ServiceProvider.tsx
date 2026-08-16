// src/pages/ServiceProvider.tsx
import { useEffect, useMemo, useState, type ComponentType } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { Autocomplete } from "@react-google-maps/api";
import { useGoogleMaps } from "@/lib/googleMaps";
import { useI18n } from "@/lib/i18n";
import { useSearchProvidersQuery } from "@/redux/api/websiteApi";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
// import {
//   ProviderCard,
//   ProviderCardSkeleton,
// } from "@/components/providers/ProviderCard";
// import { ProviderMap } from "@/components/providers/ProviderMap";
import type { Provider, SortBy } from "@/types/website";
import { ProviderCard, ProviderCardSkeleton } from "@/components/servicePage/ProviderCard";
import { ProviderMap } from "@/components/servicePage/ProviderMap";

const PAGE_SIZE = 100;
const DEFAULT_CENTER = { lat: 47.3769, lng: 8.5417 }; // Zurich fallback

const ServiceProvider = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [searchParams] = useSearchParams();
  const { t } = useI18n();

  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("top_rated");
  const [page, setPage] = useState(1);
  const [allProviders, setAllProviders] = useState<Provider[]>([]);
  const [activeProviderId, setActiveProviderId] = useState<string | null>(null);
  const [mapCenterOverride, setMapCenterOverride] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const debouncedSearch = useDebounce(searchValue, 400);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const date = searchParams.get("date") ?? undefined;
  const time = searchParams.get("time") ?? undefined;
  const locationLabel = searchParams.get("location") ?? "";

  const queryArgs = useMemo(
    () => ({
      categoryId: serviceId ?? "",
      searchTerm: debouncedSearch || undefined,
      sortBy,
      date,
      time,
      lat: lat ? Number(lat) : undefined,
      lng: lng ? Number(lng) : undefined,
      page,
      limit: PAGE_SIZE,
    }),
    [serviceId, debouncedSearch, sortBy, date, time, lat, lng, page],
  );

  const { data, isFetching, isLoading, isError } = useSearchProvidersQuery(
    queryArgs,
    {
      skip: !serviceId,
    },
  );

  // Reset pagination whenever the filters (other than page) change.
  useEffect(() => {
    setPage(1);
    setAllProviders([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId, debouncedSearch, sortBy, date, time, lat, lng]);

  // Merge incoming pages into the running list, de-duplicated.
  useEffect(() => {
    if (!data?.data) return;
    setAllProviders((prev) => {
      if (page === 1) return data.data;
      const seen = new Set(prev.map((p) => p._id));
      const merged = [...prev, ...data.data.filter((p) => !seen.has(p._id))];
      return merged;
    });
  }, [data, page]);

  const total = data?.meta.total ?? 0;
  const hasMore =
    allProviders.length < total && (data?.data.length ?? 0) === PAGE_SIZE;
  const isInitialLoading = isLoading && page === 1;

  const sentinelRef = useInfiniteScroll<HTMLDivElement>({
    enabled: hasMore && !isFetching,
    onIntersect: () => setPage((p) => p + 1),
  });

  const mapCenter =
    mapCenterOverride ??
    (lat && lng
      ? { lat: Number(lat), lng: Number(lng) }
      : allProviders[0]
        ? {
            lat: allProviders[0].location.coordinates[1],
            lng: allProviders[0].location.coordinates[0],
          }
        : DEFAULT_CENTER);

  return (
    <div className="mx-auto h-screen max-w-430 border border-border px-4 sm:px-6 lg:px-4">
      <div className="mt-5.75 grid max-w-119 gap-2 sm:grid-cols-2">
        <SearchBox
          icon={Search}
          placeholder={t("providers.searchPlaceholder")}
          value={searchValue}
          onChange={setSearchValue}
        />
        <MapSearchBox
          placeholder={t("providers.mapSearchPlaceholder")}
          defaultValue={locationLabel}
          onPlaceSelected={setMapCenterOverride}
        />
      </div>

      <section className="my-14.25 grid grid-cols-1 items-start gap-7 lg:grid-cols-5">
        {/* Left: title fixed, only cards scroll */}
        <section className="max-w-157.5 lg:col-span-2">
          <div className="fade-up">
            <h1 className="mt-3 text-4xl leading-tight tracking-tight sm:text-5xl font-semibold">
              {t("providers.titleA")}{" "}
              <span className="font-serif-italic">{t("providers.titleB")}</span>{" "}
              {t("providers.titleC")}
            </h1>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <h1 className="font-sans">
              {isInitialLoading
                ? t("providers.loadingCount")
                : t("providers.foundCount").replace("{count}", String(total))}
            </h1>
            <FilterDropdown value={sortBy} onChange={setSortBy} />
          </div>

          <div
            className="grid grid-cols-1 gap-4 overflow-y-auto pt-4"
            style={{ maxHeight: "50vh" }}
          >
            {isInitialLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <ProviderCardSkeleton key={i} />
              ))}

            {isError && !isInitialLoading && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                {t("providers.error")}
              </p>
            )}

            {!isInitialLoading && !isError && allProviders.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm font-medium text-foreground">
                  {t("providers.noResultsTitle")}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("providers.noResultsSub")}
                </p>
              </div>
            )}

            {allProviders.map((provider) => (
              <ProviderCard
                key={provider._id}
                provider={provider}
                isActive={activeProviderId === provider._id}
                onHover={setActiveProviderId}
              />
            ))}

            {/* Infinite scroll sentinel + next-page skeletons */}
            {hasMore && (
              <div ref={sentinelRef}>
                <ProviderCardSkeleton />
              </div>
            )}
          </div>
        </section>

        {/* Right: map — movable, click a marker to view the provider */}
        <div className="h-[50vh] lg:col-span-3 lg:h-[75vh]">
          <ProviderMap
            providers={allProviders}
            center={mapCenter}
            activeProviderId={activeProviderId}
            onMarkerHover={setActiveProviderId}
          />
        </div>
      </section>
    </div>
  );
};

function SearchBox({
  icon: Icon,
  placeholder,
  value,
  onChange,
  disabled,
}: {
  icon: ComponentType<{ className?: string }>;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="flex h-11 w-full rounded-md border border-border bg-background py-2 pl-10 pr-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}

// Lets the user pan the map to a different area without changing the
// title/address search or the category.
function MapSearchBox({
  placeholder,
  defaultValue,
  onPlaceSelected,
}: {
  placeholder: string;
  defaultValue: string;
  onPlaceSelected: (center: { lat: number; lng: number }) => void;
}) {
  const { isLoaded } = useGoogleMaps();
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    const place = autocomplete?.getPlace();
    const lat = place?.geometry?.location?.lat();
    const lng = place?.geometry?.location?.lng();
    if (lat === undefined || lng === undefined) return;
    onPlaceSelected({ lat, lng });
  };

  return (
    <div className="relative">
      <MapPin className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      {isLoaded ? (
        <Autocomplete
          onLoad={setAutocomplete}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="search"
            placeholder={placeholder}
            defaultValue={defaultValue}
            className="flex h-11 w-full rounded-md border border-border bg-background py-2 pl-10 pr-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </Autocomplete>
      ) : (
        <input
          type="search"
          disabled
          placeholder={placeholder}
          className="flex h-11 w-full rounded-md border border-border bg-background py-2 pl-10 pr-3 text-sm opacity-60 shadow-sm"
        />
      )}
    </div>
  );
}

function FilterDropdown({
  value,
  onChange,
}: {
  value: SortBy;
  onChange: (value: SortBy) => void;
}) {
  const { t } = useI18n();
  const labels: Record<SortBy, string> = {
    nearest: t("providers.sort.nearest"),
    top_rated: t("providers.sort.topRated"),
    price_low: t("providers.sort.priceLow"),
    price_high: t("providers.sort.priceHigh"),
  };

  return (
    <div className="relative inline-flex h-10 cursor-pointer items-center gap-1 font-sans">
      <span>{t("providers.sortBy")} :</span>
      <span className="font-bold">{labels[value]}</span>
      <select
        aria-label="Sort providers"
        value={value}
        onChange={(event) => onChange(event.target.value as SortBy)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        <option value="top_rated">{labels.top_rated}</option>
        <option value="nearest">{labels.nearest}</option>
        <option value="price_low">{labels.price_low}</option>
        <option value="price_high">{labels.price_high}</option>
      </select>
      <ChevronDown className="pointer-events-none h-4 w-4 text-muted-foreground" />
    </div>
  );
}

export default ServiceProvider;
