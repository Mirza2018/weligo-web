import { cn } from "@/lib/utils";

export function UserAvatar({
  name,
  imageUrl,
  className,
  size = 40,
}: {
  name: string;
  imageUrl?: string | null;
  className?: string;
  size?: number;
}) {
  const initials = name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.slice(0, 2)
    ?.join("")
    ?.toUpperCase();

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        style={{ width: size, height: size }}
        className={cn("shrink-0 rounded-full object-cover bg-muted", className)}
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
        className,
      )}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
