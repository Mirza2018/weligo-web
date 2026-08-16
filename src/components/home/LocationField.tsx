// src/components/home/LocationField.tsx
import { useRef } from "react";
import { MapPin, X } from "lucide-react";
import { Autocomplete } from "@react-google-maps/api";
import { cn } from "@/lib/utils";
import { useGoogleMaps } from "@/lib/googleMaps";

interface LocationFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onSelect: (result: { label: string; lat: number; lng: number }) => void;
  onClear: () => void;
  divider?: boolean;
}

export function LocationField({
  label,
  placeholder,
  value,
  onSelect,
  onClear,
  divider,
}: LocationFieldProps) {
  const { isLoaded } = useGoogleMaps();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    const lat = place?.geometry?.location?.lat();
    const lng = place?.geometry?.location?.lng();
    if (lat === undefined || lng === undefined) return;
    onSelect({
      label: place?.formatted_address ?? place?.name ?? placeholder,
      lat,
      lng,
    });
  };

  return (
    <div
      className={cn(
        "flex flex-1 min-w-0 items-center gap-3 rounded-xl px-4 py-2.5",
        divider && "lg:border-r lg:border-border",
      )}
    >
      <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-muted-foreground">
          {label}
        </span>
        {isLoaded ? (
          <Autocomplete
            onLoad={(ac) => (autocompleteRef.current = ac)}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              defaultValue={value}
              placeholder={placeholder}
              className="w-full truncate bg-transparent text-sm font-semibold text-foreground placeholder:font-normal placeholder:text-muted-foreground focus:outline-none"
            />
          </Autocomplete>
        ) : (
          <input
            type="text"
            disabled
            placeholder={placeholder}
            className="w-full truncate bg-transparent text-sm font-normal text-muted-foreground focus:outline-none"
          />
        )}
      </div>
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-muted"
          aria-label="Clear location"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
