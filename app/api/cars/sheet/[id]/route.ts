import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";
import type { allRow } from "@/lib/db.postgres";
import priceStatus from "@/helpers/priceStatus";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { emitEvent } from "@/lib/sheetEvents/sheetEvents";

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
    let WherePart = "WHERE sheet_id = $1 AND ";
    let queryParams: any[] = [id.toLowerCase()];
    if (date) {
      queryParams.push(date);
      WherePart += `created_at >= $2::date
      AND created_at < $2::date + INTERVAL '1 day'`;
    }
    if (session.user.role === "LEAD") {
      queryParams = [];
      if (date) {
        queryParams.push(date);
        WherePart = `WHERE created_at >= $1::date
      AND created_at < $1::date + INTERVAL '1 day'`;
      }
    }
    const { rows } = await db.query<allRow>(
      `
  SELECT
       *
      FROM "sheet_caller"
      ${WherePart}
      ORDER BY sent_at DESC
      LIMIT 100
      `,
      queryParams,
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
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { title, odometer, ad_link, price, source, sent_by } =
      await req.json();
    const session = await getServerSession(authOptions);
    const { id } = await context.params;

    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (
      !title ||
      !odometer ||
      !ad_link ||
      !price ||
      !source ||
      !sent_by ||
      !id
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const { rows } = await db.query(
      `
 INSERT INTO "sheet_caller" (title, odometer, ad_link, price, source, sheet_id, created_at,sent_by)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)
      RETURNING *
      `,
      [title, odometer, ad_link, price, source, id.toLowerCase(), sent_by],
    );

    emitEvent({ type: "sheet:caller:update" });
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error: any) {
    console.error("POST /api/cars/sheet/[id] error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
