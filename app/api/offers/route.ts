import { NextResponse } from "next/server";

import db from "@/lib/db.dash";
export async function GET() {
  try {
    const { rows } = await db.query(
      `SELECT c.*, v.year, m.name as make_name, mo.name as model_name, t.name as trim_name, u.full_name, u.email, u.phone
      FROM cars_sent c
      JOIN users u ON c.user_id = u.id
      JOIN vehicle_years v ON c.vehicle_year_id = v.id
      JOIN makes m ON v.make_id = m.id
      JOIN models mo ON v.model_id = mo.id
      JOIN trims t ON v.trim_id = t.id
      ORDER BY c.created_at DESC
      `,
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/offers error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
