import { useState } from "react";
import { Heart, MapPin, Star } from "lucide-react";
import { favorites } from "../../../assets/data/favorites";
import { Input } from "../../../components/ui/input";
import { formatCHF } from "../../../lib/format";
// import { Input } from "@/components/ui/input";
// import { favorites } from "@/assets/data/favorites";
// import { formatCHF } from "@/lib/format";

export function FavoritesPage() {
  const [query, setQuery] = useState("");
  const list = favorites.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className=" flex  flex-col gap-6">
      <h2 className="font-serif text-3xl font-medium">Favorites</h2>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm bg-card"
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {list.map((f) => (
          <article
            key={f.id}
            className="flex items-center gap-4 rounded-2xl bg-secondary/60 p-5"
          >
            <div className="h-20 w-20 shrink-0 rounded-full bg-muted" aria-hidden />
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-2xl font-medium leading-none">{f.name}</h3>
              <div className="mt-2 flex items-center gap-1 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 font-medium">{f.rating}</span>
                <span className="text-muted-foreground">({f.reviewCount} reviews)</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {f.location} · {f.distanceKm}km away
              </div>
              <span className="mt-2 inline-flex rounded-md border border-border bg-card px-2.5 py-0.5 text-xs">
                {f.service}
              </span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                type="button"
                aria-label="Unfavorite"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary"
              >
                <Heart className="h-4 w-4 fill-primary" />
              </button>
              <p className="font-serif text-2xl font-medium text-primary">
                {formatCHF(f.hourlyRate)}
              </p>
              <p className="text-xs text-muted-foreground">per hour</p>
              {f.availableToday && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Available today
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
