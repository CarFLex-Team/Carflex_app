import { NextResponse } from "next/server";
import db from "@/lib/db.postgres";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.employeeId || !body?.startTime || !body?.endTime) {
      return NextResponse.json(
        { error: "Missing employeeId, startTime, or endTime" },
        { status: 400 },
      );
    }
    const { employeeId, startTime, endTime } = body;
    const isFound = await db.query(
      `
      SELECT 1 FROM "work_session"
      WHERE user_id = $1 AND start_time = $2 
      `,
      [employeeId, new Date(startTime)],
    );
    if (isFound.rowCount ) {
    await db.query(
      `
      UPDATE "work_session"
      SET end_time = $3, duration = $4
      WHERE user_id = $1 AND start_time = $2
      `,
      [employeeId, new Date(startTime), new Date(endTime), Math.ceil((new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60))],
    );
    return NextResponse.json({ success: true });
    }
    else{
    await db.query(
      `
      INSERT INTO "work_session" (user_id, start_time, end_time,duration)
      VALUES ($1, $2, $3, $4)
      `,
      [employeeId, new Date(startTime), new Date(endTime), Math.ceil((new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60))],
    );
    return NextResponse.json({ success: true });
  }}
    catch (error: any) {
    console.error("Error tracking time:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}