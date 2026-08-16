// src/pages/dashboard/provider/ProviderReviewsPage.tsx
import { useState } from "react";
import { MessageSquareReply, Star } from "lucide-react";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Skeleton } from "../../../components/ui/skeleton";
import { UserAvatar } from "../../../components/common/UserAvatar";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useGetMyReviewsQuery,
  useReplyReviewMutation,
} from "@/redux/api/websiteApi";

import { isPopulatedPerson, type ReviewListItem } from "@/types/reviews";
import { getImageUrl } from "@/redux/getBaseUrl";

const PAGE_SIZE = 10;

export function ProviderReviewsPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [replying, setReplying] = useState<ReviewListItem | null>(null);
  const [replyComment, setReplyComment] = useState("");

  const searchTerm = useDebounce(query, 400);
  const { data, isLoading, isFetching, isError } = useGetMyReviewsQuery({
    page,
    limit: PAGE_SIZE,
    searchTerm: searchTerm || undefined,
  });
  const [replyReview, { isLoading: isReplying }] = useReplyReviewMutation();

  const reviews = data?.data ?? [];
  const meta = data?.meta;

  const openReply = (r: ReviewListItem) => {
    setReplying(r);
    setReplyComment(r.reply?.comment ?? "");
  };

  const saveReply = async () => {
    if (!replying) return;
    if (!replyComment.trim()) {
      toast.error("Please write a reply first.");
      return;
    }
    try {
      const res = await replyReview({
        id: replying._id,
        data: { comment: replyComment },
      }).unwrap();
      toast.success(res?.message || "Reply added");
      setReplying(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't save your reply.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-serif text-3xl font-medium">Reviews</h2>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        className="max-w-sm bg-card"
      />

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/60">
              <TableHead>Client Name</TableHead>
              <TableHead>Ratings</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Your Reply</TableHead>
              <TableHead className="w-16 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(isLoading || isFetching) &&
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && !isFetching && isError && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  Couldn&apos;t load your reviews.
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isFetching && !isError && reviews.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  No reviews yet.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isFetching &&
              reviews.map((r) => {
                const reviewer = isPopulatedPerson(r.reviewerId)
                  ? r.reviewerId
                  : null;
                return (
                  <TableRow key={r._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserAvatar
                          name={reviewer?.fullName ?? "Client"}
                          imageUrl={
                            reviewer?.profileImage
                              ? (getImageUrl(reviewer.profileImage) ??
                                undefined)
                              : undefined
                          }
                          size={28}
                        />
                        {reviewer?.fullName ?? "Client"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={
                              i < r.rating
                                ? "h-4 w-4 fill-amber-400 text-amber-400"
                                : "h-4 w-4 text-muted-foreground"
                            }
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {r.comment}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {r.reply?.comment ?? "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        type="button"
                        aria-label={r.reply ? "Edit reply" : "Reply"}
                        onClick={() => openReply(r)}
                        className="rounded-md p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-secondary-foreground"
                      >
                        <MessageSquareReply className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
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

      <Dialog open={!!replying} onOpenChange={(o) => !o && setReplying(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {replying?.reply ? "Edit your reply" : "Reply to review"}
            </DialogTitle>
            <DialogDescription>
              {isPopulatedPerson(replying?.reviewerId ?? "")
                ? (replying?.reviewerId as any).fullName
                : "Client"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-xl bg-muted/40 p-3 text-sm text-muted-foreground">
              {replying?.comment}
            </div>
            <div>
              <Label htmlFor="reply" className="mb-2 block">
                Your reply
              </Label>
              <Textarea
                id="reply"
                rows={4}
                value={replyComment}
                onChange={(e) => setReplyComment(e.target.value)}
                placeholder="Thank the client, or address anything they raised…"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setReplying(null)}>
              Cancel
            </Button>
            <Button onClick={saveReply} disabled={isReplying}>
              {isReplying ? "Saving…" : "Save Reply"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
