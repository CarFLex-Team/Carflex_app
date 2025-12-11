import { NextResponse } from "next/server";
import db, { allRow } from "@/lib/db.sqlite";
import getValidFirstImage from "@/helpers/getValidFirstImage";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit") || "50";
    const limit = Math.max(1, Math.min(500, parseInt(limitParam, 10) || 50));

    const stmt = db.prepare(
      `SELECT id, title, price, location, odometer, image_src, ad_link, created_at, status, estValue, description FROM 'all' ORDER BY id LIMIT  ?`
    );
    const rows = stmt.all(limit) as allRow[];
    const items = [];
    for (const r of rows) {
      const firstImage = await getValidFirstImage(r.image_src);

      items.push({
        ...r,
        image_src: firstImage,
        source: "all",
      });
    }

    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/allCars error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
