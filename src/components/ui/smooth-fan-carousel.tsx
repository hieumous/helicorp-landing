"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import type { CardItem } from "@/components/ui/social-cards";

const HALF = 3;
const VISIBLE_RADIUS = 3.55;
/** Tốc độ xoay: số thẻ/giây (kim đồng hồ) */
const SPIN_SPEED = 0.35;
/** Phóng to khi hover (gấp so với kích thước thẻ đang hiển thị) */
const HOVER_SCALE = 4;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7, scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0, scale: 1.0, x: 0, y: 0.0, zIndex: 10 },
  { rot: 7, scale: 0.9346, x: 11, y: 1.3, zIndex: 3 },
  { rot: 14, scale: 0.8498, x: 22, y: 4.0, zIndex: 2 },
  { rot: 21, scale: 0.7756, x: 30, y: 7.3, zIndex: 1 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function interpolateFan(slotFloat: number) {
  const s = Math.max(0, Math.min(6, slotFloat));
  const i0 = Math.floor(s);
  const i1 = Math.min(6, i0 + 1);
  const t = s - i0;
  const a = FAN_POSITIONS[i0];
  const b = FAN_POSITIONS[i1];
  return {
    rot: lerp(a.rot, b.rot, t),
    scale: lerp(a.scale, b.scale, t),
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    zIndex: Math.round(lerp(a.zIndex, b.zIndex, t)),
  };
}

function wrapRel(index: number, offset: number, total: number) {
  let rel = index - offset;
  const half = total / 2;
  while (rel > half) rel -= total;
  while (rel < -half) rel += total;
  return rel;
}

function getEmbeddedXMult(width: number) {
  if (width < 480) return 0.42;
  if (width < 640) return 0.52;
  if (width < 1024) return 0.62;
  return 0.68;
}

interface SmoothFanCarouselProps {
  cards: CardItem[];
  className?: string;
}

export function SmoothFanCarousel({ cards, className }: SmoothFanCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const offsetRef = useRef(0);
  const hoveredRef = useRef<number | null>(null);
  const readyRef = useRef(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const total = cards.length;
    if (!total) return;

    const getCardTransform = (index: number) => {
      const xMult = getEmbeddedXMult(window.innerWidth);
      const offset = offsetRef.current;
      const rel = wrapRel(index, offset, total);
      const absRel = Math.abs(rel);

      if (absRel > VISIBLE_RADIUS) return null;

      const slotFloat = rel + HALF;
      const { x, y, rot, scale, zIndex } = interpolateFan(slotFloat);

      let opacity = 1;
      if (absRel > VISIBLE_RADIUS - 0.35) {
        opacity = Math.max(0, (VISIBLE_RADIUS - absRel) / 0.35);
      }

      return {
        rel,
        absRel,
        x: x * xMult,
        y,
        rot,
        scale,
        zIndex,
        opacity,
      };
    };

    const apply = () => {
      const hovered = hoveredRef.current;

      cards.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;

        if (hovered === i) {
          el.dataset.hovered = "true";
          return;
        }

        const t = getCardTransform(i);
        if (!t) {
          gsap.set(el, {
            opacity: 0,
            scale: 0.35,
            pointerEvents: "none",
          });
          el.dataset.hovered = "false";
          return;
        }

        const dimmed = hovered !== null;

        gsap.set(el, {
          x: `${t.x}rem`,
          y: `${t.y}rem`,
          rotation: t.rot,
          scale: t.scale,
          opacity: dimmed ? t.opacity * 0.3 : t.opacity,
          zIndex: t.zIndex,
          pointerEvents: t.opacity > 0.4 ? "auto" : "none",
        });
        el.dataset.hovered = "false";
      });
    };

    const zoomCard = (index: number) => {
      const el = cardRefs.current[index];
      const t = getCardTransform(index);
      if (!el || !t) return;

      gsap.to(el, {
        x: `${t.x}rem`,
        y: `${t.y - 2.5}rem`,
        rotation: 0,
        scale: t.scale * HOVER_SCALE,
        opacity: 1,
        zIndex: 9999,
        duration: 0.48,
        ease: "power3.out",
        overwrite: true,
      });
      el.dataset.hovered = "true";
    };

    const resetCard = (index: number) => {
      const el = cardRefs.current[index];
      const t = getCardTransform(index);
      if (!el || !t) return;

      gsap.to(el, {
        x: `${t.x}rem`,
        y: `${t.y}rem`,
        rotation: t.rot,
        scale: t.scale,
        opacity: t.opacity,
        zIndex: t.zIndex,
        duration: 0.4,
        ease: "power2.inOut",
        overwrite: true,
        onComplete: apply,
      });
      el.dataset.hovered = "false";
    };

    cardRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, scale: 0.45, y: "2rem" });
    });

    gsap.to(cardRefs.current.filter(Boolean), {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.035,
      ease: "back.out(1.15)",
      onComplete: () => {
        readyRef.current = true;
      },
    });

    const tick = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (readyRef.current && hoveredRef.current === null && !reduced) {
        offsetRef.current += (SPIN_SPEED / 60) * gsap.ticker.deltaRatio();
        if (offsetRef.current >= total) offsetRef.current -= total;
        if (offsetRef.current < 0) offsetRef.current += total;
      }
      apply();
    };

    gsap.ticker.add(tick);

    const cleanups: (() => void)[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;

      const onEnter = () => {
        hoveredRef.current = i;
        sectionRef.current?.setAttribute("data-fan-hover", "true");
        apply();
        zoomCard(i);
      };
      const onLeave = () => {
        hoveredRef.current = null;
        sectionRef.current?.removeAttribute("data-fan-hover");
        resetCard(i);
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    const onResize = () => apply();
    window.addEventListener("resize", onResize);
    apply();

    return () => {
      gsap.ticker.remove(tick);
      cleanups.forEach((fn) => fn());
      window.removeEventListener("resize", onResize);
    };
  }, [cards]);

  if (!cards.length) return null;

  return (
    <section
      ref={sectionRef}
      className={cn(
        "smooth-fan-section relative z-20 flex w-full flex-col items-center py-0",
        className
      )}
      aria-label="Carousel sản phẩm Helix One"
    >
      <div className="flex w-full items-center justify-center">
        <div
          ref={containerRef}
          className="fan-layout fan-layout--embedded fan-layout--smooth relative flex w-full items-center justify-center overflow-visible"
        >
          {cards.map((card, index) => (
            <div
              key={card.imgUrl + index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="fan-card fan-card--smooth group/card cursor-pointer will-change-transform"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
                <img
                  src={card.imgUrl}
                  loading="lazy"
                  alt={card.alt || `Sản phẩm ${index + 1}`}
                  draggable={false}
                  className="fan-card-img absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
