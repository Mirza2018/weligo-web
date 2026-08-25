// src/pages/dashboard/family/ReviewsPage.tsx
import { useState } from "react";
import { MoreHorizontal, Pencil, Star, Trash2 } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Skeleton } from "../../../components/ui/skeleton";
import { UserAvatar } from "../../../components/common/UserAvatar";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useGetMyReviewsQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "@/redux/api/websiteApi";

import { isPopulatedPerson, type ReviewListItem } from "@/types/reviews";
import { getImageUrl } from "@/redux/getBaseUrl";

const PAGE_SIZE = 10;

export function ProviderReviewsPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<ReviewListItem | null>(null);
  const [deleting, setDeleting] = useState<ReviewListItem | null>(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  const searchTerm = useDebounce(query, 400);
  const { data, isLoading, isFetching, isError } = useGetMyReviewsQuery({
    page,
    limit: PAGE_SIZE,
    searchTerm: searchTerm || undefined,
  });
  const [updateReview, { isLoading: isSaving }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const reviews = data?.data ?? [];
  const meta = data?.meta;

  const openEdit = (r: ReviewListItem) => {
    setEditing(r);
    setEditComment(r.comment);
    setEditRating(r.rating);
  };

  const saveEdit = async () => {
    if (!editing) return;
    try {
      const res = await updateReview({
        id: editing._id,
        data: { rating: editRating, comment: editComment },
      }).unwrap();
      toast.success(res?.message || "Review updated");
      setEditing(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't update your review.");
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await deleteReview(deleting._id).unwrap();
      toast.success("Review deleted");
      setDeleting(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't delete your review.");
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
              <TableHead>Provider Name</TableHead>
              <TableHead>Ratings</TableHead>
              <TableHead>Your Review</TableHead>
              {/* <TableHead>Provider Reply</TableHead> */}
              {/* <TableHead className="w-16 text-right">Action</TableHead> */}
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
                  You haven&apos;t left any reviews yet.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isFetching &&
              reviews.map((r) => {
                const provider = isPopulatedPerson(r.receiverId)
                  ? r.receiverId
                  : null;
                return (
                  <TableRow key={r._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserAvatar
                          name={provider?.fullName ?? "Provider"}
                          imageUrl={
                            provider?.profileImage
                              ? (getImageUrl(provider.profileImage) ??
                                undefined)
                              : undefined
                          }
                          size={28}
                        />
                        {provider?.fullName ?? "Provider"}
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
                    {/* <TableCell className="max-w-xs truncate text-muted-foreground">
                      {r.reply?.comment ?? "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            aria-label="Actions"
                            className="rounded-md p-1.5 hover:bg-muted"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(r)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit Review
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => setDeleting(r)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell> */}
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

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogDescription>
              {isPopulatedPerson(editing?.receiverId ?? "")
                ? (editing?.receiverId as any).fullName
                : "Provider"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Rating</Label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setEditRating(i + 1)}
                    aria-label={`${i + 1} stars`}
                  >
                    <Star
                      className={
                        i < editRating
                          ? "h-6 w-6 fill-amber-400 text-amber-400"
                          : "h-6 w-6 text-muted-foreground"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="comment" className="mb-2 block">
                Comment
              </Label>
              <Textarea
                id="comment"
                rows={4}
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={saveEdit} disabled={isSaving}>
              {isSaving ? "Saving…" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this review?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your review for{" "}
              {isPopulatedPerson(deleting?.receiverId ?? "")
                ? (deleting?.receiverId as any).fullName
                : "this provider"}{" "}
              will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
