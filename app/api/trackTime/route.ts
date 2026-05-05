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
export async function GET() {
  try {
    const { rows } = await db.query(
      `
WITH ordered_sessions AS (
    SELECT
        ws.user_id,
        start_time,
        end_time,
        u.name AS employee_name,
        LAG(end_time) OVER (PARTITION BY ws.user_id ORDER BY start_time) AS prev_end
    FROM work_session ws
    JOIN "User" u ON ws.user_id = u.id
    WHERE end_time IS NOT NULL
),
session_groups AS (
    SELECT
        *,
        SUM(
            CASE 
                WHEN prev_end IS NULL OR start_time - prev_end > INTERVAL '9 hours' 
                THEN 1 ELSE 0 
            END
        ) OVER (PARTITION BY user_id ORDER BY start_time) AS group_id
    FROM ordered_sessions
)
SELECT
    employee_name,
    MIN(start_time) AS start_time,
    MAX(end_time) AS last_end_time,
    SUM(EXTRACT(EPOCH FROM (end_time - start_time))/3600) AS hours_worked
FROM session_groups
GROUP BY employee_name, group_id
ORDER BY employee_name, start_time;
      `,
    );
    return NextResponse.json({ sessions: rows });
  } catch (error: any) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}