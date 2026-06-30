import { NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Dữ liệu không hợp lệ." },
      { status: 400 }
    );
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Thông tin chưa hợp lệ.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  // Honeypot: nếu trường ẩn được điền => bỏ qua (bot), giả vờ thành công
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, message: "Đã đăng ký." });
  }

  const { name, email } = parsed.data;
  const webhookUrl = process.env.WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          source: "helix-one-landing",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error(`Webhook trả về ${res.status}`);
      }
    } catch (error) {
      console.error("[subscribe] webhook error:", error);
      return NextResponse.json(
        {
          ok: false,
          message: "Không thể gửi đăng ký lúc này. Vui lòng thử lại sau.",
        },
        { status: 502 }
      );
    }
  } else {
    // Chưa cấu hình webhook: log để dev có thể kiểm tra
    console.info("[subscribe] (no WEBHOOK_URL) new lead:", { name, email });
  }

  return NextResponse.json({
    ok: true,
    message: "Đăng ký thành công! Cảm ơn bạn đã quan tâm Helix One.",
  });
}
