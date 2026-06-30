import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Được hơn 50.000 người tin dùng
          </h2>
          <p className="mt-4 text-muted-foreground">
            Những trải nghiệm thực tế từ cộng đồng người dùng Helix One.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <Card className="h-full border-border/60">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <Quote className="size-8 text-primary/40" />
                  <p className="flex-1 text-sm leading-relaxed text-foreground/90">
                    “{t.quote}”
                  </p>
                  <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-heading font-semibold text-primary">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
