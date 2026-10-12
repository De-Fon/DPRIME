"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveEntityAction } from "@/app/admin/actions";
import type { Field, FormState, FormValues } from "@/lib/adminSchema";
import type { Kind } from "@/lib/store";

const input = "mt-1 w-full border border-line rounded-md bg-card px-3 py-2 text-sm";

function FieldInput({
  field,
  value,
  readOnly,
}: {
  field: Field;
  value: string | string[] | undefined;
  readOnly: boolean;
}) {
  const str = typeof value === "string" ? value : "";
  switch (field.type) {
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
}: {
  kind: Kind;
  segment: string;
  fields: Field[];
  initial: FormValues;
  originalSlug: string | null;
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
          <FieldInput field={f} value={values[f.name]} readOnly={f.name === "slug" && originalSlug !== null} />
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
