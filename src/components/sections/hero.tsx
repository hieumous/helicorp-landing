"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/motion/count-up";
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
  { to: 14, suffix: " ngày", label: "Thời lượng pin" },
  { to: 100, suffix: "+", label: "Chế độ luyện tập" },
  { to: 5, suffix: "ATM", label: "Chống nước" },
];

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <motion.div
        style={{ scale: glowScale }}
        className="absolute left-1/2 top-24 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
      />

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
                "group h-12 w-full px-7 text-base transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
              )}
            >
              Đặt trước ngay
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-12 w-full px-7 text-base transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
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
                  <CountUp to={s.to} suffix={s.suffix} />
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          style={{ y: imageY, opacity: imageOpacity }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto flex justify-center"
        >
          <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-primary/20 blur-3xl" />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-[560px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl ring-1 ring-black/5"
          >
            <Image
              src="/images/helix-hero.png"
              alt="Đồng hồ thông minh Helix One màn hình AMOLED hiển thị nhịp tim và số bước chân"
              width={1024}
              height={683}
              priority
              sizes="(max-width: 1024px) 90vw, 560px"
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
