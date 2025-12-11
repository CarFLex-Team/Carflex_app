import { NextResponse } from "next/server";
import db, { AutoTraderRow } from "@/lib/db.sqlite";
import getValidFirstImage from "@/helpers/getValidFirstImage";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit") || "50";
    const limit = Math.max(1, Math.min(500, parseInt(limitParam, 10) || 50));

    const stmt = db.prepare(
      `SELECT id, title, price, location, odometer, image_src, ad_link, created_at, status, estValue, description FROM autotrader ORDER BY id LIMIT  ?`
    );
    const rows = stmt.all(limit) as AutoTraderRow[];
    const items = [];
    for (const r of rows) {
      const firstImage = await getValidFirstImage(r.image_src);

      items.push({
        ...r,
        image_src: firstImage,
        source: "autotrader",
      });
    }

    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/autotrader error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
