// src/pages/dashboard/HelpAndSupportPage.tsx
import { Paperclip, Plus, Search } from "lucide-react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// import { Label } from "@/omponents/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useGetMyTicketsQuery,
  useCreateTicketMutation,
  useGetSingleTicketQuery,
} from "@/redux/api/websiteApi";

import type { TicketStatus } from "@/types/support";
import { issueTypes } from "@/assets/data/tickets";
import { Label } from "@/components/ui/label";
import { getImageUrl } from "@/redux/getBaseUrl";

const STATUS_FILTERS: { value: TicketStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CLOSED", label: "Closed" },
];

const ticketStatusBadge: Record<TicketStatus, string> = {
  OPEN: "bg-sky-100 text-sky-700 border-sky-300",
  IN_PROGRESS: "bg-amber-100 text-amber-700 border-amber-300",
  RESOLVED: "bg-emerald-100 text-emerald-700 border-emerald-300",
  CLOSED: "bg-muted text-muted-foreground border-border",
};

const ticketStatusLabel: Record<TicketStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

const schema = z.object({
  subject: z.string().min(1, "Please select an issue type"),
  title: z.string().min(3, "Subject must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});
type FormValues = z.infer<typeof schema>;

const PAGE_SIZE = 10;

export function HelpAndSupportPage() {
  const [open, setOpen] = useState(false);
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "ALL">("ALL");
  const [attachment, setAttachment] = useState<File | null>(null);

  const searchTerm = useDebounce(searchInput, 400);

  const { data, isLoading, isFetching, isError } = useGetMyTicketsQuery({
    page,
    limit: PAGE_SIZE,
    searchTerm: searchTerm || undefined,
    status: statusFilter === "ALL" ? undefined : statusFilter,
  });

  const [createTicket, { isLoading: isCreating }] = useCreateTicketMutation();

  const tickets = data?.data ?? [];
  const meta = data?.meta;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "", title: "", description: "" },
  });

  const subject = watch("subject");

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    if (attachment) formData.append("attachment", attachment);
    formData.append("data", JSON.stringify(values));

    try {
      const res = await createTicket(formData).unwrap();
      toast.success(res?.message || "Support ticket submitted");
      reset();
      setAttachment(null);
      setOpen(false);
      setPage(1);
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't submit your ticket.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-serif text-3xl font-medium">Help &amp; Support</h2>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">Your Tickets</h3>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> New Ticket
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPage(1);
            }}
            placeholder="Search your tickets"
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v as TicketStatus | "ALL");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTERS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4">
        {(isLoading || isFetching) &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}

        {isError && !isLoading && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Couldn&apos;t load your tickets. Please try again.
          </p>
        )}

        {!isLoading && !isFetching && !isError && tickets.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No support tickets yet.
          </p>
        )}

        {!isLoading &&
          !isFetching &&
          tickets.map((t) => (
            <article
              key={t._id}
              onClick={() => setActiveTicketId(t._id)}
              className="cursor-pointer rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={cn(
                    "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
                    ticketStatusBadge[t.status],
                  )}
                >
                  {ticketStatusLabel[t.status]}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {t.ticketNumber}
                </span>
              </div>
              <h4 className="mt-3 text-lg font-semibold text-foreground">
                {t.title}
              </h4>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {t.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{t.subject}</span>
                <span>{new Date(t.createdAt).toLocaleDateString()}</span>
              </div>
            </article>
          ))}
      </div>

      {meta && meta.totalPage > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPage}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= meta.totalPage}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* New ticket */}
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) {
            reset();
            setAttachment(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Open a support ticket</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>What do you need help with?</Label>
              <Select
              
                value={subject}
                onValueChange={(v) =>
                  setValue("subject", v, { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full">
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
              {errors.subject && (
                <p className="text-sm text-destructive">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="title">Subject</Label>
              <Input
                id="title"
                placeholder="Brief summary of your issue"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Please give as much detail as possible — dates, times, what happened..."
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="attachment">Attachment (optional)</Label>
              <Input
                id="attachment"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || isCreating}
            >
              {isCreating ? "Submitting…" : "Submit Ticket"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Ticket thread */}
      <Dialog
        open={!!activeTicketId}
        onOpenChange={(v) => !v && setActiveTicketId(null)}
      >
        <DialogContent className="max-w-lg">
          {activeTicketId && <TicketThread ticketId={activeTicketId} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TicketThread({ ticketId }: { ticketId: string }) {
  const { data, isLoading, isError } = useGetSingleTicketQuery(ticketId);
  const ticket = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (isError || !ticket) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        Couldn&apos;t load this ticket.
      </p>
    );
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>{ticket.title}</DialogTitle>
      </DialogHeader>
      <div className="mt-2 flex items-center gap-2">
        <span
          className={cn(
            "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
            ticketStatusBadge[ticket.status],
          )}
        >
          {ticketStatusLabel[ticket.status]}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {ticket.ticketNumber}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {ticket.messages.map((msg, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-muted/40 p-3"
          >
            <p className="text-sm text-foreground">{msg.message}</p>
            {msg.attachment && (
              <a
                href={getImageUrl(msg.attachment) ?? undefined}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <Paperclip className="h-3.5 w-3.5" /> View attachment
              </a>
            )}
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
