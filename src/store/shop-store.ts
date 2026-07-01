"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";

export type CartItem = Product & { quantity: number };

type DrawerTab = "cart" | "wishlist" | "viewed";

type ShopState = {
  cart: CartItem[];
  wishlist: Product[];
  recentlyViewed: Product[];
  drawerOpen: boolean;
  drawerTab: DrawerTab;
  openDrawer: (tab?: DrawerTab) => void;
  closeDrawer: () => void;
  setDrawerTab: (tab: DrawerTab) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (product: Product) => boolean;
  isWishlisted: (id: string) => boolean;
  recordView: (product: Product) => void;
  cartCount: () => number;
  cartTotal: () => number;
};

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      recentlyViewed: [],
      drawerOpen: false,
      drawerTab: "cart",

      openDrawer: (tab = "cart") =>
        set({ drawerOpen: true, drawerTab: tab }),
      closeDrawer: () => set({ drawerOpen: false }),
      setDrawerTab: (tab) => set({ drawerTab: tab }),

      addToCart: (product) => {
        set((s) => {
          const existing = s.cart.find((i) => i.id === product.id);
          if (existing) {
            return {
              cart: s.cart.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { cart: [...s.cart, { ...product, quantity: 1 }] };
        });
        get().recordView(product);
      },

      removeFromCart: (id) =>
        set((s) => ({ cart: s.cart.filter((i) => i.id !== id) })),

      setQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(id);
          return;
        }
        set((s) => ({
          cart: s.cart.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      toggleWishlist: (product) => {
        const exists = get().wishlist.some((p) => p.id === product.id);
        set((s) => ({
          wishlist: exists
            ? s.wishlist.filter((p) => p.id !== product.id)
            : [...s.wishlist, product],
        }));
        get().recordView(product);
        return !exists;
      },

      isWishlisted: (id) => get().wishlist.some((p) => p.id === id),

      recordView: (product) =>
        set((s) => {
          const filtered = s.recentlyViewed.filter((p) => p.id !== product.id);
          return {
            recentlyViewed: [product, ...filtered].slice(0, 6),
          };
        }),

      cartCount: () => get().cart.reduce((n, i) => n + i.quantity, 0),
      cartTotal: () =>
        get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "helix-shop",
      partialize: (s) => ({
        cart: s.cart,
        wishlist: s.wishlist,
        recentlyViewed: s.recentlyViewed,
      }),
    }
  )
);
