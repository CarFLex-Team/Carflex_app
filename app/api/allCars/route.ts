// app/api/users/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sqlQuery } from "@/lib/db.mysql";

type Car = { id: number; title: string; description: string };

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit") ?? "100";
    const limit = Math.min(1000, Math.max(1, parseInt(limitParam, 10) || 100));

    // Use ? placeholders for params (mysql2)
    const cars = await sqlQuery<Car>(
      "SELECT id, title, description FROM cars ORDER BY id LIMIT ?",
      [limit]
    );
    return NextResponse.json({ cars });
  } catch (err) {
    console.error("GET /api/allCars error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
