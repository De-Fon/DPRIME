import Link from "next/link";
import type { Community } from "@/lib/types";
import CoverImage from "./CoverImage";
import SampleBadge from "./SampleBadge";
import Tag from "./Tag";

export default function CommunityCard({ community }: { community: Community }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-card transition duration-200 hover:-translate-y-1 hover:border-amber/50 hover:shadow-xl hover:shadow-ink/8 focus-within:border-amber/60">
      <Link
        href={`/communities/${community.slug}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
        aria-label={`View community: ${community.name}`}
      />
      <CoverImage src={community.imageUrl} alt={community.name} variant="community" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber">{community.kind}</span>
          {community.sample && <SampleBadge />}
        </div>
        <h2 className="font-display text-xl leading-snug tracking-tight text-ink sm:text-2xl">{community.name}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{community.tagline}</p>
        {community.topics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {community.topics.slice(0, 3).map((topic) => <Tag key={topic}>{topic}</Tag>)}
            {community.topics.length > 3 && <span className="self-center text-xs text-muted">+{community.topics.length - 3} more</span>}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 mt-6">
          <span className="min-w-0 truncate font-mono text-xs text-muted">{community.location}</span>
          <span aria-hidden="true" className="shrink-0 text-lg text-amber transition-transform group-hover:translate-x-1">↗</span>
        </div>
      </div>
    </article>
  );
}
