"use client";

import { useState, useTransition } from "react";
import { promoteToOrganization, type OrgKind } from "@/app/admin/actions";

const ORG_KINDS: { value: OrgKind; label: string }[] = [
  { value: "company", label: "Company" },
  { value: "institution", label: "Institution" },
  { value: "nonprofit", label: "Nonprofit" },
];

export default function PromoteButton({ slug, name }: { slug: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [orgKind, setOrgKind] = useState<OrgKind>("company");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handlePromote() {
    setError(null);
    startTransition(async () => {
      const result = await promoteToOrganization(slug, orgKind);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-emerald-700 hover:underline text-sm"
        title="Promote to organization"
      >
        Promote
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="bg-card border border-line rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 space-y-4">
            <h2 className="font-display text-xl text-ink">
              Promote to Organization
            </h2>
            <p className="text-sm text-muted">
              This will convert <strong className="text-ink">{name}</strong> from
              a community into an organization. All existing links (events,
              programs, partnerships) will stay intact.
            </p>

            <label className="block">
              <span className="font-mono text-xs text-muted">ORGANIZATION TYPE *</span>
              <select
                value={orgKind}
                onChange={(e) => setOrgKind(e.target.value as OrgKind)}
                className="mt-1 w-full border border-line rounded-md bg-card px-3 py-2 text-sm"
              >
                {ORG_KINDS.map((k) => (
                  <option key={k.value} value={k.value}>
                    {k.label}
                  </option>
                ))}
              </select>
            </label>

            {error && (
              <p role="alert" className="text-sm text-red-700 border border-red-200 bg-red-50 rounded-md p-3">
                {error}
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handlePromote}
                disabled={isPending}
                className="btn-primary disabled:opacity-60"
              >
                {isPending ? "Promoting..." : "Promote"}
              </button>
              <button
                type="button"
                onClick={() => { setOpen(false); setError(null); }}
                className="text-sm text-muted hover:text-amber"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
