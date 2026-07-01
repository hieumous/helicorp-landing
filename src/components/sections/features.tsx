"use client";

import dynamic from "next/dynamic";
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
import { useTranslations } from "@/hooks/use-translations";

const ConnectFanCards = dynamic(
  () =>
    import("@/components/sections/connect-fan-cards").then((m) => m.ConnectFanCards),
  { ssr: false, loading: () => <div className="min-h-[15rem] w-full" aria-hidden /> }
);

const featureIcons: LucideIcon[] = [
  HeartPulse,
  BatteryCharging,
  MapPin,
  Waves,
  Moon,
  Smartphone,
];

const featureImages = [
  "/images/feature-health.webp",
  "/images/feature-battery.webp",
  "/images/feature-gps.webp",
  "/images/feature-water.webp",
  "/images/feature-sleep.webp",
  "/images/feature-connect.webp",
];

const featureSpans: Array<"feature" | "wide" | "base"> = [
  "feature",
  "base",
  "base",
  "base",
  "base",
  "wide",
];

const spanClass: Record<"feature" | "wide" | "base", string> = {
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

function FeatureTile({
  icon: Icon,
  title,
  desc,
  stat,
  image,
  span,
  exploreConnect,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  stat?: string;
  image: string;
  span: "feature" | "wide" | "base";
  exploreConnect: string;
}) {
  if (span === "feature") {
    return (
      <SpotlightCard>
        <div className="flex flex-col">
          <div className="relative h-36 w-full overflow-hidden bg-[#0a0a12] sm:h-40">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              loading="lazy"
              quality={75}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-2.5 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <IconChip icon={Icon} />
              <h3 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
                {title}
              </h3>
              {stat && (
                <span className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {stat}
                </span>
              )}
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-[15px]">
              {desc}
            </p>
          </div>
        </div>
      </SpotlightCard>
    );
  }

  if (span === "wide") {
    return (
      <SpotlightCard className="overflow-visible">
        <div className="grid lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center gap-2.5 p-5 sm:p-6 lg:order-1">
            <IconChip icon={Icon} />
            <h3 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
              {title}
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-foreground/70 sm:text-[15px]">
              {desc}
            </p>
            <span className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
              {exploreConnect} <ArrowRight className="size-4" />
            </span>
          </div>
          <div className="relative order-1 flex min-h-[15rem] items-center overflow-visible py-2 sm:min-h-[16rem] lg:order-2">
            <ConnectFanCards />
          </div>
        </div>
      </SpotlightCard>
    );
  }

  return (
    <FlipCard
      icon={<Icon className="size-6" />}
      title={title}
      desc={desc}
      image={image}
    />
  );
}

export function Features() {
  const { t } = useTranslations();

  return (
    <section id="features" className="scroll-mt-20 overflow-visible py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-semibold uppercase tracking-wider text-primary">
            {t.features.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {t.features.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t.features.desc}
          </p>
        </Reveal>

        <div className="features-flip-grid mt-14 grid auto-rows-auto gap-4 overflow-visible sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {t.features.items.map((f, i) => {
            const span = featureSpans[i];
            const Icon = featureIcons[i];
            return (
              <Reveal
                key={f.title}
                delay={(i % 3) * 0.08}
                className={cn(
                  spanClass[span],
                  span === "wide" && "connect-feature-card",
                  span === "base" && "flip-feature-reveal"
                )}
              >
                <FeatureTile
                  icon={Icon}
                  title={f.title}
                  desc={f.desc}
                  stat={"stat" in f ? f.stat : undefined}
                  image={featureImages[i]}
                  span={span}
                  exploreConnect={t.features.exploreConnect}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
