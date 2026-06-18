import { Star } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { SectionCard } from "../../common/SectionCard";
import { UserAvatar } from "../../common/UserAvatar";
import { VerifiedBadge } from "../../common/VerifiedBadge";
// import { SectionCard } from "@/components/common/SectionCard";
// import { UserAvatar } from "@/components/common/UserAvatar";
// import { VerifiedBadge } from "@/components/common/VerifiedBadge";
// import { useI18n } from "@/lib/i18n";

const favoriteClients = [
  { id: "fc-1", name: "Simon Keller", verified: true, rating: 4.9 },
  { id: "fc-2", name: "Anna Müller", verified: true, rating: 4.8 },
];

export function YourFavorites() {
  const { t } = useI18n();
  return (
    <SectionCard
      title={t("provider.yourClients")}
      action={
        <button className="text-sm font-medium text-primary hover:underline">
          {t("overview.viewAll")}
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-3">
        {favoriteClients.map((f) => (
          <div
            key={f.id}
            className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:bg-muted-bg"
          >
            <UserAvatar name={f.name} size={44} />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate font-medium text-foreground">{f.name}</p>
                {f.verified && <VerifiedBadge />}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {f.rating.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
