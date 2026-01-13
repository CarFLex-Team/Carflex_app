// import { NextResponse } from "next/server";
// import db, { allRow } from "@/lib/db.sqlite";
// import getValidFirstImage from "@/helpers/getValidFirstImage";

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const limitParam = url.searchParams.get("limit") || "50";
//     const limit = Math.max(1, Math.min(500, parseInt(limitParam, 10) || 50));

//     const stmt = db.prepare(
//       `SELECT id, name as title, price, mileage_value  AS odometer, image as image_src, url as ad_link, sortingDate,  description, status, est_value FROM kjiji ORDER BY sortingDate LIMIT  ?`
//     );
//     const rows = stmt.all(limit) as allRow[];

//     const items = [];
//     for (const r of rows) {
//       const firstImage = await getValidFirstImage(r.image_src);

//       items.push({
//         ...r,
//         image_src: firstImage,
//         source: "marketplace",
//       });
//     }

//     return NextResponse.json({ items });
//   } catch (err) {
//     console.error("GET /api/marketplace error", err);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
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
        is_sus,
        real_value
      FROM "marketplace"
      ORDER BY created_at DESC
      LIMIT $1
      `,
      [limit]
    );

    const items = await Promise.all(
      rows.map(async (r) => ({
        ...r,
        image_src: await getValidFirstImage(r.image_src),
        status: await priceStatus(r.price, r.est_value, r.real_value),
      }))
    );

    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/marketplaceCars error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
