// src/components/bookings/ReviewDialog.tsx
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useCreateReviewMutation } from "@/redux/api/websiteApi";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  // The other party in the booking: the family/client id when a provider
  // is leaving the review, or the provider id when a family is leaving it.
  revieweeId: string;
  revieweeName?: string;
  description?: string;
  onReviewed?: () => void;
}

export function ReviewDialog({
  open,
  onOpenChange,
  bookingId,
  revieweeId,
  revieweeName,
  description,
  onReviewed,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    try {
      await createReview({
        bookingId,
        receiverId: revieweeId,
        rating,
        comment: comment.trim(),
      }).unwrap();
      toast.success("Review submitted");
      onOpenChange(false);
      onReviewed?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't submit your review.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) {
          setRating(5);
          setComment("");
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {revieweeName ? `Review ${revieweeName}` : "Leave a review"}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Rating</Label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  aria-label={`${i + 1} stars`}
                >
                  <Star
                    className={
                      i < rating
                        ? "h-6 w-6 fill-amber-400 text-amber-400"
                        : "h-6 w-6 text-muted-foreground"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="review-comment" className="mb-2 block">
              Comment
            </Label>
            <Textarea
              id="review-comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !comment.trim()}
          >
            {isLoading ? "Submitting…" : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
