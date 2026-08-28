import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { ImagePlus, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadFileMutation } from "@/redux/api/messageApi";
import { getImageUrl } from "@/redux/getBaseUrl";

interface ChatComposerProps {
  onSend: (payload: { text: string; images?: string[] }) => void;
  onTyping: () => void;
  onStopTyping: () => void;
}

export const ChatComposer = ({
  onSend,
  onTyping,
  onStopTyping,
}: ChatComposerProps) => {
  const [text, setText] = useState("");
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onTyping();
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(onStopTyping, 1500);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));

    try {
      const res = await uploadFile(formData).unwrap();
      setPendingImages((prev) => [...prev, ...(res.data ?? [])]);
    } catch {
      // Upload failed — surface via your app's toast/notification system.
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (img: string) => {
    setPendingImages((prev) => prev.filter((i) => i !== img));
  };

  const handleSend = () => {
    if (!text.trim() && pendingImages.length === 0) return;
    onSend({ text: text.trim(), images: pendingImages });
    setText("");
    setPendingImages([]);
    onStopTyping();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border p-3">
      {pendingImages.length > 0 && (
        <div className="mb-2 flex gap-2 overflow-x-auto">
          {pendingImages.map((img) => (
            <div key={img} className="relative shrink-0">
              <img
                src={getImageUrl(img) ?? undefined}
                alt=""
                className="h-16 w-16 rounded-lg object-cover"
              />
              <button
                onClick={() => removeImage(img)}
                className="absolute -right-1.5 -top-1.5 rounded-full bg-destructive p-0.5 text-destructive-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileChange}
        />
        <Button
          variant="ghost"
          size="icon"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
        >
          <ImagePlus className="h-5 w-5" />
        </Button>

        <Input
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Write a message…"
          className="flex-1"
        />

        <Button size="icon" onClick={handleSend} disabled={isUploading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
