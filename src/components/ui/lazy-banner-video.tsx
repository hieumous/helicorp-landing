"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LazyBannerVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

export function LazyBannerVideo({ src, poster, className }: LazyBannerVideoProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("absolute inset-0", className)}>
      {active ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={poster}
          className="h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={poster}
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 1216px"
          loading="lazy"
          quality={70}
          className="object-cover"
          aria-hidden
        />
      )}
    </div>
  );
}
