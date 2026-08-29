// src/components/providers/FavoriteButton.tsx
import { toast } from "sonner";
import { Heart } from "lucide-react";

import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/redux/api/websiteApi";
import { useIsFavorite } from "@/hooks/useIsFavorite";

interface FavoriteButtonProps {
  providerId: string;
  providerName: string;
  className?: string;
}

export function FavoriteButton({
  providerId,
  providerName,
  className = "",
}: FavoriteButtonProps) {
  const { isFavorited } = useIsFavorite(providerId);
  const [addFavorite, { isLoading: isAdding }] = useAddFavoriteMutation();
  const [removeFavorite, { isLoading: isRemoving }] =
    useRemoveFavoriteMutation();

  const isLoading = isAdding || isRemoving;

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;

    try {
      if (isFavorited) {
        await removeFavorite(providerId).unwrap();
        toast.success(`Removed ${providerName} from favorites`);
      } else {
        await addFavorite(providerId).unwrap();
        toast.success(`Added ${providerName} to favorites`);
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message ||
          `Failed to ${isFavorited ? "remove from" : "add to"} favorites`,
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isLoading}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      className={`rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-white disabled:opacity-50 ${className}`}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          isFavorited ? "fill-primary text-primary" : "text-gray-500"
        }`}
      />
    </button>
  );
}
