import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { UserAvatar } from "../../../components/common/UserAvatar";
import { useGetTransactionsQuery } from "../../../redux/api/websiteApi"; // adjust to the real path
import { useI18n } from "../../../lib/i18n";
import { formatCHF } from "../../../lib/format";
import { cn } from "../../../lib/utils";
import { Input } from "../../../components/ui/input";

;

// API paymentStatus values -> which "bucket" this earning falls into for the filter dropdown
type StatusFilter = "all" | "pending" | "paidOut";

function toStatusFilter(paymentStatus: string): "pending" | "paidOut" {
  return paymentStatus === "captured" ? "paidOut" : "pending";
}

const statusStyles: Record<string, string> = {
  captured: "bg-emerald-50 text-emerald-700 border-emerald-200",
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  voided: "bg-rose-50 text-rose-700 border-rose-200",
  failed: "bg-rose-50 text-rose-700 border-rose-200",
  refunded: "bg-violet-50 text-violet-700 border-violet-200",
};

function formatDate(iso?: string) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function ProviderEarningsPage() {
  const { t } = useI18n();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
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
  // The API doesn't expose a status filter param, so the pending/paidOut
  // filter is applied client-side to the current page of results.
  const pageItems =
    status === "all"
      ? rows
      : rows.filter((e) => toStatusFilter(e.paymentStatus) === status);

  const totalPages = data?.meta?.totalPage ?? 1;
  const safePage = Math.min(page, totalPages);

  return (
    <div className=" flex flex-col gap-5">
      <h2 className="font-serif text-3xl font-medium">
        {t("provider.earnings")}
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder={t("bookings.search")}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-sm bg-card"
        />
        {/* <Select
          value={status}
          onValueChange={(v) => {
            setStatus(v as StatusFilter);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-32 bg-primary text-primary-foreground border-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Status</SelectItem>
            <SelectItem value="pending">
              {t("bookingStatus.pending")}
            </SelectItem>
            <SelectItem value="paidOut">{t("provider.paidOut")}</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="px-4 py-3">{t("provider.id")}</TableHead>
              <TableHead className="px-4 py-3">
                {t("provider.clientName")}
              </TableHead>
              <TableHead className="px-4 py-3">{t("bookings.date")}</TableHead>
              <TableHead className="px-4 py-3">{t("provider.gross")}</TableHead>
              <TableHead className="px-4 py-3">
                {t("provider.commission")}
              </TableHead>
              <TableHead className="px-4 py-3">
                {t("provider.netPayout")}
              </TableHead>
              <TableHead className="px-4 py-3">
                {t("bookings.status")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  Loading earnings...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="px-4 py-8 text-center text-sm text-destructive"
                >
                  Failed to load earnings.
                </TableCell>
              </TableRow>
            ) : pageItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  No earnings found.
                </TableCell>
              </TableRow>
            ) : (
              pageItems.map((e) => (
                <TableRow key={e._id} className="hover:bg-muted-bg">
                  <TableCell className="px-4 py-3 text-sm font-medium text-foreground">
                    {e.booking?.bookingReference ?? e._id}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <UserAvatar name={e.payer?.fullName ?? "-"} size={32} />
                      <span className="text-sm font-medium text-foreground">
                        {e.payer?.fullName ?? "-"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-foreground">
                    {formatDate(e.booking?.bookingDate ?? e.createdAt)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-foreground">
                    {formatCHF(e.amount)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-foreground">
                    -{formatCHF(Math.abs(e.commissionAmount))}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm font-medium text-foreground">
                    {formatCHF(e.providerEarning)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
                        statusStyles[e.paymentStatus] ??
                          "bg-secondary/40 text-muted-foreground border-border",
                      )}
                    >
                      {e.paymentStatus === "captured"
                        ? t("provider.paidOut")
                        : e.paymentStatus === "pending"
                          ? t("bookingStatus.pending")
                          : e.paymentStatus}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        page={safePage}
        totalPages={totalPages}
        onPage={setPage}
        disabled={isFetching}
      />
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onPage,
  disabled,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
  disabled?: boolean;
}) {
  const { t } = useI18n();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5);
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        disabled={page === 1 || disabled}
        onClick={() => onPage(page - 1)}
        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition hover:bg-secondary disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
        {t("bookings.previous")}
      </button>
      {pages.map((p) => (
        <button
          type="button"
          key={p}
          onClick={() => onPage(p)}
          disabled={disabled}
          className={cn(
            "min-w-8 rounded-md px-2.5 py-1.5 text-sm transition",
            p === page
              ? "bg-secondary text-secondary-foreground font-medium"
              : "text-muted-foreground hover:bg-secondary",
          )}
        >
          {p}
        </button>
      ))}
      {totalPages > 5 && (
        <span className="px-2 text-sm text-muted-foreground">...</span>
      )}
      <button
        type="button"
        disabled={page === totalPages || disabled}
        onClick={() => onPage(page + 1)}
        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition hover:bg-secondary disabled:opacity-40"
      >
        {t("bookings.next")}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
