// src/lib/googleMaps.tsx
//
// Wrap your app (once, near the root - e.g. in App.tsx) with
// <GoogleMapsProvider> so the Google Maps script is only ever loaded once.
// Then use `useGoogleMaps()` anywhere you need to know whether it's ready
// (e.g. before rendering <Autocomplete> or <GoogleMap>).
//
// npm install @react-google-maps/api

import React, { createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { googleApiKey } from "@/redux/getBaseUrl";

const LIBRARIES: "places"[] = ["places"];

interface GoogleMapsContextValue {
  isLoaded: boolean;
  loadError: Error | undefined;
}

const GoogleMapsContext = createContext<GoogleMapsContextValue>({
  isLoaded: false,
  loadError: undefined,
});

export function GoogleMapsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "weligo-google-maps-script",
    googleMapsApiKey: googleApiKey(),
    libraries: LIBRARIES,
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

export function useGoogleMaps() {
  return useContext(GoogleMapsContext);
}
