// src/components/providers/ProviderMap.tsx
import { useMemo, useState } from "react";
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useNavigate, useParams } from "react-router-dom";
import { useGoogleMaps } from "@/lib/googleMaps";
import { Skeleton } from "@/components/ui/skeleton";
import type { Provider } from "@/types/website";

interface ProviderMapProps {
  providers: Provider[];
  center: { lat: number; lng: number };
  activeProviderId: string | null;
  onMarkerHover?: (id: string | null) => void;
}

const containerStyle = { width: "100%", height: "100%" };

const MAP_OPTIONS: google.maps.MapOptions = {
  disableDefaultUI: false,
  clickableIcons: false,
  gestureHandling: "greedy", // fully movable/draggable, including on mobile
  zoomControl: true,
  streetViewControl: false,
  fullscreenControl: false,
};

export function ProviderMap({
  providers,
  center,
  activeProviderId,
  onMarkerHover,
}: ProviderMapProps) {
  const { isLoaded, loadError } = useGoogleMaps();
  const router = useNavigate();
  const { serviceId } = useParams();
  const [openId, setOpenId] = useState<string | null>(null);

  const markers = useMemo(
    () =>
      providers
        .filter((p) => p.location?.coordinates?.length === 2)
        .map((p) => ({
          provider: p,
          position: {
            lat: p.location.coordinates[1],
            lng: p.location.coordinates[0],
          },
        })),
    [providers],
  );

  if (loadError) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-s-3xl bg-muted text-sm text-muted-foreground">
        Couldn&apos;t load the map.
      </div>
    );
  }

  if (!isLoaded) {
    return <Skeleton className="h-full w-full rounded-s-3xl" />;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      mapContainerClassName="rounded-s-3xl"
      center={center}
      zoom={13}
      options={MAP_OPTIONS}
    >
      {markers.map(({ provider, position }) => (
        <MarkerF
          key={provider._id}
          position={position}
          onMouseOver={() => onMarkerHover?.(provider._id)}
          onMouseOut={() => onMarkerHover?.(null)}
          onClick={() => setOpenId(provider._id)}
          icon={
            activeProviderId === provider._id
              ? {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: "#D97757",
                  fillOpacity: 1,
                  strokeColor: "#ffffff",
                  strokeWeight: 2,
                }
              : undefined
          }
        >
          {openId === provider._id && (
            <InfoWindowF onCloseClick={() => setOpenId(null)}>
              <div
                className="cursor-pointer p-1"
                onClick={() =>
                  router(`/services/${serviceId}/providers/${provider._id}`)
                }
              >
                <p className="font-semibold">{provider.fullName}</p>
                <p className="text-xs text-muted-foreground">
                  {provider.hourlyRate} / hr &middot;{" "}
                  {provider.averageRating.toFixed(1)}★
                </p>
              </div>
            </InfoWindowF>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
}
