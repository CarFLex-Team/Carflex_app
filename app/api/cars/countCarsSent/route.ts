import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { rows } = await db.query(
      `
        SELECT 
          sent_by AS "employeeName", 
          COUNT(*) AS "carsSentCount",
          SUM(CASE WHEN status IN ('Steal', 'Good') THEN 1 ELSE 0 END) AS "carsAttackCount"
        FROM "sheet_caller"
        WHERE sent_by IS NOT NULL
        GROUP BY sent_by
      `,
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/cars/countCarsSent error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
