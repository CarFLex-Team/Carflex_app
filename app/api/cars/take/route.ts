import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
import { emitEvent } from "@/lib/sheetEvents/sheetEvents";

export const runtime = "nodejs";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body?.is_taken) {
      return NextResponse.json({ error: "Missing is_taken" }, { status: 400 });
    }
    if (body.source === "facebook") {
      body.source = "marketplace";
    }
    await db.query(
      `
    WITH update_table AS (
    UPDATE "${body.source}"
    SET is_taken = true, taken_by = $1, taken_at = $3
    WHERE ad_link = $2
      AND created_at >= CURRENT_DATE - INTERVAL '1 day'
    RETURNING ad_link
)
UPDATE "all"
SET is_taken = true, taken_by = $1, taken_at = $3
FROM update_table
WHERE "all".ad_link = update_table.ad_link
  AND created_at >= CURRENT_DATE - INTERVAL '1 day';

      `,
      [body.taken_by, body.ad_link, new Date()],
    );

    emitEvent({ type: "sheet:team:update" });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Edit Take Status error:", err);
    return NextResponse.json({ error: "Failed to Take car" }, { status: 500 });
  }
}
