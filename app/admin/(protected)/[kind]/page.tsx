import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteEntityAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { SCHEMAS, SEGMENT_TO_KIND } from "@/lib/adminSchema";
import { firstParam } from "@/lib/ecosystem";
import { listEntities, partnershipKey } from "@/lib/store";

export default async function AdminList({
  params,
  searchParams,
}: {
  params: Promise<{ kind: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();
  const { kind: segment } = await params;
  const kind = SEGMENT_TO_KIND[segment];
  if (!kind) notFound();
  const schema = SCHEMAS[kind];
  const sp = await searchParams;
  const error = firstParam(sp.error);

  const rows = (await listEntities(kind)) as unknown as Record<string, unknown>[];
  const keyOf = (d: Record<string, unknown>) =>
    schema.hasSlug
      ? String(d.slug)
      : partnershipKey(d as { fromSlug: string; toSlug: string; type: never });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-ink">{schema.plural}</h1>
        <Link href={`/admin/${segment}/new`} className="btn-primary">
          New {schema.singular}
        </Link>
      </div>

      {sp.saved && <p className="mb-4 text-sm text-green-800">Saved.</p>}
      {sp.deleted && <p className="mb-4 text-sm text-green-800">Deleted.</p>}
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-700 border border-red-200 bg-red-50 rounded-md p-3">
          {error}
        </p>
      )}

      {rows.length === 0 ? (
        <p className="text-sm text-muted border border-dashed border-line rounded-md p-8 text-center">
          None yet.
        </p>
      ) : (
        <ul className="divide-y divide-line border border-line rounded-md bg-card">
          {rows.map((d) => {
            const key = keyOf(d);
            return (
              <li key={key} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  <div className="text-sm text-ink truncate">
                    {schema.label(d)}
                    {d.sample === true && (
                      <span className="ml-2 font-mono text-xs uppercase text-muted">sample</span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-muted truncate">{schema.detail(d)}</div>
                </div>
                <div className="flex items-center gap-4 shrink-0 text-sm">
                  <Link href={`/admin/${segment}/${encodeURIComponent(key)}`} className="text-amber hover:underline">
                    Edit
                  </Link>
                  <form action={deleteEntityAction.bind(null, kind, key)}>
                    <button type="submit" className="text-red-700 hover:underline">
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
