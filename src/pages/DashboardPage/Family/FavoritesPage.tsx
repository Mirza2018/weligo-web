// src/pages/dashboard/family/FavoritesPage.tsx
import { useMemo, useState } from "react";
import { Heart, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "../../../components/ui/input";
import { Skeleton } from "../../../components/ui/skeleton";
import { formatCHF } from "../../../lib/format";
import {
  useGetFavoriteQuery,
  useRemoveFavoriteMutation,
} from "@/redux/api/websiteApi";
import { getImageUrl } from "@/redux/getBaseUrl";
import type { FavoriteItem } from "@/types/favorites";

export function FavoritesPage() {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError } = useGetFavoriteQuery({});
  const [removeFavorite, { isLoading: isRemoving }] =
    useRemoveFavoriteMutation();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const favorites = data?.data ?? [];

  const list = useMemo(
    () =>
      favorites.filter((f) =>
        f.fullName.toLowerCase().includes(query.toLowerCase()),
      ),
    [favorites, query],
  );

  const handleUnfavorite = async (id: string) => {
    setRemovingId(id);
    try {
      await removeFavorite(id).unwrap();
      toast.success("Removed from favorites");
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't remove this favorite.");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-serif text-3xl font-medium">Favorites</h2>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm bg-card"
      />

      {isLoading && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Couldn&apos;t load your favorites. Please try again.
        </p>
      )}

      {!isLoading && !isError && favorites.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          You haven&apos;t favorited anyone yet.
        </p>
      )}

      {!isLoading && !isError && favorites.length > 0 && list.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No favorites match your search.
        </p>
      )}

      {!isLoading && !isError && list.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {list.map((f) => (
            <FavoriteCard
              key={f._id}
              favorite={f}
              onUnfavorite={() => handleUnfavorite(f._id)}
              isRemoving={isRemoving && removingId === f._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FavoriteCard({
  favorite,
  onUnfavorite,
  isRemoving,
}: {
  favorite: FavoriteItem;
  onUnfavorite: () => void;
  isRemoving: boolean;
}) {
  const navigate = useNavigate();
  const avatarUrl = favorite.profileImage
    ? getImageUrl(favorite.profileImage)
    : null;

  return (
    <article className="flex items-center gap-4 rounded-2xl bg-secondary/60 p-5">
      <button
        type="button"
        onClick={() =>
          favorite.categoryId &&
          navigate(
            `/services/${favorite.categoryId._id}/providers/${favorite._id}`,
          )
        }
        className="shrink-0"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={favorite.fullName}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-muted" aria-hidden />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-2xl font-medium leading-none">
          {favorite.fullName}
        </h3>
        <div className="mt-2 flex items-center gap-1 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < Math.round(favorite.averageRating)
                  ? "h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  : "h-3.5 w-3.5 text-muted-foreground/30"
              }
            />
          ))}
          <span className="ml-1 font-medium">{favorite.averageRating}</span>
          <span className="text-muted-foreground">
            ({favorite.totalReview} reviews)
          </span>
        </div>
        {favorite.address && (
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {favorite.address}
          </div>
        )}
        {favorite.categoryId && (
          <span className="mt-2 inline-flex rounded-md border border-border bg-card px-2.5 py-0.5 text-xs">
            {favorite.categoryId.name}
          </span>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          type="button"
          aria-label="Unfavorite"
          onClick={onUnfavorite}
          disabled={isRemoving}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary disabled:opacity-50"
        >
          <Heart className="h-4 w-4 fill-primary" />
        </button>
        <p className="font-serif text-2xl font-medium text-primary">
          {formatCHF(favorite.hourlyRate)}
        </p>
        <p className="text-xs text-muted-foreground">per hour</p>
      </div>
    </article>
  );
}
