import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

const colorways = [
  {
    name: "Titan Đen",
    desc: "Bản thể thao mạnh mẽ với dây silicone cao cấp.",
    src: "/images/helix-hero.webp",
  },
  {
    name: "Vàng Champagne",
    desc: "Phong cách thanh lịch cho mọi sự kiện.",
    src: "/images/helix-rose.webp",
  },
];

export function Showcase() {
  return (
    <section id="showcase" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-medium text-primary">Thiết kế</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Vẻ đẹp đến từ từng chi tiết
          </h2>
          <p className="mt-4 text-muted-foreground">
            Khung titan Grade 5 siêu nhẹ, kính sapphire chống xước và nhiều phiên
            bản màu để bạn thể hiện cá tính.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative h-[320px] overflow-hidden rounded-3xl border border-border/60 sm:h-[440px]">
            <Image
              src="/images/helix-lifestyle.webp"
              alt="Người dùng đeo Helix One khi chạy bộ ngoài trời lúc bình minh"
              fill
              sizes="(max-width: 1280px) 100vw, 1216px"
              loading="lazy"
              quality={75}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-10">
              <p className="max-w-md font-heading text-2xl font-bold text-white sm:text-3xl">
                Đồng hành cùng bạn trên mọi hành trình
              </p>
              <p className="mt-2 max-w-md text-sm text-white/80">
                Từ buổi chạy sáng sớm đến cuộc họp quan trọng — Helix One luôn sẵn
                sàng.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {colorways.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <div className="group overflow-hidden rounded-3xl border border-border/60">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={c.src}
                    alt={`Helix One phiên bản ${c.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 600px"
                    loading="lazy"
                    quality={75}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="bg-card p-6">
                  <h3 className="font-heading text-lg font-semibold">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
