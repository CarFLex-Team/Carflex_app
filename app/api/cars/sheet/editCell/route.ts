import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
import { notifySheetUpdate } from "@/lib/sheetEvents/sheetEvents";

const ALLOWED_FIELDS = new Set([
  "notes",
  "call_status",
  "status",
  "seller_phone",
  "real_value",
]);

export async function PATCH(
  req: Request,

) {
  try {
   
    const { searchParams } = new URL(req.url);
    const adLink = searchParams.get("ad_link");
    const body = await req.json();
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return NextResponse.json(
        { error: "Update one field at a time" },
        { status: 400 }
      );
    }

    const field = keys[0];

    if (!ALLOWED_FIELDS.has(field)) {
      return NextResponse.json(
        { error: "Field not editable" },
        { status: 403 }
      );
    }

    await db.query(
      `
      UPDATE "sheet_dabou"
      SET ${field} = $1, updated_at = NOW()
      WHERE ad_link = $2
      `,
      [body[field], adLink]
    );

    notifySheetUpdate();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PATCH sheet error", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
