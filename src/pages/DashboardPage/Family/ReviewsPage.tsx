import { useMemo, useState } from "react";
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
import { UserAvatar } from "../../../components/common/UserAvatar";
import {
  reviews as initialReviews,
  type Review,
} from "../../../assets/data/reviews";
import { toast } from "sonner";

export function ReviewsPage() {
  const [items, setItems] = useState<Review[]>(initialReviews);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Review | null>(null);
  const [deleting, setDeleting] = useState<Review | null>(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  const filtered = useMemo(
    () =>
      items.filter((r) =>
        r.providerName.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query],
  );

  const openEdit = (r: Review) => {
    setEditing(r);
    setEditComment(r.comment);
    setEditRating(r.rating);
  };

  const saveEdit = () => {
    if (!editing) return;
    setItems((prev) =>
      prev.map((r) =>
        r.id === editing.id
          ? { ...r, comment: editComment, rating: editRating }
          : r,
      ),
    );
    toast.success("Review updated");
    setEditing(null);
  };

  const confirmDelete = () => {
    if (!deleting) return;
    setItems((prev) => prev.filter((r) => r.id !== deleting.id));
    toast.success("Review deleted");
    setDeleting(null);
  };

  return (
    <div className=" flex flex-col gap-6">
      <h2 className="font-serif text-3xl font-medium">Reviews</h2>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm bg-card"
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/60">
              <TableHead>Provider Name</TableHead>
              <TableHead>Ratings</TableHead>
              <TableHead>Your Comments</TableHead>
              <TableHead>Provider Reply</TableHead>
              <TableHead className="w-16 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UserAvatar name={r.providerName} size={28} />
                    {r.providerName}
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
                  {r.providerReply ?? "-"}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogDescription>{editing?.providerName}</DialogDescription>
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
            <Button onClick={saveEdit}>Save Changes</Button>
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
              {deleting?.providerName} will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
