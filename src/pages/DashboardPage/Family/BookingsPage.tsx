// src/pages/dashboard/family/BookingsPage.tsx
import { useEffect, useMemo, useState } from "react";
import { Eye, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input";
import { Skeleton } from "../../../components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { UserAvatar } from "../../../components/common/UserAvatar";
import { formatCHF } from "../../../lib/format";
import { StatusBadge } from "../../../components/common/StatusBadge";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { formatBookingDate, formatTimeRange } from "@/lib/bookingHelpers";
import { useGetAllBookingsQuery, useGetCategoriesQuery, useProviderDetailsQuery } from "@/redux/api/websiteApi";
import { getImageUrl } from "@/redux/getBaseUrl";
import type { BookingRecordFull, BookingStatus } from "@/types/bookings";

type Filter = "all" | Extract<BookingStatus, "pending" | "confirmed" | "in_progress" | "provider_completed" | "completed" | "cancelled">;
const PAGE_SIZE = 10;

const filters: Filter[] = ["all", "pending", "confirmed", "in_progress", "provider_completed", "completed", "cancelled"];

interface ProviderInfo {
  fullName: string;
  profileImage: string;
  categoryName: string;
}

export function BookingsPage() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  // Populated as each row's provider details resolve, so search can match
  // on provider name too (the bookings list itself only has a raw provider
  // id, not a populated name - unlike `customer`, which does come populated).
  const [providerInfo, setProviderInfo] = useState<Record<string, ProviderInfo>>({});

  const { data, isLoading, isError } = useGetAllBookingsQuery({ limit: 200 });
  const { data: categoryData } = useGetCategoriesQuery({});
  const categories = categoryData?.data ?? [];
  const bookings = data?.data ?? [];

  const handleProviderResolved = (id: string, info: ProviderInfo) => {
    setProviderInfo((prev) => (prev[id]?.fullName === info.fullName ? prev : { ...prev, [id]: info }));
  };

  // const counts = useMemo(() => {
  //   const c: Record<Filter, number> = {
  //     all: bookings.length,
  //     pending: 0,
  //     confirmed: 0,
  //     in_progress: 0,
  //     provider_completed: 0,
  //     completed: 0,
  //     cancelled: 0,
  //   };
  //   bookings.forEach((b) => {
  //     if (b.status in c) c[b.status as Filter]++;
  //   });
  //   return c;
  // }, [bookings]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (filter !== "all" && b.status !== filter) return false;
      if (!q) return true;
      const info = providerInfo[b.serviceProvider];
      return (
        b.bookingReference.toLowerCase().includes(q) ||
        b.whatToExpect?.toLowerCase().includes(q) ||
        info?.fullName.toLowerCase().includes(q) ||
        info?.categoryName.toLowerCase().includes(q)
      );
    });
  }, [bookings, filter, query, providerInfo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-5">
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
                className="flex-shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border data-[state=active]:border-[#2B2B2B]/10 data-[state=active]:shadow"
              >
                {f === "all" ? t("bookings.all") : t(`bookingStatus.${f}`)}
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
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={8} className="px-4 py-3">
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && isError && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  Couldn&apos;t load your bookings.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isError &&
              pageItems.map((b) => (
                <BookingRow
                  key={b._id}
                  booking={b}
                  categories={categories}
                  onResolved={handleProviderResolved}
                />
              ))}

            {!isLoading && !isError && pageItems.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  {t("familyDashboard.nobookings")}
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

function BookingRow({
  booking,
  categories,
  onResolved,
}: {
  booking: BookingRecordFull;
  categories: { _id: string; name: string }[];
  onResolved: (id: string, info: ProviderInfo) => void;
}) {
  // const { data } = useProviderDetailsQuery(booking.serviceProvider);
  // const provider = data?.data.user;
  // const categoryName = provider ? categories.find((c) => c._id === provider.categoryId)?.name ?? "—" : undefined;

  // useEffect(() => {
  //   if (provider && categoryName !== undefined) {
  //     onResolved(booking.serviceProvider, {
  //       fullName: provider.fullName,
  //       profileImage: provider.profileImage,
  //       categoryName,
  //     });
  //   }

  // }, [provider?._id, categoryName]);

  return (
    <TableRow className="hover:bg-muted-bg">
      <TableCell className="px-4 py-3 font-medium text-foreground">
        {booking.bookingReference}
      </TableCell>
      <TableCell className="px-4 py-3">
        {booking.serviceProvider ? (
          <div className="flex items-center gap-2">
            <UserAvatar
              name={booking.serviceProvider?.fullName}
              imageUrl={
                getImageUrl(booking.serviceProvider?.profileImage) ?? undefined
              }
              size={32}
            />
            <span className="text-sm font-medium text-foreground">
              {booking.serviceProvider?.fullName}
            </span>
          </div>
        ) : (
          <Skeleton className="h-6 w-32" />
        )}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-foreground">
        {booking.serviceProvider?.categoryId?.name ?? (
          <Skeleton className="h-4 w-20" />
        )}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-foreground">
        {formatBookingDate(booking.bookingDate)}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-foreground">
        {formatTimeRange(booking.timeSlot)}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm font-medium text-foreground">
        {formatCHF(booking.paymentAmount, true)}
      </TableCell>
      <TableCell className="px-4 py-3">
        <StatusBadge status={booking.status} />
      </TableCell>
      <TableCell className="px-4 py-3 text-right">
        <Link
          to={`/dashboard/family/bookings/${booking._id}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-secondary-foreground"
          aria-label="View booking"
        >
          <Eye className="h-4 w-4" />
        </Link>
      </TableCell>
    </TableRow>
  );
}

function Pagination({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (p: number) => void }) {
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
            p === page ? "bg-secondary text-secondary-foreground font-medium" : "text-muted-foreground hover:bg-secondary"
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