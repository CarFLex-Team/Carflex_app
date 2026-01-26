import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
import { emitEvent } from "@/lib/sheetEvents/sheetEvents";
import { SHEETS, SheetKey } from "@/lib/sheetConfig";
export const runtime = "nodejs";

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const sheet = searchParams.get("sheet") as SheetKey;
    const adLink = searchParams.get("ad_link");

    if (!sheet || !adLink) {
      return NextResponse.json(
        { error: "Missing sheet or ad_link" },
        { status: 400 },
      );
    }

    const config = SHEETS[sheet];
    if (!config) {
      return NextResponse.json({ error: "Invalid sheet" }, { status: 400 });
    }

    const body = await req.json();
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return NextResponse.json(
        { error: "Update one field at a time" },
        { status: 400 },
      );
    }

    const field = keys[0];

    if (!config.editableFields.has(field)) {
      return NextResponse.json(
        { error: "Field not editable for this sheet" },
        { status: 403 },
      );
    }

    await db.query(
      `
      UPDATE "${config.table}"
      SET ${field} = $1, updated_at = NOW()
      WHERE ad_link = $2
      `,
      [body[field], adLink],
    );

    // 🔥 Notify only relevant sheet listeners
    emitEvent({ type: config.event });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PATCH sheet error", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
