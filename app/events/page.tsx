import EmptyState from "@/components/ecosystem/EmptyState";
import EventCard from "@/components/ecosystem/EventCard";
import FilterBar from "@/components/ecosystem/FilterBar";
import PageHeader from "@/components/ecosystem/PageHeader";
import { filterEvents, firstParam, getEcosystem, resolveEntity } from "@/lib/ecosystem";

export const metadata = { title: "Events | DPRIME" };

export default async function EventsPage({
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
  const results = filterEvents(eco, filters);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <PageHeader
        label="events"
        title="What is happening."
        intro="Meetups, hackathons and workshops across communities. Each event links the communities and organizations behind it."
      />
      <FilterBar action="/events" values={filters} />
      <p className="mt-6 mb-4 font-mono text-xs text-muted">
        {results.length} {results.length === 1 ? "event" : "events"}
      </p>
      {results.length === 0 ? (
        <EmptyState message="No events match these filters." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {results.map((e) => (
            <EventCard key={e.slug} event={e} host={resolveEntity(eco, e.hostSlug)} />
          ))}
        </div>
      )}
    </div>
  );
}
