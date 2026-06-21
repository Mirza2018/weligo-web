
import { Menu, X } from "lucide-react";
import { useState } from "react";
// import { LanguageSwitcher } from "@/components/dashboard/LanguageSwitcher";
import { useI18n } from "../../lib/i18n";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";


type NavKey = "home" | "services" | "forFamilies" | "forProviders" | "howItWorks" | "aboutUs";

const LINKS: { key: NavKey; to: string }[] = [
  { key: "home", to: "/" },
  { key: "services", to: "/services" },
  { key: "forFamilies", to: "/for-families" },
  { key: "forProviders", to: "/for-providers" },
  { key: "howItWorks", to: "/how-it-works" },
  { key: "aboutUs", to: "/about" },
];

export function SiteHeader({ active }: { active?: NavKey }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">W</span>
          <span>Weligo</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.key}
              to={l.to as any}
              className={cn(
                "transition hover:text-foreground",
                active === l.key && "font-medium text-primary",
              )}
            >
              {t(`purchase.nav.${l.key}`)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* <LanguageSwitcher /> */}
          <button className="hidden h-9 rounded-full border border-primary/40 px-4 text-sm font-medium text-primary hover:bg-primary/5 sm:inline-flex sm:items-center">
            {t("purchase.nav.login")}
          </button>
          <button className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">
            {t("purchase.nav.signup")}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-border lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-card lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm">
            {LINKS.map((l) => (
              <Link
                key={l.key}
                to={l.to as any}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                  active === l.key && "bg-primary/10 font-medium text-primary",
                )}
              >
                {t(`purchase.nav.${l.key}`)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
