import type { EcosystemEvent } from "@/lib/types";
import { formatDate, resolveEntity } from "@/lib/ecosystem";
import Link from "next/link";
import SampleBadge from "./SampleBadge";

export default function EventCard({ event }: { event: EcosystemEvent }) {
  const host = resolveEntity(event.hostSlug);
  return (
    <article className="bg-card border border-line rounded-md p-6 transition duration-150 hover:-translate-y-1 hover:border-amber/40 hover:shadow-md">
      <div className="flex items-center justify-between gap-3 mb-6">
        <span className="font-mono text-xs text-amber">
          {formatDate(event.date)}
        </span>
        <span className="flex items-center gap-2">
          {event.sample && <SampleBadge />}
          <span className="font-mono text-xs text-muted border border-line rounded-full px-2.5 py-1">
            {event.kind}
          </span>
        </span>
      </div>
      <h3 className="font-display text-xl text-ink">{event.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{event.description}</p>
      <div className="mt-5 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted">
        <span>{event.location}</span>
        {host?.href ? (
          <Link href={host.href} className="hover:text-amber">
            hosted by {host.name}
          </Link>
        ) : (
          <span>hosted by {host?.name}</span>
        )}
      </div>
    </article>
  );
}
