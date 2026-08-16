// src/hooks/useInfiniteScroll.ts
import { useEffect, useRef } from "react";

interface Options {
  onIntersect: () => void;
  enabled: boolean; // e.g. false while loading or when there's no next page
  root?: Element | null;
  rootMargin?: string;
}

/**
 * Attaches an IntersectionObserver to a sentinel element. When the sentinel
 * scrolls into view (root defaults to the nearest scrollable ancestor via
 * `root`), `onIntersect` fires. Pass `enabled={false}` to pause it (e.g.
 * while a page is already loading, or once every result has been fetched).
 */
export function useInfiniteScroll<T extends HTMLElement>({
  onIntersect,
  enabled,
  root = null,
  rootMargin = "200px",
}: Options) {
  const sentinelRef = useRef<T | null>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect();
        }
      },
      { root, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, root, rootMargin]);

  return sentinelRef;
}
