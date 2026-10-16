import type { Opportunity } from "@/lib/types";
import { formatDate, type EntityRef } from "@/lib/ecosystem";
import Link from "next/link";
import CoverImage from "./CoverImage";
import SampleBadge from "./SampleBadge";

export default function OpportunityCard({ opportunity, poster }: { opportunity: Opportunity; poster: EntityRef | null }) {
  const closed = Boolean(opportunity.deadline && opportunity.deadline < new Date().toISOString().slice(0, 10));
  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-200 hover:-translate-y-1 hover:border-amber/40 hover:shadow-lg hover:shadow-ink/5 ${closed ? "opacity-75" : ""}`}>
      <CoverImage src={opportunity.imageUrl ?? poster?.imageUrl} alt={opportunity.title} variant="opportunity" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-[#FFF2E7] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#984600]">{opportunity.kind.replace(/\b\w/g, (letter) => letter.toUpperCase())}</span>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${closed ? "bg-gray-100 text-gray-700" : "bg-emerald-50 text-emerald-800"}`}>{closed ? "Closed" : "Open"}</span>
          {opportunity.sample && <SampleBadge />}
        </div>
        <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">{opportunity.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#555D68]">{opportunity.description}</p>
        {opportunity.topics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {opportunity.topics.slice(0, 3).map((topic) => <span key={topic} className="rounded-full bg-[#F3F4F6] px-2.5 py-1 text-xs font-medium text-[#454B55]">{topic}</span>)}
          </div>
        )}
        <div className="mt-auto space-y-3 border-t border-line pt-4 mt-5">
          <p className="flex items-start gap-2 text-sm text-[#555D68]"><span aria-hidden="true" className="text-amber">⌖</span><span>{opportunity.location}</span></p>
          {opportunity.deadline && <p className="text-xs font-medium text-[#454B55]">Deadline: {formatDate(opportunity.deadline)}</p>}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#555D68]">Posted by {poster?.name ?? opportunity.postedBySlug}</span>
            <Link href={`/opportunities/${opportunity.slug}`} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-amber px-3.5 text-xs font-semibold text-amber hover:bg-amber hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber">View details <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
