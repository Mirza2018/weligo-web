// src/lib/parseGooglePlace.ts

export interface ParsedPlace {
  formattedAddress: string;
  city: string;
  postalCode: string;
  lat: number;
  lng: number;
}

function component(
  place: google.maps.places.PlaceResult,
  type: string,
  useShortName = false,
): string {
  const match = place.address_components?.find((c) => c.types.includes(type));
  if (!match) return "";
  return useShortName ? match.short_name : match.long_name;
}

export function parseGooglePlace(
  place: google.maps.places.PlaceResult,
): ParsedPlace | null {
  const lat = place.geometry?.location?.lat();
  const lng = place.geometry?.location?.lng();
  if (lat === undefined || lng === undefined) return null;

  const city =
    component(place, "locality") ||
    component(place, "postal_town") ||
    component(place, "administrative_area_level_2");
  const postalCode = component(place, "postal_code");

  return {
    formattedAddress: place.formatted_address ?? place.name ?? "",
    city,
    postalCode,
    lat,
    lng,
  };
}
