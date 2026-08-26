// NOTE: adjust these two import paths to wherever messageApi.ts and
// tagTypes.ts actually live in your project.
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetChatListQuery, messageApi } from "@/redux/api/messageApi";
import { tagTypes } from "@/redux/tagTypes";
import { getImageUrl } from "@/redux/getBaseUrl";
import { useSocket } from "@/hooks/useSocket";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { selectIsUserOnline } from "@/redux/features/socket/socketSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { SelectedChatMeta } from "./MessagePage";
// import type { SelectedChatMeta } from "../MessagePage";

interface ChatListProps {
  selectedChatId?: string;
  onSelectChat: (chat: SelectedChatMeta) => void;
}

const formatTime = (iso?: string) => {
  if (!iso) return "";
  const date = new Date(iso);
  const isToday = date.toDateString() === new Date().toDateString();
  return isToday
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString([], { month: "short", day: "numeric" });
};

export const ChatList = ({ selectedChatId, onSelectChat }: ChatListProps) => {
  const currentUser = useCurrentUser();
  const { data, isLoading } = useGetChatListQuery({});
  const socket = useSocket();
  const dispatch = useDispatch();
  const hydratedRef = useRef(false);

  const chats = data?.data ?? [];

  // Keep the preview list fresh even for chats that aren't open.
  useEffect(() => {
    if (!socket) return;
    const refresh = () =>
      dispatch(messageApi.util.invalidateTags([tagTypes.chat]));
    socket.on("newMessage", refresh);
    return () => {
      socket.off("newMessage", refresh);
    };
  }, [socket, dispatch]);

  // Arrived via a direct link (?chatId=...) — hydrate the parent with
  // the matching chat's other-user info once the list has loaded.
  useEffect(() => {
    if (hydratedRef.current || !selectedChatId || !currentUser) return;
    const match = chats.find((c: any) => c.chat._id === selectedChatId);
    if (match) {
      const otherUser = match.chat.users.find(
        (u: any) => u._id !== currentUser.userId,
      );
      if (otherUser) {
        hydratedRef.current = true;
        onSelectChat({ chatId: match.chat._id, otherUser });
      }
    }
  }, [chats, selectedChatId, currentUser, onSelectChat]);

  if (isLoading) {
    return (
      <div className="space-y-3 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
        No conversations yet. Start one from any profile.
      </div>
    );
  }


  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {chats.map((item: any) => {
        const otherUser =
          item.chat.users.find((u: any) => u._id !== currentUser?.userId) ??
          item.chat.users[0];
        const isActive = item.chat._id === selectedChatId;
        const isMine = item.lastMessageSender === currentUser?.userId;
        return (
          <button
            key={item.chat._id}
            onClick={() => onSelectChat({ chatId: item.chat._id, otherUser })}
            className={`flex items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-accent ${
              isActive ? "bg-accent" : ""
            }`}
          >
            <div className="relative">
              <Avatar className="h-11 w-11">
                <AvatarImage
                  src={getImageUrl(otherUser?.profileImage) ?? undefined}
                />
                <AvatarFallback>
                  {otherUser?.fullName?.[0] ?? "?"}
                </AvatarFallback>
              </Avatar>
              <OnlineDot userId={otherUser?._id} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-foreground">
                  {otherUser?.fullName ?? "Unknown"}
                </p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatTime(item.lastMessageCreatedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs text-muted-foreground">
                  {isMine ? "You: " : ""}
                  {item.lastMessage || "Say hello 👋"}
                </p>
                {item.unreadMessageCount > 0 && (
                  <Badge className="h-5 min-w-5 shrink-0 justify-center rounded-full px-1.5">
                    {item.unreadMessageCount}
                  </Badge>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

const OnlineDot = ({ userId }: { userId?: string }) => {
  const isOnline = useSelector(selectIsUserOnline(userId));
  if (!isOnline) return null;
  return (
    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
  );
};
