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

  const closed = Boolean(opportunity.deadline && opportunity.deadline < new Date().toISOString().slice(0, 10));

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-ink">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-8">
        <Link href="/opportunities" className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[#626873] hover:text-amber"><span aria-hidden="true">←</span> Back to opportunities</Link>
        <div className="mt-5 overflow-hidden rounded-3xl border border-line bg-white">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px]">
            <header className="min-w-0 p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#FFF2E7] px-3 py-1.5 text-xs font-semibold capitalize text-[#984600]">{opportunity.kind}</span>
                <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${closed ? "bg-[#F0F0EF] text-[#626873]" : "bg-[#E8F7F0] text-[#176447]"}`}>{closed ? "Closed" : "Open for applications"}</span>
                {opportunity.sample && <SampleBadge />}
              </div>
              <h1 className="mt-5 max-w-3xl break-words font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{opportunity.title}</h1>
              <p className="mt-4 text-sm text-[#626873]">Posted by <span className="font-semibold text-ink">{poster?.name ?? opportunity.postedBySlug}</span></p>
              {opportunity.topics.length > 0 && <ul aria-label="Opportunity topics" className="mt-5 flex flex-wrap gap-2">{opportunity.topics.map((topic) => <li key={topic}><Tag>{topic}</Tag></li>)}</ul>}
            </header>
            <div className="border-t border-line bg-[#F1F0EC] p-4 sm:p-6 lg:border-l lg:border-t-0">
              <CoverImage src={opportunity.imageUrl ?? poster?.imageUrl} alt={opportunity.title} priority className="overflow-hidden rounded-2xl border border-line bg-white" variant="opportunity" fit="contain" />
            </div>
          </div>
          <div className="grid border-t border-line lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="min-w-0 px-5 py-7 sm:px-8 sm:py-9" aria-labelledby="opportunity-about">
              <SectionLabel>Opportunity overview</SectionLabel>
              <h2 id="opportunity-about" className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">About this opportunity</h2>
              <p className="mt-5 max-w-3xl whitespace-pre-line break-words text-base leading-8 text-[#454B55]">{opportunity.description}</p>
              {opportunity.link && <div className="mt-8"><a href={opportunity.link} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex min-h-12 items-center gap-2">Apply / View opportunity <span aria-hidden="true">↗</span></a></div>}
            </section>
            <aside className="h-fit border-t border-line bg-[#FCFBF9] p-5 sm:p-7 lg:border-l lg:border-t-0" aria-label="Opportunity details">
              <h2 className="font-display text-xl font-semibold">Listing details</h2>
              <dl className="mt-5 divide-y divide-[#E7E5E2]">
                <div className="py-4"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Opportunity type</dt><dd className="mt-1.5 text-sm font-semibold capitalize leading-6">{opportunity.kind}</dd></div>
                <div className="py-4"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Location</dt><dd className="mt-1.5 break-words text-sm leading-6">{opportunity.location || "Not specified"}</dd></div>
                <div className="py-4"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Region</dt><dd className="mt-1.5 text-sm leading-6">{opportunity.region || "Not specified"}</dd></div>
                <div className="py-4"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Application deadline</dt><dd className="mt-1.5 text-sm font-semibold leading-6">{opportunity.deadline ? formatDate(opportunity.deadline) : "Not specified"}</dd></div>
                <div className="py-4"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Posted by</dt><dd className="mt-1.5 text-sm leading-6">{poster?.href ? <Link href={poster.href} className="font-semibold text-amber hover:underline">{poster.name} ↗</Link> : poster?.name ?? opportunity.postedBySlug}</dd></div>
              </dl>
              {opportunity.link && <a href={opportunity.link} target="_blank" rel="noopener noreferrer" className="btn-primary mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2">Open application link <span aria-hidden="true">↗</span></a>}
              <p className="mt-4 text-xs leading-5 text-[#777D86]">Confirm the deadline and requirements with the listing organization.</p>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
