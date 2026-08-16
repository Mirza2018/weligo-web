import { ArrowRight, ChevronRight, User } from "lucide-react";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useI18n } from "../../lib/i18n";
import { AuthLayout } from "../../components/authPage/AuthLayout";

type Role = "family" | "provider";

export function ChooseRole() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [role, setRole] = useState<Role>("family");

  const handleContinue = () => {
    if (role === "family") {
      navigate("/sign-up-family");
    } else {
      navigate("/sign-up-provider");
    }
  };

  return (
    <AuthLayout
      title={t("auth.chooseA")}
      italic={t("auth.chooseB")}
      description={t("auth.chooseDesc")}
    >
      <div className="space-y-5">
        <div className="space-y-3">
          <RoleOption
            icon={<User className="h-5 w-5" />}
            title={t("auth.chooseOptionA")}
            description={t("auth.chooseOptionADesc")}
            selected={role === "family"}
            onSelect={() => setRole("family")}
          />
          <RoleOption
            icon={<User className="h-5 w-5" />}
            title={t("auth.chooseOptionB")}
            description={t("auth.chooseOptionBDesc")}
            selected={role === "provider"}
            onSelect={() => setRole("provider")}
          />
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
        >
          {t("auth.continue") ?? "Continue"} <ArrowRight className="h-4 w-4" />
        </button>

        <p className="text-center text-sm text-muted-foreground">
          {t("auth.alreday")}
          <Link
            to="/sign-in"
            className="font-medium text-primary hover:underline"
          >
            {t("auth.login")}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

function RoleOption({
  icon,
  title,
  description,
  selected,
  onSelect,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-center justify-between rounded-xl border px-4 py-4 text-left transition-colors ${
        selected
          ? "border-primary bg-primary/10"
          : "border-input bg-muted/40 hover:bg-muted/60"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            selected
              ? "bg-primary/15 text-primary"
              : "bg-background text-primary"
          }`}
        >
          {icon}
        </span>
        <span>
          <span className="block text-sm font-semibold text-foreground">
            {title}
          </span>
          <span className="block text-sm text-muted-foreground">
            {description}
          </span>
        </span>
      </div>

      {selected ? (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      ) : (
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      )}
    </button>
  );
}
