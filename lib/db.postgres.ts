import "server-only";
import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool__: Pool | undefined;
}

const pool =
  global.__pgPool__ ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // required for Supabase
  });

if (process.env.NODE_ENV === "development") {
  global.__pgPool__ = pool;
}

export default pool;

export type allRow = {
  id: number;
  title: string;
  description: string | null;
  price: string | null;
  location: string | null;
  odometer: string | null;
  image_src: string | null;
  ad_link: string | null;
  created_at: string | null;
  status: string | null;
  est_value: string | null;
  source: string;
};
