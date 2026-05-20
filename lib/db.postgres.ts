import { Pool } from "pg";

declare global {
  // This allows us to store the pool globally in Node (avoids recreating)
  var pgPool: Pool | undefined;
}

const pool = global.pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5, // small number of connections
});

if (!global.pgPool) global.pgPool = pool;

export default pool;
export type allRow = {
  id: number;
  title: string;
  description: string | null;
  price: number | null;
  location: string | null;
  odometer: string | null;
  image_src: string | null;
  ad_link: string | null;
  created_at: string | null;
  status: string | null;
  est_value: number | null;
  source: string;
  is_sus: boolean;
  real_value: number | null;
};
