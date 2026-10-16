import { REGIONS, TOPICS, type Filters } from "@/lib/ecosystem";

// URL-backed GET filters keep discovery shareable and usable without client JS.
export default function FilterBar({
  action,
  values,
}: {
  action: string;
  values: Filters;
}) {
  const field =
    "min-h-12 w-full min-w-0 rounded-lg border border-line bg-card px-4 py-3 text-sm text-ink shadow-sm transition placeholder:text-muted/70 hover:border-ink/30 focus-visible:border-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/20";

  return (
    <form
      action={action}
      method="get"
      role="search"
      aria-label="Filter listings"
      className="grid grid-cols-1 gap-3 rounded-xl border border-line bg-card/70 p-4 sm:grid-cols-2 lg:grid-cols-[minmax(240px,2fr)_minmax(150px,1fr)_minmax(150px,1fr)_auto_auto] lg:items-center lg:p-5"
    >
      <label className="block min-w-0">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Search</span>
        <input
          type="search"
          name="q"
          defaultValue={values.q}
          placeholder="Name, topic or location"
          aria-label="Search listings"
          className={field}
        />
      </label>
      <label className="block min-w-0">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Region</span>
        <select name="region" defaultValue={values.region ?? ""} aria-label="Region" className={field}>
          <option value="">All regions</option>
          {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </label>
      <label className="block min-w-0">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Topic</span>
        <select name="topic" defaultValue={values.topic ?? ""} aria-label="Topic" className={field}>
          <option value="">All topics</option>
          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>
      <button type="submit" className="btn-primary mt-0 min-h-12 self-end rounded-lg px-5">
        Apply filters
      </button>
      <a href={action} className="inline-flex min-h-12 items-center justify-center self-end px-3 text-sm text-muted transition hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber">
        Reset
      </a>
    </form>
  );
}
