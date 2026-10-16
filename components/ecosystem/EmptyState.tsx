import Link from "next/link";

export default function EmptyState({
  message,
  resetHref,
}: {
  message: string;
  resetHref?: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-card px-6 py-12 text-center sm:px-10">
      <span aria-hidden="true" className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-line text-xl text-muted">
        ↗
      </span>
      <h2 className="mt-4 font-display text-xl text-ink">Nothing to show yet</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{message}</p>
      {resetHref && (
        <Link href={resetHref} className="btn-secondary mt-5 inline-flex min-h-11 items-center justify-center px-4">
          Clear filters
        </Link>
      )}
    </div>
  );
}
