// app/api/users/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sqlQuery } from "@/lib/db.mysql"; // path alias @/ may require tsconfig paths; otherwise use '../../..' relative

type Car = {
  id: number;
  title: string;
  description: string;
};

/**
 * GET /api/users
 * Example: returns first 100 users (adjust limit as needed)
 */
export async function GET(req: NextRequest) {
  try {
    // Use parameterized queries even for GETs that accept query params
    // Example: support ?limit=50
    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit") ?? "100";
    const limit = Math.min(1000, Math.max(1, parseInt(limitParam, 10) || 100)); // sanitize

    const rows = await sqlQuery<Car>(
      "SELECT id, title, description FROM cars ORDER BY id LIMIT $1",
      [limit]
    );
    return NextResponse.json({ users: rows });
  } catch (err) {
    console.error("GET /api/users error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
