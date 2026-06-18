import { useMemo, useState } from "react";
import { Download } from "lucide-react";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";
import { UserAvatar } from "../../../components/common/UserAvatar";
import { transactions, type TxStatus } from "../../../assets/data/transactions";
import { formatCHF } from "../../../lib/format";
import { cn } from "../../../lib/utils";
import { toast } from "sonner";

const PAGE_SIZE = 15;

const statusClass: Record<TxStatus, string> = {
  paid: "border-emerald-300 text-emerald-700 bg-emerald-50",
  refunded: "border-violet-300 text-violet-700 bg-violet-50",
  pending: "border-amber-300 text-amber-700 bg-amber-50",
};

export function TransactionsPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      transactions.filter(
        (t) =>
          t.bookingId.includes(query) ||
          t.providerName.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const slice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className=" flex flex-col gap-6">
      <h2 className="font-serif text-3xl font-medium">Transactions</h2>
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
              <TableHead>Booking ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Provider Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {slice.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.bookingId}</TableCell>
                <TableCell>{t.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UserAvatar name={t.providerName} size={28} />
                    {t.providerName}
                  </div>
                </TableCell>
                <TableCell>{formatCHF(t.amount, true)}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
                      statusClass[t.status],
                    )}
                  >
                    {t.status}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    aria-label="Download invoice"
                    onClick={() => toast.success("Invoice download started")}
                    className="text-primary hover:opacity-80"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => setPage((p) => Math.min(totalPages, p + 1))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
