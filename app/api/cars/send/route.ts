// // import { NextResponse } from "next/server";
// // import db from "@/lib/db.postgres";
// // import type { allRow } from "@/lib/db.postgres";
// // import priceStatus from "@/helpers/priceStatus";

// // export async function POST(req: Request) {
// //   try {
// //     const url = new URL(req.url);

// //     const { rows } = await db.query<allRow>(
// //       `
// //   SELECT
// //         id,
// //         title,
// //         price,
// //         location,
// //         odometer,
// //         ad_link,
// //         created_at,
// //         est_value,
// //         description,
// //         source,
// //         is_sus,
// //         real_value,
// //         sent_at,
// //         notes,
// //         sent_by,
// //         call_status,
// //       FROM "sheet_dabou"
// //       ORDER BY sent_at DESC

// //       `
// //     );

// //     const items = await Promise.all(
// //       rows.map(async (r) => ({
// //         ...r,
// //         status: await priceStatus(r.price, r.est_value, r.real_value),
// //       }))
// //     );

// //     return NextResponse.json({ items });
// //   } catch (err) {
// //     console.error("GET /api/save-car error", err);
// //     return NextResponse.json(
// //       { error: "Internal Server Error" },
// //       { status: 500 }
// //     );
// //   }
// // }

import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
import { emitEvent } from "@/lib/sheetEvents/sheetEvents";

export const runtime = "nodejs";

const ALLOWED_TABLES = new Set(["facebook", "kijiji", "autotrader"]);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.sheet_id) {
      return NextResponse.json({ error: "Missing sheet_id" }, { status: 400 });
    }

    if (!ALLOWED_TABLES.has(body.source)) {
      return NextResponse.json({ error: "Invalid source" }, { status: 400 });
    }
    if (body.source === "facebook") {
      body.source = "marketplace";
    }
    await db.query("BEGIN");

    await db.query(
      `
      INSERT INTO "sheet_caller" (
        id, title, price, location, odometer, ad_link,
        created_at, est_value, description, source,
        is_sus, real_value, sheet_id, sent_by
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      `,
      [
        body.id,
        body.title,
        body.price,
        body.location,
        body.odometer,
        body.ad_link,
        body.created_at,
        body.est_value,
        body.description,
        body.source,
        body.is_sus,
        body.real_value,
        body.sheet_id,
        body.sent_by,
      ],
    );

    await db.query(
      `
      UPDATE "${body.source}"
      SET is_sent = $1
      WHERE ad_link = $2
      `,
      [true, body.ad_link],
    );

    await db.query("COMMIT");

    emitEvent({ type: "sheet:caller:update" });
    emitEvent({ type: "sheet:team:update" });

    return NextResponse.json({ success: true });
  } catch (err) {
    await db.query("ROLLBACK");
    console.error("SEND error:", err);
    return NextResponse.json({ error: "Failed to send data" }, { status: 500 });
  }
}
