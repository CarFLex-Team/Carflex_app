import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
import type { allRow } from "@/lib/db.postgres";
import getValidFirstImage from "@/helpers/getValidFirstImage";
import priceStatus from "@/helpers/priceStatus";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit") || "50";
    const limit = Math.max(1, Math.min(500, Number(limitParam) || 50));

    const { rows } = await db.query<allRow>(
      `
      SELECT* FROM(
        SELECT DISTINCT ON (title, price, odometer)
        id,
        title,
        price,
        location,
        odometer,
        image_src,
        ad_link,
        created_at,       
        est_value,
        description,
        source,
        is_sus,
        sus_type,
        real_value,
        is_sent,
        is_taken,
        taken_at,
        trim
      FROM "all"
        ORDER BY title, price, odometer, created_at DESC)deduped
      ORDER BY created_at DESC
      LIMIT $1
      `,
      [limit],
    );

    const items = await Promise.all(
      rows.map(async (r) => ({
        ...r,
        image_src: await getValidFirstImage(r.image_src),
        status: await priceStatus(r.price, r.est_value, r.real_value),
      })),
    );

    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/allCars error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
