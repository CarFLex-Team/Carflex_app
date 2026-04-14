import { NextResponse } from "next/server";
import db from "@/lib/db.dash";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    const { rows } = await db.query(
      `SELECT c.*, v.year, m.name as make_name, mo.name as model_name, t.name as trim_name, u.full_name, u.email, u.phone
      FROM cars_sent c
      JOIN users u ON c.user_id = u.id
      JOIN vehicle_years v ON c.vehicle_year_id = v.id
      JOIN makes m ON v.make_id = m.id
      JOIN models mo ON v.model_id = mo.id
      JOIN trims t ON v.trim_id = t.id
        WHERE c.id = $1
      `,
      [id],
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

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const client = await db.connect();
  const { id } = await context.params;
  try {
    const data = await req.json();
    if (
      !data.year ||
      !data.make_name ||
      !data.model_name ||
      !data.trim_name ||
      !data.email
    ) {
      return NextResponse.json(
        { error: "Missing required parameter" },
        { status: 400 },
      );
    }
    await client.query("BEGIN");
    if (data.not_interested) {
      await client.query(
        `UPDATE cars_sent SET is_interested = false WHERE id = $1`,
        [id],
      );
      const res = await resend.emails.send({
        from: "Carflex Plus <info@carflexplus.ca>",
        to: data.email,

        template: {
          id: "a318a165-31c1-4e9d-8612-928b49f19ce0",
          variables: {
            car_year: data.year.toString() || "-",
            car_make: data.make_name || "-",
            car_model: data.model_name || "-",
            car_trim: data.trim_name || "-",
          },
        },
      });
      // console.log("Not interested email sent:", res);
    } else if (data.offer) {
      await client.query(`UPDATE cars_sent SET offer = $1 WHERE id = $2`, [
        Number(data.offer.replace(/,/g, "")),
        id,
      ]);
      await resend.emails.send({
        from: "Carflex Plus <info@carflexplus.ca>",
        to: data.email,

        template: {
          id: "9035f245-143c-4b4c-ac35-82b7d1858ead",
          variables: {
            car_year: data.year.toString() || "-",
            car_make: data.make_name || "-",
            car_model: data.model_name || "-",
            car_trim: data.trim_name || "-",
            car_price: data.offer || "-",
            offer_expiry: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000,
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            }),
          },
        },
      });
    }
    await client.query("COMMIT");
    return NextResponse.json(
      { message: "Offer sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error sending offer:", error);
    return NextResponse.json(
      { error: "Failed to send offer" },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
