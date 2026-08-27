import { Link } from "react-router-dom";
import { ImageIcon } from "lucide-react";

import { useI18n } from "../../../lib/i18n";
import { SectionCard } from "../../common/SectionCard";
import { UserAvatar } from "../../common/UserAvatar";
import { VerifiedBadge } from "../../common/VerifiedBadge";
import {
  formatMessageTimestamp,
  resolveImageUrl,
} from "../../../lib/overview-helpers";
import type { RecentMessage } from "../../../types/overview";

export function RecentMessages({
  messages,
  currentUserId,
}: {
  messages: RecentMessage[];
  currentUserId?: string;
}) {
  const { t } = useI18n();

  return (
    <SectionCard
      title={t("overview.recentMessages")}
      action={
        <Link
          to="/dashboard/family/messages"
          className="text-sm font-medium text-primary hover:underline"
        >
          {t("overview.viewAll")}
        </Link>
      }
    >
      {messages.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No messages yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {messages.map((m) => {
            // Show whichever side of the conversation isn't the current user.
            const contact =
              m.sender._id === currentUserId ? m.receiver : m.sender;
            const preview = m.text?.trim()
              ? m.text
              : m.images?.length
                ? "Sent a photo"
                : "";

            return (
              <li key={m._id}>
                <Link
                  to="/dashboard/family/messages"
                  className="flex items-center gap-3 rounded-xl px-1 py-1 transition hover:bg-muted-bg"
                >
                  <UserAvatar
                    name={contact.fullName}
                    imageUrl={resolveImageUrl(contact.profileImage)}
                    size={40}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate font-medium text-foreground">
                        {contact.fullName}
                      </p>
                      <VerifiedBadge />
                    </div>
                    <p className="flex items-center gap-1 truncate text-sm text-muted-foreground">
                      {!m.text?.trim() && m.images?.length > 0 && (
                        <ImageIcon className="h-3.5 w-3.5 shrink-0" />
                      )}
                      {preview}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatMessageTimestamp(m.createdAt)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}
