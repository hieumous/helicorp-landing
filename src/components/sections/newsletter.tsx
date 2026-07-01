"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle2, MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion/reveal";
import { createSubscribeSchema, type SubscribeInput } from "@/lib/validations";
import { siteConfig } from "@/lib/site";
import { useTranslations } from "@/hooks/use-translations";

function LazyMapEmbed({ mapTitle, mapLoading }: { mapTitle: string; mapLoading: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {show ? (
        <iframe
          title={`${mapTitle} ${siteConfig.brand}`}
          src={siteConfig.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 grayscale-[20%]"
          allowFullScreen
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
          <MapPin className="mr-2 size-4" />
          {mapLoading}
        </div>
      )}
    </div>
  );
}

export function Newsletter() {
  const { t } = useTranslations();
  const [done, setDone] = React.useState(false);

  const schema = React.useMemo(
    () =>
      createSubscribeSchema({
        nameMin: t.newsletter.validation.nameMin,
        emailInvalid: t.newsletter.validation.emailInvalid,
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeInput>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", website: "" },
  });

  const onSubmit = async (values: SubscribeInput) => {
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        toast.error(data.message ?? t.newsletter.errorGeneric);
        return;
      }

      toast.success(data.message);
      setDone(true);
      reset();
    } catch {
      toast.error(t.newsletter.errorNetwork);
    }
  };

  return (
    <section id="newsletter" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
            <div className="absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col border-b border-border/60 lg:border-b-0 lg:border-r">
                <div className="relative h-64 w-full overflow-hidden bg-muted lg:h-full lg:min-h-[28rem]">
                  <LazyMapEmbed
                    mapTitle={t.newsletter.mapTitle}
                    mapLoading={t.newsletter.mapLoading}
                  />
                </div>
                <div className="grid gap-4 p-6 sm:p-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">
                        {t.newsletter.hq} {siteConfig.brand}
                      </p>
                      <p className="text-sm text-muted-foreground">{siteConfig.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="size-5 shrink-0 text-primary" />
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="size-5 shrink-0 text-primary" />
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:p-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                  {t.newsletter.title}
                </h2>
                <p className="mt-3 text-muted-foreground">{t.newsletter.desc}</p>

                {done ? (
                  <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
                    <CheckCircle2 className="size-12 text-primary" />
                    <p className="font-heading text-lg font-semibold">
                      {t.newsletter.successTitle}
                    </p>
                    <p className="text-sm text-muted-foreground">{t.newsletter.successDesc}</p>
                    <Button variant="outline" className="mt-2" onClick={() => setDone(false)}>
                      {t.newsletter.anotherEmail}
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="mt-8 grid gap-4"
                  >
                    <div className="grid gap-2 text-left">
                      <Label htmlFor="name">{t.newsletter.nameLabel}</Label>
                      <Input
                        id="name"
                        placeholder={t.newsletter.namePlaceholder}
                        aria-invalid={!!errors.name}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="grid gap-2 text-left">
                      <Label htmlFor="email">{t.newsletter.emailLabel}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t.newsletter.emailPlaceholder}
                        aria-invalid={!!errors.email}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="absolute left-[-9999px]" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register("website")}
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="h-11 w-full text-base">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" />
                          {t.newsletter.submitting}
                        </>
                      ) : (
                        <>
                          <Send />
                          {t.newsletter.submit}
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      {t.newsletter.privacy}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
