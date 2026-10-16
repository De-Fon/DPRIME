import EmptyState from "@/components/ecosystem/EmptyState";
import FilterBar from "@/components/ecosystem/FilterBar";
import OpportunityCard from "@/components/ecosystem/OpportunityCard";
import PageHeader from "@/components/ecosystem/PageHeader";
import { filterOpportunities, firstParam, getEcosystem, resolveEntity } from "@/lib/ecosystem";

export const metadata = { title: "Opportunities | DPRIME" };

export default async function OpportunitiesPage({
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
  const results = filterOpportunities(eco, filters);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <PageHeader
        label="opportunities"
        title="Opportunities across the ecosystem."
        intro="Internships, grants, speaking slots and collaborations posted by communities and organizations."
      />
      <FilterBar action="/opportunities" values={filters} />
      <div className="mb-4 mt-8 flex items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          {results.length} {results.length === 1 ? "opportunity" : "opportunities"}
        </p>
        <p className="text-sm text-muted">Browse current listings</p>
      </div>
      {results.length === 0 ? (
        <EmptyState message="No opportunities match these filters. Try another topic or region, or clear your search." resetHref="/opportunities" />
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {results.map((o) => <OpportunityCard key={o.slug} opportunity={o} poster={resolveEntity(eco, o.postedBySlug)} />)}
        </div>
      )}
    </main>
  );
}
