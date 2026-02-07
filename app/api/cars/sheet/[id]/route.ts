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
    const page = searchParams.get("page");
    const limit = searchParams.get("limit") || "20";
    const offset = (Number(page) - 1) * Number(limit);
    const search = searchParams.get("search") || ""; // Get the search parameter

    let WherePart = "WHERE sheet_id = $1 ";
    let queryParams: any[] = [id.toLowerCase()];

    if (session.user.role === "LEAD") {
      queryParams = [];
      WherePart = "";
    }

    // Add search filter to WHERE clause if search term is provided
    if (search && WherePart) {
      WherePart += ` AND (title ILIKE $2 OR ad_link ILIKE $2 OR source ILIKE $2 OR sent_by ILIKE $2 OR VIN ILIKE $2) `;
      queryParams.push(`%${search}%`);
    } else if (search && !WherePart) {
      WherePart += `WHERE (title ILIKE $1 OR ad_link ILIKE $1 OR source ILIKE $1 OR sent_by ILIKE $1 OR VIN ILIKE $1) `;
      queryParams.push(`%${search}%`);
    }

    const { rows } = await db.query<allRow>(
      `
        SELECT *
        FROM "sheet_caller"
        ${WherePart}
        ORDER BY sent_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      queryParams,
    );

    // Add price status calculation
    const items = await Promise.all(
      rows.map(async (r) => ({
        ...r,
        status: await priceStatus(r.price, r.est_value, r.real_value),
      })),
    );

    // Get total count for pagination purposes
    const totalCountQuery = `
      SELECT COUNT(*)
      FROM "sheet_caller"
      ${WherePart}
    `;
    const { rows: totalCountRows } = await db.query(
      totalCountQuery,
      queryParams,
    );
    const totalCount = totalCountRows[0].count;

    // Determine if there's more data
    const hasMore = offset + Number(limit) < totalCount;

    return NextResponse.json({ items, totalCount, hasMore });
  } catch (err) {
    console.error("GET /api/cars/sheet/[id] error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
