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
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <PageHeader
        label="events"
        title="What is happening."
        intro="Meetups, hackathons and workshops across communities. Each event links the communities and organizations behind it."
      />
      <FilterBar action="/events" values={filters} />
      <div className="mb-4 mt-8 flex items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          {results.length} {results.length === 1 ? "event" : "events"}
        </p>
        <p className="text-sm text-muted">Dates and hosts at a glance</p>
      </div>
      {results.length === 0 ? (
        <EmptyState message="No events match these filters. Try a broader search or clear your selected filters." resetHref="/events" />
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {results.map((e) => <EventCard key={e.slug} event={e} host={resolveEntity(eco, e.hostSlug)} />)}
        </div>
      )}
    </main>
  );
}
