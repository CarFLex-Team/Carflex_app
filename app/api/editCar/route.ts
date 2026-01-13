import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const adLink = searchParams.get("ad_link");
    let source = searchParams.get("source");
    const { real_value } = await req.json();

    if (typeof real_value !== "number") {
      return NextResponse.json({ error: "Invalid value" }, { status: 400 });
    }
    if (!source) {
      return NextResponse.json(
        { error: "Source is required" },
        { status: 400 }
      );
    }
    if (source === "facebook") {
      source = "marketplace";
    }
    await db.query(
      `
      UPDATE "${source}"
      SET real_value = $1 
      WHERE ad_link = $2
      `,
      [real_value, adLink]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update value" },
      { status: 500 }
    );
  }
}
