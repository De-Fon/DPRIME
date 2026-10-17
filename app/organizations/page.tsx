import Link from "next/link";
import EmptyState from "@/components/ecosystem/EmptyState";
import FilterBar from "@/components/ecosystem/FilterBar";
import OrganizationCard from "@/components/ecosystem/OrganizationCard";
import PageHeader from "@/components/ecosystem/PageHeader";
import { filterOrganizations, firstParam, getEcosystem } from "@/lib/ecosystem";

export const metadata = { title: "Organizations | DPRIME" };

export default async function OrganizationsPage({
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
  const results = filterOrganizations(await getEcosystem(), filters);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <PageHeader
        label="organizations"
        title="Explore technology organizations."
        intro="Companies, institutions, and nonprofits driving African innovation. Discover their initiatives, programs, and partnerships across the ecosystem."
      />
      <p className="mb-6 -mt-2 text-sm text-[#555D68]">
        Interested in partnering with us?{" "}
        <Link href="/partnerships" className="font-semibold text-amber hover:underline">
          See Partnerships <span aria-hidden="true">→</span>
        </Link>
      </p>
      <FilterBar action="/organizations" values={filters} />
      <div className="mb-4 mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          {results.length} {results.length === 1 ? "organization" : "organizations"}
        </p>
        <p className="text-sm text-muted">Browse the directory</p>
      </div>
      {results.length === 0 ? (
        <EmptyState
          message="No organizations match these filters. Try a different topic or region, or clear your search."
          resetHref="/organizations"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((org) => (
            <OrganizationCard key={org.slug} organization={org} />
          ))}
        </div>
      )}
    </main>
  );
}
