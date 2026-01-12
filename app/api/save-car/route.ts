import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();

  await fetch("https://notification-api-8y5q.onrender.com/save-car", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // Webhooks usually don't return meaningful data
  return NextResponse.json({ ok: true });
}
