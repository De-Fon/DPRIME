# DPRIME — Student Developer Team Website

This repository contains a Next.js (App Router) site scaffold for DPRIME — a small student developer team that builds production-ready web apps. The site is intentionally minimal and opinionated, using Server Components by default, TypeScript types for static data, Tailwind CSS v4 with theme tokens, and a lightweight contact form implemented as a Client Component.

Contents
 - `app/` — Next.js App Router routes and layouts (Server Components by default). Key files:
	 - `app/layout.tsx` — root layout, loads global fonts and CSS variables.
	 - `app/globals.css` — Tailwind v4 config import and design tokens / utilities.
	 - `app/page.tsx` — home page composition of sections (Hero, Projects, Services, Team, Contact).
	 - `app/projects/[slug]/page.tsx` — project detail page with dynamic route.
	 - `app/not-found.tsx`, `app/error.tsx`, `app/loading.tsx` — route-level UI.

 - `components/` — UI components (mostly Server Components). Notable components:
	 - `Navbar.tsx`, `Footer.tsx` — global navigation and footer.
	 - `Hero.tsx`, `ProjectsGrid.tsx`, `ProjectCard.tsx`, `ServicesGrid.tsx`, `ProcessSteps.tsx`, `TeamGrid.tsx`, `ContactForm.tsx`.
	 - `ContactForm.tsx` is a Client Component (`"use client"`) and contains validation state.

 - `lib/` — shared TypeScript types and helpers:
	 - `lib/types.ts` — `Project`, `TeamMember`, `Service`, `ProcessStep` interfaces.
	 - `lib/validate.ts` — `validateContactForm()` used by the client contact form.

 - `data/` — static typed data exported and consumed by Server Components:
	 - `data/projects.ts`, `data/team.ts`, `data/services.ts`, `data/process.ts`.

 - `public/images/team/` — team photos go here (used by `TeamGrid`).

Key Features and Design
- Next.js App Router (Server Components by default). Use client components sparingly (e.g., `ContactForm`).
- Tailwind CSS v4 with design tokens and CSS variables for fonts and colors.
- PostCSS is configured to use the Turbopack-compatible plugin `@tailwindcss/postcss` + `autoprefixer`.
- Fonts loaded via `next/font/google` and exposed as CSS variables: `--font-archivo`, `--font-lora`, `--font-jetbrains-mono`.
- Static content is stored in typed data files under `data/` for easier editing and type-safety.

Adding or Updating Team Photos
- Place images in `public/images/team/` and name them lowercase (e.g. `defon.jpg`).
- `data/team.ts` supports an optional `photoUrl?: string` on `TeamMember`. When `photoUrl` is set, `TeamGrid` will render the image with `next/image`; otherwise it falls back to initials.
- Recommended: square images (256×256 or 512×512). Use ImageMagick to crop/resize:
	```bash
	convert input.jpg -resize 512x512^ -gravity center -extent 512x512 public/images/team/defon.jpg
	```

Local Development
1. Install dependencies:
	 ```bash
	 npm install
	 ```
2. Development server (Turbopack):
	 ```bash
	 npm run dev
	 ```
	 If you encounter Turbopack-specific PostCSS errors, you can fall back to Webpack:
	 ```bash
	 npx next dev --webpack
	 ```

Build and Production
 - Build:
	 ```bash
	 npm run build
	 ```
 - Start production server:
	 ```bash
	 npm start
	 ```

PostCSS / Tailwind v4 Notes
- Turbopack requires the PostCSS Tailwind plugin from `@tailwindcss/postcss`. The repo uses `postcss.config.mjs` pointing to `{"@tailwindcss/postcss": {}, autoprefixer: {}}`.
- Keep Tailwind class names static where possible — dynamic template strings like `text-${color}` prevent Tailwind from generating utilities.

Styling and Theme Tokens
- Theme colors are defined in `tailwind.config.ts` (tokens: `paper`, `ink`, `slate`, `amber`, `line`, `card`, `muted`, `body`).
- `app/globals.css` imports Tailwind and sets CSS variables for font families and design tokens. The `bg-blueprint` utility creates the subtle grid background used in `Hero`.

Code Conventions
- Keep Server Components by default; add `"use client"` at the top of client components.
- Use typed data from `data/` and `lib/types.ts` rather than inline arrays in components.
- Avoid one-letter variable names; prefer descriptive names.

Troubleshooting
- If you see an error about using `tailwindcss` as a PostCSS plugin, install and configure `@tailwindcss/postcss` and restart the dev server.
- If fonts or CSS changes don't appear, stop and restart the dev server. Keep only one dev server instance running.
- If `next/image` can't load remote hosts, add the host to `next.config.js` `images.domains` or `remotePatterns`.

Where to Edit Content
- Projects: `data/projects.ts` + `components/ProjectsGrid.tsx` and `ProjectCard.tsx`.
- Team: `data/team.ts` + `components/TeamGrid.tsx`.
- Services/process: `data/services.ts`, `data/process.ts` + their matching components.

Accessibility
- The project uses semantic HTML, `aria-` attributes on form inputs for validation state, and `alt` text on team photos.

Deployment
- Works with Vercel, Netlify, or any Node host that supports Next.js. For Vercel, default settings for App Router are supported. If using a custom host, ensure proper environment variables and `next start` usage after `npm run build`.

Developer Notes
- `lib/validate.ts` exports `validateContactForm({ name, email, message })` which returns an object of validation errors used by the client `ContactForm`.
- `components/TeamGrid.tsx` uses `next/image` to render `photoUrl` when present and falls back to initials otherwise.
- Section labels use a subtle left tick and slightly increased weight/tracking for visual anchors. Modify in each component if you want a different style.

Contributing
- Fork, create a branch, and submit PRs. Keep changes focused and run the dev server locally to verify.

Contact & Support
- For questions about the scaffold or to request features, open an issue or contact the project maintainer.

License
- Add your license file here. No license is specified in this scaffold by default.

---
If you want, I can also:
- run the dev server and verify the Team image appears;
- add example images to `public/images/team/`;
- or create a short CONTRIBUTING.md for PR guidance.


