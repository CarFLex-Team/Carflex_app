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
    const isAttacking = searchParams.get("isAttacking") === "true"; // Get the isAttacking parameter
    const isFavorite = searchParams.get("isFavorite") === "true"; // Get the isFavorite parameter
    let WherePart = "WHERE u.name=s.sent_by ";
    let queryParams: any[] = [];

    if (session.user.role === "TEAM") {
      WherePart += `AND s.sheeet_id = ${id.toLowerCase()}`;
    }

    // Add search filter to WHERE clause if search term is provided
    if (search) {
      WherePart += ` AND (title ILIKE $1 OR ad_link ILIKE $1 OR source ILIKE $1 OR sent_by ILIKE $1 OR VIN ILIKE $1) `;
      queryParams.push(`%${search}%`);
    }
    if (isAttacking) {
      WherePart += ` AND s.status IN ('Steal', 'Good') `;
    }
    if (isFavorite) {
      WherePart += ` AND is_favorite = true `;
    }

    const { rows } = await db.query<allRow>(
      `
        SELECT s.*, u.team_no
        FROM "sheet_caller" s , "User" u
        ${WherePart}
        ORDER BY sent_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      queryParams,
    );

    // Add price status calculation
    const items = rows;

    // Get total count for pagination purposes
    const totalCountQuery = `
      SELECT COUNT(*)
      FROM "sheet_caller" s , "User" u
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
