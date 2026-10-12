import Link from "next/link";
import type { Community } from "@/lib/types";
import SampleBadge from "./SampleBadge";
import Tag from "./Tag";

export default function CommunityCard({ community }: { community: Community }) {
  return (
    <article className="group relative bg-card border border-line rounded-md p-6 border-l-2 hover:border-l-amber transition duration-150 hover:-translate-y-1 hover:shadow-md">
      <Link
        href={`/communities/${community.slug}`}
        className="absolute inset-0 rounded-md"
        aria-label={`View ${community.name}`}
      />
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="font-mono text-xs text-amber">{community.kind}</span>
        {community.sample && <SampleBadge />}
      </div>
      <h3 className="font-display text-xl text-ink">{community.name}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{community.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {community.topics.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-line font-mono text-xs text-muted">
        {community.location}
      </div>
    </article>
  );
}
