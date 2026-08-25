import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
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
import { useGetTransactionsQuery } from "../../../redux/api/websiteApi"; // adjust to the real path
import { formatCHF } from "../../../lib/format";
import { cn } from "../../../lib/utils";
import { toast } from "sonner";



// Map API paymentStatus values to badge styles
const statusClass: Record<string, string> = {
  captured: "border-emerald-300 text-emerald-700 bg-emerald-50",
  paid: "border-emerald-300 text-emerald-700 bg-emerald-50",
  refunded: "border-violet-300 text-violet-700 bg-violet-50",
  pending: "border-amber-300 text-amber-700 bg-amber-50",
  voided: "border-rose-300 text-rose-700 bg-rose-50",
  failed: "border-rose-300 text-rose-700 bg-rose-50",
};

function formatDate(iso?: string) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function TransactionsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Debounce search input -> searchTerm sent to API
  useEffect(() => {
    const handle = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(handle);
  }, [searchInput]);

  const { data, isLoading, isFetching, isError } = useGetTransactionsQuery({
    page,
    limit: 10,
    searchTerm: searchTerm || undefined,
  });

  const rows = data?.data ?? [];
  const totalPages = data?.meta?.totalPage ?? 1;

  const handleDownload = (row: (typeof rows)[number]) => {
    if (!row.booking) {
      toast.error("No booking associated with this transaction");
      return;
    }

    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const marginX = 48;
      let y = 60;

      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Invoice", marginX, y);

      y += 28;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Booking reference: ${row.booking.bookingReference}`,
        marginX,
        y,
      );
      y += 16;
      doc.text(`Transaction ID: ${row.transactionId ?? row._id}`, marginX, y);
      y += 16;
      doc.text(
        `Date: ${formatDate(row.booking.bookingDate ?? row.createdAt)}`,
        marginX,
        y,
      );

      y += 36;
      doc.setFont("helvetica", "bold");
      doc.text("Provider", marginX, y);
      doc.text("Payer", marginX + 260, y);
      y += 16;
      doc.setFont("helvetica", "normal");
      doc.text(row.booking.serviceProvider?.fullName ?? "-", marginX, y);
      doc.text(row.payer?.fullName ?? "-", marginX + 260, y);
      y += 14;
      doc.text(row.booking.serviceProvider?.email ?? "-", marginX, y);
      doc.text(row.payer?.email ?? "-", marginX + 260, y);

      y += 40;
      doc.setDrawColor(200);
      doc.line(marginX, y, 547, y);
      y += 24;

      doc.setFont("helvetica", "bold");
      doc.text("Description", marginX, y);
      doc.text("Amount", 460, y, { align: "right" });
      y += 16;
      doc.setFont("helvetica", "normal");
      doc.text("Booking payment", marginX, y);
      doc.text(formatCHF(row.amount, true), 460, y, { align: "right" });
      y += 16;
      doc.text("Commission", marginX, y);
      doc.text(`-${formatCHF(row.commissionAmount, true)}`, 460, y, {
        align: "right",
      });
      y += 16;
      if (row.refundedAmount) {
        doc.text("Refunded", marginX, y);
        doc.text(`-${formatCHF(row.refundedAmount, true)}`, 460, y, {
          align: "right",
        });
        y += 16;
      }

      y += 8;
      doc.line(marginX, y, 547, y);
      y += 22;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Provider earning", marginX, y);
      doc.text(formatCHF(row.providerEarning, true), 460, y, {
        align: "right",
      });

      y += 40;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Payment status: ${row.paymentStatus}`, marginX, y);
      y += 16;
      doc.text(`Payment method: ${row.paymentMethod}`, marginX, y);
      y += 16;
      doc.text(`Gateway reference: ${row.gatewayReference}`, marginX, y);

      doc.save(`invoice-${row.booking.bookingReference}.pdf`);
      toast.success("Invoice downloaded");
    } catch (err) {
      toast.error("Could not generate invoice");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-serif text-3xl font-medium">Transactions</h2>
      <Input
        placeholder="Search by provider name..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                >
                  Loading transactions...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-destructive py-8"
                >
                  Failed to load transactions.
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((t) => (
                <TableRow key={t._id}>
                  <TableCell>{t.booking?.bookingReference ?? "-"}</TableCell>
                  <TableCell>
                    {formatDate(t.booking?.bookingDate ?? t.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserAvatar
                        name={t.booking?.serviceProvider?.fullName ?? "-"}
                        size={28}
                      />
                      {t.booking?.serviceProvider?.fullName ?? "-"}
                    </div>
                  </TableCell>
                  <TableCell>{formatCHF(t.amount, true)}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
                        statusClass[t.paymentStatus] ??
                          "border-border text-muted-foreground bg-secondary/40",
                      )}
                    >
                      {t.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      aria-label="Download invoice"
                      onClick={() => handleDownload(t)}
                      className="text-primary hover:opacity-80"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-disabled={page === 1 || isFetching}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-disabled={page === totalPages || isFetching}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
