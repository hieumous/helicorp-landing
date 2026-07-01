"use client";

import dynamic from "next/dynamic";
import * as React from "react";

const BehaviorTracker = dynamic(
  () =>
    import("@/components/analytics/behavior-tracker").then((m) => m.BehaviorTracker),
  { ssr: false }
);

/** Bật tracking sau khi trang idle — không ảnh hưởng LCP */
export function LazyBehaviorTracker() {
  const [on, setOn] = React.useState(false);

  React.useEffect(() => {
    const boot = () => setOn(true);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(boot, { timeout: 5000 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(boot, 2500);
    return () => clearTimeout(t);
  }, []);

  if (!on) return null;
  return <BehaviorTracker />;
}
