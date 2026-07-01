"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import {
  MonitorSmartphone,
  Cpu,
  HeartPulse,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/use-translations";
import type { Translations } from "@/lib/i18n/translations";

const categoryIcons: LucideIcon[] = [
  MonitorSmartphone,
  Cpu,
  HeartPulse,
  Wifi,
];

const HEADER_PEEK = 56;
const SECOND_PEEK = 148;
const EST_CARD_H = 280;
/** Bắt đầu mờ khi thẻ trên đã phủ ít nhất (px) */
const COVER_BLUR_MIN = 32;
const WHEEL_SENSITIVITY = 0.00085;

function SpecsStackCard({
  group,
  index,
}: {
  group: Translations["specs"]["groups"][number];
  index: number;
}) {
  const Icon = categoryIcons[index] ?? Cpu;

  return (
    <Card className="relative overflow-hidden border-border/60 bg-card p-6 shadow-xl ring-1 ring-black/5 sm:p-8">
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-2 font-heading text-6xl font-bold leading-none text-primary/15 sm:right-6 sm:text-7xl"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative mb-5 flex items-center gap-3 sm:mb-6">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-11">
          <Icon className="size-5" />
        </span>
        <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
          {group.category}
        </h3>
      </div>

      <dl className="relative divide-y divide-border/60">
        {group.items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
          >
            <dt className="text-sm text-muted-foreground">{item.label}</dt>
            <dd className="text-right text-sm font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

export function SpecsStackIntro({ className }: { className?: string }) {
  const { t } = useTranslations();

  return (
    <div
      className={cn(
        "flex min-h-[428px] flex-col self-start lg:sticky lg:top-28 lg:pt-2",
        className
      )}
    >
      <div>
        <p className="font-medium text-primary">{t.specs.detailEyebrow}</p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {t.specs.detailTitle}{" "}
          <span className="text-gradient">{t.specs.detailTitleAccent}</span>
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">{t.specs.detailDesc}</p>

        <ul className="mt-8 hidden space-y-3 lg:block">
          {t.specs.groups.map((group, index) => {
            const Icon = categoryIcons[index] ?? Cpu;
            const highlight = group.items[0];

            return (
              <li
                key={group.category}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/60 px-4 py-3"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{group.category}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {highlight.label}: {highlight.value}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-8 hidden text-xs uppercase tracking-widest text-muted-foreground/70 lg:block">
        {t.specs.scrollHint}
      </p>
    </div>
  );
}

function SpecsStackScrollbar({
  trackRef,
  thumbRef,
  dotsRef,
  total,
  progressLabel,
  dragLabel,
}: {
  trackRef: RefObject<HTMLDivElement | null>;
  thumbRef: RefObject<HTMLDivElement | null>;
  dotsRef: RefObject<HTMLDivElement | null>;
  total: number;
  progressLabel: string;
  dragLabel: string;
}) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-3 pt-2">
      <div
        ref={trackRef}
        className="specs-stack-track relative w-2 cursor-pointer rounded-full bg-border/50"
        role="scrollbar"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={progressLabel}
      >
        <div
          ref={thumbRef}
          className="specs-stack-thumb absolute inset-x-0 cursor-grab rounded-full bg-foreground/75 shadow-sm active:cursor-grabbing"
          style={{ height: "28%", top: "0%" }}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={dragLabel}
          tabIndex={0}
        />
      </div>
      <div ref={dotsRef} className="flex flex-col gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            data-stack-dot={i}
            className={cn(
              "size-1.5 rounded-full bg-border transition-colors duration-300",
              i === 0 && "scale-125 bg-primary"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function SpecsStackSection({ className }: { className?: string }) {
  const { t, locale } = useTranslations();
  const specGroups = t.specs.groups;
  const layoutRef = useRef<HTMLDivElement>(null);
  const wheelZoneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const hoveredRef = useRef(false);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);

  const total = specGroups.length;
  const stageHeight = EST_CARD_H + SECOND_PEEK;

  useLayoutEffect(() => {
    const wheelZone = wheelZoneRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!wheelZone || !stage || cards.length < 2) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const progressObj = { value: 0 };
      let dragging = false;
      let dragPointerOffset = 0;

      const updateScrollbar = (progress: number) => {
        if (!track || !thumb) return;

        const trackH = track.offsetHeight;
        const thumbH = Math.max(trackH * (1 / (total - 1)), 32);
        const maxTop = trackH - thumbH;
        const top = progress * maxTop;

        gsap.set(thumb, { height: thumbH, top });

        const dots = dotsRef.current?.querySelectorAll("[data-stack-dot]");
        dots?.forEach((dot, i) => {
          const active =
            i === Math.round(progress * (total - 1)) ||
            (progress >= 1 && i === total - 1);
          dot.classList.toggle("bg-primary", active);
          dot.classList.toggle("scale-125", active);
          dot.classList.toggle("bg-border", !active);
        });
      };

      let cardHeight = cards[0].offsetHeight || EST_CARD_H;
      const segments = cards.length - 1;
      const viewHeight = cardHeight + SECOND_PEEK;

      gsap.set(stage, { height: viewHeight });
      if (track) gsap.set(track, { height: viewHeight });

      const applyFrame = (progress: number) => {
        progressRef.current = progress;

        const segFloat = progress * segments;
        const segIndex = Math.min(Math.floor(segFloat), segments - 1);
        const segLocal = segFloat - segIndex;

        cards.forEach((card, i) => {
          const isBefore = i < segIndex;
          const isBottom = i === segIndex;
          const isTop = i === segIndex + 1;
          const isAfter = i > segIndex + 1;

          if (isBefore || isAfter) {
            gsap.set(card, {
              y: isAfter ? cardHeight : 0,
              opacity: 0,
              visibility: "hidden",
              zIndex: i,
              scale: 1,
              filter: "blur(0px)",
            });
            const blurEl = card.querySelector<HTMLElement>(
              ".specs-stack-behind-blur"
            );
            if (blurEl) gsap.set(blurEl, { height: 0, opacity: 0 });
            return;
          }

          if (isBottom) {
            const topY = gsap.utils.interpolate(
              cardHeight,
              HEADER_PEEK,
              segLocal
            );
            const coverH = Math.max(0, cardHeight - topY);
            const blurOpacity =
              coverH <= COVER_BLUR_MIN
                ? 0
                : gsap.utils.mapRange(
                    COVER_BLUR_MIN,
                    cardHeight * 0.45,
                    0,
                    1,
                    coverH
                  );

            gsap.set(card, {
              y: 0,
              opacity: 1,
              visibility: "visible",
              zIndex: segIndex + 1,
              scale: 1,
              filter: "blur(0px)",
            });

            const blurEl = card.querySelector<HTMLElement>(
              ".specs-stack-behind-blur"
            );
            if (blurEl) {
              gsap.set(blurEl, {
                height: coverH,
                opacity: blurOpacity,
              });
            }
            return;
          }

          if (isTop) {
            const y = gsap.utils.interpolate(
              cardHeight,
              HEADER_PEEK,
              segLocal
            );

            gsap.set(card, {
              y,
              opacity: 1,
              visibility: "visible",
              zIndex: segIndex + 2,
              scale: 1,
              filter: "blur(0px)",
            });

            const blurEl = card.querySelector<HTMLElement>(
              ".specs-stack-behind-blur"
            );
            if (blurEl) gsap.set(blurEl, { height: 0, opacity: 0 });
            return;
          }

          const blurEl = card.querySelector<HTMLElement>(
            ".specs-stack-behind-blur"
          );
          if (blurEl) gsap.set(blurEl, { height: 0, opacity: 0 });

          gsap.set(card, { opacity: 0, visibility: "hidden", zIndex: i });
        });

        updateScrollbar(progress);
      };

      const setProgress = (next: number, animate = false) => {
        const clamped = gsap.utils.clamp(0, 1, next);
        progressTweenRef.current?.kill();

        if (animate) {
          progressTweenRef.current = gsap.to(progressObj, {
            value: clamped,
            duration: 0.45,
            ease: "power2.out",
            onUpdate: () => applyFrame(progressObj.value),
          });
        } else {
          progressObj.value = clamped;
          applyFrame(clamped);
        }
      };

      const progressFromPointerY = (clientY: number) => {
        if (!track || !thumb) return progressRef.current;
        const rect = track.getBoundingClientRect();
        const thumbH = thumb.offsetHeight;
        const maxTop = Math.max(rect.height - thumbH, 1);
        const top = gsap.utils.clamp(
          0,
          maxTop,
          clientY - rect.top - dragPointerOffset
        );
        return top / maxTop;
      };

      applyFrame(0);

      const onEnter = () => {
        hoveredRef.current = true;
      };

      const onLeave = () => {
        if (dragging) return;
        hoveredRef.current = false;
      };

      const onWheel = (e: WheelEvent) => {
        if (!hoveredRef.current) return;

        const p = progressRef.current;
        const scrollingDown = e.deltaY > 0;
        const scrollingUp = e.deltaY < 0;
        const atStart = p <= 0.001;
        const atEnd = p >= 0.999;

        if (scrollingUp && atStart) return;
        if (scrollingDown && atEnd) return;

        e.preventDefault();
        e.stopPropagation();

        setProgress(p + e.deltaY * WHEEL_SENSITIVITY);
      };

      const onThumbPointerDown = (e: PointerEvent) => {
        if (!thumb || !track) return;
        e.preventDefault();
        e.stopPropagation();
        dragging = true;
        dragPointerOffset = e.clientY - thumb.getBoundingClientRect().top;
        thumb.setPointerCapture(e.pointerId);
        thumb.classList.add("specs-stack-thumb--dragging");
        hoveredRef.current = true;
      };

      const onTrackPointerDown = (e: PointerEvent) => {
        if (!track || !thumb) return;
        if (e.target === thumb || thumb.contains(e.target as Node)) return;
        e.preventDefault();
        dragPointerOffset = thumb.offsetHeight / 2;
        setProgress(progressFromPointerY(e.clientY), true);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!dragging) return;
        setProgress(progressFromPointerY(e.clientY));
      };

      const endDrag = (e: PointerEvent) => {
        if (!dragging || !thumb) return;
        dragging = false;
        thumb.classList.remove("specs-stack-thumb--dragging");
        try {
          thumb.releasePointerCapture(e.pointerId);
        } catch {
          /* already released */
        }
      };

      wheelZone.addEventListener("mouseenter", onEnter);
      wheelZone.addEventListener("mouseleave", onLeave);
      wheelZone.addEventListener("wheel", onWheel, { passive: false });
      thumb?.addEventListener("pointerdown", onThumbPointerDown);
      track?.addEventListener("pointerdown", onTrackPointerDown);
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", endDrag);
      document.addEventListener("pointercancel", endDrag);

      const ro = new ResizeObserver(() => {
        cardHeight = cards[0].offsetHeight || EST_CARD_H;
        gsap.set(stage, { height: cardHeight + SECOND_PEEK });
        if (track) gsap.set(track, { height: cardHeight + SECOND_PEEK });
        applyFrame(progressRef.current);
      });
      ro.observe(cards[0]);

      return () => {
        wheelZone.removeEventListener("mouseenter", onEnter);
        wheelZone.removeEventListener("mouseleave", onLeave);
        wheelZone.removeEventListener("wheel", onWheel);
        thumb?.removeEventListener("pointerdown", onThumbPointerDown);
        track?.removeEventListener("pointerdown", onTrackPointerDown);
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", endDrag);
        document.removeEventListener("pointercancel", endDrag);
        progressTweenRef.current?.kill();
        ro.disconnect();
      };
    }, layoutRef);

    return () => ctx.revert();
  }, [total, locale]);

  return (
    <div
      ref={layoutRef}
      className={cn(
        "specs-stack-layout grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16",
        className
      )}
    >
      <div className="hidden lg:block">
        <SpecsStackIntro />
      </div>

      <div
        ref={wheelZoneRef}
        className={cn(
          "specs-stack-zone flex items-stretch gap-3 sm:gap-4",
          "outline-none"
        )}
        tabIndex={0}
        aria-label={t.specs.stackZoneLabel}
      >
        <div
          ref={stageRef}
          className="relative min-w-0 flex-1 overflow-hidden"
          style={{ height: stageHeight }}
        >
          {specGroups.map((group, i) => (
            <div
              key={group.category}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="specs-stack-card-layer absolute left-0 top-0 w-full origin-top will-change-[transform,opacity,filter]"
              style={{
                zIndex: i + 1,
                transform:
                  i === 0 ? undefined : `translateY(${EST_CARD_H}px)`,
                opacity: i <= 1 ? 1 : 0,
                visibility: i <= 1 ? "visible" : "hidden",
              }}
            >
              <SpecsStackCard group={group} index={i} />
              <div
                className="specs-stack-behind-blur pointer-events-none absolute inset-x-0 top-0 opacity-0"
                aria-hidden
              />
            </div>
          ))}
        </div>

        <SpecsStackScrollbar
          trackRef={trackRef}
          thumbRef={thumbRef}
          dotsRef={dotsRef}
          total={total}
          progressLabel={t.specs.scrollProgress}
          dragLabel={t.specs.dragHint}
        />
      </div>
    </div>
  );
}
