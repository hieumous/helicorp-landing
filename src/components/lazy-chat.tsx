"use client";

import dynamic from "next/dynamic";
import * as React from "react";

const ChatWidget = dynamic(
  () => import("@/components/chat/chat-widget").then((m) => m.ChatWidget),
  { ssr: false }
);

/** Chỉ tải chatbot sau khi trang idle — tránh ảnh hưởng điểm Performance */
export function LazyChat() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const load = () => setShow(true);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(load, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(load, 3000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;
  return <ChatWidget />;
}
