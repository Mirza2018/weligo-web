import { recentMessages } from "../../../assets/data/messages";
import { useI18n } from "../../../lib/i18n";
import { SectionCard } from "../../common/SectionCard";
import { UserAvatar } from "../../common/UserAvatar";
import { VerifiedBadge } from "../../common/VerifiedBadge";


export function RecentMessages() {
  const { t } = useI18n();
  return (
    <SectionCard
      title={t("overview.recentMessages")}
      action={
        <button className="text-sm font-medium text-primary hover:underline">
          {t("overview.viewAll")}
        </button>
      }
    >
      <ul className="flex flex-col gap-3">
        {recentMessages.map((m) => (
          <li
            key={m.id}
            className="flex items-center gap-3 rounded-xl px-1 py-1 transition hover:bg-muted-bg"
          >
            <UserAvatar name={m.sender} size={40} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate font-medium text-foreground">{m.sender}</p>
                {m.verified && <VerifiedBadge />}
              </div>
              <p className="truncate text-sm text-muted-foreground">{m.snippet}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-muted-foreground">{m.date}</span>
              {m.unread > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  {m.unread}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
