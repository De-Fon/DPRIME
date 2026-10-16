import { cache } from "react";
import { listEntities } from "./store";
import type {
  Community,
  EcosystemEvent,
  Opportunity,
  Organization,
  Partnership,
  Program,
  Region,
  Topic,
} from "./types";

// A point-in-time view of every ecosystem entity, loaded once per request.
// Sample records are intentionally included so developers can exercise public
// listings and detail pages before verified production content is available.
export interface Ecosystem {
  communities: Community[];
  organizations: Organization[];
  events: EcosystemEvent[];
  programs: Program[];
  opportunities: Opportunity[];
  partnerships: Partnership[];
}

export const getEcosystem = cache(async (): Promise<Ecosystem> => {
  const [communities, organizations, events, programs, opportunities, partnerships] =
    await Promise.all([
      listEntities("community"),
      listEntities("organization"),
      listEntities("event"),
      listEntities("program"),
      listEntities("opportunity"),
      listEntities("partnership"),
    ]);

  return {
    communities,
    organizations,
    events,
    programs,
    opportunities,
    partnerships,
  };
});

export interface EntityRef {
  slug: string;
  name: string;
  href: string | null;
  sample: boolean;
}

// Communities and organizations share one slug namespace, which lets events,
// programs, opportunities and partnerships reference either by slug.
export function resolveEntity(eco: Ecosystem, slug: string): EntityRef | null {
  const community = eco.communities.find((c) => c.slug === slug);
  if (community) {
    return {
      slug,
      name: community.name,
      href: `/communities/${slug}`,
      sample: !!community.sample,
    };
  }
  const org = eco.organizations.find((o) => o.slug === slug);
  if (org) return { slug, name: org.name, href: `/organizations/${slug}`, sample: !!org.sample };
  return null;
}

export interface Connection {
  entity: EntityRef;
  type: Partnership["type"];
}

// Partnerships are stored once but are visible from both sides.
export function connectionsOf(eco: Ecosystem, slug: string): Connection[] {
  const result: Connection[] = [];
  for (const p of eco.partnerships) {
    const otherSlug =
      p.fromSlug === slug ? p.toSlug : p.toSlug === slug ? p.fromSlug : null;
    if (!otherSlug) continue;
    const entity = resolveEntity(eco, otherSlug);
    if (entity) result.push({ entity, type: p.type });
  }
  return result;
}

export function eventsFor(eco: Ecosystem, slug: string): EcosystemEvent[] {
  return eco.events
    .filter((e) => e.hostSlug === slug || e.partnerSlugs.includes(slug))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function opportunitiesFor(eco: Ecosystem, slug: string): Opportunity[] {
  return eco.opportunities.filter((o) => o.postedBySlug === slug);
}

export function programsFor(eco: Ecosystem, slug: string) {
  return eco.programs.filter((p) => p.runBySlug === slug);
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

export const filterCommunities = (eco: Ecosystem, f: Filters): Community[] =>
  eco.communities.filter((c) =>
    matches(c, `${c.name} ${c.tagline} ${c.location} ${c.kind}`, f),
  );

export const filterOrganizations = (eco: Ecosystem, f: Filters): Organization[] =>
  eco.organizations.filter((o) =>
    matches(o, `${o.name} ${o.description} ${o.location}`, f),
  );

export const filterEvents = (eco: Ecosystem, f: Filters): EcosystemEvent[] =>
  eco.events
    .filter((e) =>
      matches(e, `${e.title} ${e.description} ${e.location} ${e.kind}`, f),
    )
    .sort((a, b) => a.date.localeCompare(b.date));

export const filterOpportunities = (eco: Ecosystem, f: Filters): Opportunity[] =>
  eco.opportunities.filter((o) =>
    matches(o, `${o.title} ${o.description} ${o.location} ${o.kind}`, f),
  );

// Everything that points at `slug`. Used to block deletes that would leave
// dangling references.
export function referencesTo(eco: Ecosystem, slug: string): string[] {
  const refs: string[] = [];
  for (const e of eco.events)
    if (e.hostSlug === slug || e.partnerSlugs.includes(slug)) refs.push(`event "${e.title}"`);
  for (const p of eco.programs)
    if (p.runBySlug === slug) refs.push(`program "${p.title}"`);
  for (const o of eco.opportunities)
    if (o.postedBySlug === slug) refs.push(`opportunity "${o.title}"`);
  for (const p of eco.partnerships)
    if (p.fromSlug === slug || p.toSlug === slug) refs.push(`partnership ${p.fromSlug} / ${p.toSlug}`);
  return refs;
}

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
