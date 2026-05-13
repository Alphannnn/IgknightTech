/**
 * Singleton Prisma client.
 *
 * Prisma 7 uses driver adapters — for SQLite we wire `@prisma/adapter-better-sqlite3`.
 * The DB file lives at `prisma/dev.db` (configured in .env via DATABASE_URL).
 */
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

function makeClient(): PrismaClient {
  // DATABASE_URL is e.g. "file:./dev.db" — strip the "file:" prefix for
  // better-sqlite3 which wants a plain path. Default to the same location
  // Prisma's CLI created so dev and runtime see the same file.
  const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
  const filename = url.startsWith("file:") ? url.slice(5) : url;

  const adapter = new PrismaBetterSqlite3({ url: filename });
  return new PrismaClient({ adapter });
}

export const db: PrismaClient = globalThis.prismaGlobal ?? makeClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}
