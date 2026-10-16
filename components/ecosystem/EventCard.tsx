import type { EcosystemEvent } from "@/lib/types";
import { formatDate, type EntityRef } from "@/lib/ecosystem";
import Link from "next/link";
import CoverImage from "./CoverImage";
import SampleBadge from "./SampleBadge";

export default function EventCard({
  event,
  host,
}: {
  event: EcosystemEvent;
  host: EntityRef | null;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-card transition duration-200 hover:-translate-y-1 hover:border-amber/50 hover:shadow-xl hover:shadow-ink/8">
      <CoverImage src={event.imageUrl ?? host?.imageUrl} alt={event.title} variant="event" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium text-amber"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber" />{formatDate(event.date)}</span>
          <span className="flex flex-wrap items-center gap-2">
            {event.sample && <SampleBadge />}
            <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">{event.kind}</span>
          </span>
        </div>
        <h2 className="font-display text-xl leading-snug tracking-tight text-ink sm:text-2xl"><Link href={`/events/${event.slug}`} className="rounded-sm hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber">{event.title}</Link></h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{event.description}</p>
        {event.topics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {event.topics.slice(0, 3).map((topic) => <span key={topic} className="rounded-full bg-paper px-2.5 py-1 text-xs text-muted">{topic}</span>)}
          </div>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 mt-6 text-xs text-muted">
          <span className="min-w-0">{event.location}</span>
          {host?.href ? (
            <Link href={host.href} className="inline-flex min-h-11 items-center text-right hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber">Hosted by {host.name} ↗</Link>
          ) : (
            <span>Hosted by {host?.name ?? event.hostSlug}</span>
          )}
        </div>
      </div>
    </article>
  );
}
