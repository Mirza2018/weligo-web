import { Link } from "react-router-dom";
import { useI18n } from "../../lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-12 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 font-serif text-2xl font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/20">W</span>
            <span>Weligo</span>
          </div>
          <p className="mt-3 text-sm text-primary-foreground/80">{t("purchase.footer.tagline")}</p>
        </div>
        <FooterCol
          title={t("purchase.footer.platform")}
          links={[
            { label: t("purchase.footer.howItWorks"), to: "/how-it-works" },
            { label: t("purchase.footer.aboutUs"), to: "/about" },
            { label: t("purchase.footer.trust"), to: "/about" },
            { label: t("purchase.footer.contact"), to: "/about" },
          ]}
        />
        <FooterCol
          title={t("purchase.footer.families")}
          links={[
            { label: t("purchase.footer.forFamilies"), to: "/for-families" },
            { label: t("purchase.footer.findChildcare"), to: "/services" },
            { label: t("purchase.footer.findSenior"), to: "/services" },
          ]}
        />
        <FooterCol
          title={t("purchase.footer.providers")}
          links={[
            { label: t("purchase.footer.forProviders"), to: "/for-providers" },
            { label: t("purchase.footer.becomeCaregiver"), to: "/for-providers" },
            { label: t("purchase.footer.helpCenter"), to: "/about" },
          ]}
        />
        <FooterCol
          title={t("purchase.footer.legal")}
          links={[
            { label: t("purchase.footer.terms"), to: "/about" },
            { label: t("purchase.footer.privacy"), to: "/about" },
            { label: t("purchase.footer.cookies"), to: "/about" },
          ]}
        />
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-primary-foreground/80 lg:px-8">
          {t("purchase.footer.copyright")}
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to as any} className="hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
