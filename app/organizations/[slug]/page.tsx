import Link from "next/link";
import { notFound } from "next/navigation";
import CoverImage from "@/components/ecosystem/CoverImage";
import SampleBadge from "@/components/ecosystem/SampleBadge";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import Tag from "@/components/ecosystem/Tag";
import { connectionsOf, getEcosystem, opportunitiesFor, resolveEntity } from "@/lib/ecosystem";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const organization = (await getEcosystem()).organizations.find((item) => item.slug === slug);
  return { title: organization ? `${organization.name} | DPRIME` : "Organization | DPRIME" };
}

export default async function OrganizationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const eco = await getEcosystem();
  const organization = eco.organizations.find((item) => item.slug === slug);
  if (!organization) notFound();
  const connections = connectionsOf(eco, slug);
  const opportunities = opportunitiesFor(eco, slug);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <Link href="/discover" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-amber">← Back to discover</Link>
      <header className="mt-6">
        <CoverImage src={organization.imageUrl} alt={organization.name} priority className="mb-7 max-w-4xl overflow-hidden rounded-xl border border-line" />
        <SectionLabel>{organization.kind}</SectionLabel>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">{organization.name}</h1>
          {organization.sample && <SampleBadge />}
        </div>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{organization.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{organization.topics.map((topic) => <Tag key={topic}>{topic}</Tag>)}</div>
      </header>
      <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
        <section className="rounded-xl border border-line bg-card p-6 md:col-span-2">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-amber">About the organization</h2>
          <p className="mt-3 text-base leading-7 text-muted">{organization.description}</p>
          {connections.length > 0 && <><h2 className="mt-7 font-mono text-xs uppercase tracking-[0.16em] text-amber">Partnerships and connections</h2><ul className="mt-3 space-y-3">{connections.map(({ entity, type }) => <li key={`${entity.slug}-${type}`} className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3"><span className="text-sm text-muted">{type}</span>{entity.href ? <Link href={entity.href} className="inline-flex min-h-11 items-center text-sm text-amber hover:underline">{entity.name} ↗</Link> : <span className="text-sm text-ink">{entity.name}</span>}</li>)}</ul></>}
        </section>
        <aside className="h-fit space-y-5 rounded-xl border border-line bg-card p-6">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Location</p><p className="mt-1 text-base text-ink">{organization.location}</p></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Region</p><p className="mt-1 text-base text-ink">{organization.region}</p></div>
          {organization.website && <a href={organization.website} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-amber hover:underline">Visit website ↗</a>}
        </aside>
      </div>
      {opportunities.length > 0 && <section className="mt-12"><h2 className="mb-5 font-display text-2xl text-ink">Opportunities from this organization</h2><ul className="space-y-3">{opportunities.map((item) => <li key={item.slug} className="rounded-xl border border-line bg-card p-5"><Link href={`/opportunities/${item.slug}`} className="font-display text-lg text-ink hover:text-amber">{item.title} ↗</Link><p className="mt-1 text-sm leading-6 text-muted">{item.description}</p></li>)}</ul></section>}
    </main>
  );
}
