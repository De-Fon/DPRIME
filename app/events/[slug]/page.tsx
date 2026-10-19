import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CoverImage from "@/components/ecosystem/CoverImage";
import SampleBadge from "@/components/ecosystem/SampleBadge";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import Tag from "@/components/ecosystem/Tag";
import { formatDate, getEcosystem, resolveEntity } from "@/lib/ecosystem";
import { buildEventMetadata } from "@/lib/eventMetadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const eco = await getEcosystem();
  const event = eco.events.find((item) => item.slug === slug);
  if (!event) {
    return { title: "Event | DPRIME" };
  }

  const host = resolveEntity(eco, event.hostSlug);
  return buildEventMetadata({ event, host });
}

function MetaLabel({ children }: { children: string }) {
  return <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A64A00]">{children}</p>;
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const eco = await getEcosystem();
  const event = eco.events.find((item) => item.slug === slug);
  if (!event) notFound();

  const host = resolveEntity(eco, event.hostSlug);
  const partners = event.partnerSlugs.map((partnerSlug) => resolveEntity(eco, partnerSlug)).filter(Boolean);
  const today = new Date().toISOString().slice(0, 10);
  const past = event.date < today;

  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-8">
        <Link href="/events" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#555D68] transition hover:text-amber">
          <span aria-hidden="true">←</span> All events
        </Link>

        <header className="mt-4 overflow-hidden rounded-3xl border border-line bg-white">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,.78fr)]">
            <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9 lg:p-12">
              <SectionLabel>{event.kind}</SectionLabel>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className={`inline-flex min-h-8 items-center rounded-full px-3 text-xs font-semibold ${past ? "bg-[#F0F0EF] text-[#626873]" : "bg-[#E8F7F0] text-[#176447]"}`}>{past ? "Past event" : "Upcoming event"}</span>
                {event.sample && <SampleBadge />}
              </div>
              <h1 className="mt-4 max-w-3xl break-words font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">{event.title}</h1>
              <p className="mt-5 max-w-2xl whitespace-pre-line break-words text-base leading-7 text-[#555D68] sm:text-lg sm:leading-8">{event.description}</p>
              {event.topics.length > 0 && <ul aria-label="Event topics" className="mt-5 flex flex-wrap gap-2">{event.topics.map((topic) => <li key={topic}><Tag>{topic}</Tag></li>)}</ul>}
              <div className="mt-7 flex flex-wrap gap-3">
                {event.link && <a href={event.link} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex min-h-11 items-center gap-2">Event / Register link <span aria-hidden="true">↗</span></a>}
                {host?.href && <Link href={host.href} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 text-sm font-semibold text-ink transition hover:border-amber">View event host <span aria-hidden="true">↗</span></Link>}
              </div>
            </div>
            <div className="relative flex min-h-[220px] items-center border-t border-line bg-[#F7F6F2] p-4 sm:p-6 lg:border-l lg:border-t-0">
              <CoverImage src={event.imageUrl ?? host?.imageUrl} alt={event.title} priority className="w-full overflow-hidden rounded-2xl border border-line bg-white" variant="event" fit="contain" />
            </div>
          </div>
        </header>

        <section aria-labelledby="event-information" className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
          <div className="border-b border-line px-5 py-4 sm:px-7">
            <SectionLabel>At a glance</SectionLabel>
            <h2 id="event-information" className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">Event information</h2>
          </div>
          <dl className="divide-y divide-[#E7E5E2]">
            <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Date</dt><dd className="break-words text-sm font-medium leading-6 text-ink">{formatDate(event.date)}</dd></div>
            <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Venue or format</dt><dd className="break-words text-sm font-medium leading-6 text-ink">{event.location || "Not specified"}</dd></div>
            <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Region</dt><dd className="break-words text-sm font-medium leading-6 text-ink">{event.region || "Not specified"}</dd></div>
            <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Event type</dt><dd className="break-words text-sm font-medium capitalize leading-6 text-ink">{event.kind}</dd></div>
            <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Organized by</dt><dd className="break-words text-sm font-medium leading-6 text-ink">{host?.href ? <Link href={host.href} className="text-amber hover:underline">{host.name} ↗</Link> : host?.name ?? "Host details unavailable"}</dd></div>
            <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Status</dt><dd className="break-words text-sm font-medium leading-6 text-ink">{past ? "This event date has passed" : "Scheduled for a future date"}</dd></div>
            {event.link && <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:px-7"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Registration link</dt><dd className="break-words text-sm font-medium leading-6"><a href={event.link} target="_blank" rel="noopener noreferrer" className="text-amber hover:underline">Open event or registration page ↗</a></dd></div>}
          </dl>
        </section>

        {partners.length > 0 && <section className="mt-10 border-t border-line pt-8" aria-labelledby="event-partners">
          <SectionLabel>In collaboration</SectionLabel>
          <h2 id="event-partners" className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Event partners</h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => partner && <li key={partner.slug} className="rounded-2xl border border-line p-5">
              <MetaLabel>Partner</MetaLabel>
              {partner.href ? <Link href={partner.href} className="mt-2 inline-flex min-h-9 items-center font-semibold hover:text-amber">{partner.name} ↗</Link> : <p className="mt-2 font-semibold">{partner.name}</p>}
            </li>)}
          </ul>
        </section>}
        <p className="mt-5 max-w-3xl text-xs leading-5 text-[#777D86]">Event times and registration requirements are shown when supplied by the organizer. If a detail is not listed here, it has not been provided to DPRIME.</p>
      </div>
    </main>
  );
}
