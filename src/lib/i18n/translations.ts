export type Locale = "vi" | "en";

export const locales: Locale[] = ["vi", "en"];

export const localeLabels: Record<Locale, string> = {
  vi: "VI",
  en: "EN",
};

const vi = {
  site: {
    tagline: "Chiếc smartwatch định nghĩa lại nhịp sống của bạn",
    description:
      "Helix One là smartwatch cao cấp của Helicorp: màn hình AMOLED LTPO, pin 14 ngày, đo sức khỏe chuyên sâu và thiết kế titan siêu nhẹ. Đặt trước ngay hôm nay.",
    newGen: "Thế hệ mới",
  },
  nav: {
    features: "Tính năng",
    showcase: "Thiết kế",
    specs: "Thông số",
    testimonials: "Đánh giá",
    newsletter: "Đăng ký",
    preorder: "Đặt trước",
    openMenu: "Mở menu",
  },
  hero: {
    preorder: "Đặt trước ngay",
    explore: "Khám phá tính năng",
    stats: [
      { value: "14 ngày", label: "Thời lượng pin" },
      { value: "100+", label: "Chế độ luyện tập" },
      { value: "5ATM", label: "Chống nước" },
    ],
  },
  features: {
    eyebrow: "Tính năng nổi bật",
    title: "Mọi thứ bạn cần trên một cổ tay",
    desc: "Helix One kết hợp công nghệ cảm biến tiên tiến và thiết kế tối giản để đồng hành cùng bạn trong mọi khoảnh khắc.",
    exploreConnect: "Khám phá kết nối",
    items: [
      {
        title: "Theo dõi sức khỏe 24/7",
        desc: "Đo nhịp tim, SpO2, ECG và biến thiên nhịp tim liên tục với cảm biến BioSense thế hệ 4 — phát hiện bất thường ngay trên cổ tay.",
        stat: "BioSense Gen 4",
      },
      {
        title: "Pin 14 ngày",
        desc: "Sạc nhanh 10 phút dùng cả ngày. Chip tiết kiệm điện giúp pin bền bỉ suốt 2 tuần.",
      },
      {
        title: "Định vị GPS kép",
        desc: "Dual-band GPS định vị chính xác từng bước chạy, kể cả giữa thành phố nhiều nhà cao tầng.",
      },
      {
        title: "Chống nước 5ATM",
        desc: "Thoải mái bơi lội đến độ sâu 50m. Tự động nhận diện kiểu bơi và đếm sải tay.",
      },
      {
        title: "Phân tích giấc ngủ",
        desc: "Theo dõi các giai đoạn ngủ, điểm phục hồi và gợi ý cải thiện chất lượng giấc ngủ.",
      },
      {
        title: "Kết nối liền mạch",
        desc: "Nhận thông báo, nghe gọi và điều khiển nhạc ngay trên cổ tay với kết nối Bluetooth 5.3.",
      },
    ],
  },
  showcase: {
    eyebrow: "Thiết kế",
    title: "Vẻ đẹp đến từ từng chi tiết",
    desc: "Khung titan Grade 5 siêu nhẹ, kính sapphire chống xước và nhiều phiên bản màu để bạn thể hiện cá tính.",
    bannerTitle: "Đồng hành cùng bạn trên mọi hành trình",
    bannerDesc:
      "Từ buổi chạy sáng sớm đến cuộc họp quan trọng — Helix One luôn sẵn sàng.",
    lifestyleAlt:
      "Người dùng đeo Helix One khi chạy bộ ngoài trời lúc bình minh",
  },
  specs: {
    eyebrow: "Thông số kỹ thuật",
    title: "Sức mạnh trong từng chi tiết",
    desc: "Mọi linh kiện của Helix One được tuyển chọn để mang lại hiệu năng và độ bền vượt trội.",
    detailEyebrow: "Thông số chi tiết",
    detailTitle: "Sức mạnh trong",
    detailTitleAccent: "từng chi tiết",
    detailDesc:
      "Di chuột vào vùng thẻ bên phải và lăn chuột hoặc kéo thanh trượt bên phải để xem từng nhóm thông số.",
    scrollHint: "Hover + cuộn ↓",
    stackZoneLabel: "Vùng thẻ thông số — di chuột và lăn để xem",
    scrollProgress: "Tiến trình xem thông số",
    dragHint: "Kéo để chuyển thẻ",
    highlights: [
      { value: "3000", unit: "nits", label: "Độ sáng màn hình" },
      { value: "32", unit: "g", label: "Trọng lượng khung titan" },
      { value: "32", unit: "GB", label: "Bộ nhớ lưu trữ" },
    ],
    groups: [
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
    ],
  },
  testimonials: {
    title: "Được hơn 50.000 người tin dùng",
    desc: "Những trải nghiệm thực tế từ cộng đồng người dùng Helix One.",
    items: [
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
    ],
  },
  newsletter: {
    mapTitle: "Bản đồ",
    mapLoading: "Đang tải bản đồ...",
    hq: "Trụ sở",
    title: "Đặt trước Helix One",
    desc: "Để lại email để nhận ưu đãi đặt trước sớm và cập nhật ngày lên kệ chính thức.",
    successTitle: "Đăng ký thành công!",
    successDesc: "Cảm ơn bạn. Chúng tôi sẽ gửi thông tin sớm nhất qua email.",
    anotherEmail: "Đăng ký email khác",
    nameLabel: "Họ và tên",
    namePlaceholder: "Nguyễn Văn A",
    emailLabel: "Email",
    emailPlaceholder: "ban@email.com",
    submit: "Đăng ký nhận tin",
    submitting: "Đang gửi...",
    privacy:
      "Chúng tôi tôn trọng quyền riêng tư của bạn. Hủy đăng ký bất cứ lúc nào.",
    errorGeneric: "Có lỗi xảy ra, vui lòng thử lại.",
    errorNetwork: "Không thể kết nối máy chủ. Vui lòng thử lại sau.",
    validation: {
      nameMin: "Vui lòng nhập họ tên (ít nhất 2 ký tự).",
      emailInvalid: "Email không hợp lệ.",
    },
  },
  footer: {
    rights: "All rights reserved.",
  },
  shop: {
    addCart: "Thêm giỏ",
    addWishlist: "Thêm yêu thích",
    recordView: "Ghi nhận đã xem",
    miniShop: "Cửa hàng mini",
    close: "Đóng",
    closePanel: "Đóng panel mua sắm",
    cart: "Giỏ hàng",
    wishlist: "Yêu thích",
    viewed: "Đã xem",
    cartEmpty: "Giỏ hàng trống. Hãy thêm Helix One từ mục Thiết kế.",
    wishlistEmpty: "Chưa có sản phẩm yêu thích.",
    viewedEmpty: "Chưa xem sản phẩm nào.",
    checkout: "Thanh toán",
    continuePreorder: "Tiếp tục đặt trước",
    subtotal: "Tổng tạm tính",
    add: "Thêm",
    total: "Tổng cộng",
    addedCart: "Đã thêm vào giỏ hàng",
    addedWishlist: "Đã thêm vào yêu thích",
    removedWishlist: "Đã bỏ khỏi yêu thích",
    products: {
      "helix-black": {
        variant: "Titan Đen",
        desc: "Bản thể thao mạnh mẽ với dây silicone cao cấp.",
      },
      "helix-champagne": {
        variant: "Vàng Champagne",
        desc: "Phong cách thanh lịch cho mọi sự kiện.",
      },
    },
  },
  lang: {
    switch: "Chuyển ngôn ngữ",
    vi: "Tiếng Việt",
    en: "English",
  },
  chat: {
    greeting:
      "Xin chào! Mình là trợ lý của Helix One. Bạn muốn biết gì về sản phẩm nào ạ?",
    suggestions: [
      "Pin dùng được bao lâu?",
      "Có chống nước không?",
      "Đo được sức khỏe gì?",
    ],
    open: "Mở trợ lý tư vấn",
    close: "Đóng trợ lý",
    title: "Trợ lý Helix One",
    subtitle: "Thường trả lời ngay",
    typing: "Đang soạn trả lời...",
    placeholder: "Nhập câu hỏi của bạn...",
    send: "Gửi",
    errorReply: "Xin lỗi, mình chưa trả lời được lúc này.",
    errorNetwork: "Mất kết nối tới máy chủ. Bạn thử lại sau nhé.",
  },
};

