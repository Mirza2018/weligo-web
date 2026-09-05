import { Star } from "lucide-react";
import { Link } from "react-router-dom";

import { SectionCard } from "@/components/common/SectionCard";
import { UserAvatar } from "@/components/common/UserAvatar";
import { VerifiedBadge } from "@/components/common/VerifiedBadge";
import { useI18n } from "@/lib/i18n";
import { resolveImageUrl } from "@/lib/overview-helpers";
import type { FavoriteProvider } from "@/types/overview";

export function YourFavorites({
  favorites,
}: {
  favorites: FavoriteProvider[];
}) {
  const { t } = useI18n();

  return (
    <SectionCard
      title={t("overview.yourFavorites")}
      action={
        <Link
          to="/dashboard/family/favorites"
          className="text-sm font-medium text-primary hover:underline"
        >
          {t("overview.viewAll")}
        </Link>
      }
    >
      {favorites.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {t("familyDashboard.nofavorites")}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {favorites.map((f) => (
            <div
              key={f._id}
              className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:bg-muted-bg"
            >
              <UserAvatar
                name={f.fullName}
                imageUrl={resolveImageUrl(f.profileImage)}
                size={44}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate font-medium text-foreground">
                    {f.fullName}
                  </p>
                  <VerifiedBadge />
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {f.averageRating.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
