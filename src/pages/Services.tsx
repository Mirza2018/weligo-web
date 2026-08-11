import { useState } from "react";
import { useGetCategoriesRateQuery } from "@/redux/api/websiteApi";
import { ServiceCard } from "../components/servicePage/ServiceCard";
import { TrustBar } from "../components/servicePage/TrustBar";
import { useI18n } from "../lib/i18n";

const ITEMS_PER_PAGE = 6;

export function Services() {
  const { t } = useI18n();

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useGetCategoriesRateQuery({
    page,
    limit: ITEMS_PER_PAGE,
  });

  const categories = data?.data ?? [];

  const totalPages = data?.meta?.totalPage ?? 1;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);

    // Optional: scroll back to cards when changing page
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-muted">
        <div className="mx-auto max-w-430 px-4 py-20 text-center sm:px-6 lg:px-8 fade-up">
          <p className="eyebrow">{t("services.eyebrow")}</p>

          <h1 className="mt-3 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            {t("services.titleA")}
            <br />
            <span className="font-serif-italic">{t("services.titleB")}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            {t("services.sub")}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-430 px-4 py-12 sm:px-6 lg:px-8">
        {/* Loading */}
        {isLoading ? (
          <ServiceCardSkeleton />
        ) : categories.length === 0 ? (
          /* No Data */
          <NoData />
        ) : (
          <>
            <div className="relative">
              {/* Fetching overlay when changing page */}
              {isFetching && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-background/50 backdrop-blur-[2px]">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {categories.map((category) => (
                  <ServiceCard
                    key={category._id}
                    id={category._id}
                    title={category.name}
                    desc={category.description}
                    image={category.image}
                    available={category.status === "active"}
                    count={category.totalProviders}
                    price={category.minimumStartingHourlyRate}
                  />
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        <div className="mt-10">
          <TrustBar />
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------
   Skeleton
--------------------------------------------- */

function ServiceCardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <div
          key={index}
          className="aspect-[16/10] animate-pulse overflow-hidden rounded-3xl bg-muted"
        >
          <div className="flex h-full flex-col justify-end p-6">
            <div className="h-9 w-2/3 rounded-md bg-muted-foreground/10" />

            <div className="mt-3 h-4 w-full rounded bg-muted-foreground/10" />

            <div className="mt-2 h-4 w-3/4 rounded bg-muted-foreground/10" />

            <div className="mt-4 h-4 w-1/2 rounded bg-muted-foreground/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------
   No Data
--------------------------------------------- */

function NoData() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-border px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <path d="M3 3h18v18H3z" />
          <path d="m8 14 3-3 2 2 3-4" />
        </svg>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-foreground">
        {t("services.noServices") || "No services available"}
      </h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {t("services.noServicesDesc") ||
          "There are no services available at the moment."}
      </p>
    </div>
  );
}

/* ---------------------------------------------
   Pagination
--------------------------------------------- */

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-border px-3 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Pages */}
      {getPages().map((item, index) =>
        item === "..." ? (
          <span
            key={`dots-${index}`}
            className="flex h-10 min-w-10 items-center justify-center text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium transition-colors ${
              page === item
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:bg-muted"
            }`}
          >
            {item}
          </button>
        ),
      )}

      {/* Next */}
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-border px-3 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
