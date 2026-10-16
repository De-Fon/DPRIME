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
  imageUrl?: string;
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
      imageUrl: community.imageUrl,
      sample: !!community.sample,
    };
  }
  const org = eco.organizations.find((o) => o.slug === slug);
  if (org) return { slug, name: org.name, href: `/organizations/${slug}`, imageUrl: org.imageUrl, sample: !!org.sample };
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

const SEARCH_SYNONYMS: Record<string, string[]> = {
  meetup: ["event", "gathering", "networking"],
  gathering: ["meetup", "event", "community"],
  job: ["work", "career", "employment"],
  internship: ["attachment", "placement", "work experience"],
  grant: ["funding", "sponsorship", "support"],
  scholarship: ["funding", "bursary", "education"],
  startup: ["founder", "entrepreneur", "business"],
  developer: ["programmer", "software", "coding", "engineer"],
  coding: ["programming", "developer", "software"],
  ai: ["artificial intelligence", "machine learning"],
  ml: ["machine learning", "ai"],
  online: ["virtual", "remote"],
  virtual: ["online", "remote"],
  remote: ["online", "virtual"],
  nairobi: ["kenya", "east africa"],
  kenya: ["nairobi", "east africa"],
  organisation: ["organization", "company", "institution"],
  organization: ["organisation", "company", "institution"],
};

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase()
    .replace(/https?:\\/\\/|www\\./g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\\s+/g, " ");
}

function editDistance(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous = current;
  }
  return previous[b.length];
}

function tokenMatches(queryToken: string, haystackTokens: string[]): boolean {
  if (queryToken.length < 3) return haystackTokens.some((word) => word === queryToken);
  const stem = queryToken.endsWith("ies") && queryToken.length > 4
    ? queryToken.slice(0, -3) + "y"
    : queryToken.endsWith("s") && queryToken.length > 4
      ? queryToken.slice(0, -1)
      : queryToken;
  const alternatives = [queryToken, stem, ...(SEARCH_SYNONYMS[queryToken] ?? [])];
  return haystackTokens.some((word) =>
    alternatives.some((candidate) =>
      word === candidate ||
      (candidate.length >= 4 && (word.startsWith(candidate) || candidate.startsWith(word))) ||
      (candidate.length >= 5 && word.length >= 5 && editDistance(candidate, word) <= 1),
    ),
  );
}

function matches<T extends Filterable>(
  item: T,
  searchText: string,
  { q, region, topic }: Filters,
): boolean {
  if (region && item.region !== region) return false;
  if (topic && !item.topics.includes(topic as Topic)) return false;
  if (!q?.trim()) return true;

  const query = normalizeSearch(q);
  if (!query) return true;
  const normalizedText = normalizeSearch(searchText);
  // Exact phrase wins; otherwise require each meaningful query word to match
  // somewhere in the record, making multi-word searches less brittle.
  if (normalizedText.includes(query)) return true;
  const queryTokens = query.split(" ").filter((token) => token.length > 1);
  const textTokens = normalizedText.split(" ");
  const stopWords = new Set(["the", "and", "for", "with", "from", "what", "how", "where", "find", "near", "in", "to", "a", "an"]);
  const usefulTokens = queryTokens.filter((token) => !stopWords.has(token));
  if (!usefulTokens.length) return normalizedText.includes(query);
  // For long natural-language queries, tolerate one unmatched word.
  const matched = usefulTokens.filter((token) => tokenMatches(token, textTokens)).length;
  return matched === usefulTokens.length || (usefulTokens.length >= 4 && matched >= usefulTokens.length - 1);
}

export const filterCommunities = (eco: Ecosystem, f: Filters): Community[] =>
  eco.communities.filter((c) =>
    matches(c, `${c.name} ${c.tagline} ${c.mission} ${c.location} ${c.kind} ${c.topics.join(" ")}`, f),
  );

export const filterOrganizations = (eco: Ecosystem, f: Filters): Organization[] =>
  eco.organizations.filter((o) =>
    matches(o, `${o.name} ${o.description} ${o.location} ${o.kind} ${o.topics.join(" ")}`, f),
  );

export const filterEvents = (eco: Ecosystem, f: Filters): EcosystemEvent[] =>
  eco.events
    .filter((e) =>
      matches(e, `${e.title} ${e.description} ${e.location} ${e.kind} ${e.topics.join(" ")}`, f),
    )
    .sort((a, b) => a.date.localeCompare(b.date));

export const filterOpportunities = (eco: Ecosystem, f: Filters): Opportunity[] =>
  eco.opportunities.filter((o) =>
    matches(o, `${o.title} ${o.description} ${o.location} ${o.kind} ${o.topics.join(" ")}`, f),
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
