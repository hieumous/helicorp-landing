import { NextResponse } from "next/server";

type Body = {
  type?: string;
  name?: string;
  payload?: Record<string, unknown>;
  timestamp?: string;
  path?: string;
};

export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!body.type || !body.name) {
    return NextResponse.json({ ok: false, message: "Thiếu type/name" }, { status: 400 });
  }

  const event = {
    source: "helix-landing",
    type: body.type,
    name: body.name,
    payload: body.payload ?? {},
    timestamp: body.timestamp ?? new Date().toISOString(),
    path: body.path ?? "/",
  };

  const webhook =
    process.env.ANALYTICS_WEBHOOK_URL || process.env.WEBHOOK_URL;

  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "analytics", ...event }),
      });
    } catch {
      console.warn("[analytics] webhook failed", event.name);
    }
  } else if (process.env.NODE_ENV === "development") {
    console.log("[analytics]", event);
  }

  return NextResponse.json({ ok: true });
}
