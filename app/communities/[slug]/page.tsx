import Link from "next/link";
import { notFound } from "next/navigation";
import CoverImage from "@/components/ecosystem/CoverImage";
import EventCard from "@/components/ecosystem/EventCard";
import OpportunityCard from "@/components/ecosystem/OpportunityCard";
import SampleBadge from "@/components/ecosystem/SampleBadge";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import Tag from "@/components/ecosystem/Tag";
import { connectionsOf, eventsFor, getEcosystem, opportunitiesFor, programsFor, resolveEntity } from "@/lib/ecosystem";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const community = (await getEcosystem()).communities.find((item) => item.slug === slug);
  return { title: community ? `${community.name} | DPRIME` : "Community | DPRIME" };
}

function MetaLabel({ children }: { children: string }) {
  return <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A64A00]">{children}</p>;
}

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const eco = await getEcosystem();
  const community = eco.communities.find((item) => item.slug === slug);
  if (!community) notFound();

  const events = eventsFor(eco, slug);
  const opportunities = opportunitiesFor(eco, slug);
  const programs = programsFor(eco, slug);
  const connections = connectionsOf(eco, slug);
  const channels = community.channels.filter(Boolean);

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-ink">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-8">
        <Link href="/communities" className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[#626873] hover:text-amber"><span aria-hidden="true">←</span> Back to communities</Link>
        <header className="mt-5 overflow-hidden rounded-3xl border border-line bg-white">
          <div className="bg-[#F1F0EC] p-4 sm:p-6">
            <CoverImage src={community.imageUrl} alt={community.name} priority className="overflow-hidden rounded-2xl border border-line bg-white" variant="community" fit="contain" />
          </div>
          <div className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#FFF2E7] px-3 py-1.5 text-xs font-semibold capitalize text-[#984600]">{community.kind}</span>
              {community.memberCount != null && <span className="rounded-full bg-[#F3F4F6] px-3 py-1.5 text-xs font-medium text-[#454B55]">{community.memberCount.toLocaleString()} members</span>}
              {community.sample && <SampleBadge />}
            </div>
            <h1 className="mt-4 max-w-4xl break-words font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{community.name}</h1>
            <p className="mt-4 max-w-3xl whitespace-pre-line break-words text-base leading-8 text-[#555D68] sm:text-lg">{community.tagline}</p>
            {community.topics.length > 0 && <ul aria-label="Community focus areas" className="mt-5 flex flex-wrap gap-2">{community.topics.map((topic) => <li key={topic}><Tag>{topic}</Tag></li>)}</ul>}
            <div className="mt-7 flex flex-wrap gap-3">
              {community.website && <a href={community.website} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex min-h-11 items-center gap-2">Visit community website <span aria-hidden="true">↗</span></a>}
              <Link href="/events" className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 text-sm font-semibold transition hover:border-amber">Explore events</Link>
            </div>
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <div className="min-w-0">
            <section aria-labelledby="community-mission">
              <SectionLabel>Who we are</SectionLabel>
              <h2 id="community-mission" className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Our mission</h2>
              <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-8 text-[#454B55]">{community.mission}</p>
            </section>
            {community.lookingFor.length > 0 && <section className="mt-9 border-t border-line pt-7" aria-labelledby="community-looking-for">
              <SectionLabel>Open to collaboration</SectionLabel>
              <h2 id="community-looking-for" className="mt-3 font-display text-xl font-semibold tracking-tight">What we’re looking for</h2>
              <div className="mt-4 flex flex-wrap gap-2">{community.lookingFor.map((item) => <Tag key={item}>{item}</Tag>)}</div>
            </section>}
            {connections.length > 0 && <section className="mt-10 border-t border-line pt-8" aria-labelledby="community-connections">
              <SectionLabel>Working together</SectionLabel>
              <h2 id="community-connections" className="mt-3 font-display text-2xl font-semibold tracking-tight">Connected communities and organizations</h2>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {connections.map(({ entity, type }) => <li key={`${entity.slug}-${type}`} className="rounded-2xl border border-line p-4">
                  <MetaLabel>{type}</MetaLabel>
                  {entity.href ? <Link href={entity.href} className="mt-2 inline-flex min-h-10 items-center font-semibold leading-6 hover:text-amber">{entity.name} ↗</Link> : <p className="mt-2 font-semibold leading-6">{entity.name}</p>}
                </li>)}
              </ul>
            </section>}
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-[#FCFBF9] p-5 sm:p-6">
            <SectionLabel>Get connected</SectionLabel>
            <h2 className="mt-3 font-display text-xl font-semibold">Connect with this community</h2>
            <p className="mt-2 text-sm leading-6 text-[#555D68]">Use the available channels below to find the community on the platforms it already uses.</p>
            {channels.length > 0 && <div className="mt-5"><MetaLabel>Community channels</MetaLabel><ul className="mt-3 flex flex-wrap gap-2">{channels.map((channel) => <li key={channel} className="inline-flex min-h-9 items-center rounded-full border border-line bg-white px-3 text-xs font-medium text-[#454B55]">{channel}</li>)}</ul></div>}
            {community.website && <a href={community.website} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2">Visit official website <span aria-hidden="true">↗</span></a>}
            {!community.website && <p className="mt-5 rounded-xl border border-dashed border-line bg-white p-4 text-xs leading-5 text-[#626873]">An official website or direct join link has not been provided for this community yet.</p>}
            <div className="mt-6 border-t border-line pt-5">
              <MetaLabel>Community details</MetaLabel>
              <dl className="mt-3 space-y-3">
                <div><dt className="text-xs text-[#777D86]">Type</dt><dd className="mt-1 text-sm font-medium capitalize">{community.kind}</dd></div>
                <div><dt className="text-xs text-[#777D86]">Region</dt><dd className="mt-1 text-sm font-medium">{community.region}</dd></div>
              </dl>
            </div>
          </aside>
        </div>

        {events.length > 0 && <section className="mt-12 border-t border-line pt-9 sm:mt-14" aria-labelledby="community-events">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><SectionLabel>Meet · learn · build</SectionLabel><h2 id="community-events" className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Events from this community</h2></div><Link href="/events" className="inline-flex min-h-10 items-center text-sm font-semibold text-amber hover:underline">All events ↗</Link></div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{events.map((event) => <EventCard key={event.slug} event={event} host={resolveEntity(eco, event.hostSlug)} />)}</div>
        </section>}

        {programs.length > 0 && <section className="mt-12 border-t border-line pt-9 sm:mt-14" aria-labelledby="community-programs">
          <div className="mb-5"><SectionLabel>Learn and grow</SectionLabel><h2 id="community-programs" className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Programs</h2></div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{programs.map((program) => <article key={program.slug} className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
            <CoverImage src={program.imageUrl} alt={program.title} variant="program" />
            <div className="flex flex-1 flex-col p-5"><MetaLabel>{`${program.kind} · ${program.duration}`}</MetaLabel><h3 className="mt-2 font-display text-xl font-semibold leading-snug"><Link href={`/programs/${program.slug}`} className="hover:text-amber">{program.title} ↗</Link></h3><p className="mt-2 text-sm leading-6 text-[#555D68]">{program.description}</p><Link href={`/programs/${program.slug}`} className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-amber hover:underline">View program ↗</Link></div>
          </article>)}</div>
        </section>}

        {opportunities.length > 0 && <section className="mt-12 border-t border-line pt-9 sm:mt-14" aria-labelledby="community-opportunities">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><SectionLabel>Take your next step</SectionLabel><h2 id="community-opportunities" className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Opportunities</h2></div><Link href="/opportunities" className="inline-flex min-h-10 items-center text-sm font-semibold text-amber hover:underline">All opportunities ↗</Link></div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{opportunities.map((opportunity) => <OpportunityCard key={opportunity.slug} opportunity={opportunity} poster={resolveEntity(eco, opportunity.postedBySlug)} />)}</div>
        </section>}
      </div>
    </main>
  );
}
