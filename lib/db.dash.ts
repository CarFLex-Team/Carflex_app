import "server-only";
import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __pgDashPool__: Pool | undefined;
}

const pool =
  global.__pgDashPool__ ??
  new Pool({
    connectionString: process.env.DATABASEDASH_URL,
    ssl: { rejectUnauthorized: false }, // required for Supabase
    max: 20, // maximum number of connections in the pool
    idleTimeoutMillis: 30000, // close idle connections after 30 seconds
    connectionTimeoutMillis: 20000, // 10 seconds
  });

if (process.env.NODE_ENV === "development") {
  global.__pgDashPool__ = pool;
}

export default pool;
