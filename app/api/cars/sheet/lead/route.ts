import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
import type { allRow } from "@/lib/db.postgres";
import priceStatus from "@/helpers/priceStatus";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    const { rows } = await db.query<allRow>(
      `
  SELECT
       *
      FROM "sheet_leads"
      WHERE purch_date >= $1::date
      AND purch_date < $1::date + INTERVAL '1 day'
      ORDER BY purch_date DESC
      LIMIT 150
      `,
      [date],
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/cars/sheet/lead error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
