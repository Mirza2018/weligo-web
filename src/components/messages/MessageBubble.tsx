import { getImageUrl } from "@/redux/getBaseUrl";

export interface ChatMessage {
  id: string;
  text: string;
  images: string[];
  senderId?: string;
  senderName?: string;
  createdAt: string;
}

interface MessageBubbleProps {
  message: ChatMessage;
  isMine: boolean;
}

export const MessageBubble = ({ message, isMine }: MessageBubbleProps) => {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
          isMine
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-secondary text-secondary-foreground"
        }`}
      >
        {message.images.length > 0 && (
          <div className="mb-1.5 grid grid-cols-2 gap-1.5">
            {message.images.map((img) => (
              <img
                key={img}
                src={getImageUrl(img) ?? undefined}
                alt=""
                className="h-28 w-full rounded-lg object-cover"
              />
            ))}
          </div>
        )}
        {message.text && (
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        )}
        <p
          className={`mt-1 text-right text-[10px] ${
            isMine ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
};
