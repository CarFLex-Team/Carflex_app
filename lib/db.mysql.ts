import "server-only";
import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2";
declare global {
  // eslint-disable-next-line no-var
  var __mysqlPool__: mysql.Pool | undefined;
}

const pool =
  global.__mysqlPool__ ??
  mysql.createPool({
    uri: process.env.DATABASE_URL!,
    waitForConnections: true,
    connectionLimit: 10,
  });

if (process.env.NODE_ENV === "development") {
  global.__mysqlPool__ = pool;
}

export default pool;
export type allRow = RowDataPacket & {
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
  estValue: string | null;
  source: string;
};
