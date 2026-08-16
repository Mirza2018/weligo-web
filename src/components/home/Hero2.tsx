// src/pages/Home.tsx
import { useI18n } from "@/lib/i18n";
import { SearchBar } from "@/components/home/SearchBar";
import {
  useSearchProvidersQuery,
  useGetCategoriesQuery,
} from "@/redux/api/websiteApi";
import { Skeleton } from "@/components/ui/skeleton";

function Hero2() {
  const { t } = useI18n();
  const { data: categoryData, isLoading: categoriesLoading } =
    useGetCategoriesQuery({});

  // Featured / masonry rail: show providers from the first active category,
  // once categories have loaded.
  const firstActiveCategory = categoryData?.data.find(
    (c) => c.status === "active",
  );
  const {
    data: featuredData,
    isLoading: featuredLoading,
    isFetching: featuredFetching,
  } = useSearchProvidersQuery(
    {
      categoryId: firstActiveCategory?._id ?? "",
      limit: 12,
      sortBy: "top_rated",
    },
    { skip: !firstActiveCategory },
  );

  const isMasonryLoading =
    categoriesLoading || featuredLoading || featuredFetching;
  const featuredProviders = featuredData?.data ?? [];

  return (
    <section className="bg-background">
      <div className="mx-auto px-4 pt-12 sm:px-6">
        <div className="mx-auto max-w-4xl text-center fade-up">
          <h1 className="text-5xl leading-[1.05] tracking-tight sm:text-[72px] font-bold">
            {t("home.titleA")}
            <br />
            <span>
              {t("home.titleB").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="font-serif-italic">
                {t("home.titleB").split(" ").slice(-1)}
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-[#313233] font-medium">
            {t("home.sub")}
          </p>
          <SearchBar />
        </div>

        {/* <div className="mt-14">
          {isMasonryLoading && <MasonryRailSkeleton />}

          {!isMasonryLoading && featuredProviders.length === 0 && (
            <p className="py-12 text-center text-sm font-medium text-muted-foreground">
              {t("home.noFeatured")}
            </p>
          )}

          {!isMasonryLoading && featuredProviders.length > 0 && (
            <MasonryRail providers={featuredProviders} />
          )}
        </div> */}
      </div>
    </section>
  );
}

function MasonryRailSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
          <Skeleton className="h-4 w-2/3 rounded" />
          <Skeleton className="h-3 w-1/3 rounded" />
        </div>
      ))}
    </div>
  );
}

// Replace the body of this with your existing masonry layout - only the
// data source changed (real providers instead of static placeholders).
function MasonryRail({
  providers,
}: {
  providers: { _id: string; fullName: string; profileImage: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {providers.map((p) => (
        <div key={p._id} className="overflow-hidden rounded-2xl bg-muted">
          <div
            className="aspect-[3/4] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${p.profileImage})` }}
          />
          <p className="mt-2 truncate px-1 text-sm font-semibold">
            {p.fullName}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Hero2;
