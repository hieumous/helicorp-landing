"use client";

import * as React from "react";
import Image from "next/image";
import { RotateCw } from "lucide-react";

export function FlipCard({
  icon,
  title,
  desc,
  image,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  image: string;
}) {
  return (
    <div className="group/flip h-full min-h-[280px] [perspective:1200px]">
      <div className="relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover/flip:[transform:rotateY(180deg)]">
        {/* Mặt trước: icon + nội dung */}
        <div className="absolute inset-0 flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-7 [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </span>
          <h3 className="font-heading text-xl font-semibold tracking-tight">
            {title}
          </h3>
          <p className="text-[15px] leading-relaxed text-foreground/70">
            {desc}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors group-hover/flip:text-primary">
            <RotateCw className="size-3.5" />
            Di chuột để xem
          </span>
        </div>

        {/* Mặt sau: ảnh minh hoạ */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border/60 bg-[#0a0a12] [transform:rotateY(180deg)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="font-heading text-lg font-semibold text-white">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
