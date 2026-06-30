"use client";

import dynamic from "next/dynamic";

export const LazyToaster = dynamic(
  () => import("@/components/ui/sonner").then((m) => m.Toaster),
  { ssr: false }
);
