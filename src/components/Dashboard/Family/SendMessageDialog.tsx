import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";

import { Button } from "../../ui/button";
import { useI18n } from "../../../lib/i18n";
import { cn } from "../../../lib/utils";

const makeSchema = (msgs: { required: string; tooShort: string }) =>
  z.object({
    message: z.string().min(1, msgs.required).min(3, msgs.tooShort),
  });

type FormValues = { message: string };

export function SendMessageDialog({
  open,
  onOpenChange,
  recipientName,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  recipientName: string;
}) {
  const { t } = useI18n();
  const schema = makeSchema({
    required: t("form.required"),
    tooShort: t("form.tooShort"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { message: "" },
  });

  const onSubmit = async (_values: FormValues) => {
    try {
      await new Promise((r) => setTimeout(r, 400));
      toast.success(t("toast.messageSent"));
      reset();
      onOpenChange(false);
    } catch {
      toast.error(t("toast.messageFailed"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("form.sendMessage")}</DialogTitle>
          <DialogDescription>{recipientName}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="message">{t("form.messageLabel")}</Label>
            <Textarea
              id="message"
              rows={4}
              placeholder={t("form.messagePlaceholder")}
              aria-invalid={!!errors.message}
              className={cn(errors.message && "border-destructive focus-visible:ring-destructive")}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t("form.cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {t("form.send")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
