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
    <div className="max-w-6xl mx-auto px-6 py-16">
      <PageHeader
        label="opportunities"
        title="Opportunities across the ecosystem."
        intro="Internships, grants, speaking slots and collaborations posted by communities and organizations."
      />
      <FilterBar action="/opportunities" values={filters} />
      <p className="mt-6 mb-4 font-mono text-xs text-muted">
        {results.length} {results.length === 1 ? "opportunity" : "opportunities"}
      </p>
      {results.length === 0 ? (
        <EmptyState message="No opportunities match these filters." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {results.map((o) => (
            <OpportunityCard key={o.slug} opportunity={o} poster={resolveEntity(eco, o.postedBySlug)} />
          ))}
        </div>
      )}
    </div>
  );
}
