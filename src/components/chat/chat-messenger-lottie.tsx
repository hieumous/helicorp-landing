"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { cn } from "@/lib/utils";

type ChatMessengerLottieProps = {
  className?: string;
};

export function ChatMessengerLottie({ className }: ChatMessengerLottieProps) {
  return (
    <div className={cn("chat-messenger-lottie", className)} aria-hidden>
      <DotLottieReact
        src="/lottie/messenger-purple.json"
        loop
        autoplay
        renderConfig={{ autoResize: true }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
