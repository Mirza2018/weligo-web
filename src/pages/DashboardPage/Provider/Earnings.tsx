import { useMemo, useState } from "react";
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
import { earnings, type EarningStatus } from "../../../assets/data/earnings";
import { useI18n } from "../../../lib/i18n";
import { formatCHF } from "../../../lib/format";
import { cn } from "../../../lib/utils";
import { Input } from "../../../components/ui/input";

const PAGE_SIZE = 15;
type StatusFilter = "all" | EarningStatus;

const statusStyles: Record<EarningStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  paidOut: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export function ProviderEarningsPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return earnings.filter((e) => {
      if (status !== "all" && e.status !== status) return false;
      if (!q) return true;
      return (
        e.id.toLowerCase().includes(q) || e.clientName.toLowerCase().includes(q)
      );
    });
  }, [query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className=" flex flex-col gap-5">
      <h2 className="font-serif text-3xl font-medium">{t("provider.earnings")}</h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder={t("bookings.search")}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="max-w-sm bg-card"
        />
        <Select
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
            <SelectItem value="pending">{t("bookingStatus.pending")}</SelectItem>
            <SelectItem value="paidOut">{t("provider.paidOut")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="px-4 py-3">{t("provider.id")}</TableHead>
              <TableHead className="px-4 py-3">{t("provider.clientName")}</TableHead>
              <TableHead className="px-4 py-3">{t("bookings.date")}</TableHead>
              <TableHead className="px-4 py-3">{t("provider.gross")}</TableHead>
              <TableHead className="px-4 py-3">{t("provider.commission")}</TableHead>
              <TableHead className="px-4 py-3">{t("provider.netPayout")}</TableHead>
              <TableHead className="px-4 py-3">{t("bookings.status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.map((e) => (
              <TableRow key={e.id} className="hover:bg-muted-bg">
                <TableCell className="px-4 py-3 text-sm font-medium text-foreground">
                  {e.id}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <UserAvatar name={e.clientName} size={32} />
                    <span className="text-sm font-medium text-foreground">{e.clientName}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">{e.date}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">
                  {formatCHF(e.gross)}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">
                  -{formatCHF(Math.abs(e.commission))}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-foreground">
                  {formatCHF(e.netPayout)}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      statusStyles[e.status],
                    )}
                  >
                    {e.status === "pending"
                      ? t("bookingStatus.pending")
                      : t("provider.paidOut")}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination page={safePage} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}) {
  const { t } = useI18n();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5);
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        disabled={page === 1}
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
      {totalPages > 5 && <span className="px-2 text-sm text-muted-foreground">...</span>}
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPage(page + 1)}
        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition hover:bg-secondary disabled:opacity-40"
      >
        {t("bookings.next")}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
