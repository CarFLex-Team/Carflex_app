import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    await fetch("https://notification-api-8y5q.onrender.com/save-car", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (err) {
    if ((err as any)?.name === "AbortError") {
      return NextResponse.json(
        { ok: false, error: "timeout" },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "request failed" },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeoutId);
  }

  // Webhooks usually don't return meaningful data
  return NextResponse.json({ ok: true });
}
