import CommunityCard from "@/components/ecosystem/CommunityCard";
import CoverImage from "@/components/ecosystem/CoverImage";
import EmptyState from "@/components/ecosystem/EmptyState";
import EventCard from "@/components/ecosystem/EventCard";
import FilterBar from "@/components/ecosystem/FilterBar";
import OpportunityCard from "@/components/ecosystem/OpportunityCard";
import PageHeader from "@/components/ecosystem/PageHeader";
import SampleBadge from "@/components/ecosystem/SampleBadge";
import Tag from "@/components/ecosystem/Tag";
import {
  filterCommunities,
  filterEvents,
  filterOpportunities,
  filterOrganizations,
  firstParam,
  getEcosystem,
  resolveEntity,
} from "@/lib/ecosystem";

export const metadata = { title: "Discover | DPRIME" };

function Group({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  if (count === 0) return null;
  return (
    <section className="mt-12 sm:mt-14">
      <div className="mb-5 flex items-end justify-between gap-4 border-b border-line pb-3">
        <h2 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">{title}</h2>
        <span className="font-mono text-xs text-muted">{String(count).padStart(2, "0")} results</span>
      </div>
      {children}
    </section>
  );
}

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filters = {
    q: firstParam(sp.q),
    region: firstParam(sp.region),
    topic: firstParam(sp.topic),
  };
  const eco = await getEcosystem();
  const communities = filterCommunities(eco, filters);
  const orgs = filterOrganizations(eco, filters);
  const events = filterEvents(eco, filters);
  const opportunities = filterOpportunities(eco, filters);
  const total = communities.length + orgs.length + events.length + opportunities.length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <PageHeader
        label="discover"
        title="Find your place in the tech ecosystem."
        intro="Explore communities, organizations, events and opportunities across regions and topics. Use the filters to narrow the directory to what matters to you."
      />
      <FilterBar action="/discover" values={filters} />
      <p className="mt-4 text-sm text-muted" role="status" aria-live="polite">
        {total} {total === 1 ? "result" : "results"} across {[
          communities.length > 0 ? "communities" : null,
          orgs.length > 0 ? "organizations" : null,
          events.length > 0 ? "events" : null,
          opportunities.length > 0 ? "opportunities" : null,
        ].filter(Boolean).length} {[
          communities.length > 0 ? "category" : null,
          orgs.length > 0 ? "category" : null,
          events.length > 0 ? "category" : null,
          opportunities.length > 0 ? "category" : null,
        ].filter(Boolean).length === 1 ? "category" : "categories"}
      </p>

      {total === 0 && (
        <div className="mt-8">
          <EmptyState message="Nothing matches these filters. Try a broader search, choose a different region or topic, or clear the filters to see all listings." resetHref="/discover" />
        </div>
      )}

      <Group title="Communities" count={communities.length}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((c) => <CommunityCard key={c.slug} community={c} />)}
        </div>
      </Group>

      <Group title="Events" count={events.length}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {events.map((e) => <EventCard key={e.slug} event={e} host={resolveEntity(eco, e.hostSlug)} />)}
        </div>
      </Group>

      <Group title="Opportunities" count={opportunities.length}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {opportunities.map((o) => <OpportunityCard key={o.slug} opportunity={o} poster={resolveEntity(eco, o.postedBySlug)} />)}
        </div>
      </Group>

      <Group title="Organizations" count={orgs.length}>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {orgs.map((o) => (
            <li key={o.slug} className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition duration-200 hover:-translate-y-0.5 hover:border-amber/50 hover:shadow-lg hover:shadow-ink/5">
              <CoverImage src={o.imageUrl} alt={o.name} />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber">{o.kind}</span>
                  {o.sample && <SampleBadge />}
                </div>
                <h3 className="font-display text-xl leading-snug tracking-tight text-ink">{o.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{o.description}</p>
                {o.topics.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{o.topics.slice(0, 4).map((t) => <Tag key={t}>{t}</Tag>)}</div>}
                <div className="mt-auto border-t border-line pt-4 mt-5 font-mono text-xs text-muted">{o.location} · {o.region}</div>
                {o.website && <a href={o.website} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm text-amber hover:underline">Visit website ↗</a>}
              </div>
            </li>
          ))}
        </ul>
      </Group>
    </main>
  );
}
