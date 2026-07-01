"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type StackCardItem = {
  src: string;
  alt: string;
};

const DEFAULT_CARDS: StackCardItem[] = [
  {
    src: "/images/helix-hero.webp",
    alt: "Đồng hồ thông minh Helix One màn hình AMOLED hiển thị nhịp tim và số bước chân",
  },
  {
    src: "/images/helix-rose.webp",
    alt: "Helix One phiên bản Vàng Champagne",
  },
  {
    src: "/images/helix-lifestyle.webp",
    alt: "Helix One trên cổ tay trong đời sống hàng ngày",
  },
  {
    src: "/images/feature-health.webp",
    alt: "Theo dõi sức khỏe trên Helix One",
  },
  {
    src: "/images/feature-connect.webp",
    alt: "Kết nối Bluetooth trên Helix One",
  },
];

function getStackStyle(stackPos: number, total: number) {
  return {
    zIndex: total - stackPos,
    rotate: stackPos * 5,
    y: stackPos * 18,
    x: stackPos * 8,
    scale: 1 - stackPos * 0.04,
    opacity: Math.max(0.65, 1 - stackPos * 0.08),
  };
}

export function HeroStackCard({
  cards = DEFAULT_CARDS,
  className,
  intervalMs = 3200,
}: {
  cards?: StackCardItem[];
  className?: string;
  intervalMs?: number;
}) {
  const total = cards.length;
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [paused, setPaused] = useState(false);

  const bringToFront = (cardIndex: number) => {
    setOrder((prev) => {
      const pos = prev.indexOf(cardIndex);
      if (pos <= 0) return prev;
      const next = [...prev];
      next.splice(pos, 1);
      next.unshift(cardIndex);
      return next;
    });
  };

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        next.push(next.shift()!);
        return next;
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [intervalMs, paused]);

  return (
    <div
      className={cn(
        "animate-float relative mx-auto w-full max-w-[560px]",
        className
      )}
      style={{ minHeight: 340 + (total - 1) * 18 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Bộ sưu tập ảnh sản phẩm Helix One"
    >
      {cards.map((card, i) => {
        const stackPos = order.indexOf(i);
        const style = getStackStyle(stackPos, total);

        return (
          <div
            key={card.src}
            role="button"
            tabIndex={0}
            aria-label={card.alt}
            className="absolute inset-x-0 top-0 origin-top cursor-pointer overflow-hidden rounded-3xl border border-white/10 shadow-2xl ring-1 ring-black/5 transition-[transform,opacity,box-shadow] duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:shadow-primary/20"
            style={{
              zIndex: style.zIndex,
              transform: `translate(${style.x}px, ${style.y}px) rotate(${style.rotate}deg) scale(${style.scale})`,
              opacity: style.opacity,
            }}
            onClick={() => bringToFront(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                bringToFront(i);
              }
            }}
          >
            <Image
              src={card.src}
              alt={card.alt}
              width={1024}
              height={683}
              priority={i === 0}
              quality={80}
              sizes="(max-width: 1024px) 90vw, 560px"
              className="h-auto w-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}

/** Alias tương thích API 21st.dev / itsankitverma/stack-card */
export const ScrollTriggered = HeroStackCard;
