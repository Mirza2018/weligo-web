import { useEffect, useCallback, useState } from "react";
import { useSocket } from "./useSocket";

export interface IncomingMessage {
  messageId?: string;
  success: boolean;
  chatId: string;
  sender: {
    _id: string;
    name: string;
    email?: string;
    role?: string;
  };
  text: string;
  images?: string[];
  time?: string;
}

interface UseChatSocketOptions {
  /** Currently open chat id, if any. */
  chatId?: string;
  /** Called for every newMessage event (filter by chatId yourself if needed). */
  onNewMessage?: (message: IncomingMessage) => void;
}

/**
 * Wire up a single open chat window: listens for newMessage /
 * typing / stopTyping, and exposes emitters for sending a message
 * and broadcasting typing state.
 */
export const useChatSocket = ({
  chatId,
  onNewMessage,
}: UseChatSocketOptions) => {
  const socket = useSocket();
  const [isOtherTyping, setIsOtherTyping] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (payload: IncomingMessage) => {
      onNewMessage?.(payload);
    };

    const handleTyping = (payload: { chatId: string }) => {
      if (payload.chatId === chatId) setIsOtherTyping(true);
    };

    const handleStopTyping = (payload: { chatId: string }) => {
      if (payload.chatId === chatId) setIsOtherTyping(false);
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [socket, chatId, onNewMessage]);

  // Reset the indicator whenever the open chat changes.
  useEffect(() => {
    setIsOtherTyping(false);
  }, [chatId]);

  const sendMessage = useCallback(
    (payload: { text: string; images?: string[] }) => {
      if (!socket || !chatId) return;
      socket.emit("send-message", {
        chatId,
        text: payload.text,
        images: payload.images ?? [],
      });
    },
    [socket, chatId],
  );

  const emitTyping = useCallback(() => {
    if (!socket || !chatId) return;
    socket.emit("typing", { chatId });
  }, [socket, chatId]);

  const emitStopTyping = useCallback(() => {
    if (!socket || !chatId) return;
    socket.emit("stopTyping", { chatId });
  }, [socket, chatId]);

  const requestChatList = useCallback(() => {
    socket?.emit("my-chat-list", {});
  }, [socket]);

  return {
    isOtherTyping,
    sendMessage,
    emitTyping,
    emitStopTyping,
    requestChatList,
  };
};
