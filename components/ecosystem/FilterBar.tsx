import { REGIONS, TOPICS, type Filters } from "@/lib/ecosystem";

// Plain GET form: filters live in the URL, so pages stay server-rendered,
// shareable and work without client JavaScript.
export default function FilterBar({
  action,
  values,
}: {
  action: string;
  values: Filters;
}) {
  const field =
    "border border-line rounded-md bg-card px-3 py-2 text-sm text-ink min-w-0";
  return (
    <form
      action={action}
      method="get"
      className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto_auto] gap-3 items-center"
    >
      <input
        type="search"
        name="q"
        defaultValue={values.q}
        placeholder="Search"
        aria-label="Search"
        className={field}
      />
      <select
        name="region"
        defaultValue={values.region ?? ""}
        aria-label="Region"
        className={field}
      >
        <option value="">All regions</option>
        {REGIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <select
        name="topic"
        defaultValue={values.topic ?? ""}
        aria-label="Topic"
        className={field}
      >
        <option value="">All topics</option>
        {TOPICS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <button type="submit" className="btn-primary">
        Filter
      </button>
      <a href={action} className="inline-flex min-h-11 items-center justify-center text-sm text-muted hover:text-amber">
        Reset
      </a>
    </form>
  );
}
