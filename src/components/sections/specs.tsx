import {
  MonitorSmartphone,
  Cpu,
  HeartPulse,
  Wifi,
  Gauge,
  Feather,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { specGroups } from "@/lib/site";

const categoryIcons: Record<string, typeof Cpu> = {
  "Màn hình": MonitorSmartphone,
  "Hiệu năng & Pin": Cpu,
  "Sức khỏe & Cảm biến": HeartPulse,
  "Kết nối & Bền bỉ": Wifi,
};

const highlights = [
  { icon: Gauge, value: "3000", unit: "nits", label: "Độ sáng màn hình" },
  { icon: Feather, value: "32", unit: "g", label: "Trọng lượng khung titan" },
  { icon: Cpu, value: "32", unit: "GB", label: "Bộ nhớ lưu trữ" },
];

export function Specs() {
  return (
    <section
      id="specs"
      className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-medium text-primary">Thông số kỹ thuật</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Sức mạnh trong từng chi tiết
          </h2>
          <p className="mt-4 text-muted-foreground">
            Mọi linh kiện của Helix One được tuyển chọn để mang lại hiệu năng và độ
            bền vượt trội.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 0.1}>
              <Card className="flex flex-col items-center gap-2 border-border/60 p-6 text-center">
                <h.icon className="size-7 text-primary" />
                <p className="font-heading text-4xl font-bold tracking-tight">
                  {h.value}
                  <span className="ml-1 text-xl text-muted-foreground">
                    {h.unit}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">{h.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {specGroups.map((group, i) => {
            const Icon = categoryIcons[group.category] ?? Cpu;
            return (
              <Reveal key={group.category} delay={(i % 2) * 0.1}>
                <Card className="h-full border-border/60 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-heading text-lg font-semibold">
                      {group.category}
                    </h3>
                  </div>
                  <dl className="divide-y divide-border/60">
                    {group.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-4 py-2.5"
                      >
                        <dt className="text-sm text-muted-foreground">
                          {item.label}
                        </dt>
                        <dd className="text-right text-sm font-medium">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
