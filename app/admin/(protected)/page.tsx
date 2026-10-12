import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { dbConfigured } from "@/lib/db";
import { getEcosystem } from "@/lib/ecosystem";
import { SCHEMAS } from "@/lib/adminSchema";

const COUNT_KEY = {
  community: "communities",
  organization: "organizations",
  event: "events",
  program: "programs",
  opportunity: "opportunities",
  partnership: "partnerships",
} as const;

export default async function AdminHome() {
  await requireAdmin();
  const eco = await getEcosystem();
  return (
    <>
      <h1 className="font-display text-3xl text-ink mb-6">Manage site data</h1>
      {!dbConfigured() && (
        <p className="mb-6 text-sm border border-amber/40 bg-card rounded-md p-4">
          DATABASE_URL is not set. The site is showing the static seed data and edits cannot be saved.
        </p>
      )}
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.values(SCHEMAS).map((s) => (
          <li key={s.kind}>
            <Link
              href={`/admin/${s.segment}`}
              className="block bg-card border border-line rounded-md p-5 hover:border-amber/40"
            >
              <div className="font-display text-3xl text-ink">{eco[COUNT_KEY[s.kind]].length}</div>
              <div className="font-mono text-xs text-muted">{s.plural.toLowerCase()}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
