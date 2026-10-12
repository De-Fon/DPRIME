import CommunityCard from "@/components/ecosystem/CommunityCard";
import CoverImage from "@/components/ecosystem/CoverImage";
import EmptyState from "@/components/ecosystem/EmptyState";
import EventCard from "@/components/ecosystem/EventCard";
import FilterBar from "@/components/ecosystem/FilterBar";
import OpportunityCard from "@/components/ecosystem/OpportunityCard";
import PageHeader from "@/components/ecosystem/PageHeader";
import SampleBadge from "@/components/ecosystem/SampleBadge";
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
    <section className="mt-12">
      <h2 className="font-display text-2xl text-ink mb-5">
        {title} <span className="font-mono text-xs text-muted">{count}</span>
      </h2>
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
  const total =
    communities.length + orgs.length + events.length + opportunities.length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <PageHeader
        label="discover"
        title="What is happening in technology around you?"
        intro="Search communities, organizations, events and opportunities in one place."
      />
      <FilterBar action="/discover" values={filters} />

      {total === 0 && (
        <div className="mt-10">
          <EmptyState message="Nothing matches these filters. Try a broader search." />
        </div>
      )}

      <Group title="Communities" count={communities.length}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {communities.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
      </Group>

      <Group title="Events" count={events.length}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {events.map((e) => (
            <EventCard key={e.slug} event={e} host={resolveEntity(eco, e.hostSlug)} />
          ))}
        </div>
      </Group>

      <Group title="Opportunities" count={opportunities.length}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {opportunities.map((o) => (
            <OpportunityCard key={o.slug} opportunity={o} poster={resolveEntity(eco, o.postedBySlug)} />
          ))}
        </div>
      </Group>

      <Group title="Organizations" count={orgs.length}>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {orgs.map((o) => (
            <li
              key={o.slug}
              className="bg-card border border-line rounded-md overflow-hidden"
            >
              <CoverImage src={o.imageUrl} alt={o.name} />
              <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-amber">{o.kind}</span>
                {o.sample && <SampleBadge />}
              </div>
              <h3 className="font-display text-lg text-ink">{o.name}</h3>
              <p className="mt-2 text-sm text-muted">{o.description}</p>
              <p className="mt-4 font-mono text-xs text-muted">{o.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </Group>
    </div>
  );
}
