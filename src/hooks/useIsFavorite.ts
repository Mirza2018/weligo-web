
import { useGetFavoriteQuery } from "@/redux/api/websiteApi";

export function useIsFavorite(providerId: string) {
  const { isFavorited, isLoading } = useGetFavoriteQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      isFavorited: !!data?.data?.some((f) => f._id === providerId),
    }),
  });

  return { isFavorited, isLoading };
}
