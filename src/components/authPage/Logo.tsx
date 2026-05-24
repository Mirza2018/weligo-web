import logo from "../../assets/logo.svg";
export function Logo({ variant = "default" }: { variant?: "default" | "light" }) {
  const text = variant === "light" ? "text-white" : "text-foreground";

  return (
    <div className="p-2">
      {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <defs>
          <linearGradient id="wg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path
          d="M4 8 L10 24 L16 12 L22 24 L28 8"
          stroke="url(#wg)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="16" cy="6" r="2.5" fill="url(#wg)" />
      </svg>
      <span className={`font-serif text-xl font-semibold ${text}`}>Weligo</span> */}
      <img src={logo} alt="Weligo" className="" />
    </div>
  );
}
