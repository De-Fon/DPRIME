# DPRIME

A community connecting communities.

DPRIME helps technology communities across Africa find each other, run events together and share opportunities. University clubs, developer groups and open-source collectives get a public profile, can show their partners, and can post events and opportunities. Nobody has to leave the WhatsApp, Discord or campus group they already use.

## What is in the product

| Area | Route | What it does |
| --- | --- | --- |
| Home | `/` | What DPRIME does, who it is for, upcoming events, communities, opportunities |
| Discover | `/discover` | One search across communities, events, opportunities and organizations |
| Communities | `/communities`, `/communities/[slug]` | Directory with filters, and a profile with partners, events and programs |
| Events | `/events` | Meetups, hackathons and workshops, with cover images |
| Opportunities | `/opportunities` | Internships, grants, speaking slots, collaborations |
| Manifesto | `/manifesto` | Full-screen, one-sentence-at-a-time reveal with background audio |
| About | `/about` | The DPRIME club story, plus `/projects`, `/team`, `/services` |
| Get in touch | `/contact` | Links to the WhatsApp group and Discord |
| Admin | `/admin` | Password-protected portal to manage all of the data above |

## Tech stack

- Next.js 16 (App Router, Server Components by default), React 19, TypeScript
- Tailwind CSS 4 with theme tokens in `tailwind.config.ts`
- Supabase: Postgres for data, Storage for images (`pg` driver and the Storage REST API, no SDK)
- Deployed on Vercel

This Next.js version has breaking changes from older releases. Read the guides in `node_modules/next/dist/docs/` before changing framework-level code.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. With no environment variables the site runs read-only from the sample data in `data/`, which is enough to work on the front end. The admin login is disabled in this mode.

The first request after starting the dev server is slow because it compiles routes on demand.

## Full setup with Supabase

To use the admin portal, save edits and upload images, connect a Supabase project.

1. Copy `.env.example` to `.env.local`.
2. Fill in the variables below.
3. Restart `npm run dev`.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Supabase Postgres (transaction pooler string) |
| `SUPABASE_URL` | Supabase project URL, for image uploads |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for uploads. Never expose it |
| `SUPABASE_STORAGE_BUCKET` | Public bucket name, default `images` |
| `ADMIN_PASSWORD` | Admin login password |
| `SESSION_SECRET` | 32+ random characters (`openssl rand -hex 32`) |
| `NEXT_PUBLIC_DISCORD_URL` | Discord invite shown on the site |
| `NEXT_PUBLIC_WHATSAPP_URL` | WhatsApp group invite shown on the site |

**Step-by-step instructions, with where to find each value, are in [docs/SUPABASE.md](docs/SUPABASE.md).**

What happens on the first run: the app creates its two tables, turns on row-level security for them, and seeds the sample data once. After that the database is the source of truth, and edits in `data/*.ts` no longer change a populated database. Use the admin instead.

## The admin portal

Sign in at `/admin/login`. From there you can create, edit and delete communities, organizations, events, programs, opportunities and partnerships, and attach an image to each (except partnerships). Changes appear on the public site straight away.

- One shared password signs you in with a signed, expiring, httpOnly cookie. If `ADMIN_PASSWORD` or `SESSION_SECRET` is missing, login is disabled.
- Slugs cannot be changed after creation.
- Deleting a community or organization that other records still point to is blocked, with a message naming them.
- Images must be JPEG, PNG or WebP and 4 MB or smaller.

## Editing content

| What | Where |
| --- | --- |
| Communities, events, opportunities, programs, organizations, partnerships, images | The admin portal (`/admin`) |
| Manifesto sentences, closing paragraph, audio path | `data/manifesto.ts` |
| Background audio | `public/audio/manifesto.mp3` |
| Discord and WhatsApp links | `data/links.ts`, or the environment variables above |
| Homepage copy | `app/page.tsx` |
| Footer | `components/Footer.tsx` |
| Original club content (projects, team, services) | `data/projects.ts`, `data/team.ts`, `data/services.ts` |

Records marked `sample` in the admin are placeholders. Replace them with real communities.

## Project structure

```
app/                     Routes and layouts
  admin/                 Admin portal (login, list, create, edit, server actions)
  communities/ events/ opportunities/ discover/ manifesto/ about/ contact/
components/
  ecosystem/             Cards, filters and shared UI for the ecosystem pages
  admin/                 Admin form components
  manifesto/             Manifesto reveal
data/                    Seed data, manifesto text, invite links
lib/
  types.ts               Entity types
  ecosystem.ts           Lookups, filtering, per-request data snapshot
  store.ts               Postgres storage with static-data fallback
  storage.ts             Supabase Storage uploads
  adminSchema.ts         One description of every admin form, used for rendering and validation
  auth.ts                Admin session
docs/SUPABASE.md         Supabase integration guide
ARCHITECTURE.md          Design decisions and known limitations
proxy.ts                 Redirects visitors without a session away from /admin
```

For how the pieces fit together, the data model and the known limitations, read [ARCHITECTURE.md](ARCHITECTURE.md).

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |

There is no automated test suite yet, and `npm run lint` does not work because Next.js 16 removed `next lint`.

## Deploying to Vercel

1. Push the repository and import it in Vercel.
2. Add the environment variables from the table above for Production (and Preview if you use it). On Vercel, `DATABASE_URL` must be the Supabase **transaction pooler** string.
3. Deploy. Environment variables are read at build and start time, so redeploy after changing any of them.
4. Visit `/admin/login` and add your first real community.

Uploaded images are limited to 4 MB because Vercel rejects request bodies over 4.5 MB.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Site works but admin login says it is disabled | Set `ADMIN_PASSWORD` and a `SESSION_SECRET` of at least 32 characters, then restart |
| Admin shows "DATABASE_URL is not set" | Set `DATABASE_URL` and restart |
| "Image uploads are off" in the admin | Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, then restart |
| Other Supabase errors | See the troubleshooting table in [docs/SUPABASE.md](docs/SUPABASE.md) |
| Manifesto has no sound | Check that `public/audio/manifesto.mp3` exists. The button is hidden when it is missing |
| Dev server hangs or serves stale output | Stop it, delete `.next`, and start it again. Run only one dev server |
| A small round icon in the bottom-left corner while developing | That is the Next.js dev indicator and does not appear in production |

## Conventions

- Server Components by default. Add `"use client"` only where interactivity needs it.
- Types for every record live in `lib/types.ts`. Do not inline data arrays in components.
- Keep Tailwind class names static so the utilities are generated.
- Commit messages use `type(scope): description`.

## Contributing

Create a branch, keep changes focused, run `npm run build` and check the pages you touched in the browser before opening a pull request.

## License

`package.json` declares ISC. There is no LICENSE file yet.
