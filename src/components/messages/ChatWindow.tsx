// NOTE: adjust the messageApi import path to match your project.
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ArrowLeft, Phone, Video } from "lucide-react";
import { useGetSingleChatQuery } from "@/redux/api/messageApi";
import { getImageUrl } from "@/redux/getBaseUrl";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useChatSocket, type IncomingMessage } from "@/hooks/useChatSocket";
import { selectIsUserOnline } from "@/redux/features/socket/socketSlice";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageBubble, type ChatMessage } from "./MessageBubble";
import { ChatComposer } from "./ChatComposer";
import { useCall } from "../providers/CallProvider";

interface ChatWindowProps {
  chatId: string;
  otherUser?: { _id: string; name: string; profileImage?: string };
  onBack: () => void;
}

export const ChatWindow = ({ chatId, otherUser, onBack }: ChatWindowProps) => {
  const currentUser = useCurrentUser();
  const { data, isFetching } = useGetSingleChatQuery(chatId);
  const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isOnline = useSelector(selectIsUserOnline(otherUser?._id));
  const { startCall } = useCall();

  const fetchedMessages: ChatMessage[] = useMemo(() => {
    const raw = data?.data?.data ?? [];
    // API returns newest-first (sort=-created) — flip to chronological.
    return [...raw].reverse().map((m: any) => ({
      id: m._id,
      text: m.text,
      images: m.images ?? [],
      senderId: m.sender?._id,
      senderName: m.sender?.fullName,
      createdAt: m.createdAt,
    }));
  }, [data]);



  // Reset the live buffer whenever the open chat changes.
  useEffect(() => {
    setLiveMessages([]);
  }, [chatId]);

  const handleIncoming = (payload: IncomingMessage) => {
    if (payload.chatId !== chatId) return;
    setLiveMessages((prev) => [
      ...prev,
      {
        id: `${payload.chatId}-${prev.length}-${Date.now()}`,
        text: payload.text,
        images: payload.images ?? [],
        senderId: payload.sender._id,
        senderName: payload.sender.name,
        createdAt: payload.time ?? new Date().toISOString(),
      },
    ]);
  };

  const { isOtherTyping, sendMessage, emitTyping, emitStopTyping } = useChatSocket({
    chatId,
    onNewMessage: handleIncoming,
  });

  const messages = [...fetchedMessages, ...liveMessages];

  const headerName =
    otherUser?.name ??
    messages.find((m) => m.senderId !== currentUser?.userId)?.senderName ??
    "Conversation";


  
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isOtherTyping]);

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarImage src={getImageUrl(otherUser?.profileImage) ?? undefined} />
          <AvatarFallback>{headerName[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{headerName}</p>
          <p className="text-xs text-muted-foreground">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>

        {otherUser && (
          <div className="flex shrink-0 gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => startCall(otherUser, "audio")}
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => startCall(otherUser, "video")}
            >
              <Video className="h-4 w-4" />
            </Button>
          </div>
        )}
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
        {isFetching && messages.length === 0 ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`h-10 w-2/3 animate-pulse rounded-2xl bg-muted ${
                  i % 2 ? "ml-auto" : ""
                }`}
              />
            ))}
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isMine={message.senderId === currentUser?.userId}
            />
          ))
        )}

        {isOtherTyping && (
          <p className="text-xs italic text-muted-foreground">{headerName} is typing…</p>
        )}
        <div ref={bottomRef} />
      </div>

      <ChatComposer onSend={sendMessage} onTyping={emitTyping} onStopTyping={emitStopTyping} />
    </div>
  );
};