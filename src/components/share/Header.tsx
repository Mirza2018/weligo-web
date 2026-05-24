import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearAuth } from "../../redux/slices/authSlice";
import type { RootState } from "../../redux/store";
import AllImages from "../../assets/AllImages";
import { useI18n } from "../../lib/i18n";
import { LangSwitch } from "./LangSwitch";

export function Header() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isLogin = !!accessToken;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/");
  };
  const { t } = useI18n();
  const links: { to: string; key: string }[] = [
    { to: "/", key: "nav.home" },
    { to: "/services", key: "nav.services" },
    { to: "/for-families", key: "nav.families" },
    { to: "/for-providers", key: "nav.providers" },
    { to: "/how-it-works", key: "nav.how" },
    { to: "/about-us", key: "nav.about" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 ">
        <Link to="/" className="transition-opacity hover:opacity-75">
          {/* <Logo /> */}
          <img
            src={AllImages.logo}
            alt="Weligo"
            className="w-40 flex justify-center items-center"
          />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className=" font-bold text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
        {!isLogin ? (
          <div className="flex items-center gap-2">
            <LangSwitch />
            <Link
              to="/sign-in"
              className="hidden h-10 items-center justify-center rounded-lg border border-primary/30 px-4  font-medium text-bold transition-colors hover:bg-primary-muted sm:inline-flex text-primary bg-[#EDEFFF] hover:scale-[1.02]"
            >
              {t("nav.login")}
            </Link>
            <Link
              to="/sign-up"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              {t("nav.signup")}
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <LangSwitch />
            <p
              onClick={handleLogout}
              className="hidden cursor-pointer h-10 items-center justify-center rounded-lg border border-primary/30 px-4  font-bold transition-colors hover:bg-primary-muted sm:inline-flex text-primary bg-[#EDEFFF] hover:scale-[1.02]"
            >
              {t("nav.logout")}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
