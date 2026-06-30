export const siteConfig = {
  name: "Helix One",
  brand: "Helicorp",
  tagline: "Chiếc smartwatch định nghĩa lại nhịp sống của bạn",
  description:
    "Helix One là smartwatch cao cấp của Helicorp: màn hình AMOLED LTPO, pin 14 ngày, đo sức khỏe chuyên sâu và thiết kế titan siêu nhẹ. Đặt trước ngay hôm nay.",
  url: "https://helix-one.vercel.app",
  ogImage: "/og.png",
  email: "hello@helicorp.io",
  links: {
    github: "https://github.com/",
  },
} as const;

export const navLinks = [
  { label: "Tính năng", href: "#features" },
  { label: "Thông số", href: "#specs" },
  { label: "Đánh giá", href: "#testimonials" },
  { label: "Đăng ký", href: "#newsletter" },
] as const;
