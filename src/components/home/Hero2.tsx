// src/pages/Home.tsx
import { SearchBar } from "@/components/home/SearchBar";
import { useI18n } from "@/lib/i18n";
// import {
//   useGetCategoriesQuery,
//   useSearchProvidersQuery,
// } from "@/redux/api/websiteApi";
import { MasonryRail } from "../homePage/MasonryRail";

function Hero2() {
  const { t } = useI18n();
  // const { data: categoryData, isLoading: categoriesLoading } =
  //   useGetCategoriesQuery({});

  // Featured / masonry rail: show providers from the first active category,
  // once categories have loaded.
  // const firstActiveCategory = categoryData?.data.find(
  //   (c) => c.status === "active",
  // );
  // const {
  //   data: featuredData,
  //   isLoading: featuredLoading,
  //   isFetching: featuredFetching,
  // } = useSearchProvidersQuery(
  //   {
  //     categoryId: firstActiveCategory?._id ?? "",
  //     limit: 12,
  //     sortBy: "top_rated",
  //   },
  //   { skip: !firstActiveCategory },
  // );



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

        <div className="mt-10">
          <MasonryRail />
        </div>
      </div>
    </section>
  );
}

export default Hero2;
