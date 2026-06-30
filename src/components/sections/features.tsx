import Image from "next/image";
import {
  HeartPulse,
  BatteryCharging,
  MapPin,
  Waves,
  Moon,
  Smartphone,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FlipCard } from "@/components/ui/flip-card";
import { cn } from "@/lib/utils";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  stat?: string;
  image?: string;
  span: "feature" | "wide" | "base";
};

const features: Feature[] = [
  {
    icon: HeartPulse,
    title: "Theo dõi sức khỏe 24/7",
    desc: "Đo nhịp tim, SpO2, ECG và biến thiên nhịp tim liên tục với cảm biến BioSense thế hệ 4 — phát hiện bất thường ngay trên cổ tay.",
    stat: "BioSense Gen 4",
    image: "/images/feature-health.webp",
    span: "feature",
  },
  {
    icon: BatteryCharging,
    title: "Pin 14 ngày",
    desc: "Sạc nhanh 10 phút dùng cả ngày. Chip tiết kiệm điện giúp pin bền bỉ suốt 2 tuần.",
    image: "/images/feature-battery.webp",
    span: "base",
  },
  {
    icon: MapPin,
    title: "Định vị GPS kép",
    desc: "Dual-band GPS định vị chính xác từng bước chạy, kể cả giữa thành phố nhiều nhà cao tầng.",
    image: "/images/feature-gps.webp",
    span: "base",
  },
  {
    icon: Waves,
    title: "Chống nước 5ATM",
    desc: "Thoải mái bơi lội đến độ sâu 50m. Tự động nhận diện kiểu bơi và đếm sải tay.",
    image: "/images/feature-water.webp",
    span: "base",
  },
  {
    icon: Moon,
    title: "Phân tích giấc ngủ",
    desc: "Theo dõi các giai đoạn ngủ, điểm phục hồi và gợi ý cải thiện chất lượng giấc ngủ.",
    image: "/images/feature-sleep.webp",
    span: "base",
  },
  {
    icon: Smartphone,
    title: "Kết nối liền mạch",
    desc: "Nhận thông báo, nghe gọi và điều khiển nhạc ngay trên cổ tay với kết nối Bluetooth 5.3.",
    image: "/images/feature-connect.webp",
    span: "wide",
  },
];

const spanClass: Record<Feature["span"], string> = {
  feature: "lg:col-span-2",
  wide: "lg:col-span-3",
  base: "",
};

function IconChip({
  icon: Icon,
  big,
}: {
  icon: LucideIcon;
  big?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground",
        big && "size-14"
      )}
    >
      <Icon className={cn("size-6", big && "size-7")} />
    </span>
  );
}

function FeatureTile({ f }: { f: Feature }) {
  const Icon = f.icon;

  /* Ô lớn: ảnh banner phía trên + nội dung bên dưới */
  if (f.span === "feature") {
    return (
      <SpotlightCard>
        <div className="flex h-full flex-col">
          <div className="relative h-48 w-full overflow-hidden bg-[#0a0a12] sm:h-56">
            {f.image && (
              <Image
                src={f.image}
                alt={f.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                loading="lazy"
                quality={75}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3 p-7 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <IconChip icon={Icon} big />
              <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                {f.title}
              </h3>
              {f.stat && (
                <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                  {f.stat}
                </span>
              )}
            </div>
            <p className="max-w-xl text-base leading-relaxed text-foreground/70">
              {f.desc}
            </p>
          </div>
        </div>
      </SpotlightCard>
    );
  }

  /* Ô ngang: nội dung trái + ảnh phải */
  if (f.span === "wide") {
    return (
      <SpotlightCard>
        <div className="grid h-full lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center gap-3 p-7 lg:order-1 lg:p-8">
            <IconChip icon={Icon} big />
            <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              {f.title}
            </h3>
            <p className="max-w-md text-base leading-relaxed text-foreground/70">
              {f.desc}
            </p>
            <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
              Khám phá kết nối <ArrowRight className="size-4" />
            </span>
          </div>
          <div className="relative order-1 h-52 overflow-hidden bg-[#0a0a12] lg:order-2 lg:h-auto">
            {f.image && (
              <Image
                src={f.image}
                alt={f.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                loading="lazy"
                quality={75}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>
        </div>
      </SpotlightCard>
    );
  }

  /* Ô chuẩn: flip card lật lộ ảnh khi hover */
  return (
    <FlipCard
      icon={<Icon className="size-6" />}
      title={f.title}
      desc={f.desc}
      image={f.image ?? ""}
    />
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-semibold uppercase tracking-wider text-primary">
            Tính năng nổi bật
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Mọi thứ bạn cần trên một cổ tay
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Helix One kết hợp công nghệ cảm biến tiên tiến và thiết kế tối giản để
            đồng hành cùng bạn trong mọi khoảnh khắc.
          </p>
        </Reveal>

        <div className="mt-14 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={(i % 3) * 0.08}
              className={cn("h-full", spanClass[f.span])}
            >
              <FeatureTile f={f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
