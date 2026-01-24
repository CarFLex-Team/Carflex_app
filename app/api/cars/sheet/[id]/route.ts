import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
import type { allRow } from "@/lib/db.postgres";
import priceStatus from "@/helpers/priceStatus";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { searchParams } = new URL(req.url);
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const date = searchParams.get("date");
    const { rows } = await db.query<allRow>(
      `
  SELECT
       *
      FROM "sheet_dabou"
      WHERE created_at >= $1::date
      AND created_at < $1::date + INTERVAL '1 day'
      AND sheet_id = $2 
      ORDER BY sent_at DESC
      LIMIT 100
      `,
      [date, id.toLowerCase()],
    );

    const items = await Promise.all(
      rows.map(async (r) => ({
        ...r,
        status: await priceStatus(r.price, r.est_value, r.real_value),
      })),
    );

    return NextResponse.json(items);
  } catch (err) {
    console.error("GET /api/cars/sheet/[id] error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
