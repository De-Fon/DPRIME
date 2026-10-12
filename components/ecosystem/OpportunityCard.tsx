import Link from "next/link";
import type { Opportunity } from "@/lib/types";
import { formatDate, type EntityRef } from "@/lib/ecosystem";
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
    <article className="bg-card border border-line rounded-md overflow-hidden border-l-2 hover:border-l-amber transition duration-150 hover:-translate-y-1 hover:shadow-md">
      <CoverImage src={opportunity.imageUrl} alt={opportunity.title} />
      <div className="p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="font-mono text-xs text-amber">{opportunity.kind}</span>
        {opportunity.sample && <SampleBadge />}
      </div>
      <h3 className="font-display text-xl text-ink">{opportunity.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        {opportunity.description}
      </p>
      <div className="mt-5 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted">
        <span>
          {opportunity.location}
          {opportunity.deadline && ` · closes ${formatDate(opportunity.deadline)}`}
        </span>
        {poster?.href ? (
          <Link href={poster.href} className="hover:text-amber">
            {poster.name}
          </Link>
        ) : (
          <span>{poster?.name ?? opportunity.postedBySlug}</span>
        )}
      </div>
      </div>
    </article>
  );
}
