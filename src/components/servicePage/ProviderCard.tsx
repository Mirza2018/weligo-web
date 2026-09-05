// src/components/providers/ProviderCard.tsx
import { BadgeCheck, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

import type { Provider } from "@/types/website";
import { getImageUrl } from "@/redux/getBaseUrl";
import { FavoriteButton } from "./FavoriteButton";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { jwtDecode } from "jwt-decode";
import { useI18n } from "@/lib/i18n";

interface ProviderCardProps {
  provider: Provider;
  isActive?: boolean;
  onHover?: (id: string | null) => void;
}

interface DecodedToken {
  fullName: string;
  email: string;
  phone?: string;
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export function ProviderCard({
  provider,
  isActive,
  onHover,
}: ProviderCardProps) {
  const router = useNavigate();
  const { serviceId } = useParams();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
const {t}=useI18n()
  const decodedToken = accessToken
    ? jwtDecode<DecodedToken>(accessToken)
    : null;

  return (
    <article
      onClick={() => router(`/services/${serviceId}/providers/${provider._id}`)}
      onMouseEnter={() => onHover?.(provider._id)}
      onMouseLeave={() => onHover?.(null)}
      className={`flex cursor-pointer gap-4 rounded-2xl border p-3 shadow-sm transition-colors ${
        isActive ? "border-primary bg-primary/5" : "border-border bg-card"
      }`}
    >
      <div className="relative h-[163px] w-[147px] shrink-0">
        <img
          src={getImageUrl(provider.profileImage) ?? undefined}
          alt={provider.fullName}
          className="h-full w-full rounded-lg object-cover bg-muted"
        />
      </div>

      <div className="min-w-0 py-1 relative">
        <div className="flex items-center gap-2">
          <h2 className="truncate font-serif text-3xl font-semibold leading-tight text-foreground">
            {provider.fullName}
          </h2>
          <BadgeCheck className="h-5 w-5 shrink-0 fill-primary text-primary" />
        </div>

        <div className="mt-1 flex items-center gap-1 font-sans text-base">
          <Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
          <span className="font-semibold">
            {provider.averageRating.toFixed(1)}
          </span>
          <span className="text-muted-foreground">
            ({provider.totalReview})
          </span>
        </div>

        <p className="mt-2 font-sans text-base font-semibold text-foreground">
          {provider.categoryId?.name}
          {provider.experience
            ? `• ${provider.experience} ${t("services.yearsExp")}`
            : ""}
        </p>
        <p className="mt-1 truncate font-sans text-sm font-medium text-muted-foreground">
          {provider.address ? `${provider.address}, ` : ""}
          {provider.city} {provider.postalCode}
        </p>

        <div className="mt-3 inline-flex items-center rounded-full bg-primary px-3 py-1.5 font-sans text-sm font-bold text-primary-foreground">
          {provider.hourlyRate} {t("services.perHr")}
        </div>

        {decodedToken?.role === "family" && (
          <FavoriteButton
            providerId={provider._id}
            providerName={provider.fullName}
            className="absolute right-0 top-2"
          />
        )}
      </div>
    </article>
  );
}

export function ProviderCardSkeleton() {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-3 shadow-sm">
      <Skeleton className="h-[163px] w-[147px] shrink-0 rounded-lg" />
      <div className="min-w-0 flex-1 space-y-2 py-1">
        <Skeleton className="h-7 w-2/3 rounded" />
        <Skeleton className="h-4 w-1/3 rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
        <Skeleton className="h-4 w-3/5 rounded" />
        <Skeleton className="mt-3 h-7 w-20 rounded-full" />
      </div>
    </div>
  );
}
