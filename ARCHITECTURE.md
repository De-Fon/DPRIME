DPRIME
Team Website — Project Requirements & Architecture
1. Objective
Build a professional, client-facing website for DPRIME, a 10-member student developer team, to showcase real shipped work and attract client gigs — not just serve as a club portfolio.
The site should demonstrate:
    • A distinctive visual identity that doesn't resemble any existing template or the team's own prior product (Rumia)
    • Professional, restrained UI/UX — no flashy motion, no shouting colors
    • Real project case studies with live status and tech stack
    • Component reusability and clean architecture
    • Client-ready trust signals: stats, process, team, ongoing support
2. Audience & Goal
Team type: Student coding club/community.
Primary goal: Attracting clients and gigs, not just recruiting members.
3. Content Structure
The site is organized as a single-page flow with anchored sections, plus dedicated case-study routes per project:
    • Hero — problem-hook headline, short pitch, primary CTA
    • Stats bar — team size, projects shipped, live products, support rate
    • Projects — numbered case-study entries (spec-sheet style), each linking to a detail page
    • Services — what the team offers, mapped to the actual stack
    • Process — Scope → Build → Ship → Support
    • Team — ~10 members with initials, name, role
    • Contact — validated form for starting a project
4. Design System
4.1 Design Direction
Design metaphor: a "blueprint / spec-sheet" aesthetic — faint background grid, doc/01-style section labels, numbered entries with left accent borders. This replaced an earlier "git commit-log" concept, which was dropped for being visually close to the team's own Rumia site.
No gradients, no neon, no autoplay motion. Fade-ins and hover states only.
4.2 Color Palette
Token
Hex
Role
paper
#EEF0F2
Base background
ink
#171A21
Primary text
slate
#3D4F7C
Primary accent (links, status)
amber
#C97A3D
Secondary accent (highlights)
line
#CDD1D6
Borders / dividers

4.3 Typography
Role
Typeface
Used for
Display
Archivo (sans)
Headings, nav, buttons
Body
Lora (serif)
Paragraph copy, descriptions
Utility
JetBrains Mono
Index numbers, tags, status labels, doc-section labels

4.4 Signature Element
Each project is rendered as a numbered spec-sheet entry: a large ghost index number, a left accent border (slate, turning amber on hover), the project name, a status marker (■ shipped / □ in progress), a one-line description, and mono-styled tech tags. This ties the visual identity directly to how the team actually documents its own work.
5. Technical Architecture
5.1 Stack
Layer
Choice
Framework
Next.js (App Router)
Language
TypeScript
Styling
Tailwind CSS, custom theme tokens
Routing
File-system based routing (Next.js App Router)
Rendering
Server Components by default
Client Components
Only where interactivity/state is required
Data
Static TypeScript files in data/ (no backend/CMS)
State
useState/useEffect only, scoped to individual Client Components — no global store needed
Images
next/image for optimized, lazy-loaded images
Forms
Client-side validation now; wired to a future API/service endpoint

5.2 Folder Structure
dprime/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── globals.css
│   │
│   └── projects/
│       └── [slug]/
│           └── page.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── StatsBar.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectsGrid.tsx
│   ├── ServicesGrid.tsx
│   ├── ProcessSteps.tsx
│   ├── TeamGrid.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Loader.tsx
│   └── ErrorState.tsx
│
├── data/
│   ├── projects.ts
│   ├── team.ts
│   ├── services.ts
│   └── process.ts
│
├── lib/
│   └── validate.ts
│
├── public/
│   └── images/
│
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json

5.3 Routing
Next.js App Router handles routing via the filesystem — there is no client-side router library and no central route table.
Route
File
/
app/page.tsx
/projects/[slug]
app/projects/[slug]/page.tsx
anything unmatched
app/not-found.tsx

The App Router removes the need for a top-level App.jsx/main.jsx entry pair, a routes/AppRoutes.jsx route table, and dedicated page wrapper components (Home, ProjectDetail, NotFound) — these responsibilities are handled directly by the app/ directory structure.
5.4 Components
Components keep their existing responsibilities and names, converted to .tsx. Server Components are the default; a component only becomes a Client Component ("use client") when it genuinely needs interactivity or browser state.
Client Components
    • ContactForm — form state and client-side validation
    • Navbar — only if the mobile navigation menu requires client-side open/close state
Server Components
The following stay Server Components unless implementation proves otherwise:
    • Hero
    • StatsBar
    • ProjectCard
    • ProjectsGrid
    • ServicesGrid
    • ProcessSteps
    • TeamGrid
    • Footer
Loader and ErrorState remain available as shared, presentation-only components for async and error states where needed.
5.5 Project Detail Pages
    • Implemented as a dynamic route at app/projects/[slug]/page.tsx.
    • Project data continues to come from data/projects.ts
    • No database or CMS is introduced — the static data file remains the single source of truth.
    • A project is looked up by its slug; an unknown slug calls Next.js's notFound() to render app/not-found.tsx.
Example:
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find(
    (project) => project.slug === slug
  );

  if (!project) {
    notFound();
  }

  // render project
}

5.6 Data Architecture
    • Static data files remain the approach — projects.ts, team.ts, services.ts, process.ts under data/.
    • TypeScript types/interfaces are used where they improve maintainability (e.g. a Project or TeamMember type).
    • No Redux, Context API, Zustand, database, CMS, or other global state is introduced.
5.7 State Management
Local component state only (useState/useEffect), scoped to Client Components such as ContactForm. Data (projects, team, services, process) is imported directly from the static TypeScript files under data/ — no backend or CMS is required to add a new project.
5.8 Performance
    • Route-level code splitting and rendering cost are handled by Next.js and Server Components — no React.lazy()/Suspense is needed for the project detail route.
    • Images use next/image (<Image />) wherever appropriate, so project images are optimized and lazy-loaded automatically.
    • No manual React.memo(ProjectCard) unless a real, demonstrated performance issue justifies it.
5.9 Accessibility
    • Semantic HTML throughout (header, nav, main, section, footer)
    • Labeled form fields with aria-invalid / aria-describedby on error
    • Keyboard-navigable nav and form
    • role="alert" / role="status" on error and loading states
6. Content Inventory
6.1 Projects
    • Rumia — live hostel discovery platform for DeKUT students (flagship, marked "live")
    • Campus Laundry — booking + auth system, FastAPI + PostgreSQL (shipped)
    • CineX — movie discovery app on the TMDB API (shipped)
6.2 Services (mapped to team skills)
    • Web applications — React, Next.js, Tailwind
    • Backend and APIs — Python, FastAPI, PostgreSQL, Daraja API
    • Data and automation — Pandas, NumPy
    • Ongoing support — post-launch maintenance
6.3 Team
    • 10 members. Initials/roles are placeholders in data/team.ts pending real names.
7. Open Items Before Launch
    • Replace placeholder team entries with real names, roles, and initials
    • Add live URLs for each project (Rumia especially)
    • Wire the contact form to a real submission endpoint or service (e.g. Formspree, EmailJS, or a small FastAPI/Next.js API endpoint matching the team's existing backend pattern)
    • Add real project screenshots (currently a text-only spec-sheet layout)