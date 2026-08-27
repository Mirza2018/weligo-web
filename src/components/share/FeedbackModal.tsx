import { useState } from "react";
import { X, Star } from "lucide-react";
import { useCreateFeedbackMutation } from "@/redux/api/websiteApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { toast } from "sonner";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();

  if (!isOpen) return null;

  const handleClose = () => {
    setText("");
    setRating(4);
    setError("");
    setSuccess(false);
    onClose();
  };

  const handleSubmit = async () => {
      if (!accessToken) {
        onClose()
      return toast.error("You must be logged in to submit feedback.");
    }
    if (!text.trim()) {
      setError("Please share your feedback before submitting.");
      return;
    }
    setError("");
    try {
      await createFeedback({ text, rating }).unwrap();
      setSuccess(true);
      setTimeout(handleClose, 1200);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-center text-2xl font-bold text-gray-900">
          How are you feeling?
        </h2>
        <p className="mt-3 text-center text-sm leading-relaxed text-gray-500">
          Your input is valuable in helping us better understand your needs and
          tailor our service accordingly.
        </p>

        <div className="mt-6 flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
            >
              <Star
                className="h-8 w-8 transition-colors"
                fill={(hoverRating || rating) >= value ? "#FACC15" : "none"}
                stroke={
                  (hoverRating || rating) >= value ? "#FACC15" : "#D1D5DB"
                }
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>

        <label className="mt-6 block text-sm font-semibold text-gray-900">
          How are we doing?
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Give your honest opinion"
          rows={5}
          className="mt-2 w-full resize-none rounded-2xl border border-gray-200 p-4 text-sm text-gray-700 outline-none focus:border-primary"
        />

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        {success && (
          <p className="mt-2 text-sm text-green-600">
            Thanks for your feedback!
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-6 w-full rounded-full bg-primary py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isLoading ? "Submitting..." : "Add Feedback"}
        </button>
      </div>
    </div>
  );
}
