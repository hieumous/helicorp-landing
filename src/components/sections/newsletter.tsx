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
import { subscribeSchema, type SubscribeInput } from "@/lib/validations";
import { siteConfig } from "@/lib/site";

function LazyMapEmbed() {
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
          title={`Bản đồ ${siteConfig.brand}`}
          src={siteConfig.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 grayscale-[20%]"
          allowFullScreen
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
          <MapPin className="mr-2 size-4" />
          Đang tải bản đồ...
        </div>
      )}
    </div>
  );
}

export function Newsletter() {
  const [done, setDone] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeInput>({
    resolver: zodResolver(subscribeSchema),
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
        toast.error(data.message ?? "Có lỗi xảy ra, vui lòng thử lại.");
        return;
      }

      toast.success(data.message);
      setDone(true);
      reset();
    } catch {
      toast.error("Không thể kết nối máy chủ. Vui lòng thử lại sau.");
    }
  };

  return (
    <section id="newsletter" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
            <div className="absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
            <div className="grid lg:grid-cols-2">
              {/* Cột trái: Google Map + thông tin liên hệ */}
              <div className="flex flex-col border-b border-border/60 lg:border-b-0 lg:border-r">
                <div className="relative h-64 w-full overflow-hidden bg-muted lg:h-full lg:min-h-[28rem]">
                  <LazyMapEmbed />
                </div>
                <div className="grid gap-4 p-6 sm:p-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">Trụ sở {siteConfig.brand}</p>
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.address}
                      </p>
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

              {/* Cột phải: form đăng ký */}
              <div className="p-8 sm:p-10 lg:p-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                  Đặt trước Helix One
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Để lại email để nhận ưu đãi đặt trước sớm và cập nhật ngày lên
                  kệ chính thức.
                </p>

                {done ? (
                  <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
                    <CheckCircle2 className="size-12 text-primary" />
                    <p className="font-heading text-lg font-semibold">
                      Đăng ký thành công!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cảm ơn bạn. Chúng tôi sẽ gửi thông tin sớm nhất qua email.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => setDone(false)}
                    >
                      Đăng ký email khác
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="mt-8 grid gap-4"
                  >
                    <div className="grid gap-2 text-left">
                      <Label htmlFor="name">Họ và tên</Label>
                      <Input
                        id="name"
                        placeholder="Nguyễn Văn A"
                        aria-invalid={!!errors.name}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2 text-left">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ban@email.com"
                        aria-invalid={!!errors.email}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Honeypot ẩn với người dùng, bot sẽ điền => bị loại */}
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

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 w-full text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send />
                          Đăng ký nhận tin
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Chúng tôi tôn trọng quyền riêng tư của bạn. Hủy đăng ký bất
                      cứ lúc nào.
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
