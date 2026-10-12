# Integrating Supabase

DPrime uses one Supabase project for two things:

| Need | Supabase feature | Used for |
| --- | --- | --- |
| Data | Postgres | Communities, events, opportunities, programs, organizations, partnerships |
| Images | Storage (public bucket) | Event covers, community logos and other uploaded pictures |

The admin portal at `/admin` writes to both. The public site reads from both.
Everything below is a one-time setup, about ten minutes.

## Checklist

- [ ] Create a Supabase project and save the database password
- [ ] Copy the **transaction pooler** connection string, add `?sslmode=no-verify`
- [ ] Create a **public** Storage bucket named `images`
- [ ] Copy the Project URL and the service (secret) key
- [ ] Put the values in `.env.local` and in Vercel, then redeploy
- [ ] Sign in at `/admin/login` and upload an image to an event

The sections below explain each step.

## 1. Create the project

1. Sign in at supabase.com and choose **New project**.
2. Pick the region closest to your users (for East Africa, a European or
   Middle East region is usually the nearest available).
3. Set a database password and **save it somewhere safe**. You cannot read it
   again later, only reset it.

## 2. Database connection

1. Open the project and click **Connect** (top bar).
2. Under **Connection string**, choose the **Transaction pooler** (port `6543`).
3. Copy the string and replace `[YOUR-PASSWORD]` with your database password.
4. Append `?sslmode=no-verify` to the end.

It looks like this:

```
postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?sslmode=no-verify
```

This value is `DATABASE_URL`.

Why the pooler: Vercel runs many short-lived serverless functions, and each
would open its own database connection. The pooler shares a small number of
real connections between them. The direct connection (port `5432`) runs out
of connections under load.

Why `sslmode=no-verify`: the pooler's certificate is not in Node's default
trust store, so strict verification fails with a "self-signed certificate"
error. The connection is still encrypted.

You do not need to create any tables. On first use the app creates the
`entities` and `meta` tables, turns on row-level security for both, and
seeds the sample data once.

## 3. Storage bucket for images

1. Open **Storage** in the left menu and click **New bucket**.
2. Name it `images` (or choose another name and set `SUPABASE_STORAGE_BUCKET`).
3. Turn **Public bucket** ON. Public means anyone can *read* an image from its
   URL, which is what the website needs. It does not allow anyone to upload.
4. Optional but recommended: set **File size limit** to `4 MB` and
   **Allowed MIME types** to `image/jpeg, image/png, image/webp`.
5. Do **not** add any storage policies that allow `INSERT`, `UPDATE` or
   `DELETE` for `anon` or `authenticated`. All writes go through the server
   with the secret key, which bypasses policies.

## 4. API credentials for uploads

1. Open **Project Settings > API** (or **API Keys**).
2. Copy the **Project URL**, for example `https://abcdxyz.supabase.co`.
   This is `SUPABASE_URL`.
3. Copy the **service_role** key (or a **secret** key that starts with
   `sb_secret_`). This is `SUPABASE_SERVICE_ROLE_KEY`.

> **Treat the service key like a password.** It can read and write everything
> in the project. It is used only in server code (`lib/storage.ts`). Never put
> it in a variable that starts with `NEXT_PUBLIC_`, never commit it, and never
> paste it into chat or screenshots. If it leaks, rotate it in the same
> settings page.

Do not use the `anon` / publishable key here. It is meant for browsers and
cannot upload to a locked-down bucket.

## 5. Environment variables

| Variable | Value | Needed for |
| --- | --- | --- |
| `DATABASE_URL` | Pooler connection string from step 2 | All data |
| `SUPABASE_URL` | Project URL from step 4 | Images |
| `SUPABASE_SERVICE_ROLE_KEY` | Service or secret key from step 4 | Image uploads |
| `SUPABASE_STORAGE_BUCKET` | Bucket name, default `images` | Images |
| `ADMIN_PASSWORD` | A long random password | Admin login |
| `SESSION_SECRET` | 32+ random characters (`openssl rand -hex 32`) | Admin login |
| `NEXT_PUBLIC_DISCORD_URL`, `NEXT_PUBLIC_WHATSAPP_URL` | Invite links | Manifesto page |

