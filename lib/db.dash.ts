import "server-only";
// dashboard db.ts
import { Pool } from "pg";

declare global {
  var pgDashPool: Pool | undefined;
}

const dashPool = global.pgDashPool ?? new Pool({
  connectionString: process.env.DATABASEDASH_URL,
  ssl: { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
});

if (!global.pgDashPool) global.pgDashPool = dashPool;

export default dashPool;