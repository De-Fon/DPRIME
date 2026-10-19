import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CoverImage from "@/components/ecosystem/CoverImage";
import SampleBadge from "@/components/ecosystem/SampleBadge";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import Tag from "@/components/ecosystem/Tag";
import { formatDate, getEcosystem, resolveEntity } from "@/lib/ecosystem";
import { buildOpportunityMetadata } from "@/lib/opportunityMetadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const eco = await getEcosystem();
  const item = eco.opportunities.find((o) => o.slug === slug);

  if (!item) {
    return { title: "Opportunity | DPRIME" };
  }

  const poster = resolveEntity(eco, item.postedBySlug);
  return buildOpportunityMetadata({ opportunity: item, poster });
}

export default async function OpportunityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const eco = await getEcosystem();
  const opportunity = eco.opportunities.find((item) => item.slug === slug);
  if (!opportunity) notFound();
  const poster = resolveEntity(eco, opportunity.postedBySlug);

  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-8">
        <Link href="/opportunities" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#555D68] transition hover:text-amber">
          <span aria-hidden="true">←</span> All opportunities
        </Link>

        <header className="mt-4 overflow-hidden rounded-3xl border border-line bg-white">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,.78fr)]">
            <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9 lg:p-12">
              <SectionLabel>{opportunity.kind}</SectionLabel>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {opportunity.sample && <SampleBadge />}
                <span className="text-xs font-medium text-[#626873]">Opportunity</span>
              </div>
              <h1 className="mt-3 max-w-3xl break-words font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">{opportunity.title}</h1>
              <p className="mt-5 max-w-2xl whitespace-pre-line break-words text-base leading-7 text-[#555D68] sm:text-lg sm:leading-8">{opportunity.description}</p>
              {opportunity.topics.length > 0 && <ul aria-label="Topics" className="mt-5 flex flex-wrap gap-2">{opportunity.topics.map((topic) => <li key={topic}><Tag>{topic}</Tag></li>)}</ul>}
              {opportunity.link && <div className="mt-7"><a href={opportunity.link} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex min-h-11 items-center gap-2">Apply / View opportunity <span aria-hidden="true">↗</span></a></div>}
            </div>
            <div className="relative flex min-h-[220px] items-center border-t border-line bg-[#F7F6F2] p-4 sm:p-6 lg:border-l lg:border-t-0">
              <CoverImage src={opportunity.imageUrl ?? poster?.imageUrl} alt={opportunity.title} priority className="w-full overflow-hidden rounded-2xl border border-line bg-white" variant="opportunity" fit="contain" />
            </div>
          </div>
        </header>

        <section aria-labelledby="opportunity-summary" className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
          <div className="border-b border-line px-5 py-4 sm:px-7">
            <SectionLabel>At a glance</SectionLabel>
            <h2 id="opportunity-summary" className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">Opportunity information</h2>
          </div>
          <dl className="divide-y divide-[#E7E5E2]">
            <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Type</dt>
              <dd className="break-words text-sm font-medium capitalize leading-6 text-ink">{opportunity.kind}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Location</dt>
              <dd className="break-words text-sm font-medium leading-6 text-ink">{opportunity.location || "Not specified"}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Region</dt>
              <dd className="break-words text-sm font-medium leading-6 text-ink">{opportunity.region || "Not specified"}</dd>
            </div>
            {opportunity.deadline && <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Application deadline</dt>
              <dd className="break-words text-sm font-medium leading-6 text-ink">{formatDate(opportunity.deadline)}</dd>
            </div>}
            <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Posted by</dt>
              <dd className="break-words text-sm font-medium leading-6 text-ink">{poster?.href ? <Link href={poster.href} className="text-amber hover:underline">{poster.name} ↗</Link> : poster?.name ?? opportunity.postedBySlug}</dd>
            </div>
            {opportunity.link && <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Application link</dt>
              <dd className="break-words text-sm font-medium leading-6"><a href={opportunity.link} target="_blank" rel="noopener noreferrer" className="text-amber hover:underline">Open official opportunity link ↗</a></dd>
            </div>}
          </dl>
        </section>
        <p className="mt-4 max-w-3xl text-xs leading-5 text-[#777D86]">Check the application link and deadline before applying. Opportunity information is displayed as provided by the poster.</p>
      </div>
    </main>
  );
}
