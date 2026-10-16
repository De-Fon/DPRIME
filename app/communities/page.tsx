import CommunityCard from "@/components/ecosystem/CommunityCard";
import EmptyState from "@/components/ecosystem/EmptyState";
import FilterBar from "@/components/ecosystem/FilterBar";
import PageHeader from "@/components/ecosystem/PageHeader";
import { filterCommunities, firstParam, getEcosystem } from "@/lib/ecosystem";

export const metadata = { title: "Communities | DPRIME" };

export default async function CommunitiesPage({
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
  const results = filterCommunities(await getEcosystem(), filters);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <PageHeader
        label="communities"
        title="Find your community."
        intro="University clubs, developer groups and open-source collectives, discoverable by location and topic. Communities keep their own channels; DPRIME connects them."
      />
      <FilterBar action="/communities" values={filters} />
      <div className="mb-4 mt-8 flex items-center justify-between gap-3">\n        <p className="font-mono text-xs uppercase tracking-wider text-muted">
        {results.length} {results.length === 1 ? "community" : "communities"}
      </p>
      {results.length === 0 ? (
        <EmptyState message="No communities match these filters. Try a different topic or region, or clear your search." resetHref="/communities" />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
      )}
    </div>
  );
}
