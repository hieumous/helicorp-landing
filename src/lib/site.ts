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
  { label: "Thiết kế", href: "#showcase" },
  { label: "Thông số", href: "#specs" },
  { label: "Đánh giá", href: "#testimonials" },
  { label: "Đăng ký", href: "#newsletter" },
] as const;

export const specGroups = [
  {
    category: "Màn hình",
    items: [
      { label: "Công nghệ", value: "AMOLED LTPO" },
      { label: "Kích thước", value: '1.5" (466 × 466)' },
      { label: "Độ sáng tối đa", value: "3000 nits" },
      { label: "Kính bảo vệ", value: "Sapphire Crystal" },
    ],
  },
  {
    category: "Hiệu năng & Pin",
    items: [
      { label: "Chip xử lý", value: "Helix H1 dual-core" },
      { label: "Bộ nhớ", value: "32GB + 2GB RAM" },
      { label: "Dung lượng pin", value: "560 mAh" },
      { label: "Thời lượng", value: "Tối đa 14 ngày" },
    ],
  },
  {
    category: "Sức khỏe & Cảm biến",
    items: [
      { label: "Nhịp tim", value: "BioSense Gen 4" },
      { label: "Đo SpO2", value: "Có" },
      { label: "Điện tâm đồ", value: "ECG chuẩn y tế" },
      { label: "Cảm biến", value: "Gia tốc, con quay, la bàn" },
    ],
  },
  {
    category: "Kết nối & Bền bỉ",
    items: [
      { label: "Kết nối", value: "Bluetooth 5.3, Wi-Fi" },
      { label: "Định vị", value: "GPS dual-band" },
      { label: "Chống nước", value: "5ATM + IP68" },
      { label: "Chất liệu", value: "Khung Titan Grade 5" },
    ],
  },
] as const;

export const testimonials = [
  {
    quote:
      "Pin 14 ngày là thật. Mình chạy bộ mỗi sáng, đo nhịp tim cực chính xác mà cả tuần mới phải sạc một lần.",
    name: "Minh Trí",
    role: "Runner & Coach",
  },
  {
    quote:
      "Thiết kế titan nhẹ, đeo ngủ không hề khó chịu. Phần phân tích giấc ngủ chi tiết hơn hẳn chiếc đồng hồ cũ của mình.",
    name: "Thu Hà",
    role: "Yoga Instructor",
  },
  {
    quote:
      "Màn hình sáng 3000 nits nhìn rõ giữa trưa nắng. Kết nối điện thoại mượt, nhận thông báo tức thì.",
    name: "Quốc Bảo",
    role: "Product Designer",
  },
  {
    quote:
      "GPS dual-band bắt vị trí cực nhanh và chính xác. Mình đạp xe đường dài mà bản đồ không hề lệch.",
    name: "Đức Anh",
    role: "Cyclist",
  },
  {
    quote:
      "Chống nước 5ATM nên mình đeo đi bơi thoải mái. Tự đếm sải tay và quãng bơi rất chuẩn.",
    name: "Phương Linh",
    role: "Swimmer",
  },
  {
    quote:
      "Đo ECG và SpO2 ngay trên cổ tay giúp mình theo dõi sức khỏe hằng ngày yên tâm hơn hẳn.",
    name: "Bác sĩ Hoàng",
    role: "Cardiologist",
  },
] as const;