**Locally:** copy `.env.example` to `.env.local`, fill it in, then restart
`npm run dev`. `.env.local` is git-ignored.

**On Vercel:** Project > **Settings > Environment Variables**. Add each one for
Production (and Preview if you use it), then **redeploy**. Variables are read at
build and start time, so a change only takes effect on the next deployment.

If `DATABASE_URL` is missing the site still works, read-only, from the sample
data in `data/`. If the Supabase storage variables are missing the admin shows
"Image uploads are off" and everything else works.

## 6. First run

1. Start the app (`npm run dev` locally, or open your Vercel URL).
2. Visit `/communities`. The first request creates the tables and seeds them.
3. In Supabase, open **Table Editor**. You should see `entities` and `meta`.
4. Go to `/admin/login` and sign in with `ADMIN_PASSWORD`.
5. Open **Events > New event**, fill the form, choose a picture, and save.
6. Check **Storage > images > events**: the file is there.
7. Open `/events` and the homepage: the event shows with its cover image.

## 7. How it works

- **Records** live in `entities (kind, slug, data jsonb)`. Each record's
  `data` includes an optional `imageUrl`.
- **Uploads** go from the admin form to a server action, which checks the file
  (real bytes, not just the extension: JPEG, PNG or WebP, up to 4 MB), uploads
  it to `images/<kind>/<random-id>.<ext>` with the secret key, and stores the
  resulting public URL in the record.
- **Display** goes through `next/image`, which resizes and caches the picture.
  `next.config.ts` allows only your project's `storage/v1/object/public/**` path.
- **Cleanup**: replacing or removing an image, or deleting the record, deletes
  the old file. If a save fails after an upload, the new file is removed too.
- Events, communities, organizations, programs and opportunities all support
  an image. Partnerships do not.

## 8. Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Admin shows "Image uploads are off" | `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is missing. Set both and restart or redeploy. |
| `self-signed certificate in certificate chain` | Add `?sslmode=no-verify` to `DATABASE_URL`. |
| `too many connections` / timeouts on Vercel | You used the direct connection. Switch to the pooler string (port 6543). |
| Upload fails with `Bucket not found` | The bucket name does not match `SUPABASE_STORAGE_BUCKET`. |
| Upload fails with 401 or 403 | Wrong key, or you used the `anon` key. Use the service or secret key. |
| `Invalid src prop ... hostname is not configured` | `SUPABASE_URL` was not set when the app started or built. Set it and restart or redeploy. |
| Image uploads fail for pictures near 4 MB | Vercel rejects request bodies over 4.5 MB. Resize the picture first. |
| Edits in `data/*.ts` do not appear | The database is already seeded. Edit through `/admin`, or reset the tables (below). |

To start over with fresh sample data, in the Supabase **SQL Editor** run
`drop table entities, meta;` and load any page. Back up first if you have real
content.

## 9. Security notes

- Row-level security is enabled on both tables with no policies. Supabase
  exposes `public` tables through its Data API using a key that ships in
  browsers, so this is what stops anyone reading or editing your data that
  way. The app connects as the table owner, which RLS does not restrict.
- The bucket is public for reads only. Anyone with an image URL can view it,
  so do not upload anything private.
- SVG uploads are refused on purpose, because SVG can contain scripts.
- Admin login is one shared password with no lockout. Use a long random value.

## 10. Limits to know about

- Free projects pause after a period of inactivity and have storage and
  bandwidth quotas. Check the current limits on your plan before launch, and
  consider a paid plan for production.
- Enable backups (paid plans) or periodically export `entities` from the
  Table Editor, since the admin is the only place this content lives.

## 11. Adding images to a new content type

1. Add `imageUrl?: string` to its interface in `lib/types.ts`.
2. Add `imageField("Image")` to its field list in `lib/adminSchema.ts`.
3. Render it with `<CoverImage src={item.imageUrl} alt={item.title} />`
   (`components/ecosystem/CoverImage.tsx`).
