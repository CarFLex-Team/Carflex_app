import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    if (!month) {
      return NextResponse.json({ error: "Month is required" }, { status: 400 });
    }
    const { rows } = await db.query(
      `
    SELECT 
      
    sent_by as "employeeName",
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (sent_at - taken_at))) AS "averageTimeInSeconds"
      FROM "sheet_caller"
      WHERE sent_by IS NOT NULL
      AND taken_at IS NOT NULL
      AND sent_at IS NOT NULL AND created_at >= $1::date
          AND created_at < ($2::date + INTERVAL '1 month')  
      GROUP BY sent_by
      order by "averageTimeInSeconds" ASC
      `,
      [new Date(`${month}-01`), new Date(`${month}`)],
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/cars/averageTimeTaken error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
