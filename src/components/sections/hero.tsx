"use client";

import { ArrowRight, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroStackCard } from "@/components/ui/stack-card";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { HeroShopCta } from "@/components/shop/hero-shop-cta";
import { useTranslations } from "@/hooks/use-translations";

export function Hero() {
  const { t } = useTranslations();

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="relative order-1 mx-auto flex w-full justify-center overflow-visible lg:order-2">
          <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-primary/20 blur-3xl" />
          <HeroStackCard />
        </div>

        <div className="order-2 text-center lg:order-1 lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1">
              <Star className="size-3.5 fill-primary text-primary" />
              {t.site.newGen} · {siteConfig.name}
            </Badge>
          </div>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{t.site.tagline}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0">
            {t.site.description}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#newsletter"
              data-track="hero_preorder"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group h-12 w-full px-7 text-base transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
              )}
            >
              {t.hero.preorder}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              data-track="hero_explore"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-12 w-full px-7 text-base transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
              )}
            >
              {t.hero.explore}
            </a>
          </div>

          <HeroShopCta />

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-border/60 pt-8">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <dt className="font-heading text-2xl font-bold sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
