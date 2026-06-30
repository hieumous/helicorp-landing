"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Activity, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const stats = [
  { value: "14 ngày", label: "Thời lượng pin" },
  { value: "100+", label: "Chế độ luyện tập" },
  { value: "5ATM", label: "Chống nước" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.div variants={item} className="flex justify-center lg:justify-start">
            <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1">
              <Star className="size-3.5 fill-primary text-primary" />
              Thế hệ mới · {siteConfig.name}
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient">{siteConfig.tagline}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <a
              href="#newsletter"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group h-12 w-full px-7 text-base sm:w-auto"
              )}
            >
              Đặt trước ngay
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-12 w-full px-7 text-base sm:w-auto"
              )}
            >
              Khám phá tính năng
            </a>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-border/60 pt-8"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <dt className="font-heading text-2xl font-bold sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto flex justify-center"
        >
          <WatchMockup />
        </motion.div>
      </div>
    </section>
  );
}

function WatchMockup() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 scale-110 rounded-[3rem] bg-primary/20 blur-3xl" />
      <div className="relative h-[360px] w-[280px] rounded-[3rem] border border-border/60 bg-gradient-to-br from-zinc-900 to-black p-3 shadow-2xl sm:h-[420px] sm:w-[320px]">
        <div className="absolute -right-1 top-24 h-12 w-1.5 rounded-r bg-zinc-700" />
        <div className="flex h-full w-full flex-col justify-between rounded-[2.4rem] bg-black p-6 text-white">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>9:41</span>
            <span className="font-mono">Mon 30</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="font-heading text-5xl font-bold tracking-tight">
              09:41
            </span>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-rose-400">
                <Heart className="size-4 fill-rose-400" />
                <span className="text-sm font-medium">72</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Activity className="size-4" />
                <span className="text-sm font-medium">8.2k</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Ring color="bg-rose-500" w="w-[85%]" label="Vận động" />
            <Ring color="bg-emerald-500" w="w-[60%]" label="Calo" />
            <Ring color="bg-sky-500" w="w-[40%]" label="Đứng" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Ring({ color, w, label }: { color: string; w: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 shrink-0 text-[10px] text-zinc-400">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
        <div className={`h-full rounded-full ${color} ${w}`} />
      </div>
    </div>
  );
}
