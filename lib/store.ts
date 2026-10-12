import { pool, dbConfigured } from "./db";
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
  Program,
} from "./types";

// Persistence for ecosystem data.
//
// With DATABASE_URL set, records live in Postgres (one `entities` table keyed
// by kind + slug, payload in JSONB) and the admin portal can edit them. The
// static files in data/ are used once to seed an empty database. Without
// DATABASE_URL the site renders straight from those files, read-only, so local
// development and builds work with no setup.

export type Kind =
  | "community"
  | "organization"
  | "event"
  | "program"
  | "opportunity"
  | "partnership";

export interface KindMap {
  community: Community;
  organization: Organization;
  event: EcosystemEvent;
  program: Program;
  opportunity: Opportunity;
  partnership: Partnership;
}

export const KINDS: Kind[] = [
  "community",
  "organization",
  "event",
  "program",
  "opportunity",
  "partnership",
];

// Partnerships have no slug of their own; the key is derived from the edge.
export function partnershipKey(p: Pick<Partnership, "fromSlug" | "toSlug" | "type">): string {
  return `${p.fromSlug}__${p.toSlug}__${p.type.replace(/ /g, "-")}`;
}

function seedRows(): { kind: Kind; slug: string; data: unknown }[] {
  return [
    ...communities.map((d) => ({ kind: "community" as const, slug: d.slug, data: d })),
    ...organizations.map((d) => ({ kind: "organization" as const, slug: d.slug, data: d })),
    ...ecosystemEvents.map((d) => ({ kind: "event" as const, slug: d.slug, data: d })),
    ...programs.map((d) => ({ kind: "program" as const, slug: d.slug, data: d })),
    ...opportunities.map((d) => ({ kind: "opportunity" as const, slug: d.slug, data: d })),
    ...partnerships.map((d) => ({ kind: "partnership" as const, slug: partnershipKey(d), data: d })),
  ];
}

function seedList<K extends Kind>(kind: K): KindMap[K][] {
  return seedRows()
    .filter((r) => r.kind === kind)
    .map((r) => r.data as KindMap[K]);
}

const g = globalThis as unknown as { __dprimeReady?: Promise<void> };

// Create the schema and seed it exactly once. The `meta` marker row makes
// seeding atomic and permanent: an admin who deletes every record does not get
// the sample data back on the next cold start.
function ready(): Promise<void> {
  g.__dprimeReady ??= (async () => {
    const client = await pool().connect();
    try {
      await client.query("BEGIN");
      await client.query(`
        CREATE TABLE IF NOT EXISTS entities (
          kind text NOT NULL,
          slug text NOT NULL,
          data jsonb NOT NULL,
          updated_at timestamptz NOT NULL DEFAULT now(),
          PRIMARY KEY (kind, slug)
        )`);
      await client.query(
        "CREATE TABLE IF NOT EXISTS meta (key text PRIMARY KEY, value text NOT NULL)",
      );
      // Supabase exposes public-schema tables through its Data API using a
      // public key. With RLS on and no policies that API is denied everything,
      // while this server's direct connection (table owner) is unaffected.
      await client.query("ALTER TABLE entities ENABLE ROW LEVEL SECURITY");
      await client.query("ALTER TABLE meta ENABLE ROW LEVEL SECURITY");
      const marker = await client.query(
        "INSERT INTO meta (key, value) VALUES ('seeded', 'true') ON CONFLICT DO NOTHING",
      );
      if (marker.rowCount === 1) {
        for (const r of seedRows()) {
          await client.query(
            "INSERT INTO entities (kind, slug, data) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
            [r.kind, r.slug, JSON.stringify(r.data)],
          );
        }
      }
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK").catch(() => {});
      g.__dprimeReady = undefined; // allow a retry on the next request
      throw err;
    } finally {
      client.release();
    }
  })();
  return g.__dprimeReady;
}

export async function listEntities<K extends Kind>(kind: K): Promise<KindMap[K][]> {
  if (!dbConfigured()) return seedList(kind);
  await ready();
  const { rows } = await pool().query(
    "SELECT data FROM entities WHERE kind = $1 ORDER BY slug",
    [kind],
  );
  return rows.map((r) => r.data as KindMap[K]);
}

export async function getEntity<K extends Kind>(
  kind: K,
  slug: string,
): Promise<KindMap[K] | null> {
  if (!dbConfigured()) {
    return (
      seedRows().find((r) => r.kind === kind && r.slug === slug)?.data as
        | KindMap[K]
        | undefined
    ) ?? null;
  }
  await ready();
  const { rows } = await pool().query(
    "SELECT data FROM entities WHERE kind = $1 AND slug = $2",
    [kind, slug],
  );
  return (rows[0]?.data as KindMap[K] | undefined) ?? null;
}

export async function saveEntity(kind: Kind, slug: string, data: unknown): Promise<void> {
  await ready();
  await pool().query(
    `INSERT INTO entities (kind, slug, data) VALUES ($1, $2, $3)
     ON CONFLICT (kind, slug) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [kind, slug, JSON.stringify(data)],
  );
}

// Insert only; returns false if the key is already taken. Avoids the
// check-then-write race when two admins create the same slug.
export async function createEntity(kind: Kind, slug: string, data: unknown): Promise<boolean> {
  await ready();
  const res = await pool().query(
    "INSERT INTO entities (kind, slug, data) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
    [kind, slug, JSON.stringify(data)],
  );
  return res.rowCount === 1;
}

export async function deleteEntity(kind: Kind, slug: string): Promise<void> {
  await ready();
  await pool().query("DELETE FROM entities WHERE kind = $1 AND slug = $2", [kind, slug]);
}
