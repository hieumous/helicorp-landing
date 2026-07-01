"use client";

import * as React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useShopStore } from "@/store/shop-store";

function Badge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
      {count > 9 ? "9+" : count}
    </span>
  );
}

export function ShopToolbar({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const openDrawer = useShopStore((s) => s.openDrawer);
  const cartCount = useShopStore((s) => s.cartCount());
  const wishCount = useShopStore((s) => s.wishlist.length);

  React.useEffect(() => setMounted(true), []);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Yêu thích"
        className="relative"
        onClick={() => openDrawer("wishlist")}
      >
        <Heart className="size-5" />
        <Badge count={mounted ? wishCount : 0} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Giỏ hàng"
        className="relative"
        onClick={() => openDrawer("cart")}
      >
        <ShoppingBag className="size-5" />
        <Badge count={mounted ? cartCount : 0} />
      </Button>
    </div>
  );
}
