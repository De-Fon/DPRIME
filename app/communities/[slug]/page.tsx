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
  const community = (await getEcosystem()).communities.find((c) => c.slug === slug);
  return { title: community ? `${community.name} | DPRIME` : "Community | DPRIME" };
}

function MetaLabel({ children }: { children: string }) {
  return <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A64A00]">{children}</p>;
}

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const eco = await getEcosystem();
  const community = eco.communities.find((c) => c.slug === slug);
  if (!community) notFound();

  const events = eventsFor(eco, slug);
  const opportunities = opportunitiesFor(eco, slug);
  const programs = programsFor(eco, slug);
  const connections = connectionsOf(eco, slug);
  const channels = community.channels.filter(Boolean);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-6 sm:px-6 sm:pt-8 lg:pb-20">
        <Link href="/communities" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#555D68] transition hover:text-amber">
          <span aria-hidden="true">←</span> All communities
        </Link>

        <header className="mt-4">
          <div className="overflow-hidden rounded-2xl border border-line">
            <CoverImage src={community.imageUrl} alt={community.name} priority className="border-0" variant="community" />
          </div>
          <div className="mt-7">
            <SectionLabel>{community.kind}</SectionLabel>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">{community.name}</h1>
                  {community.sample && <SampleBadge />}
                </div>
                <p className="mt-3 max-w-3xl text-base leading-7 text-[#555D68] sm:text-lg">{community.tagline}</p>
                {community.topics.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{community.topics.map((topic) => <Tag key={topic}>{topic}</Tag>)}</div>}
              </div>
              {community.website && <a href={community.website} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-11 w-fit shrink-0">Visit website <span aria-hidden="true">↗</span></a>}
            </div>
          </div>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,.85fr)]">
          <section className="rounded-2xl border border-line bg-white p-5 sm:p-7">
            <MetaLabel>Mission</MetaLabel>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#343A43] sm:text-[17px]">{community.mission}</p>
            {community.lookingFor.length > 0 && <div className="mt-7 border-t border-line pt-5">
              <MetaLabel>Looking for</MetaLabel>
              <div className="mt-3 flex flex-wrap gap-2">{community.lookingFor.map((item) => <Tag key={item}>{item}</Tag>)}</div>
            </div>}
          </section>

          <aside className="rounded-2xl border border-line bg-white p-5 sm:p-7">
            <h2 className="font-display text-lg font-semibold tracking-tight text-ink">Community details</h2>
            <dl className="mt-5 space-y-5">
              <div><MetaLabel>Location</MetaLabel><dd className="mt-1.5 text-sm leading-6 text-[#343A43]">{community.location} <span className="text-[#737984]">· {community.region}</span></dd></div>
              {community.memberCount !== undefined && <div><MetaLabel>Members</MetaLabel><dd className="mt-1.5 text-sm font-medium text-[#343A43]">{community.memberCount.toLocaleString()} members</dd></div>}
              {channels.length > 0 && <div><MetaLabel>Find them on</MetaLabel><dd className="mt-2 flex flex-wrap gap-2">{channels.map((channel) => <span key={channel} className="inline-flex min-h-8 items-center rounded-full border border-line bg-[#F7F7F6] px-3 text-xs font-medium text-[#454B55]">{channel}</span>)}</dd></div>}
              {!community.website && <p className="text-xs leading-5 text-[#737984]">Website link not provided.</p>}
            </dl>
          </aside>
        </div>

        {connections.length > 0 && <section className="mt-12 sm:mt-14">
          <div className="mb-5"><SectionLabel>working together</SectionLabel><h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Connected communities and organizations</h2></div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {connections.map(({ entity, type }) => <li key={`${entity.slug}-${type}`} className="group flex min-h-36 flex-col rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-amber/40 hover:shadow-md">
              <MetaLabel>{type}</MetaLabel>
              {entity.href ? <Link href={entity.href} className="mt-3 inline-flex min-h-11 items-center font-display text-lg font-semibold leading-snug text-ink hover:text-amber">{entity.name} <span className="ml-2 text-sm" aria-hidden="true">↗</span></Link> : <span className="mt-3 font-display text-lg font-semibold text-ink">{entity.name}</span>}
            </li>)}
          </ul>
        </section>}

        {events.length > 0 && <section className="mt-12 sm:mt-14">
          <div className="mb-5"><SectionLabel>learn · meet · build</SectionLabel><h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Events from this community</h2></div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{events.map((event) => <EventCard key={event.slug} event={event} host={resolveEntity(eco, event.hostSlug)} />)}</div>
        </section>}

        {programs.length > 0 && <section className="mt-12 sm:mt-14">
          <div className="mb-5"><SectionLabel>learn and grow</SectionLabel><h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Programs</h2></div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{programs.map((program) => <article key={program.slug} className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lg">
            <CoverImage src={program.imageUrl} alt={program.title} variant="program" />
            <div className="flex flex-1 flex-col p-5"><MetaLabel>{program.kind} · {program.duration}</MetaLabel><h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink"><Link href={`/programs/${program.slug}`} className="hover:text-amber">{program.title} ↗</Link></h3><p className="mt-2 text-sm leading-6 text-[#555D68]">{program.description}</p></div>
          </article>)}</div>
        </section>}

        {opportunities.length > 0 && <section className="mt-12 sm:mt-14">
          <div className="mb-5"><SectionLabel>take your next step</SectionLabel><h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Opportunities</h2></div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{opportunities.map((opportunity) => <OpportunityCard key={opportunity.slug} opportunity={opportunity} poster={resolveEntity(eco, opportunity.postedBySlug)} />)}</div>
        </section>}
      </div>
    </main>
  );
}
