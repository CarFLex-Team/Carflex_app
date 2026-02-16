import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const result = await db.query(
      `
      SELECT * FROM "Employees" WHERE user_id = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("GET /api/employeesDetails error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
