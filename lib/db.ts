import { Pool } from "pg";

// One pool per server instance. Kept on globalThis so dev hot-reloads do not
// leak connections. Small max: serverless instances are many and short-lived,
// and the database (e.g. Neon) pools connections upstream.
const g = globalThis as unknown as { __dprimePool?: Pool };

export function dbConfigured(): boolean {
  return !!process.env.DATABASE_URL;
}

export function pool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  g.__dprimePool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 3,
  });
  return g.__dprimePool;
}
