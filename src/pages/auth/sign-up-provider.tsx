// src/routes/auth/sign-up-provider.tsx
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/authPage/AuthLayout";
import { AddressAutocompleteField } from "../../components/auth/AddressAutocompleteField";
import { useI18n } from "../../lib/i18n";
import { useUserRegisterMutation } from "../../redux/api/authApi";
import { setAccessToken } from "../../redux/slices/authSlice";
// import { saveSignupEmail } from "../../lib/signupSession";
import { PasswordStrength } from "../../components/authPage/PasswordStrength";
import { Checkbox } from "@/components/ui/checkbox";
import type { GeoPoint } from "@/types/website";
import { saveSignupEmail } from "@/redux/lib/signupSession";

export function SignUpProvider() {
  const { t } = useI18n();
  const [userRegister, { isLoading }] = useUserRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<GeoPoint | null>(null);
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");

    if (
      !firstName ||
      !lastName ||
      !email ||
      !pw ||
      !city ||
      !address ||
      !postalCode
    ) {
      toast.error("Please fill in all fields.", { id: toastId });
      return;
    }
    if (!agree) {
      toast.error(
        t("auth.mustAgree") ?? "Please accept the terms to continue.",
        { id: toastId },
      );
      return;
    }

    const payload = {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`.trim(),
      email,
      password: pw,
      role: "provider" as const,
      city,
      postalCode,
      address,
      location: location ?? {
        type: "Point" as const,
        coordinates: [0, 0] as [number, number],
      },
    };

    try {
      const res = await userRegister(payload).unwrap();

      // Temporary token so the OTP step (and the rest of onboarding) can
      // authenticate - prepareHeaders attaches state.auth.accessToken
      // automatically. It gets replaced with the real token once OTP
      // verification succeeds.
      dispatch(setAccessToken(res.data.createUserToken));
      saveSignupEmail(email);

      toast.success(res?.message || "OTP sent to your email", {
        id: toastId,
        duration: 2000,
      });

      navigate("/verify-provider");
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <AuthLayout
      title={t("auth.signUpA")}
      italic={t("auth.signUpB")}
      description={t("auth.signUpDesc")}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Field label={t("auth.firstName")}>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t("auth.firstNamePh")}
              className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
            />
          </Field>
          <Field label={t("auth.lastName")}>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t("auth.lastNamePh")}
              className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
            />
          </Field>
        </div>
        <Field label={t("auth.email")} hint={t("auth.emailHint")}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("auth.email") || "you@example.com"}
            className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
          />
        </Field>
        <Field label={t("auth.password")}>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder={t("auth.passwordPh")}
            className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
          />
          <PasswordStrength password={pw} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label={t("auth.city")}>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-12 w-full appearance-none rounded-lg border border-input bg-white! px-4 pr-10 text-sm outline-none focus:border-primary"
              >
                <option value="">{t("auth.cityPh")}</option>
                <option value="Zürich">Zürich</option>
                <option value="Genève">Genève</option>
                <option value="Basel">Basel</option>
                <option value="Bern">Bern</option>
                <option value="Lausanne">Lausanne</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </Field>
          <Field label={t("auth.postCode")}>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder={t("auth.postCodePh")}
              className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
            />
          </Field>
        </div>
        <Field
          label={t("auth.address")}
          hint="Start typing and pick your address from the list."
        >
          <AddressAutocompleteField
            value={address}
            onChange={setAddress}
            placeholder={t("auth.addressPh")}
            className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
            onPlaceSelected={(place) => {
              setAddress(place.formattedAddress);
              if (place.city) setCity((c) => c || place.city);
              if (place.postalCode) setPostalCode((p) => p || place.postalCode);
              setLocation({
                type: "Point",
                coordinates: [place.lng, place.lat],
              });
            }}
          />
        </Field>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Checkbox checked={agree} onCheckedChange={(v) => setAgree(!!v)} />
          {t("auth.agree")}
          <Link
            to="/terms"
            className="font-medium text-primary hover:underline"
          >
            {t("auth.terms")}
          </Link>
          {t("auth.and")}
          <Link
            to="/policy"
            className="font-medium text-primary hover:underline"
          >
            {t("auth.privacy")}
          </Link>
        </p>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-70"
        >
          {isLoading ? "Registering..." : t("auth.continue")}{" "}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </button>

        <p className="text-center font-medium">
          {t("auth.hasAccount")}{" "}
          <Link
            to="/sign-in"
            className="font-bold text-primary hover:underline"
          >
            {t("auth.login")}
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
