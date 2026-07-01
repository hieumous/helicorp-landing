import { NextResponse } from "next/server";
import { siteConfig, specGroups } from "@/lib/site";

type ChatMessage = { role: "user" | "model"; content: string };

const DEFAULT_MODEL = "gemini-2.0-flash-lite";

/** Thử lần lượt — free tier thường còn quota ở flash-lite / 2.5-flash */
function getModelCandidates(): string[] {
  const preferred = process.env.GEMINI_MODEL?.trim();
  const chain = [
    preferred,
    DEFAULT_MODEL,
    "gemini-2.5-flash",
    "gemini-1.5-flash",
  ].filter(Boolean) as string[];
  return [...new Set(chain)];
}

async function generateWithGemini(
  apiKey: string,
  model: string,
  messages: ChatMessage[]
) {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.slice(-10).map((m) => ({
          role: m.role === "model" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        generationConfig: { temperature: 0.7, maxOutputTokens: 256 },
      }),
    }
  );
}

const specText = specGroups
  .map(
    (g) =>
      `${g.category}: ${g.items.map((i) => `${i.label} ${i.value}`).join(", ")}`
  )
  .join(". ");

const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn sản phẩm của ${siteConfig.brand}, thương hiệu của đồng hồ thông minh "${siteConfig.name}".
Nhiệm vụ: tư vấn thân thiện, ngắn gọn (tối đa ~4 câu), bằng tiếng Việt, chỉ xoay quanh sản phẩm ${siteConfig.name} và thương hiệu ${siteConfig.brand}.
Nếu khách hỏi ngoài phạm vi, hãy lịch sự hướng họ về thông tin sản phẩm hoặc form đăng ký đặt trước.

Thông tin sản phẩm:
- Mô tả: ${siteConfig.description}
- Thông số: ${specText}
- Tính năng nổi bật: theo dõi sức khỏe 24/7 (nhịp tim, SpO2, ECG), pin 14 ngày, GPS dual-band, chống nước 5ATM, phân tích giấc ngủ, kết nối Bluetooth 5.3.
- Liên hệ: ${siteConfig.email} · ${siteConfig.phone} · ${siteConfig.address}`;

// Trả lời dự phòng khi chưa cấu hình API key (vẫn demo được)
function fallbackReply(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("pin")) return "Helix One có pin dùng tối đa 14 ngày, sạc nhanh 10 phút là đủ dùng cả ngày.";
  if (m.includes("nước") || m.includes("bơi")) return "Helix One đạt chuẩn chống nước 5ATM + IP68, bạn thoải mái đeo khi bơi đến độ sâu 50m.";
  if (m.includes("nits") || m.includes("màn") || m.includes("sáng"))
    return 'Màn hình AMOLED LTPO 1.5", độ sáng tới 3000 nits — nhìn rõ ngoài trời nắng. Kính sapphire chống xước.';
  if (m.includes("marathon") || m.includes("chạy") || m.includes("giấc ngủ"))
    return "Helix One rất phù hợp marathon nhờ GPS dual-band và pin 14 ngày; đồng thời phân tích giấc ngủ chi tiết qua cảm biến BioSense Gen 4.";
  if (m.includes("giá") || m.includes("bao nhiêu tiền") || m.includes("mua ở đâu"))
    return "Bạn để lại email ở mục Đặt trước nhé, Helicorp sẽ gửi giá ưu đãi và ngày lên kệ sớm nhất.";
  if (m.includes("sức khỏe") || m.includes("nhịp tim") || m.includes("ecg"))
    return "Helix One đo nhịp tim, SpO2 và ECG liên tục 24/7 với cảm biến BioSense Gen 4.";
  return `Helix One là smartwatch cao cấp với pin 14 ngày, đo sức khỏe chuyên sâu, GPS dual-band và chống nước 5ATM. Bạn muốn biết thêm về tính năng nào ạ?`;
}

export async function POST(req: Request) {
  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ ok: false, message: "Yêu cầu không hợp lệ." }, { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser?.content?.trim()) {
    return NextResponse.json({ ok: false, message: "Vui lòng nhập câu hỏi." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Chưa có key -> dùng câu trả lời dự phòng
  if (!apiKey) {
    return NextResponse.json({ ok: true, reply: fallbackReply(lastUser.content), fallback: true });
  }

  try {
    const models = getModelCandidates();
    let lastStatus = 0;
    let lastError = "";

    for (const model of models) {
      const res = await generateWithGemini(apiKey, model, messages);

      if (res.ok) {
        const data = await res.json();
        const reply =
          data?.candidates?.[0]?.content?.parts
            ?.map((p: { text?: string }) => p.text)
            .join("") ?? fallbackReply(lastUser.content);

        return NextResponse.json({ ok: true, reply, model });
      }

      lastStatus = res.status;
      lastError = await res.text().catch(() => "");
      console.error(`[chat] Gemini ${model} failed:`, res.status, lastError.slice(0, 400));

      // Chỉ thử model khác khi hết quota hoặc model không tồn tại
      if (res.status !== 429 && res.status !== 404) break;
    }

    console.error("[chat] All Gemini models failed. Last:", lastStatus);
    return NextResponse.json({
      ok: true,
      reply: fallbackReply(lastUser.content),
      fallback: true,
      reason: lastStatus === 429 ? "quota" : "api_error",
    });
  } catch (err) {
    console.error("[chat] Gemini request error:", err);
    return NextResponse.json({ ok: true, reply: fallbackReply(lastUser.content), fallback: true });
  }
}
