import {
  HeartPulse,
  BatteryCharging,
  MapPin,
  Waves,
  Moon,
  Smartphone,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: HeartPulse,
    title: "Theo dõi sức khỏe 24/7",
    desc: "Đo nhịp tim, SpO2, ECG và biến thiên nhịp tim liên tục với cảm biến BioSense thế hệ 4.",
  },
  {
    icon: BatteryCharging,
    title: "Pin 14 ngày",
    desc: "Sạc nhanh 10 phút dùng cả ngày. Chip tiết kiệm điện giúp pin bền bỉ suốt 2 tuần.",
  },
  {
    icon: MapPin,
    title: "Định vị GPS kép",
    desc: "Dual-band GPS định vị chính xác từng bước chạy, kể cả giữa thành phố nhiều nhà cao tầng.",
  },
  {
    icon: Waves,
    title: "Chống nước 5ATM",
    desc: "Thoải mái bơi lội đến độ sâu 50m. Tự động nhận diện kiểu bơi và đếm sải tay.",
  },
  {
    icon: Moon,
    title: "Phân tích giấc ngủ",
    desc: "Theo dõi các giai đoạn ngủ, điểm phục hồi và đưa ra gợi ý cải thiện chất lượng giấc ngủ.",
  },
  {
    icon: Smartphone,
    title: "Kết nối liền mạch",
    desc: "Nhận thông báo, nghe gọi và điều khiển nhạc ngay trên cổ tay với kết nối Bluetooth 5.3.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-medium text-primary">Tính năng nổi bật</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Mọi thứ bạn cần trên một cổ tay
          </h2>
          <p className="mt-4 text-muted-foreground">
            Helix One kết hợp công nghệ cảm biến tiên tiến và thiết kế tối giản để
            đồng hành cùng bạn trong mọi khoảnh khắc.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.1}>
              <Card className="group relative h-full overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent className="flex flex-col gap-4 p-6">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <f.icon className="size-6" />
                  </span>
                  <h3 className="font-heading text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
