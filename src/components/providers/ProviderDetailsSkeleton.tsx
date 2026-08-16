// src/components/providers/ProviderDetailsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function ProviderDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-[#F8F9FC]">
      <section className="bg-[#EEF0FF]">
        <div className="mx-auto max-w-430 px-6 py-4 sm:px-10 lg:px-19.75">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div className="grid items-end gap-12 pt-3 lg:grid-cols-[1fr_1.02fr]">
            <div className="max-w-[545px] pb-3">
              <Skeleton className="h-[166px] w-[166px] rounded-full" />
              <Skeleton className="mt-5 h-16 w-64 rounded" />
              <Skeleton className="mt-4 h-5 w-40 rounded" />
              <Skeleton className="mt-3 h-5 w-52 rounded" />
              <Skeleton className="mt-8 h-8 w-80 rounded" />
              <Skeleton className="mt-5 h-20 w-full max-w-[530px] rounded" />
            </div>
            <Skeleton className="h-[615px] w-full rounded-bl-[18px] rounded-br-[80px] rounded-tl-[140px] rounded-tr-[18px]" />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-430 gap-10 px-6 pb-16 pt-13 sm:px-10 lg:grid-cols-[1fr_377px] lg:px-16">
        <div className="min-w-0 space-y-10">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
        <Skeleton className="h-[420px] w-full rounded-2xl" />
      </div>
    </main>
  );
}
