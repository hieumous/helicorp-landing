"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice, type Product } from "@/lib/products";
import { useShopStore } from "@/store/shop-store";
import { buildEvent, trackEvent } from "@/lib/analytics";
import { useTranslations } from "@/hooks/use-translations";

type ProductActionsProps = {
  product: Product;
  layout?: "row" | "stack";
  className?: string;
};

export function ProductActions({
  product,
  layout = "row",
  className,
}: ProductActionsProps) {
  const { t, locale } = useTranslations();
  const addToCart = useShopStore((s) => s.addToCart);
  const toggleWishlist = useShopStore((s) => s.toggleWishlist);
  const isWishlisted = useShopStore((s) => s.isWishlisted(product.id));
  const recordView = useShopStore((s) => s.recordView);
  const openDrawer = useShopStore((s) => s.openDrawer);

  const onAddCart = () => {
    addToCart(product);
    trackEvent(
      buildEvent("shop", "add_to_cart", {
        productId: product.id,
        variant: product.variant,
        price: product.price,
      })
    );
    toast.success(t.shop.addedCart);
    openDrawer("cart");
  };

  const onWishlist = () => {
    const added = toggleWishlist(product);
    trackEvent(
      buildEvent("shop", added ? "add_wishlist" : "remove_wishlist", {
        productId: product.id,
      })
    );
    toast(added ? t.shop.addedWishlist : t.shop.removedWishlist);
  };

  const onView = () => {
    recordView(product);
    trackEvent(buildEvent("shop", "view_product", { productId: product.id }));
  };

  return (
    <div
      className={cn(
        "flex gap-2",
        layout === "stack" ? "flex-col" : "flex-wrap items-center",
        className
      )}
    >
      <Button size="sm" className="gap-1.5" onClick={onAddCart}>
        <ShoppingCart className="size-4" />
        {t.shop.addCart} — {formatPrice(product.price, locale)}
      </Button>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          aria-label={t.shop.addWishlist}
          onClick={onWishlist}
          className={cn(isWishlisted && "border-primary text-primary")}
        >
          <Heart className={cn("size-4", isWishlisted && "fill-current")} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          aria-label={t.shop.recordView}
          onClick={onView}
        >
          <Eye className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { locale } = useTranslations();
  const recordView = useShopStore((s) => s.recordView);

  return (
    <div className="group overflow-hidden rounded-3xl border border-border/60">
      <button
        type="button"
        className="relative block aspect-[3/2] w-full overflow-hidden text-left"
        onClick={() => recordView(product)}
      >
        <Image
          src={product.image}
          alt={`Helix One ${product.variant}`}
          fill
          sizes="(max-width: 640px) 100vw, 600px"
          loading="lazy"
          quality={75}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </button>
      <div className="space-y-4 bg-card p-6">
        <div>
          <h3 className="font-heading text-lg font-semibold">{product.variant}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.desc}</p>
          <p className="mt-2 font-semibold text-primary">
            {formatPrice(product.price, locale)}
          </p>
        </div>
        <ProductActions product={product} />
      </div>
    </div>
  );
}
