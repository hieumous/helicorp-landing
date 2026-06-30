"use client";

import dynamic from "next/dynamic";

export const LazyScrollProgress = dynamic(
  () => import("@/components/scroll-progress").then((m) => m.ScrollProgress),
  { ssr: false }
);
