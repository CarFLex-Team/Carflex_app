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
  SELECT
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
        is_sus
      FROM "kijiji"
      ORDER BY created_at DESC
      LIMIT $1
      `,
      [limit]
    );

    const items = await Promise.all(
      rows.map(async (r) => ({
        ...r,
        image_src: await getValidFirstImage(r.image_src),
        status: await priceStatus(r.price, r.est_value),
      }))
    );

    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/kijijiCars error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
