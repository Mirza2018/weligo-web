// src/components/providers/StarRating.tsx
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number; // 0-5, can be fractional
  size?: "xs" | "sm" | "md";
  className?: string;
}

export function StarRating({
  rating,
  size = "sm",
  className = "",
}: StarRatingProps) {
  const iconClass =
    size === "xs" ? "h-3 w-3" : size === "md" ? "h-5 w-5" : "h-4 w-4";
  const rounded = Math.round(rating);

  return (
    <div className={`flex gap-0.5 text-[#F5A400] ${className}`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`${iconClass} ${index < rounded ? "fill-current" : "fill-none text-[#DDE1EE]"}`}
        />
      ))}
    </div>
  );
}
