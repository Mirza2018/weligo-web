// src/routes/auth/sign-up.tsx
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/authPage/AuthLayout";
import { AddressAutocompleteField } from "../../components/auth/AddressAutocompleteField";
import { useI18n } from "../../lib/i18n";
import { useUserRegisterMutation } from "../../redux/api/authApi";
import { setAccessToken } from "../../redux/slices/authSlice";

import { PasswordStrength } from "../../components/authPage/PasswordStrength";
import { Checkbox } from "@/components/ui/checkbox";
import type { GeoPoint } from "@/types/website";
import { saveSignupEmail } from "@/redux/lib/signupSession";

export function SignUp() {
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
    if (!location) {
      toast.error(
        "Please pick your address from the suggestions so we can save your location.",
        { id: toastId },
      );
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
      role: "family" as const,
      city,
      postalCode,
      address,
      location,
    };

    try {
      const res = await userRegister(payload).unwrap();

      // Temporary token for the OTP step - prepareHeaders already attaches
      // state.auth.accessToken to every request, so nothing else is needed
      // to authenticate the verify-otp/resend-otp calls. It gets replaced
      // with the real access token once OTP verification succeeds.
      dispatch(setAccessToken(res.data.createUserToken));
      saveSignupEmail(email);

      toast.success(res?.message || "OTP sent to your email", {
        id: toastId,
        duration: 2000,
      });

      navigate("/verify-family");
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
          <Field label={t("auth.firstName")} required>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t("auth.firstNamePh")}
              required
              className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
            />
          </Field>
          <Field label={t("auth.lastName")} required>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t("auth.lastNamePh")}
              required
              className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
            />
          </Field>
        </div>
        <Field label={t("auth.email")} hint={t("auth.emailHint")} required>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("auth.email") || "you@example.com"}
            required
            className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
          />
        </Field>
        <Field label={t("auth.password")} required>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder={t("auth.passwordPh")}
            required
            className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
          />
          <PasswordStrength password={pw} />
        </Field>

        <Field
          label={t("auth.address")}
          hint="Start typing and pick your address from the list - it fills in city and postal code below."
          required
        >
          <AddressAutocompleteField
            value={address}
            onChange={setAddress}
            placeholder={t("auth.addressPh")}
            className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
            onPlaceSelected={(place) => {
              setAddress(place.formattedAddress);
              setLocation({
                type: "Point",
                coordinates: [place.lng, place.lat],
              });

              // Google doesn't always return city/postal code (rural
              // addresses, some countries, etc). When it does, auto-fill;
              // when it doesn't - or when the user already typed something
              // in manually - leave it alone so we don't clobber their
              // input.
              if (place.city) {
                setCity((c) => c || place.city);
              }
              if (place.postalCode) {
                setPostalCode((p) => p || place.postalCode);
              }
            }}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label={t("auth.city")}
            hint="Filled automatically from your address, or enter it yourself."
            required
          >
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t("auth.cityPh")}
              required
              className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
            />
          </Field>
          <Field label={t("auth.postCode")} required>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder={t("auth.postCodePh")}
              required
              className="h-12 w-full rounded-lg border border-input px-4 text-sm outline-none focus:border-primary bg-white!"
            />
          </Field>
        </div>
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
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
