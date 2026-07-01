"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { X, Send, Loader2, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/use-translations";

const ChatMessengerLottie = dynamic(
  () =>
    import("@/components/chat/chat-messenger-lottie").then((m) => m.ChatMessengerLottie),
  {
    ssr: false,
    loading: () => <MessageCircle className="size-7 text-primary-foreground" />,
  }
);

type Msg = { role: "user" | "model"; content: string };

export function ChatWidget() {
  const { t, locale } = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMessages([{ role: "model", content: t.chat.greeting }]);
  }, [locale, t.chat.greeting]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "model", content: data.reply ?? t.chat.errorReply },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "model", content: t.chat.errorNetwork }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.chat.close : t.chat.open}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex items-center justify-center transition-transform hover:scale-105 active:scale-95",
          open
            ? "size-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"
            : "size-[4.75rem] rounded-full bg-primary/10 shadow-lg shadow-primary/30 ring-1 ring-primary/20"
        )}
      >
        {open ? (
          <X className="size-6" />
        ) : (
          <ChatMessengerLottie className="size-[4.75rem]" />
        )}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl transition-all duration-300",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
        style={{ height: "min(70vh, 540px)" }}
        role="dialog"
        aria-label={t.chat.title}
      >
        <div className="flex items-center gap-3 border-b border-border/60 bg-primary/5 px-4 py-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">{t.chat.title}</p>
            <p className="text-xs text-muted-foreground">{t.chat.subtitle}</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                  m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted text-foreground"
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                {t.chat.typing}
              </div>
            </div>
          )}

          {messages.length === 1 && !loading && (
            <div className="flex flex-wrap gap-2 pt-1">
              {t.chat.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-border/60 p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chat.placeholder}
            className="h-10 flex-1 rounded-full border border-border/60 bg-background px-4 text-sm outline-none focus:border-primary/50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label={t.chat.send}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </>
  );
}
