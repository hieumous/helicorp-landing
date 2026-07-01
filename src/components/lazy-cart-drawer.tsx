"use client";

import dynamic from "next/dynamic";

export const LazyCartDrawer = dynamic(
  () => import("@/components/shop/cart-drawer").then((m) => m.CartDrawer),
  { ssr: false }
);
