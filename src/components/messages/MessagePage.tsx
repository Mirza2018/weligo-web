import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";
// import { ChatList } from "./components/ChatList";
// import { ChatWindow } from "./components/ChatWindow";

export interface SelectedChatMeta {
  chatId: string;
  otherUser: {
    _id: string;
    name: string;
    profileImage?: string;
  };
}

const MessagePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlChatId = searchParams.get("chatId") ?? undefined;
  const [selectedChat, setSelectedChat] = useState<SelectedChatMeta | null>(
    null,
  );

  const handleSelectChat = useCallback(
    (chat: SelectedChatMeta) => {
      setSelectedChat(chat);
      setSearchParams({ chatId: chat.chatId });
    },
    [setSearchParams],
  );

  const handleBack = useCallback(() => {
    setSelectedChat(null);
    const next = new URLSearchParams(searchParams);
    next.delete("chatId");
    setSearchParams(next);
  }, [searchParams, setSearchParams]);

  const activeChatId = selectedChat?.chatId ?? urlChatId;

  return (
    <div className="flex h-[calc(100vh-6rem)] overflow-hidden rounded-2xl border border-border bg-card">
      <aside
        className={`w-full shrink-0 border-r border-border md:w-[320px] ${
          activeChatId ? "hidden md:block" : "block"
        }`}
      >
        <ChatList
          selectedChatId={activeChatId}
          onSelectChat={handleSelectChat}
        />
      </aside>

      <section
        className={`flex-1 ${activeChatId ? "block" : "hidden md:block"}`}
      >
        {activeChatId ? (
          <ChatWindow
            chatId={activeChatId}
            otherUser={selectedChat?.otherUser}
            onBack={handleBack}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <MessageSquare className="h-10 w-10" strokeWidth={1.5} />
            <p className="text-sm">Pick a conversation to start messaging</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MessagePage;
