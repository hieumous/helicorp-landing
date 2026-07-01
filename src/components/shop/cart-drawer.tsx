"use client";

import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag, Heart, Clock } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/products";
import { useShopStore } from "@/store/shop-store";

const tabs = [
  { id: "cart" as const, label: "Giỏ hàng", icon: ShoppingBag },
  { id: "wishlist" as const, label: "Yêu thích", icon: Heart },
  { id: "viewed" as const, label: "Đã xem", icon: Clock },
];

export function CartDrawer() {
  const open = useShopStore((s) => s.drawerOpen);
  const tab = useShopStore((s) => s.drawerTab);
  const closeDrawer = useShopStore((s) => s.closeDrawer);
  const setDrawerTab = useShopStore((s) => s.setDrawerTab);
  const cart = useShopStore((s) => s.cart);
  const wishlist = useShopStore((s) => s.wishlist);
  const recentlyViewed = useShopStore((s) => s.recentlyViewed);
  const setQuantity = useShopStore((s) => s.setQuantity);
  const removeFromCart = useShopStore((s) => s.removeFromCart);
  const addToCart = useShopStore((s) => s.addToCart);
  const cartTotal = useShopStore((s) => s.cartTotal);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Đóng panel mua sắm"
        className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
        onClick={closeDrawer}
      />
      <aside
        role="dialog"
        aria-label="Mini shop Helix One"
        className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col border-l border-border/60 bg-background shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <h2 className="font-heading text-lg font-semibold">Cửa hàng mini</h2>
          <Button variant="ghost" size="icon" onClick={closeDrawer} aria-label="Đóng">
            <X className="size-5" />
          </Button>
        </div>

        <div className="flex border-b border-border/60">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setDrawerTab(t.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors",
                tab === t.id
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <t.icon className="size-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {tab === "cart" && (
            <>
              {cart.length === 0 ? (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  Giỏ hàng trống. Hãy thêm Helix One từ mục Thiết kế.
                </p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 rounded-xl border border-border/60 p-3"
                    >
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.variant}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{item.variant}</p>
                        <p className="text-xs text-muted-foreground">{formatPrice(item.price)}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-7"
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="size-3" />
                          </Button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-7"
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="size-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto size-7 text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {tab === "wishlist" && (
            <>
              {wishlist.length === 0 ? (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  Chưa có sản phẩm yêu thích.
                </p>
              ) : (
                <ul className="space-y-3">
                  {wishlist.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center gap-3 rounded-xl border border-border/60 p-3"
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                        <Image src={p.image} alt={p.variant} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{p.variant}</p>
                        <p className="text-xs text-primary">{formatPrice(p.price)}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => addToCart(p)}>
                        Thêm
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {tab === "viewed" && (
            <>
              {recentlyViewed.length === 0 ? (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  Bạn chưa xem sản phẩm nào.
                </p>
              ) : (
                <ul className="space-y-3">
                  {recentlyViewed.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center gap-3 rounded-xl border border-border/60 p-3"
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                        <Image src={p.image} alt={p.variant} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{p.variant}</p>
                        <p className="text-xs text-muted-foreground">{formatPrice(p.price)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

        {tab === "cart" && cart.length > 0 && (
          <div className="border-t border-border/60 p-5">
            <div className="mb-4 flex justify-between text-sm">
              <span className="text-muted-foreground">Tổng tạm tính</span>
              <span className="font-semibold">{formatPrice(cartTotal())}</span>
            </div>
            <a
              href="#newsletter"
              onClick={closeDrawer}
              className={cn(buttonVariants(), "w-full")}
              data-track="checkout_cta"
            >
              Tiếp tục đặt trước
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
