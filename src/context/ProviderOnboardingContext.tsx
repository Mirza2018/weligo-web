
// src/context/ProviderOnboardingContext.tsx
import { createContext, useContext, useMemo, useState } from "react";
import type { ProviderPreferencesPayload } from "@/types/auth";

export interface OnboardingCertificate {
  id: string;
  file: File;
  type: string;
  description: string;
}

export interface ProviderOnboardingState {
  categoryId: string | null;
  categoryName: string | null;
  hourlyRate: number;
  experience: number;
  languages: string[];
  avatarFile: File | null;
  dob: string; // "YYYY-MM-DD"
  preferences: ProviderPreferencesPayload;
  certificates: OnboardingCertificate[];
  phone: string;
  referralSource: string;
  shortBioTitle: string;
  shortBio: string;
  longBioTitle: string;
  longBio: string;
}

const DEFAULT_STATE: ProviderOnboardingState = {
  categoryId: null,
  categoryName: null,
  hourlyRate: 30,
  experience: 1,
  languages: [],
  avatarFile: null,
  dob: "",
  preferences: {
    nonSmoker: false,
    driverLicense: false,
    ownVehicle: false,
    comfortableWithPets: false,
    hasChildren: false,
  },
  certificates: [],
  phone: "",
  referralSource: "",
  shortBioTitle: "",
  shortBio: "",
  longBioTitle: "",
  longBio: "",
};

interface ProviderOnboardingContextValue {
  state: ProviderOnboardingState;
  update: (patch: Partial<ProviderOnboardingState>) => void;
  reset: () => void;
}

const ProviderOnboardingContext = createContext<ProviderOnboardingContextValue | null>(null);

export function ProviderOnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProviderOnboardingState>(DEFAULT_STATE);

  const value = useMemo<ProviderOnboardingContextValue>(
    () => ({
      state,
      update: (patch) => setState((s) => ({ ...s, ...patch })),
      reset: () => setState(DEFAULT_STATE),
    }),
    [state]
  );

  return <ProviderOnboardingContext.Provider value={value}>{children}</ProviderOnboardingContext.Provider>;
}

export function useProviderOnboarding() {
  const ctx = useContext(ProviderOnboardingContext);
  if (!ctx) {
    throw new Error("useProviderOnboarding must be used within <ProviderOnboardingProvider>");
  }
  return ctx;
}