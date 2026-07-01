"use client";

import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/shop/product-actions";
import { LazyBannerVideo } from "@/components/ui/lazy-banner-video";
import { getLocalizedProducts } from "@/lib/products";
import { useTranslations } from "@/hooks/use-translations";

export function Showcase() {
  const { t, locale } = useTranslations();
  const localizedProducts = getLocalizedProducts(locale);

  return (
    <section id="showcase" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-medium text-primary">{t.showcase.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t.showcase.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.showcase.desc}</p>
        </Reveal>

        <Reveal className="mt-12">
          <div
            className="relative h-[320px] overflow-hidden rounded-3xl border border-border/60 sm:h-[440px]"
            role="img"
            aria-label={t.showcase.lifestyleAlt}
          >
            <LazyBannerVideo
              src="/videos/helix-banner.mp4"
              poster="/images/helix-lifestyle.webp"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-10">
              <p className="max-w-md font-heading text-2xl font-bold text-white sm:text-3xl">
                {t.showcase.bannerTitle}
              </p>
              <p className="mt-2 max-w-md text-sm text-white/80">
                {t.showcase.bannerDesc}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {localizedProducts.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
