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
    <div
      className="flip-card group/flip relative z-0 h-[220px] origin-center overflow-visible [perspective:1200px] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] hover:z-50 hover:scale-[1.5] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20 sm:h-[232px]"
    >
      <div className="relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover/flip:[transform:rotateY(180deg)]">
        {/* Mặt trước: icon + nội dung */}
        <div className="absolute inset-0 flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5 [-webkit-backface-visibility:hidden] [backface-visibility:hidden] sm:p-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </span>
          <h3 className="font-heading text-lg font-semibold tracking-tight">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-foreground/70">
            {desc}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors group-hover/flip:text-primary">
            <RotateCw className="size-3.5" />
            Di chuột để xem
          </span>
        </div>

        {/* Mặt sau: ảnh — phóng to cùng cả thẻ, nổi trên các khung khác */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border/60 bg-card [transform:rotateY(180deg)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <h3 className="font-heading text-base font-semibold text-white sm:text-lg">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
