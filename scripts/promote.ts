#!/usr/bin/env npx tsx
/**
 * 🔒 SECRET: Promote a community to an organization.
 *
 * Usage:
 *   npx tsx scripts/promote.ts <community-slug> <org-kind>
 *
 * Example:
 *   npx tsx scripts/promote.ts dev-kenya company
 *   npx tsx scripts/promote.ts nairobi-hackers nonprofit
 *
 * org-kind must be one of: company, institution, nonprofit
 *
 * What it does:
 *   1. Reads the community from the database
 *   2. Creates an organization with the same slug (all links stay intact)
 *   3. Deletes the original community record
 *
 * This script is not exposed anywhere in the app — only you can run it.
 */

import { pool } from "../lib/db";

type OrgKind = "company" | "institution" | "nonprofit";
const VALID_KINDS: OrgKind[] = ["company", "institution", "nonprofit"];

async function promote(slug: string, orgKind: OrgKind) {
  const db = pool();
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // 1. Fetch the community
    const { rows } = await client.query(
      "SELECT data FROM entities WHERE kind = $1 AND slug = $2",
      ["community", slug],
    );

    if (!rows.length) {
      console.error(`❌ No community found with slug "${slug}"`);
      process.exit(1);
    }

    const community = rows[0].data as Record<string, unknown>;

    // 2. Check no organization already exists with this slug
    const { rows: existing } = await client.query(
      "SELECT 1 FROM entities WHERE kind = $1 AND slug = $2",
      ["organization", slug],
    );

    if (existing.length) {
      console.error(`❌ An organization with slug "${slug}" already exists`);
      process.exit(1);
    }

    // 3. Build the organization from community data
    const organization = {
      slug: community.slug,
      name: community.name,
      kind: orgKind,
      description: community.mission || community.tagline || "",
      location: community.location || "",
      region: community.region,
      topics: community.topics || [],
      website: community.website,
      imageUrl: community.imageUrl,
    };

    // 4. Insert the organization
    await client.query(
      "INSERT INTO entities (kind, slug, data) VALUES ($1, $2, $3)",
      ["organization", slug, JSON.stringify(organization)],
    );

    // 5. Delete the community
    await client.query(
      "DELETE FROM entities WHERE kind = $1 AND slug = $2",
      ["community", slug],
    );

    await client.query("COMMIT");

    console.log(`✅ Promoted "${community.name}" from community → organization (${orgKind})`);
    console.log(`   Slug "${slug}" preserved — all existing links still work.`);
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("❌ Promotion failed:", err);
    process.exit(1);
  } finally {
    client.release();
    await db.end();
  }
}

// --- CLI ---
const [slug, kind] = process.argv.slice(2);

if (!slug || !kind) {
  console.log("Usage: npx tsx scripts/promote.ts <community-slug> <org-kind>");
  console.log("       org-kind: company | institution | nonprofit");
  process.exit(1);
}

if (!VALID_KINDS.includes(kind as OrgKind)) {
  console.error(`❌ Invalid org kind "${kind}". Must be one of: ${VALID_KINDS.join(", ")}`);
  process.exit(1);
}

promote(slug, kind as OrgKind);