const en: typeof vi = {
  site: {
    tagline: "The smartwatch that redefines your daily rhythm",
    description:
      "Helix One is Helicorp's premium smartwatch: LTPO AMOLED display, 14-day battery, advanced health tracking, and ultra-light titanium design. Pre-order today.",
    newGen: "New generation",
  },
  nav: {
    features: "Features",
    showcase: "Design",
    specs: "Specs",
    testimonials: "Reviews",
    newsletter: "Sign up",
    preorder: "Pre-order",
    openMenu: "Open menu",
  },
  hero: {
    preorder: "Pre-order now",
    explore: "Explore features",
    stats: [
      { value: "14 days", label: "Battery life" },
      { value: "100+", label: "Workout modes" },
      { value: "5ATM", label: "Water resistance" },
    ],
  },
  features: {
    eyebrow: "Key features",
    title: "Everything you need on one wrist",
    desc: "Helix One combines advanced sensor technology with minimalist design to accompany you in every moment.",
    exploreConnect: "Explore connectivity",
    items: [
      {
        title: "24/7 health tracking",
        desc: "Continuous heart rate, SpO2, ECG, and HRV with BioSense Gen 4 — detect anomalies right on your wrist.",
        stat: "BioSense Gen 4",
      },
      {
        title: "14-day battery",
        desc: "10-minute fast charge lasts all day. Power-efficient chip keeps you going for two weeks.",
      },
      {
        title: "Dual-band GPS",
        desc: "Accurate step-by-step tracking, even in dense urban canyons between tall buildings.",
      },
      {
        title: "5ATM water resistance",
        desc: "Swim comfortably down to 50m. Auto stroke detection and lap counting.",
      },
      {
        title: "Sleep analysis",
        desc: "Track sleep stages, recovery score, and tips to improve sleep quality.",
      },
      {
        title: "Seamless connectivity",
        desc: "Notifications, calls, and music control on your wrist via Bluetooth 5.3.",
      },
    ],
  },
  showcase: {
    eyebrow: "Design",
    title: "Beauty in every detail",
    desc: "Ultra-light Grade 5 titanium frame, scratch-resistant sapphire glass, and multiple colorways to match your style.",
    bannerTitle: "With you on every journey",
    bannerDesc:
      "From early morning runs to important meetings — Helix One is always ready.",
    lifestyleAlt: "User wearing Helix One while running outdoors at sunrise",
  },
  specs: {
    eyebrow: "Technical specs",
    title: "Power in every detail",
    desc: "Every component of Helix One is chosen for superior performance and durability.",
    detailEyebrow: "Detailed specs",
    detailTitle: "Power in",
    detailTitleAccent: "every detail",
    detailDesc:
      "Hover over the card area and scroll, or drag the scrollbar on the right to browse each spec group.",
    scrollHint: "Hover + scroll ↓",
    stackZoneLabel: "Spec cards — hover and scroll to browse",
    scrollProgress: "Spec browsing progress",
    dragHint: "Drag to switch cards",
    highlights: [
      { value: "3000", unit: "nits", label: "Display brightness" },
      { value: "32", unit: "g", label: "Titanium frame weight" },
      { value: "32", unit: "GB", label: "Storage" },
    ],
    groups: [
      {
        category: "Display",
        items: [
          { label: "Technology", value: "AMOLED LTPO" },
          { label: "Size", value: '1.5" (466 × 466)' },
          { label: "Peak brightness", value: "3000 nits" },
          { label: "Protection", value: "Sapphire Crystal" },
        ],
      },
      {
        category: "Performance & Battery",
        items: [
          { label: "Processor", value: "Helix H1 dual-core" },
          { label: "Memory", value: "32GB + 2GB RAM" },
          { label: "Battery", value: "560 mAh" },
          { label: "Battery life", value: "Up to 14 days" },
        ],
      },
      {
        category: "Health & Sensors",
        items: [
          { label: "Heart rate", value: "BioSense Gen 4" },
          { label: "SpO2", value: "Yes" },
          { label: "ECG", value: "Clinical-grade" },
          { label: "Sensors", value: "Accelerometer, gyro, compass" },
        ],
      },
      {
        category: "Connectivity & Durability",
        items: [
          { label: "Connectivity", value: "Bluetooth 5.3, Wi-Fi" },
          { label: "Positioning", value: "Dual-band GPS" },
          { label: "Water resistance", value: "5ATM + IP68" },
          { label: "Material", value: "Grade 5 Titanium" },
        ],
      },
    ],
  },
  testimonials: {
    title: "Trusted by 50,000+ users",
    desc: "Real experiences from the Helix One community.",
    items: [
      {
        quote:
          "The 14-day battery is real. I run every morning, heart rate is spot-on, and I only charge once a week.",
        name: "Minh Trí",
        role: "Runner & Coach",
      },
      {
        quote:
          "Light titanium design — comfortable for sleep. Sleep analysis is far more detailed than my old watch.",
        name: "Thu Hà",
        role: "Yoga Instructor",
      },
      {
        quote:
          "3000 nits display is readable in midday sun. Phone sync is smooth, notifications arrive instantly.",
        name: "Quốc Bảo",
        role: "Product Designer",
      },
      {
        quote:
          "Dual-band GPS locks on fast and stays accurate. No map drift on long bike rides.",
        name: "Đức Anh",
        role: "Cyclist",
      },
      {
        quote:
          "5ATM means I swim without worry. Stroke and lap counts are very accurate.",
        name: "Phương Linh",
        role: "Swimmer",
      },
      {
        quote:
          "ECG and SpO2 on my wrist give me much more confidence in daily health monitoring.",
        name: "Dr. Hoang",
        role: "Cardiologist",
      },
    ],
  },
  newsletter: {
    mapTitle: "Map",
    mapLoading: "Loading map...",
    hq: "Headquarters",
    title: "Pre-order Helix One",
    desc: "Leave your email for early-bird offers and official launch updates.",
    successTitle: "Successfully subscribed!",
    successDesc: "Thank you. We'll email you the latest updates soon.",
    anotherEmail: "Use another email",
    nameLabel: "Full name",
    namePlaceholder: "John Doe",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    submit: "Subscribe",
    submitting: "Sending...",
    privacy: "We respect your privacy. Unsubscribe anytime.",
    errorGeneric: "Something went wrong. Please try again.",
    errorNetwork: "Cannot reach server. Please try again later.",
    validation: {
      nameMin: "Please enter your name (at least 2 characters).",
      emailInvalid: "Invalid email address.",
    },
  },
  footer: {
    rights: "All rights reserved.",
  },
  shop: {
    addCart: "Add to cart",
    addWishlist: "Add to wishlist",
    recordView: "Mark as viewed",
    miniShop: "Mini shop",
    close: "Close",
    closePanel: "Close shop panel",
    cart: "Cart",
    wishlist: "Wishlist",
    viewed: "Viewed",
    cartEmpty: "Cart is empty. Add Helix One from the Design section.",
    wishlistEmpty: "No wishlist items yet.",
    viewedEmpty: "No recently viewed products.",
    checkout: "Checkout",
    continuePreorder: "Continue pre-order",
    subtotal: "Subtotal",
    add: "Add",
    total: "Total",
    addedCart: "Added to cart",
    addedWishlist: "Added to wishlist",
    removedWishlist: "Removed from wishlist",
    products: {
      "helix-black": {
        variant: "Black Titanium",
        desc: "Sport edition with premium silicone band.",
      },
      "helix-champagne": {
        variant: "Champagne Gold",
        desc: "Elegant style for every occasion.",
      },
    },
  },
  lang: {
    switch: "Switch language",
    vi: "Tiếng Việt",
    en: "English",
  },
  chat: {
    greeting:
      "Hi! I'm the Helix One assistant. What would you like to know about the product?",
    suggestions: [
      "How long does the battery last?",
      "Is it water resistant?",
      "What health metrics does it track?",
    ],
    open: "Open chat assistant",
    close: "Close chat assistant",
    title: "Helix One Assistant",
    subtitle: "Usually replies instantly",
    typing: "Typing a reply...",
    placeholder: "Ask your question...",
    send: "Send",
    errorReply: "Sorry, I couldn't reply right now.",
    errorNetwork: "Lost connection to the server. Please try again later.",
  },
};

export const translations = { vi, en } as const;
export type Translations = typeof vi;

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

export const navHrefs = [
  { key: "features" as const, href: "#features" },
  { key: "showcase" as const, href: "#showcase" },
  { key: "specs" as const, href: "#specs" },
  { key: "testimonials" as const, href: "#testimonials" },
  { key: "newsletter" as const, href: "#newsletter" },
];
