import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useI18n } from "../../lib/i18n";
import { AuthLayout } from "../../components/authPage/AuthLayout";

const REFERRAL_OPTIONS = [
  { value: "google-search", labelFallback: "Google search" },
  { value: "social-media", labelFallback: "Social media" },
  { value: "friend-family", labelFallback: "Friend or family" },
  { value: "ad", labelFallback: "Online ad" },
  { value: "other", labelFallback: "Other" },
];

export function MoreInfo() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const [phone, setPhone] = useState("");
  const [referral, setReferral] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = async () => {
    if (!phone.trim()) {
      toast.error(t("auth.phoneRequired") ?? "Please enter your phone number.");
      return;
    }

    const formData = {
      phone,
      referral,
    };

    console.log("More Info form data:", formData);

 navigate("/welcome-weligo");
    return;

    setSubmitting(true);
    const toastId = toast.loading("Please wait...");
    try {
      // TODO: replace console.log above with actual persistence call
      toast.success(t("auth.infoSaved") ?? "Info saved", {
        id: toastId,
        duration: 2000,
      });
      navigate("/");
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
          <p className="mt-1.5 text-xs text-muted-foreground">
            {t("auth.phoneDetails")}
          </p>
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
            <svg
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
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
            {t("auth.continue")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
