import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
import type { allRow } from "@/lib/db.postgres";
import priceStatus from "@/helpers/priceStatus";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const { rows } = await db.query<allRow>(
      `
  SELECT
       *
      FROM "sheet_leads"
      LIMIT 150
      `
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/cars/sheet/lead error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
