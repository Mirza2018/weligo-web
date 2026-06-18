import { useMemo, useState } from "react";
import { Pencil, Star } from "lucide-react";
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
import { UserAvatar } from "../../../components/common/UserAvatar";
import { reviews as initial, type Review } from "../../../assets/data/reviews";
import { toast } from "sonner";

export function ProviderReviewsPage() {
  const [items, setItems] = useState<Review[]>(initial);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Review | null>(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const filtered = useMemo(
    () =>
      items.filter((r) => r.providerName.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  );

  const openEdit = (r: Review) => {
    setEditing(r);
    setComment(r.comment);
    setRating(r.rating);
  };

  const save = () => {
    if (!editing) return;
    setItems((prev) =>
      prev.map((r) => (r.id === editing.id ? { ...r, comment, rating } : r)),
    );
    toast.success("Review updated");
    setEditing(null);
  };

  return (
    <div className="flex flex-col gap-6">
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
              <TableHead>Client Name</TableHead>
              <TableHead>Ratings</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Your Reply</TableHead>
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
                  <button
                    type="button"
                    aria-label="Edit review"
                    onClick={() => openEdit(r)}
                    className="rounded-md p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
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
              <Label htmlFor="comment" className="mb-2 block">
                Comment
              </Label>
              <Textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={save}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
