import { useState } from "react";
import { Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { tickets as initialTickets, issueTypes, type TicketStatus } from "@/assets/data/tickets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  tickets as initialTickets,
  issueTypes,
  type TicketStatus,
} from "../../../assets/data/tickets";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
// import { cn } from "@/lib/utils";

const ticketStatusBadge: Record<TicketStatus, string> = {
  open: "bg-sky-100 text-sky-700 border-sky-300",
  inProgress: "bg-amber-100 text-amber-700 border-amber-300",
  resolved: "bg-emerald-100 text-emerald-700 border-emerald-300",
};

const ticketStatusLabel: Record<TicketStatus, string> = {
  open: "Open",
  inProgress: "In Progress",
  resolved: "Resolved",
};

const schema = z.object({
  issueType: z.string().min(1, "Please select an issue type"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});
type FormValues = z.infer<typeof schema>;

export function HelpAndSupportPage() {
  const [open, setOpen] = useState(false);
  const [items] = useState(initialTickets);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { issueType: "", subject: "", description: "" },
  });

  const issueType = watch("issueType");

  const onSubmit = async (_values: FormValues) => {
    await new Promise((r) => setTimeout(r, 300));
    toast.success("Support ticket submitted");
    reset();
    setOpen(false);
  };

  return (
    <div className=" flex flex-col gap-6">
      <h2 className="font-serif text-3xl font-medium">Help &amp; Support</h2>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Tickets</h3>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> New Ticket
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {items.map((t) => (
          <article
            key={t.id}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <span
              className={cn(
                "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
                ticketStatusBadge[t.status],
              )}
            >
              {ticketStatusLabel[t.status]}
            </span>
            <h4 className="mt-3 text-lg font-semibold text-foreground">
              {t.subject}
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.description}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{t.openedAt}</span>
              <span>{t.updatedAt}</span>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Open a support ticket</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>What do you need help with?</Label>
              <Select
                value={issueType}
                onValueChange={(v) =>
                  setValue("issueType", v, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an issue type..." />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((it) => (
                    <SelectItem key={it} value={it}>
                      {it}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.issueType && (
                <p className="text-sm text-destructive">
                  {errors.issueType.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Brief summary of your issue"
                {...register("subject")}
              />
              {errors.subject && (
                <p className="text-sm text-destructive">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                placeholder='"Please give as much detail as possible — dates, times, what happened..."'
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Submit Ticket
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
