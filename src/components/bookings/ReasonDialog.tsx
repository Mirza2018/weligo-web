// src/components/bookings/ReasonDialog.tsx
import { useState } from "react";
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

interface ReasonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  requireReason?: boolean;
  confirmLabel?: string;
  destructive?: boolean;
  isSubmitting?: boolean;
  onSubmit: (reason: string) => void;
}

export function ReasonDialog({
  open,
  onOpenChange,
  title,
  description,
  requireReason = true,
  confirmLabel = "Confirm",
  destructive = true,
  isSubmitting = false,
  onSubmit,
}: ReasonDialogProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (requireReason && !reason.trim()) return;
    onSubmit(reason.trim());
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setReason("");
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="space-y-1.5">
          <Label htmlFor="reason">
            Reason{!requireReason && " (optional)"}
          </Label>
          <Textarea
            id="reason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Let them know why..."
          />
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Nevermind
          </Button>
          <Button
            variant={destructive ? "destructive" : "default"}
            onClick={handleSubmit}
            disabled={isSubmitting || (requireReason && !reason.trim())}
          >
            {isSubmitting ? "Saving…" : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
