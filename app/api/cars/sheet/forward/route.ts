import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
import { emitEvent } from "@/lib/sheetEvents/sheetEvents";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔒 Validate (example)
    if (!body) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await db.query(
      `
      INSERT INTO "sheet_leads" (
      
        purch_address,
        odometer,
        ad_link,
        year,
        make,
        model,
      vin,
        color,      
        purch_price,
         purch_date
      
        
         )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, Now())
      `,
      [
        body.location,
        body.odometer,
        body.ad_link,
        body.title.split(" ")[0], // year
        body.title.split(" ")[1], // make
        body.title.split(" ")[2], // model
        body.vin,
        body.color,
        body.purch_value,
      ]
    );

    emitEvent({ type: "sheet:lead:update" });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SEND error:", err);
    return NextResponse.json({ error: "Failed to send data" }, { status: 500 });
  }
}
