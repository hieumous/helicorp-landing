"use client";

import { SmoothFanCarousel } from "@/components/ui/smooth-fan-carousel";
import type { CardItem } from "@/components/ui/social-cards";

const connectCards: CardItem[] = [
  { imgUrl: "/images/connect-music.webp", alt: "Điều khiển nhạc trên cổ tay" },
  { imgUrl: "/images/connect-call.webp", alt: "Nghe gọi Bluetooth" },
  { imgUrl: "/images/connect-notify.webp", alt: "Thông báo thông minh" },
  { imgUrl: "/images/connect-sync.webp", alt: "Đồng bộ điện thoại" },
  { imgUrl: "/images/connect-run.webp", alt: "GPS chạy bộ" },
  { imgUrl: "/images/connect-swim.webp", alt: "Chống nước 5ATM" },
  { imgUrl: "/images/feature-connect.webp", alt: "Kết nối liền mạch" },
  { imgUrl: "/images/helix-hero.webp", alt: "Helix One Titan Đen" },
  { imgUrl: "/images/helix-rose.webp", alt: "Helix One Vàng Champagne" },
  { imgUrl: "/images/feature-health.webp", alt: "Theo dõi sức khỏe" },
  { imgUrl: "/images/helix-lifestyle.webp", alt: "Phong cách sống" },
  { imgUrl: "/images/feature-sleep.webp", alt: "Phân tích giấc ngủ" },
  { imgUrl: "/images/feature-gps.webp", alt: "Định vị GPS kép" },
  { imgUrl: "/images/feature-battery.webp", alt: "Pin 14 ngày" },
];

export function ConnectFanCards() {
  return <SmoothFanCarousel cards={connectCards} />;
}
