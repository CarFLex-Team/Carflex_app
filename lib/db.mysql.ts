// lib/db.mysql.ts
import mysql from "mysql2/promise";

declare global {
  var __mysqlPool__: mysql.Pool | undefined;
}

const pool =
  global.__mysqlPool__ ??
  (() => {
    if (process.env.DATABASE_URL) {
      // mysql2 accepts a connection string
      return mysql.createPool(process.env.DATABASE_URL);
    }

    // fallback to individual env vars
    const host = process.env.MYSQL_HOST || "localhost";
    const port = Number(process.env.MYSQL_PORT || 3306);
    const user = process.env.MYSQL_USER || "";
    const password = process.env.MYSQL_PASSWORD || "";
    const database = process.env.MYSQL_DATABASE || "";

    return mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  })();

if (process.env.NODE_ENV === "development") {
  global.__mysqlPool__ = pool;
}

/**
 * Run a parameterized SQL query and return typed rows.
 * Use `?` placeholders for parameters to prevent injection.
 */
export async function sqlQuery<T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  const [rows] = await pool.execute<T[] & mysql.RowDataPacket[]>(sql, params);
  return rows as T[];
}

export default pool;
