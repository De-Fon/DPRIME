"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { saveEntityAction } from "@/app/admin/actions";
import type { Field, FormState, FormValues } from "@/lib/adminSchema";
import type { Kind } from "@/lib/store";

// Matches MAX_IMAGE_BYTES in lib/storage.ts (server-only, so repeated here).
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

// Checked in the browser too: an oversized body is rejected by the framework
// before the server action runs, which would otherwise surface as a vague failure.
function ImagePicker({ name }: { name: string }) {
  const [problem, setProblem] = useState<string | null>(null);
  return (
    <>
      <input
        type="file"
        name={name}
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && file.size > MAX_IMAGE_BYTES) {
            setProblem("Image must be 4 MB or smaller");
            e.target.value = "";
          } else {
            setProblem(null);
          }
        }}
        className="block w-full text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border file:border-line file:bg-card file:px-3 file:py-2"
      />
      {problem && (
        <span role="alert" className="block text-xs text-red-700">
          {problem}
        </span>
      )}
    </>
  );
}

const input = "mt-1 w-full border border-line rounded-md bg-card px-3 py-2 text-sm";

function FieldInput({
  field,
  value,
  readOnly,
  storageEnabled,
}: {
  field: Field;
  value: string | string[] | undefined;
  readOnly: boolean;
  storageEnabled: boolean;
}) {
  const str = typeof value === "string" ? value : "";
  switch (field.type) {
    case "image":
      return (
        <div className="mt-1 space-y-3">
          {str && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={str} alt="Current" className="h-32 w-auto rounded-md border border-line object-cover" />
          )}
          <input type="hidden" name={`${field.name}__current`} value={str} />
          {storageEnabled ? (
            <>
              <ImagePicker name={field.name} />
              {str && (
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" name={`${field.name}__remove`} />
                  Remove current image
                </label>
              )}
            </>
          ) : (
            <p className="text-sm text-muted">
              Image uploads are off. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (see docs/SUPABASE.md).
            </p>
          )}
        </div>
      );
    case "textarea":
      return <textarea name={field.name} defaultValue={str} rows={4} className={input} />;
    case "select":
      return (
        <select name={field.name} defaultValue={str} className={input}>
          <option value="">Select...</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    case "multi": {
      const selected = Array.isArray(value) ? value : [];
      return (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
          {field.options?.map((o) => (
            <label key={o} className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" name={field.name} value={o} defaultChecked={selected.includes(o)} />
              {o}
            </label>
          ))}
        </div>
      );
    }
    case "date":
      return <input type="date" name={field.name} defaultValue={str} className={input} />;
    case "number":
      return <input type="number" min={0} step={1} name={field.name} defaultValue={str} className={input} />;
    default:
      return (
        <input
          type="text"
          name={field.name}
          defaultValue={str}
          readOnly={readOnly}
          className={`${input} ${readOnly ? "bg-paper text-muted" : ""}`}
        />
      );
  }
}

export default function EntityForm({
  kind,
  segment,
  fields,
  initial,
  originalSlug,
  storageEnabled,
}: {
  kind: Kind;
  segment: string;
  fields: Field[];
  initial: FormValues;
  originalSlug: string | null;
  storageEnabled: boolean;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveEntityAction.bind(null, kind, originalSlug),
    { errors: {} },
  );
  // After a failed submit React resets the form, so re-seed from what was sent.
  const values = state.values ?? initial;

  return (
    <form action={action} className="space-y-5 max-w-2xl">
      {state.formError && (
        <p role="alert" className="text-sm text-red-700 border border-red-200 bg-red-50 rounded-md p-3">
          {state.formError}
        </p>
      )}
      {fields.map((f) => (
        <label key={`${state.key ?? "initial"}-${f.name}`} className="block">
          <span className="font-mono text-xs text-muted">
            {f.label.toUpperCase()}
            {f.required && " *"}
          </span>
          <FieldInput field={f} value={values[f.name]} readOnly={f.name === "slug" && originalSlug !== null} storageEnabled={storageEnabled} />
          {f.help && <span className="block mt-1 text-xs text-muted">{f.help}</span>}
          {state.errors[f.name] && (
            <span role="alert" className="block mt-1 text-xs text-red-700">
              {state.errors[f.name]}
            </span>
          )}
        </label>
      ))}
      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
          {pending ? "Saving..." : "Save"}
        </button>
        <Link href={`/admin/${segment}`} className="text-sm text-muted hover:text-amber">
          Cancel
        </Link>
      </div>
    </form>
  );
}
