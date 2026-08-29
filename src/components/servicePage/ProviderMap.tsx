// src/components/providers/ProviderMap.tsx
import { useMemo, useState } from "react";
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useNavigate, useParams } from "react-router-dom";
import { useGoogleMaps } from "@/lib/googleMaps";
import { Skeleton } from "@/components/ui/skeleton";
import type { Provider } from "@/types/website";
import { getImageUrl } from "@/redux/getBaseUrl";

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

  const getMarkerIcon = (isActive: boolean) => ({
    url: "/marker-logo.png",
    scaledSize: new google.maps.Size(isActive ? 48 : 40, isActive ? 48 : 40),
    anchor: new google.maps.Point(isActive ? 24 : 20, isActive ? 24 : 20),
  });

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
          icon={getMarkerIcon(activeProviderId === provider._id)}
        >
          {openId === provider._id && (
            <InfoWindowF
              onCloseClick={() => setOpenId(null)}
              options={{
                pixelOffset: new google.maps.Size(0, -8),
              }}
            >
              <div
                className="min-w-[240px] cursor-pointer overflow-hidden rounded-xl bg-white"
                onClick={() =>
                  router(`/services/${serviceId}/providers/${provider._id}`)
                }
              >
                <div className="flex items-center gap-3 p-3">
                  {/* Profile Image */}
                  <div className="relative shrink-0">
                    <img
                      src={getImageUrl(provider.profileImage)}
                      alt={provider.fullName}
                      className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md"
                    />

                    {/* Online/status indicator */}
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
                  </div>

                  {/* Provider Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-900">
                      {provider.fullName}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">
                      {/* Rating */}
                      <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">
                        <span>★</span>
                        {provider.averageRating?.toFixed(1) ?? "0.0"}
                      </span>

                      {/* Hourly Rate */}
                      <span className="text-xs font-medium text-gray-500">
                        {provider.hourlyRate} / hr
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom action */}
                <div className="border-t bg-gray-50 px-3 py-2 text-center">
                  <span className="text-xs font-medium text-purple-600">
                    View provider details →
                  </span>
                </div>
              </div>
            </InfoWindowF>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
}
