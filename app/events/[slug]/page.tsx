import Link from "next/link";
import { notFound } from "next/navigation";
import CoverImage from "@/components/ecosystem/CoverImage";
import SampleBadge from "@/components/ecosystem/SampleBadge";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import Tag from "@/components/ecosystem/Tag";
import { formatDate, getEcosystem, resolveEntity } from "@/lib/ecosystem";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = (await getEcosystem()).events.find((item) => item.slug === slug);
  return { title: event ? `${event.title} | DPRIME` : "Event | DPRIME" };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const eco = await getEcosystem();
  const event = eco.events.find((item) => item.slug === slug);
  if (!event) notFound();
  const host = resolveEntity(eco, event.hostSlug);
  const partners = event.partnerSlugs.map((partnerSlug) => resolveEntity(eco, partnerSlug)).filter(Boolean);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <Link href="/events" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-amber">← All events</Link>
      <header className="mt-6">
        <CoverImage src={event.imageUrl} alt={event.title} priority className="mb-7 max-w-4xl overflow-hidden rounded-xl border border-line" />
        <SectionLabel>{`${event.kind} · ${formatDate(event.date)}`}</SectionLabel>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">{event.title}</h1>
          {event.sample && <SampleBadge />}
        </div>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{event.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{event.topics.map((topic) => <Tag key={topic}>{topic}</Tag>)}</div>
      </header>
      <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
        <section className="rounded-xl border border-line bg-card p-6 md:col-span-2">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-amber">About this event</h2>
          <p className="mt-3 text-base leading-7 text-muted">{event.description}</p>
          {partners.length > 0 && <>
            <h2 className="mt-7 font-mono text-xs uppercase tracking-[0.16em] text-amber">Event partners</h2>
            <ul className="mt-3 flex flex-wrap gap-3">{partners.map((partner) => partner && <li key={partner.slug}>{partner.href ? <Link className="inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-sm text-ink hover:border-amber hover:text-amber" href={partner.href}>{partner.name} ↗</Link> : <span className="inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-sm text-ink">{partner?.name}</span>}</li>)}</ul>
          </>}
        </section>
        <aside className="h-fit space-y-5 rounded-xl border border-line bg-card p-6">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Date</p><p className="mt-1 text-base text-ink">{formatDate(event.date)}</p></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Location</p><p className="mt-1 text-base text-ink">{event.location}</p></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Region</p><p className="mt-1 text-base text-ink">{event.region}</p></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Hosted by</p>{host?.href ? <Link href={host.href} className="mt-1 inline-flex min-h-11 items-center text-base text-amber hover:underline">{host.name} ↗</Link> : <p className="mt-1 text-base text-ink">{host?.name ?? event.hostSlug}</p>}</div>
        </aside>
      </div>
    </main>
  );
}
