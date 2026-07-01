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

export function formatPrice(vnd: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(vnd);
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
