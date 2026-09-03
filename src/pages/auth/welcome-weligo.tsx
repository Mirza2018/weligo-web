// src/routes/auth/WelcomeToWeligo.tsx
import { ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useI18n } from "../../lib/i18n";
import { AuthLayout } from "../../components/authPage/AuthLayout";

export function WelcomeToWeligo() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const STEPS = [
    {
      number: "01",
      titleFallback: t("auth.welcomePage1"),
      descriptionFallback: t("auth.welcomePage1Desc"),
    },
    {
      number: "02",
      titleFallback: t("auth.welcomePage2"),
      descriptionFallback: t("auth.welcomePage2Desc"),
    },
    {
      number: "03",
      titleFallback: t("auth.welcomePage3"),
      descriptionFallback: t("auth.welcomePage3Desc"),
    },
  ];

  const handleStartBrowsing = () => {
    // The account is already created and logged in at this point (OTP
    // verified + profile completed), so this goes to the app, not back to
    // sign-in.
    navigate("/sign-in");
  };

  return (
    <AuthLayout
      title={t("auth.welcomePageA")}
      italic={t("auth.welcomePageB")}
      description={t("auth.welcomePageDesc")}
    >
      <div className="space-y-6">
        <div>
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className={`flex items-start gap-4 py-3.5 ${index !== STEPS.length - 1 ? "border-b border-input" : ""}`}
            >
              <span className="pt-0.5 font-serif text-lg font-bold text-primary">
                {step.number}
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {step?.titleFallback}
                </span>
                <span className="block text-sm text-muted-foreground">
                  {step?.descriptionFallback}
                </span>
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleStartBrowsing}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
        >
          {t("auth.welcomePageCta")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </AuthLayout>
  );
}
