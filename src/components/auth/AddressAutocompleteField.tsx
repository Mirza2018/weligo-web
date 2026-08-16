// src/components/auth/AddressAutocompleteField.tsx
import { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useGoogleMaps } from "@/lib/googleMaps";
import { parseGooglePlace } from "@/lib/parseGooglePlace";

interface AddressAutocompleteFieldProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onPlaceSelected: (place: {
    formattedAddress: string;
    city: string;
    postalCode: string;
    lat: number;
    lng: number;
  }) => void;
  className?: string;
}

export function AddressAutocompleteField({
  value,
  placeholder,
  onChange,
  onPlaceSelected,
  className,
}: AddressAutocompleteFieldProps) {
  const { isLoaded } = useGoogleMaps();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (!place) return;
    const parsed = parseGooglePlace(place);
    if (!parsed) return;
    onChange(parsed.formattedAddress);
    onPlaceSelected(parsed);
  };

  if (!isLoaded) {
    return <input disabled placeholder={placeholder} className={className} />;
  }

  return (
    <Autocomplete
      onLoad={(ac) => (autocompleteRef.current = ac)}
      onPlaceChanged={handlePlaceChanged}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
    </Autocomplete>
  );
}
