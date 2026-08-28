import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { useI18n } from "../../../lib/i18n";
import { cn } from "../../../lib/utils";
import { Flag } from "lucide-react";
import { useCreateReportMutation } from "../../../redux/api/websiteApi"; // adjust import path to wherever websiteApi lives

const REASON_KEYS = [
  "noShow",
  "inappropriateBehavior",
  "safetyConcern",
  "paymentIssue",
  "communicationIssue",
  "other",
] as const;



const makeSchema = (requiredMsg: string, detailsRequiredMsg: string) =>
  z
    .object({
      reason: z.enum(REASON_KEYS, { error: requiredMsg }),
      details: z.string().optional(),
    })
    .refine(
      (data) =>
        data.reason !== "other" ||
        (data.details && data.details.trim().length > 0),
      {
        message: detailsRequiredMsg,
        path: ["details"],
      },
    );

  

type FormValues = z.infer<ReturnType<typeof makeSchema>>;

export function ReportIssueDialog({
  open,
  onOpenChange,
  bookingId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  bookingId?: string;
}) {
  const { t } = useI18n();
  const schema = makeSchema(
    t("reportIssue.reasonRequired"),
    t("reportIssue.detailsRequired"),
  );

  const [createReport] = useCreateReportMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { reason: undefined, details: "" },
  });

  const selectedReason = watch("reason");

  const onSubmit = async (values: FormValues) => {
    if (!bookingId) {
      toast.error(t("reportIssue.reasonRequired"));
      return;
    }

    try {
      const reasonLabel = t(`reportIssue.reasons.${values.reason}`);

      const res = await createReport({
        bookingId,
        reason: reasonLabel,
        description: values.details?.trim() || reasonLabel,
      }).unwrap();

      toast.success(res?.message || t("reportIssue.submit"));
      reset();
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.data?.message || t("reportIssue.reasonRequired"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="bg-[#FEF2F2] rounded-full px-3 py-3 w-fit">
            <Flag className="text-destructive" size={16} absoluteStrokeWidth />
          </div>
          <DialogTitle className="text-lg font-bold">
            {t("reportIssue.title")}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {t("reportIssue.description")}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="reason"
            render={({ field }) => (
              <div
                className="space-y-2.5"
                role="radiogroup"
                aria-label={t("reportIssue.reasonLabel")}
              >
                {REASON_KEYS.map((key) => {
                  const selected = field.value === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => field.onChange(key)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-colors",
                        "hover:bg-muted/50",
                        selected
                          ? "border-foreground/40 bg-muted/40"
                          : "border-border",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                          selected
                            ? "border-foreground"
                            : "border-muted-foreground/40",
                        )}
                      >
                        {selected && (
                          <span className="h-2 w-2 rounded-full bg-foreground" />
                        )}
                      </span>
                      <span className="font-medium">
                        {t(`reportIssue.reasons.${key}`)}
                      </span>
                    </button>
                  );
                })}
                {errors.reason && (
                  <p className="text-sm text-destructive">
                    {errors.reason.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="space-y-1.5">
            <label htmlFor="report-description" className="text-sm font-medium">
              {t("reportIssue.descriptionLabel")}
              {selectedReason === "other" && (
                <span className="text-destructive"> *</span>
              )}
            </label>
            <Textarea
              id="report-description"
              rows={4}
              placeholder={t("reportIssue.detailsPlaceholder")}
              className="rounded-xl"
              {...register("details")}
            />
            {errors.details && (
              <p className="text-sm text-destructive">
                {errors.details.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-full flex-1"
              onClick={() => onOpenChange(false)}
            >
              {t("reportIssue.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full flex-1 bg-destructive/80 hover:bg-destructive text-white"
            >
              {t("reportIssue.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
