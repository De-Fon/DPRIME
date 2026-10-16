import Link from "next/link";
import type { Community } from "@/lib/types";
import CoverImage from "./CoverImage";
import SampleBadge from "./SampleBadge";
import Tag from "./Tag";

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function CommunityCard({ community }: { community: Community }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-200 hover:-translate-y-1 hover:border-amber/40 hover:shadow-lg hover:shadow-ink/5 focus-within:border-amber/60">
      <Link href={`/communities/${community.slug}`} className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber" aria-label={`View community: ${community.name}`} />
      <CoverImage src={community.imageUrl} alt={community.name} variant="community" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex rounded-full bg-[#FFF2E7] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#984600]">{titleCase(community.kind)}</span>
          {community.sample && <SampleBadge />}
        </div>
        <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">{community.name}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#555D68]">{community.tagline}</p>
        {community.topics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {community.topics.slice(0, 3).map((topic) => <Tag key={topic}>{topic}</Tag>)}
            {community.topics.length > 3 && <span className="self-center text-xs text-muted">+{community.topics.length - 3} more</span>}
          </div>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 mt-5 text-xs text-[#555D68]">
          <span className="min-w-0 truncate">{community.location}</span>
          {community.memberCount != null && <span className="shrink-0">{community.memberCount.toLocaleString()} members</span>}
        </div>
        <span className="pointer-events-none mt-4 inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-amber px-4 text-sm font-semibold text-amber transition-colors group-hover:bg-amber group-hover:text-white">
          View profile <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );
}
