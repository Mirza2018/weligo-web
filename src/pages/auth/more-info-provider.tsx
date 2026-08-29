// src/routes/auth/provider/MoreInfoProvider.tsx
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

// import { useI18n } from "../../../lib/i18n";
// import { AuthLayout } from "../../../components/authPage/AuthLayout";
import { useUserUpdateProviderProfileMutation } from "@/redux/api/authApi";
// import { setUserInfo } from "../../../redux/slices/authSlice";
import { useProviderOnboarding } from "@/context/ProviderOnboardingContext";
import { setUserInfo } from "@/redux/slices/authSlice";
import { AuthLayout } from "@/components/authPage/AuthLayout";
import { useI18n } from "@/lib/i18n";

const REFERRAL_OPTIONS = [
  { value: "google-search", labelFallback: "Google search" },
  { value: "social-media", labelFallback: "Social media" },
  { value: "friend-family", labelFallback: "Friend or family" },
  { value: "ad", labelFallback: "Online ad" },
  { value: "other", labelFallback: "Other" },
];

export function MoreInfoProvider() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useI18n();
  const { state, update, reset } = useProviderOnboarding();
  const [updateProfile, { isLoading }] = useUserUpdateProviderProfileMutation();

  const [phone, setPhone] = useState(state.phone);
  const [referral, setReferral] = useState(state.referralSource);
  const [shortBioTitle, setShortBioTitle] = useState(state.shortBioTitle);
  const [shortBio, setShortBio] = useState(state.shortBio);
  const [longBioTitle, setLongBioTitle] = useState(state.longBioTitle);
  const [longBio, setLongBio] = useState(state.longBio);

  const handleBack = () => {
    update({
      phone,
      referralSource: referral,
      shortBioTitle,
      shortBio,
      longBioTitle,
      longBio,
    });
    navigate(-1);
  };

  const handleContinue = async () => {
    if (!phone.trim()) {
      toast.error(t("auth.phoneRequired") ?? "Please enter your phone number.");
      return;
    }

    if (!state.categoryId) {
      toast.error("Please go back and select the service you provide.");
      navigate("/service-selection");
      return;
    }

    const toastId = toast.loading("Please wait...");

    try {
      const formData = new FormData();

      // Avatar image
      if (state.avatarFile) {
        formData.append("image", state.avatarFile);
      }

      // Certificate files
      state.certificates.forEach((certificate) => {
        if (certificate.file) {
          formData.append("certificateFiles", certificate.file);
        }
      });

      // All other data goes inside "data"
      const data = {
        phone,
        referralSource: referral,
        dateOfBirth: state.dob || undefined,
        categoryId: state.categoryId,
        hourlyRate: state.hourlyRate,
        experience: state.experience,
        lenguages: state.languages,
        shortBioTitle,
        shortBio,
        longBioTitle,
        longBio,
        preferences: state.preferences,
        certificates: state.certificates.map((c) => ({
          type: c.type,
          description: c.description,
        })),
      };

      formData.append("data", JSON.stringify(data));

      const res = await updateProfile(formData).unwrap();

      dispatch(setUserInfo(res.data));
      reset();

      toast.success(res?.message || t("auth.infoSaved") || "Profile saved", {
        id: toastId,
        duration: 2000,
      });

      navigate("/welcome-weligo-provider");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 3000,
      });
    }
  };
  return (
    <AuthLayout title={t("auth.moreInfoA")} italic={t("auth.moreInfoB")}>
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {t("auth.phone")}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t("auth.phonePh")}
            className="h-12 w-full rounded-lg border border-input bg-white px-4 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {t("auth.howHearUs")}
          </label>
          <div className="relative">
            <select
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-input bg-white px-4 pr-10 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="" disabled>
                {t("auth.select")}
              </option>
              {REFERRAL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t(`auth.referral.${opt.value}`) ?? opt.labelFallback}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Short bio title
          </label>
          <input
            value={shortBioTitle}
            onChange={(e) => setShortBioTitle(e.target.value)}
            placeholder="e.g. Loving and experienced child caretaker."
            className="h-12 w-full rounded-lg border border-input bg-white px-4 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Short bio
          </label>
          <textarea
            value={shortBio}
            onChange={(e) => setShortBio(e.target.value.slice(0, 300))}
            rows={3}
            placeholder="A couple of sentences families see first."
            className="w-full resize-none rounded-lg border border-input bg-white px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Full bio title
          </label>
          <input
            value={longBioTitle}
            onChange={(e) => setLongBioTitle(e.target.value)}
            placeholder="e.g. Six years caring for the kids of Zürich."
            className="h-12 w-full rounded-lg border border-input bg-white px-4 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Full bio
          </label>
          <textarea
            value={longBio}
            onChange={(e) => setLongBio(e.target.value.slice(0, 1000))}
            rows={5}
            placeholder="Tell families more about your experience and approach."
            className="w-full resize-none rounded-lg border border-input bg-white px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleBack}
            disabled={isLoading}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary/10 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("auth.back")}
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={isLoading}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {isLoading ? "Saving…" : t("auth.continue")}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
