"use client";

import * as React from "react";
import gsap from "gsap";
import { Cpu, Gauge, Feather, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { useTranslations } from "@/hooks/use-translations";

const highlightIcons: LucideIcon[] = [Gauge, Feather, Cpu];
const cardVariants = ["gauge", "feather", "chip"] as const;

type Highlight = {
  value: string;
  unit: string;
  label: string;
};

function AnimatedValue({
  target,
  active,
  delay,
}: {
  target: number;
  active: boolean;
  delay: number;
}) {
  const [display, setDisplay] = React.useState(0);
  const reducedMotion = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  React.useEffect(() => {
    if (!active) return;

    if (reducedMotion) {
      setDisplay(target);
      return;
    }

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 1.6,
      delay,
      ease: "power3.out",
      onUpdate: () => setDisplay(Math.round(obj.val)),
    });

    return () => {
      tween.kill();
    };
  }, [active, delay, reducedMotion, target]);

  return <>{display.toLocaleString()}</>;
}

function SpecsHighlightCard({
  highlight,
  index,
  icon: Icon,
  variant,
}: {
  highlight: Highlight;
  index: number;
  icon: LucideIcon;
  variant: (typeof cardVariants)[number];
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);
  const target = Number.parseInt(highlight.value.replace(/\D/g, ""), 10) || 0;

  React.useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Reveal delay={index * 0.12}>
      <div
        ref={cardRef}
        className={cn(
          "specs-highlight-card group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 text-center",
          `specs-highlight-card--${variant}`
        )}
      >
        <div
          className="specs-highlight-card__glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
        <div
          className="specs-highlight-card__mesh pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-2xl"
          aria-hidden
        />

        <div className="relative flex flex-col items-center gap-3">
          <span
            className={cn(
              "specs-highlight-card__icon flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15",
              `specs-highlight-card__icon--${variant}`
            )}
          >
            <Icon className="size-7" strokeWidth={1.75} />
          </span>

          <p className="font-heading text-4xl font-bold tracking-tight tabular-nums">
            <AnimatedValue target={target} active={active} delay={index * 0.12} />
            <span className="ml-1 text-xl text-muted-foreground">{highlight.unit}</span>
          </p>

          <p className="text-sm text-muted-foreground">{highlight.label}</p>

          <div
            className="specs-highlight-card__bar mt-1 h-1 w-full max-w-[7rem] overflow-hidden rounded-full bg-primary/10"
            aria-hidden
          >
            <span
              className={cn(
                "specs-highlight-card__bar-fill block h-full rounded-full bg-primary",
                active && "specs-highlight-card__bar-fill--active"
              )}
              style={{ transitionDelay: `${index * 120 + 200}ms` }}
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function SpecsHighlightCards() {
  const { t } = useTranslations();

  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-3">
      {t.specs.highlights.map((highlight, index) => (
        <SpecsHighlightCard
          key={highlight.label}
          highlight={highlight}
          index={index}
          icon={highlightIcons[index] ?? Gauge}
          variant={cardVariants[index] ?? "gauge"}
        />
      ))}
    </div>
  );
}
