import { ArrowLeft, ArrowRight, Calendar, Plus, User } from "lucide-react";
import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useI18n } from "../../lib/i18n";
import { AuthLayout } from "../../components/authPage/AuthLayout";
import { Switch } from "@/components/ui/switch";

type ToggleKey =
  | "nonSmoker"
  | "driversLicense"
  | "ownVehicle"
  | "hasChildren"
  | "comfortableWithPets";

const MAX_AVATAR_MB = 10;

export function AboutYou() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const TOGGLES: { key: ToggleKey; labelFallback: string }[] = [
    { key: "nonSmoker", labelFallback: t("auth.about1") },
    { key: "driversLicense", labelFallback: t("auth.about2") },
    { key: "ownVehicle", labelFallback: t("auth.about3") },
    { key: "hasChildren", labelFallback: t("auth.about4") },
    { key: "comfortableWithPets", labelFallback: t("auth.about5") },
  ];
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [dob, setDob] = useState("");
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    nonSmoker: true,
    driversLicense: true,
    ownVehicle: true,
    hasChildren: false,
    comfortableWithPets: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleDateBoxClick = () => {
    const input = dateInputRef.current;
    if (!input) return;
    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.focus();
    }
  };

  const handleAvatarSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_AVATAR_MB) {
      toast.error(`Photo must be under ${MAX_AVATAR_MB}MB`);
      return;
    }

    setAvatarFile(file);
    setAvatarUrl(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleToggle = (key: ToggleKey, value: boolean) => {
    setToggles((prev) => ({ ...prev, [key]: value }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = async () => {

    navigate("/more-info-provider");
    if (!dob) {
      toast.error(
        t("provider.dobRequired") ?? "Please enter your date of birth.",
      );
      return;
    }

    const formData = {
      avatarFile,
      avatarFileName: avatarFile?.name ?? null,
      dob,
      ...toggles,
    };


    console.log("About You form data:", formData);

    setSubmitting(true);
    const toastId = toast.loading("Please wait...");
    try {
      // TODO: replace console.log above with actual persistence call
      toast.success(t("provider.profileSaved") ?? "Profile saved", {
        id: toastId,
        duration: 2000,
      });
      navigate("/onboarding/certificates");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title={
        <>
          {t("auth.aboutA")}
          {/* <span className="font-serif italic text-primary">
            {t("provider.tellFamiliesB") ?? "families"}
          </span>{" "}
          {t("provider.tellFamiliesC") ?? "about you."} */}
        </>
      }
      description={t("auth.aboutDesc")}
    >
      <div className="space-y-5">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarSelected}
          className="hidden"
        />
        <div className="relative inline-block">
          <button
            type="button"
            onClick={handleAvatarClick}
            aria-label="Upload profile photo"
            className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-input bg-white text-muted-foreground"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-8 w-8" />
            )}
          </button>
          <button
            type="button"
            onClick={handleAvatarClick}
            aria-label="Add profile photo"
            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={3} />
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {t("auth.dob")}
          </label>
          <div
            role="button"
            tabIndex={0}
            onClick={handleDateBoxClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleDateBoxClick();
              }
            }}
            className="relative flex h-12 w-full cursor-pointer items-center rounded-lg border border-input bg-white px-4 pr-10 text-sm outline-none focus-within:border-primary"
          >
            <input
              ref={dateInputRef}
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="h-full w-full cursor-pointer border-none bg-transparent p-0 text-sm text-foreground outline-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
            />
            <Calendar className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-1">
          {TOGGLES.map(({ key, labelFallback }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <label
                htmlFor={`toggle-${key}`}
                className="cursor-pointer text-sm font-medium text-foreground"
              >
                {labelFallback}
              </label>
              <Switch
                id={`toggle-${key}`}
                checked={toggles[key]}
                onCheckedChange={(value) => handleToggle(key, value)}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary/10 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("auth.back")}
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={submitting}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {t("auth.continue") ?? "Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
