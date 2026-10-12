import Link from "next/link";
import { notFound } from "next/navigation";
import CoverImage from "@/components/ecosystem/CoverImage";
import EventCard from "@/components/ecosystem/EventCard";
import OpportunityCard from "@/components/ecosystem/OpportunityCard";
import SampleBadge from "@/components/ecosystem/SampleBadge";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import Tag from "@/components/ecosystem/Tag";
import {
  connectionsOf,
  eventsFor,
  getEcosystem,
  opportunitiesFor,
  programsFor,
  resolveEntity,
} from "@/lib/ecosystem";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const community = (await getEcosystem()).communities.find((c) => c.slug === slug);
  return { title: community ? `${community.name} | DPRIME` : "Community | DPRIME" };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const eco = await getEcosystem();
  const community = eco.communities.find((c) => c.slug === slug);
  if (!community) notFound();

  const events = eventsFor(eco, slug);
  const opportunities = opportunitiesFor(eco, slug);
  const programs = programsFor(eco, slug);
  const connections = connectionsOf(eco, slug);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link href="/communities" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-amber">
        ← All communities
      </Link>

      <header className="mt-6">
        <CoverImage
          src={community.imageUrl}
          alt={community.name}
          priority
          className="mb-8 rounded-md border border-line max-w-3xl"
        />
        <SectionLabel>{community.kind}</SectionLabel>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl md:text-5xl text-ink">
            {community.name}
          </h1>
          {community.sample && <SampleBadge />}
        </div>
        <p className="mt-3 text-lg text-muted max-w-2xl">{community.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {community.topics.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </header>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <section className="md:col-span-2 bg-card border border-line rounded-md p-6">
          <h2 className="font-mono text-xs text-amber mb-2">MISSION</h2>
          <p className="text-body leading-7">{community.mission}</p>
          {community.lookingFor.length > 0 && (
            <>
              <h2 className="font-mono text-xs text-amber mt-6 mb-2">
                LOOKING FOR
              </h2>
              <div className="flex flex-wrap gap-2">
                {community.lookingFor.map((l) => (
                  <Tag key={l}>{l}</Tag>
                ))}
              </div>
            </>
          )}
        </section>

        <aside className="bg-card border border-line rounded-md p-6 text-sm space-y-4">
          <div>
            <div className="font-mono text-xs text-amber mb-1">LOCATION</div>
            <div className="text-body">
              {community.location} · {community.region}
            </div>
          </div>
          {community.memberCount !== undefined && (
            <div>
              <div className="font-mono text-xs text-amber mb-1">MEMBERS</div>
              <div className="text-body">{community.memberCount}</div>
            </div>
          )}
          <div>
            <div className="font-mono text-xs text-amber mb-1">FIND THEM ON</div>
            <div className="text-body">{community.channels.join(", ")}</div>
          </div>
          {community.website && (
            <a
              href={community.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-amber hover:underline"
            >
              Website →
            </a>
          )}
        </aside>
      </div>

      {connections.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl text-ink mb-5">
            Connected communities and organizations
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {connections.map(({ entity, type }) => (
              <li
                key={`${entity.slug}-${type}`}
                className="bg-card border border-line rounded-md p-5"
              >
                <div className="font-mono text-xs text-amber mb-1">{type}</div>
                {entity.href ? (
                  <Link
                    href={entity.href}
                    className="inline-flex min-h-11 items-center font-display text-lg text-ink hover:text-amber"
                  >
                    {entity.name}
                  </Link>
                ) : (
                  <span className="font-display text-lg text-ink">
                    {entity.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {events.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl text-ink mb-5">Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {events.map((e) => (
              <EventCard key={e.slug} event={e} host={resolveEntity(eco, e.hostSlug)} />
            ))}
          </div>
        </section>
      )}

      {programs.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl text-ink mb-5">Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {programs.map((p) => (
              <article
                key={p.slug}
                className="bg-card border border-line rounded-md overflow-hidden"
              >
                <CoverImage src={p.imageUrl} alt={p.title} />
                <div className="p-6">
                <div className="font-mono text-xs text-amber mb-2">
                  {p.kind} · {p.duration}
                </div>
                <h3 className="font-display text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {opportunities.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl text-ink mb-5">Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {opportunities.map((o) => (
              <OpportunityCard key={o.slug} opportunity={o} poster={resolveEntity(eco, o.postedBySlug)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
