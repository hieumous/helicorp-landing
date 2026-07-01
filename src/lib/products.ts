import type { Locale } from "@/lib/i18n/translations";
import { getTranslations } from "@/lib/i18n/translations";

export type Product = {
  id: string;
  name: string;
  variant: string;
  desc: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: "helix-black",
    name: "Helix One",
    variant: "Titan Đen",
    desc: "Bản thể thao mạnh mẽ với dây silicone cao cấp.",
    price: 9_990_000,
    image: "/images/helix-hero.webp",
  },
  {
    id: "helix-champagne",
    name: "Helix One",
    variant: "Vàng Champagne",
    desc: "Phong cách thanh lịch cho mọi sự kiện.",
    price: 10_490_000,
    image: "/images/helix-rose.webp",
  },
];

export const defaultProduct = products[0];

export function formatPrice(vnd: number, locale: Locale = "vi") {
  return new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(vnd);
}

export function localizeProduct(product: Product, locale: Locale): Product {
  const productsCopy = getTranslations(locale).shop.products;
  const copy =
    productsCopy[product.id as keyof typeof productsCopy] ?? null;
  if (!copy) return product;
  return { ...product, variant: copy.variant, desc: copy.desc };
}

export function getLocalizedProducts(locale: Locale): Product[] {
  return products.map((p) => localizeProduct(p, locale));
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
