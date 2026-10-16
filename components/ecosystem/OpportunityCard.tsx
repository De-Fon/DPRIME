import type { Opportunity } from "@/lib/types";
import { formatDate, type EntityRef } from "@/lib/ecosystem";
import Link from "next/link";
import CoverImage from "./CoverImage";
import SampleBadge from "./SampleBadge";

export default function OpportunityCard({
  opportunity,
  poster,
}: {
  opportunity: Opportunity;
  poster: EntityRef | null;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-card transition duration-200 hover:-translate-y-1 hover:border-amber/50 hover:shadow-xl hover:shadow-ink/8">
      <CoverImage src={opportunity.imageUrl} alt={opportunity.title} variant="opportunity" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber">{opportunity.kind}</span>
          {opportunity.sample && <SampleBadge />}
        </div>
        <h2 className="font-display text-xl leading-snug tracking-tight text-ink sm:text-2xl"><Link href={`/opportunities/${opportunity.slug}`} className="rounded-sm hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber">{opportunity.title}</Link></h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{opportunity.description}</p>
        {opportunity.topics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {opportunity.topics.slice(0, 3).map((topic) => <span key={topic} className="rounded-full bg-paper px-2.5 py-1 text-xs text-muted">{topic}</span>)}
          </div>
        )}
        <div className="mt-auto space-y-3 border-t border-line pt-4 mt-6">
          <div className="flex flex-wrap items-start justify-between gap-2 text-xs text-muted">
            <span>{opportunity.location}</span>
            {opportunity.deadline && <span className="rounded-md bg-[#f7eee5] px-2.5 py-1 font-mono text-[#96521f]">Deadline · {formatDate(opportunity.deadline)}</span>}
          </div>
          <div className="flex items-center justify-between gap-3 text-xs text-muted">
            <span>Posted by</span>
            {poster?.href ? (
              <Link href={poster.href} className="inline-flex min-h-11 items-center text-right hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber">{poster.name} ↗</Link>
            ) : (
              <span>{poster?.name ?? opportunity.postedBySlug}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
