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
        title,
        price,
        location,
        odometer,
        ad_link,
        created_at,
        est_value,
        source,
        id,
        is_sus,
        real_value,
        sent_by,
        call_status,
        sent_at,
        notes,
        seller_phone
      FROM "sheet_dabou"
      ORDER BY sent_at DESC
      LIMIT 100
      `
    );

    const items = await Promise.all(
      rows.map(async (r) => ({
        ...r,
        status: await priceStatus(r.price, r.est_value, r.real_value),
      }))
    );

    return NextResponse.json(items);
  } catch (err) {
    console.error("GET /api/cars/send error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
