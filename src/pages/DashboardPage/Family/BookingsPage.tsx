import { useMemo, useState } from "react";
// import { Link } from "@tanstack/react-router";
import { Eye, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { bookings, type BookingStatus } from "../../../assets/data/bookings";
import { useI18n } from "../../../lib/i18n";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { UserAvatar } from "../../../components/common/UserAvatar";
import { formatCHF } from "../../../lib/format";
import { StatusBadge } from "../../../components/common/StatusBadge";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";



// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import { UserAvatar } from "@/components/common/UserAvatar";
// import { StatusBadge } from "@/components/common/StatusBadge";
// import { bookings, type BookingStatus } from "@/assets/data/bookings";
// import { useI18n } from "@/lib/i18n";
// import { formatCHF } from "@/lib/format";
// import { cn } from "@/lib/utils";

type Filter = "all" | BookingStatus;
const PAGE_SIZE = 10;

const filters: Filter[] = [
  "all",
  "pending",
  "confirmed",
  "in-progress",
  "provider-completed",
  "completed",
  "cancelled",
];

export function BookingsPage() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: bookings.length,
      pending: 0,
      confirmed: 0,
      inProgress: 0,
      providerCompleted: 0,
      awaitingPayment: 0,
      completed: 0,
      cancelled: 0,
    };

    bookings.forEach((b) => {
      c[b.status]++;
    });
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (filter !== "all" && b.status !== filter) return false;
      if (!q) return true;
      return (
        b.code.toLowerCase().includes(q) ||
        b.providerName.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className=" flex  flex-col gap-5">
      <h2 className="font-serif text-3xl font-medium tracking-tight">
        {t("bookings.title")}
      </h2>

      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <Tabs
          value={filter}
          onValueChange={(v) => {
            setFilter(v as Filter);
            setPage(1);
          }}
          className="w-full xl:w-auto min-w-0"
        >
          <TabsList
            className="flex w-full overflow-x-auto flex-nowrap justify-start
                 xl:w-auto xl:flex-wrap xl:overflow-visible
                 h-auto bg-transparent p-0 gap-1 bg-[#F4F4F6] py-1 px-1 border-[#2B2B2B]/10 border rounded-xl"
          >
            {filters.map((f) => (
              <TabsTrigger
                key={f}
                value={f}
                className="flex-shrink-0  whitespace-nowrap rounded-full px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border data-[state=active]:border-[#2B2B2B]/10 data-[state=active]:shadow"
              >
                {f === "all" ? t("bookings.all") : t(`bookingStatus.${f}`)} (
                {counts[f]})
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full xl:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={t("bookings.search")}
            className="pl-9 bg-card"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="px-4 py-3">{t("bookings.id")}</TableHead>
              <TableHead className="px-4 py-3">
                {t("bookings.provider")}
              </TableHead>
              <TableHead className="px-4 py-3">
                {t("bookings.service")}
              </TableHead>
              <TableHead className="px-4 py-3">{t("bookings.date")}</TableHead>
              <TableHead className="px-4 py-3">{t("bookings.time")}</TableHead>
              <TableHead className="px-4 py-3">
                {t("bookings.amount")}
              </TableHead>
              <TableHead className="px-4 py-3">
                {t("bookings.status")}
              </TableHead>
              <TableHead className="px-4 py-3 text-right">
                {t("bookings.action")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.map((b) => (
              <TableRow key={b.id} className="hover:bg-muted-bg">
                <TableCell className="px-4 py-3 font-medium text-foreground">
                  {b.code}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <UserAvatar name={b.providerName} size={32} />
                    <span className="text-sm font-medium text-foreground">
                      {b.providerName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">
                  {b.service}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">
                  {b.date}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">
                  {b.time}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-foreground">
                  {formatCHF(b.total, true)}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <StatusBadge status={b.status} />
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <Link
                    to={`/dashboard/family/bookings/${b.id}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-secondary-foreground"
                    aria-label="View booking"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {pageItems.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  No bookings found
                </TableCell>
              </TableRow>
            )}
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
