"use client";

import * as React from "react";
import { toast } from "sonner";
import { buildEvent, trackEvent } from "@/lib/analytics";

const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

const SCROLL_LABELS: Record<number, string> = {
  25: "Bạn đã cuộn 25% trang",
  50: "Bạn đã cuộn nửa trang — khám phá thêm tính năng!",
  75: "Gần hết rồi — xem đánh giá người dùng nhé",
  100: "Bạn đã xem toàn bộ trang Helix One",
};

export function BehaviorTracker() {
  const hitScroll = React.useRef<Set<number>>(new Set());

  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);

      for (const m of SCROLL_MILESTONES) {
        if (pct >= m && !hitScroll.current.has(m)) {
          hitScroll.current.add(m);
          const ev = buildEvent("scroll", `scroll_${m}`, { percent: m });
          trackEvent(ev);
          toast.info(SCROLL_LABELS[m], { duration: 3500 });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (!el) return;
      const name = el.dataset.track;
      if (!name) return;

      const ev = buildEvent("click", name, {
        tag: el.tagName.toLowerCase(),
        href: el.getAttribute("href") ?? "",
      });
      trackEvent(ev);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
