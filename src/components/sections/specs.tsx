"use client";

import { Reveal } from "@/components/motion/reveal";
import { SpecsStackSection } from "@/components/sections/specs-scroll-stack";
import { SpecsHighlightCards } from "@/components/sections/specs-highlight-cards";
import { useTranslations } from "@/hooks/use-translations";

export function Specs() {
  const { t } = useTranslations();

  return (
    <section
      id="specs"
      className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-medium text-primary">{t.specs.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t.specs.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.specs.desc}</p>
        </Reveal>

        <SpecsHighlightCards />

        <SpecsStackSection className="mt-10 lg:mt-16" />
      </div>
    </section>
  );
}
