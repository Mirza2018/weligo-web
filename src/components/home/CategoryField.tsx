// src/components/home/CategoryField.tsx
import { useState } from "react";
import { Baby, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
// import { useGetCategoriesQuery } from "@/redux/api/websiteApi";
import type { Category } from "@/types/website";
import { useGetCategoriesQuery } from "@/redux/api/websiteApi";

interface CategoryFieldProps {
  value: Category | null;
  onChange: (category: Category) => void;
  label: string;
  placeholder: string;
  comingSoonLabel: string;
  hasError?: boolean;
  divider?: boolean;
}

export function CategoryField({
  value,
  onChange,
  label,
  placeholder,
  comingSoonLabel,
  hasError,
  divider,
}: CategoryFieldProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useGetCategoriesQuery({});
  const categories = data?.data ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex flex-1 min-w-0 items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-colors hover:bg-muted/60",
            divider &&
              "lg:border-r lg:border-border after:hidden lg:after:block",
            hasError && "ring-1 ring-destructive",
          )}
        >
          <Baby className="h-5 w-5 shrink-0 text-muted-foreground" />
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-medium text-muted-foreground">
              {label}
            </span>
            <span
              className={cn(
                "block truncate text-sm font-semibold",
                !value && "font-normal text-muted-foreground",
              )}
            >
              {value ? value.name : placeholder}
            </span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-2">
        {isLoading && (
          <div className="space-y-2 p-1">
            <Skeleton className="h-9 w-full rounded-lg" />
            <Skeleton className="h-9 w-full rounded-lg" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        )}

        {isError && (
          <p className="p-3 text-sm text-muted-foreground">
            Couldn&apos;t load categories. Please try again.
          </p>
        )}

        {!isLoading && !isError && categories.length === 0 && (
          <p className="p-3 text-sm text-muted-foreground">
            No categories available.
          </p>
        )}

        <ul className="max-h-72 overflow-y-auto">
          {categories.map((category) => {
            const disabled = category.status !== "active";
            return (
              <li key={category._id}>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(category);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                    value?._id === category._id && "bg-muted font-semibold",
                    disabled &&
                      "cursor-not-allowed opacity-50 hover:bg-transparent",
                  )}
                >
                  <span>{category.name}</span>
                  {disabled && (
                    <span className="text-xs text-muted-foreground">
                      {comingSoonLabel}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
