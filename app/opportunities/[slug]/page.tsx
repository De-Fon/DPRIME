import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CoverImage from "@/components/ecosystem/CoverImage";
import SampleBadge from "@/components/ecosystem/SampleBadge";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import Tag from "@/components/ecosystem/Tag";
import { formatDate, getEcosystem, resolveEntity } from "@/lib/ecosystem";

const FALLBACK_OG_IMAGE = "/images/brand/logo3.png";
const SITE_NAME = "DPRIME";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = (await getEcosystem()).opportunities.find((o) => o.slug === slug);

  if (!item) {
    return { title: "Opportunity | DPRIME" };
  }

  const title = `${item.title} | ${SITE_NAME}`;
  const description =
    item.description.length > 200
      ? item.description.slice(0, 197) + "…"
      : item.description;

  // imageUrl is already a full public HTTPS URL (Supabase Storage public bucket).
  // Fall back to the brand logo (resolved against metadataBase in the root layout).
  const ogImage = item.imageUrl || FALLBACK_OG_IMAGE;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/opportunities/${slug}`,
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function OpportunityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const eco = await getEcosystem();
  const opportunity = eco.opportunities.find((item) => item.slug === slug);
  if (!opportunity) notFound();
  const poster = resolveEntity(eco, opportunity.postedBySlug);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <Link href="/opportunities" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-amber">← All opportunities</Link>
      <header className="mt-6">
        <CoverImage src={opportunity.imageUrl} alt={opportunity.title} priority className="mb-7 max-w-4xl overflow-hidden rounded-xl border border-line" />
        <SectionLabel>{opportunity.kind}</SectionLabel>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">{opportunity.title}</h1>
          {opportunity.sample && <SampleBadge />}
        </div>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{opportunity.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{opportunity.topics.map((topic) => <Tag key={topic}>{topic}</Tag>)}</div>
      </header>
      <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
        <section className="rounded-xl border border-line bg-card p-6 md:col-span-2">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-amber">Opportunity details</h2>
          <p className="mt-3 text-base leading-7 text-muted">{opportunity.description}</p>
          {opportunity.deadline && <div className="mt-6 border-t border-line pt-5"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Application deadline</p><p className="mt-1 text-base text-ink">{formatDate(opportunity.deadline)}</p></div>}
          {opportunity.link && (
            <div className="mt-6 border-t border-line pt-5">
              <a
                href={opportunity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex min-h-11 items-center gap-2"
              >
                Apply / View opportunity <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </section>
        <aside className="h-fit space-y-5 rounded-xl border border-line bg-card p-6">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Type</p><p className="mt-1 text-base capitalize text-ink">{opportunity.kind}</p></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Location</p><p className="mt-1 text-base text-ink">{opportunity.location}</p></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Region</p><p className="mt-1 text-base text-ink">{opportunity.region}</p></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Posted by</p>{poster?.href ? <Link href={poster.href} className="mt-1 inline-flex min-h-11 items-center text-base text-amber hover:underline">{poster.name} ↗</Link> : <p className="mt-1 text-base text-ink">{poster?.name ?? opportunity.postedBySlug}</p>}</div>
          {opportunity.link && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Link</p>
              <a
                href={opportunity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-amber hover:underline"
              >
                Apply or learn more ↗
              </a>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
