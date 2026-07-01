export type AnalyticsEvent = {
  type: "click" | "scroll" | "shop";
  name: string;
  payload?: Record<string, string | number | boolean>;
  timestamp: string;
  path: string;
};

export function buildEvent(
  type: AnalyticsEvent["type"],
  name: string,
  payload?: AnalyticsEvent["payload"]
): AnalyticsEvent {
  return {
    type,
    name,
    payload,
    timestamp: new Date().toISOString(),
    path: typeof window !== "undefined" ? window.location.pathname : "/",
  };
}

export async function trackEvent(event: AnalyticsEvent) {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      keepalive: true,
    });
  } catch {
    /* offline / dev */
  }
}
