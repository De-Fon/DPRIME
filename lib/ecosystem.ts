import { communities } from "@/data/communities";
import { organizations } from "@/data/organizations";
import { ecosystemEvents } from "@/data/ecosystemEvents";
import { programs } from "@/data/programs";
import { opportunities } from "@/data/opportunities";
import { partnerships } from "@/data/partnerships";
import type {
  Community,
  EcosystemEvent,
  Opportunity,
  Organization,
  Partnership,
  Region,
  Topic,
} from "./types";

export interface EntityRef {
  slug: string;
  name: string;
  href: string | null; // organizations have no detail page yet
  sample: boolean;
}

// Communities and organizations share one slug namespace, which lets events,
// programs, opportunities and partnerships reference either by slug.
export function resolveEntity(slug: string): EntityRef | null {
  const community = communities.find((c) => c.slug === slug);
  if (community) {
    return {
      slug,
      name: community.name,
      href: `/communities/${slug}`,
      sample: !!community.sample,
    };
  }
  const org = organizations.find((o) => o.slug === slug);
  if (org) return { slug, name: org.name, href: null, sample: !!org.sample };
  return null;
}

export interface Connection {
  entity: EntityRef;
  type: Partnership["type"];
}

// Partnerships are stored once but are visible from both sides.
export function connectionsOf(slug: string): Connection[] {
  const result: Connection[] = [];
  for (const p of partnerships) {
    const otherSlug =
      p.fromSlug === slug ? p.toSlug : p.toSlug === slug ? p.fromSlug : null;
    if (!otherSlug) continue;
    const entity = resolveEntity(otherSlug);
    if (entity) result.push({ entity, type: p.type });
  }
  return result;
}

export function eventsFor(slug: string): EcosystemEvent[] {
  return ecosystemEvents
    .filter((e) => e.hostSlug === slug || e.partnerSlugs.includes(slug))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function opportunitiesFor(slug: string): Opportunity[] {
  return opportunities.filter((o) => o.postedBySlug === slug);
}

export function programsFor(slug: string) {
  return programs.filter((p) => p.runBySlug === slug);
}

export interface Filters {
  q?: string;
  region?: string;
  topic?: string;
}

interface Filterable {
  region: Region;
  topics: Topic[];
}

function matches<T extends Filterable>(
  item: T,
  searchText: string,
  { q, region, topic }: Filters,
): boolean {
  if (region && item.region !== region) return false;
  if (topic && !item.topics.includes(topic as Topic)) return false;
  if (q && !searchText.toLowerCase().includes(q.trim().toLowerCase()))
    return false;
  return true;
}

export const filterCommunities = (f: Filters): Community[] =>
  communities.filter((c) =>
    matches(c, `${c.name} ${c.tagline} ${c.location} ${c.kind}`, f),
  );

export const filterOrganizations = (f: Filters): Organization[] =>
  organizations.filter((o) =>
    matches(o, `${o.name} ${o.description} ${o.location}`, f),
  );

export const filterEvents = (f: Filters): EcosystemEvent[] =>
  ecosystemEvents
    .filter((e) =>
      matches(e, `${e.title} ${e.description} ${e.location} ${e.kind}`, f),
    )
    .sort((a, b) => a.date.localeCompare(b.date));

export const filterOpportunities = (f: Filters): Opportunity[] =>
  opportunities.filter((o) =>
    matches(o, `${o.title} ${o.description} ${o.location} ${o.kind}`, f),
  );

export const REGIONS: Region[] = [
  "East Africa",
  "West Africa",
  "Southern Africa",
  "North Africa",
  "Central Africa",
  "Global",
];

export const TOPICS: Topic[] = [
  "AI",
  "Web",
  "Mobile",
  "Cloud",
  "Cybersecurity",
  "Data",
  "Open Source",
  "Startups",
  "Women in Tech",
  "General",
];

export function formatDate(iso: string): string {
  // Parse as UTC so the rendered day never shifts with the server timezone.
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Next.js delivers repeated query params as arrays; take the first.
export function firstParam(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}
