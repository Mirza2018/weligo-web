// src/components/bookings/BookingMap.tsx
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useGoogleMaps } from "@/lib/googleMaps";

export function BookingMap({ lat, lng }: { lat: number; lng: number }) {
  const { isLoaded, loadError } = useGoogleMaps();

  if (loadError) {
    return (
      <div className="flex h-44 w-full items-center justify-center bg-muted text-xs text-muted-foreground">
        Couldn&apos;t load the map.
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="h-44 w-full animate-pulse bg-muted" />;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "176px" }}
      center={{ lat, lng }}
      zoom={14}
      options={{ disableDefaultUI: true, gestureHandling: "cooperative" }}
    >
      <MarkerF position={{ lat, lng }} />
    </GoogleMap>
  );
}
