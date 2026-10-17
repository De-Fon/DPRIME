import Link from "next/link";
import type { Organization } from "@/lib/types";
import CoverImage from "./CoverImage";
import SampleBadge from "./SampleBadge";
import Tag from "./Tag";

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function OrganizationCard({ organization }: { organization: Organization }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-200 hover:-translate-y-1 hover:border-amber/40 hover:shadow-lg hover:shadow-ink/5 focus-within:border-amber/60">
      <Link
        href={`/organizations/${organization.slug}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
        aria-label={`View organization: ${organization.name}`}
      />
      <CoverImage
        src={organization.imageUrl}
        alt={organization.name}
        variant="organization"
        fit="contain"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex rounded-full bg-[#EBF0F8] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#234A75]">
            {titleCase(organization.kind)}
          </span>
          {organization.sample && <SampleBadge />}
        </div>
        <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
          {organization.name}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#555D68]">
          {organization.description}
        </p>
        {organization.topics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {organization.topics.slice(0, 3).map((topic) => (
              <Tag key={topic}>{topic}</Tag>
            ))}
            {organization.topics.length > 3 && (
              <span className="self-center text-xs text-muted">
                +{organization.topics.length - 3} more
              </span>
            )}
          </div>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 mt-5 text-xs text-[#555D68]">
          <span className="min-w-0 truncate">{organization.location}</span>
          <span className="shrink-0 font-medium text-ink/70">{organization.region}</span>
        </div>
        <span className="pointer-events-none mt-4 inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-amber px-4 text-sm font-semibold text-amber transition-colors group-hover:bg-amber group-hover:text-white">
          View profile <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );
}
