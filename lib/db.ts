/**
 * Singleton Prisma client.
 *
 * Prisma 7 uses driver adapters — for PostgreSQL we wire `@prisma/adapter-pg`.
 * DATABASE_URL must be a Postgres connection string (e.g. from Neon, Supabase,
 * Vercel Postgres). For serverless hosts, prefer the pooled URL.
 */
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

function makeClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add a PostgreSQL connection string to the environment."
    );
  }
  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({ adapter });
}

export const db: PrismaClient = globalThis.prismaGlobal ?? makeClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}
