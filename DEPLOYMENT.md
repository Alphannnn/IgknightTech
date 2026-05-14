# Deploying Igknight Tech

This project runs on **Next.js 16** + **Prisma 7** + **PostgreSQL**, and is
designed to be hosted on **Vercel** with a serverless Postgres database
(Neon, Supabase, or Vercel Postgres). Pick one — the setup is the same.

---

## 1. Provision the database

**Neon (recommended, free tier):**

1. Sign up at <https://neon.tech>.
2. Create a project (any region near your users).
3. From the dashboard, copy the **pooled** connection string. It looks like:
   ```
   postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require
   ```

Keep this string. You'll use it as `DATABASE_URL`.

> If you use Supabase or Vercel Postgres instead, copy that provider's
> pooled connection string the same way.

## 2. Create the database schema

From your local machine:

```bash
# Point your local env at the new Postgres
echo 'DATABASE_URL="postgresql://...your pooled url..."' > .env
echo 'ADMIN_PASSWORD="pick-a-strong-password"' >> .env
echo "SESSION_SECRET=\"$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")\"" >> .env

# Create all tables from prisma/schema.prisma
npm run db:push

# (optional) Seed the blog posts and career roles from the hard-coded data
npm run db:seed
```

`db:push` is idempotent — re-running it after schema changes will sync the
DB without dropping data, unless a column is removed.

## 3. Deploy to Vercel

1. Push the repo to GitHub (already done).
2. Go to <https://vercel.com/new> and import the GitHub repo.
3. Framework preset: **Next.js** (auto-detected).
4. Before clicking Deploy, add these **Environment Variables**:

   | Name              | Value                                                                    |
   | ----------------- | ------------------------------------------------------------------------ |
   | `DATABASE_URL`    | The pooled Postgres connection string from step 1                        |
   | `ADMIN_PASSWORD`  | The password you'll use to log in at `/admin/login`                      |
   | `SESSION_SECRET`  | Any random string ≥ 32 chars (generate with `openssl rand -hex 32`)      |
   | `CRON_SECRET`     | Any random string (used to authenticate the Neon keep-alive cron)        |

5. Click **Deploy**. The build runs `prisma generate && next build`.

## Keep-alive cron (fights Neon's free-tier compute suspend)

Neon's free tier suspends the Postgres compute after ~5 minutes idle. The first
request after a suspend pays a 500ms–2s wakeup penalty. To avoid this, ping
`/api/cron/keepalive` every 4 minutes. The route runs a tiny `SELECT 1` to
keep the compute warm.

**On Vercel Hobby, the built-in cron is limited to once-per-day**, so we use
an external free service instead:

1. Sign up at <https://cron-job.org> (free, no credit card).
2. Create a new cron job with:
   - **URL**: `https://your-domain.com/api/cron/keepalive?token=<your CRON_SECRET>`
   - **Schedule**: every 4 minutes
   - **Request method**: GET
3. Save. It starts pinging automatically.

The `?token=` query param must match the `CRON_SECRET` env var you set on
Vercel — that's what authenticates the request. Without it the route returns
401 (so it can't be abused by anyone who finds the URL).

Alternative: upgrade Neon to Pro ($19/mo) — disables compute suspend entirely,
no cron needed. Or upgrade Vercel to Pro to use the built-in cron every minute.

## Public sign-in

Visitors must sign in with their name + email before booking a meeting on
`/schedule`. There is no password — the form claims an identity and sets a
30-day HMAC-signed cookie. The login endpoint is `POST /api/auth/login`;
session helpers live in `lib/session.ts` and `lib/user-auth.ts`. This is
intentionally lightweight (matches the trust model of the public booking
form). If you ever start storing sensitive per-user data, swap this out for
a real auth method (OAuth or password + hashing).

## Featured-image uploads

Blog cover images are stored directly in your Postgres DB (`BlogImage` table)
and served via `/api/blog-image/<id>` with `Cache-Control: public, max-age=
31536000, immutable`. Vercel's edge cache absorbs all repeat traffic, so each
image only hits the DB once. **No external storage service required** — works
the moment your DB is up. Upload limits: JPG/PNG/WebP/AVIF/GIF, max 4 MB
(comfortably under Vercel's 4.5 MB serverless body limit).

## 4. After first deploy

- Visit `https://<your-domain>/admin/login` and sign in with `ADMIN_PASSWORD`.
- The admin shell (`/admin`) lets you manage blog posts, careers, meetings,
  and availability overrides. Public pages (`/resources`, `/careers`,
  `/schedule`) revalidate automatically after admin edits.

## Updating the schema later

When you change `prisma/schema.prisma`:

```bash
# Locally, with DATABASE_URL pointed at your prod DB
npm run db:push
```

Then push code changes to GitHub — Vercel redeploys automatically.

If you ever want proper migration history instead of `db push`, switch to:

```bash
npx prisma migrate dev --name <change-name>
```

and commit the generated `prisma/migrations/` folder. Vercel's build script
would then need to run `prisma migrate deploy` before `next build`.

## Troubleshooting

- **Build fails with `SCRAM-SERVER-FIRST-MESSAGE: client password must be a
  string`** — `DATABASE_URL` is missing or malformed. Use the pooled URL
  from your DB provider, ensure it starts with `postgresql://`.
- **Admin login returns "Incorrect password"** — verify `ADMIN_PASSWORD` is
  set in Vercel env vars and that you redeployed after setting it.
- **Public pages still show stale content after admin edit** — the
  `revalidatePath` calls in `app/admin/(shell)/*/actions.ts` handle this;
  if missing for a new field, add the matching path there.
