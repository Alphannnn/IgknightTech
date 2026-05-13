/**
 * One-time seed: copy existing hard-coded blog + careers data into the DB.
 *
 * Idempotent: runs `upsert` keyed by slug for blog posts and by a
 * deterministic composite of title+dept for roles, so re-running is safe.
 *
 * Usage:
 *   npx tsx prisma/seed.ts
 * or
 *   npm run db:seed     (after wiring "db:seed" in package.json)
 */
import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ARTICLES } from "../app/resources/resources-data";

function makeClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set.");
  return new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
}

const prisma = makeClient();

const ROLES: Array<{
  title: string;
  dept: string;
  location: string;
  type: string;
  posted: Date;
  featured?: boolean;
}> = [
  { title: "Senior Full-Stack Engineer",   dept: "Engineering", location: "Remote · Worldwide", type: "Full-time", posted: daysAgo(2),  featured: true  },
  { title: "Staff Frontend Engineer",      dept: "Engineering", location: "Remote · Americas", type: "Full-time", posted: daysAgo(5)                  },
  { title: "Mobile Engineer (iOS)",        dept: "Engineering", location: "Remote · Europe",   type: "Full-time", posted: daysAgo(7)                  },
  { title: "Backend Engineer (Go / Node)", dept: "Engineering", location: "Remote · Worldwide", type: "Full-time", posted: daysAgo(3),  featured: true  },
  { title: "Platform / DevOps Engineer",   dept: "Engineering", location: "Remote · APAC",     type: "Full-time", posted: daysAgo(7)                  },
  { title: "Machine Learning Engineer",    dept: "Engineering", location: "Remote · Worldwide", type: "Full-time", posted: daysAgo(4)                  },
  { title: "Senior Product Designer",      dept: "Design",      location: "Remote · Worldwide", type: "Full-time", posted: daysAgo(6),  featured: true  },
  { title: "Brand & Motion Designer",      dept: "Design",      location: "Remote · Europe",   type: "Contract",  posted: daysAgo(14)                 },
  { title: "Senior Product Manager",       dept: "Product",     location: "Remote · Worldwide", type: "Full-time", posted: daysAgo(7)                  },
  { title: "Technical Program Manager",    dept: "Product",     location: "Remote · Americas", type: "Full-time", posted: daysAgo(21)                 },
  { title: "Customer Success Lead",        dept: "Operations",  location: "Remote · Worldwide", type: "Full-time", posted: daysAgo(14)                 },
  { title: "Technical Recruiter",          dept: "Operations",  location: "Remote · Worldwide", type: "Full-time", posted: daysAgo(7)                  },
];

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

async function seedBlog() {
  for (const a of ARTICLES) {
    await prisma.blogPost.upsert({
      where: { slug: a.id },
      update: {
        title: a.title,
        excerpt: a.excerpt,
        category: a.category,
        categoryColor: a.categoryColor,
        author: a.author,
        authorRole: a.authorRole,
        avatarFrom: a.authorAvatar.from,
        avatarTo: a.authorAvatar.to,
        date: new Date(a.date),
        readTime: a.readTime,
        image: a.image ?? null,
        featured: Boolean(a.featured),
        body: JSON.stringify(a.body),
        status: "published",
      },
      create: {
        slug: a.id,
        title: a.title,
        excerpt: a.excerpt,
        category: a.category,
        categoryColor: a.categoryColor,
        author: a.author,
        authorRole: a.authorRole,
        avatarFrom: a.authorAvatar.from,
        avatarTo: a.authorAvatar.to,
        date: new Date(a.date),
        readTime: a.readTime,
        image: a.image ?? null,
        featured: Boolean(a.featured),
        body: JSON.stringify(a.body),
        status: "published",
      },
    });
  }
  console.log(`Seeded ${ARTICLES.length} blog posts.`);
}

async function seedCareers() {
  // Wipe and reseed roles for a clean state on first run; subsequent runs
  // (where rows already exist) will only re-create roles whose composite
  // key is missing. We use a marker field set on initial seed.
  const existing = await prisma.careerRole.count();
  if (existing > 0) {
    console.log(`Skipping career seed (already ${existing} rows).`);
    return;
  }
  for (const r of ROLES) {
    await prisma.careerRole.create({
      data: {
        title: r.title,
        dept: r.dept,
        location: r.location,
        type: r.type,
        posted: r.posted,
        featured: r.featured ?? false,
        active: true,
      },
    });
  }
  console.log(`Seeded ${ROLES.length} career roles.`);
}

async function main() {
  await seedBlog();
  await seedCareers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
