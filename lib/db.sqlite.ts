// lib/sqlite.ts
import path from "path";
import Database from "better-sqlite3";

declare global {
  // allow global caching in dev to avoid reopen on HMR
  // eslint-disable-next-line no-var
  var __sqlite_db__: Database.Database | undefined;
}

const DB_PATH =
  process.env.SQLITE_PATH || path.join(process.cwd(), "data", "cars.db");

// open readonly for API reads; use readwrite if you need to INSERT/UPDATE
const options: Database.Options = { readonly: true, fileMustExist: true };

const db = global.__sqlite_db__ ?? new Database(DB_PATH, options);

if (process.env.NODE_ENV === "development") {
  global.__sqlite_db__ = db;
}

export type AutoTraderRow = {
  id: number;
  source: string;
  title: string;
  price: string | null;
  location: string | null;
  odometer: string | null;
  image_src: string | null;
  ad_link: string | null;
  created_at: string | null;
  status: string | null;
  estValue: string | null;
};

export default db;
