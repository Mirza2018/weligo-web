
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";
import { useI18n } from "../../lib/i18n";

export function ComingSoon() {
  const { t } = useI18n();
  return (
    <section className="bg-muted-bg">
      <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 py-24 text-center fade-up">
        <h1 className="text-5xl leading-tight tracking-tight sm:text-7xl font-bold">
          {t("common.comingSoon")}
          <br />
          <span className="font-serif-italic">{t("common.stayTuned")}</span>
        </h1>
        <p className="mt-6 max-w-xl text-xl font-medium text-[#313233]">
          {t("common.comingSoonDesc")}
        </p>
        <Link
          to="/waitlist"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          {t("common.joinWaitlist")} <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> {t("common.backHome")}
        </Link>
      </div>
    </section>
  );
}
