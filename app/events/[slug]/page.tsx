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
    <main className="min-h-screen bg-[#FAFAF8] text-ink">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-8">
        <Link href="/events" className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[#626873] hover:text-amber"><span aria-hidden="true">←</span> Back to events</Link>
        <div className="mt-5 overflow-hidden rounded-3xl border border-line bg-white">
          <div className="p-4 sm:p-6">
            <div className="overflow-hidden rounded-2xl bg-[#F1F0EC]">
              <CoverImage src={event.imageUrl ?? host?.imageUrl} alt={event.title} priority className="border-0" variant="event" fit="contain" />
            </div>
          </div>
          <header className="px-5 pb-7 sm:px-8 sm:pb-9">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${past ? "bg-[#F0F0EF] text-[#626873]" : "bg-[#E8F7F0] text-[#176447]"}`}>{past ? "Past event" : "Upcoming event"}</span>
              <span className="rounded-full bg-[#FFF2E7] px-3 py-1.5 text-xs font-semibold capitalize text-[#984600]">{event.kind}</span>
              {event.sample && <SampleBadge />}
            </div>
            <h1 className="mt-4 max-w-4xl break-words font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{event.title}</h1>
            {host && <p className="mt-3 text-sm text-[#626873]">Organized by <span className="font-semibold text-ink">{host.name}</span></p>}
            {event.topics.length > 0 && <ul aria-label="Event topics" className="mt-5 flex flex-wrap gap-2">{event.topics.map((topic) => <li key={topic}><Tag>{topic}</Tag></li>)}</ul>}
          </header>
          <div className="grid border-t border-line lg:grid-cols-[minmax(0,1fr)_340px]">
            <section className="min-w-0 px-5 py-7 sm:px-8 sm:py-9" aria-labelledby="event-about">
              <SectionLabel>About this event</SectionLabel>
              <h2 id="event-about" className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">What to expect</h2>
              <p className="mt-5 max-w-3xl whitespace-pre-line break-words text-base leading-8 text-[#454B55]">{event.description}</p>
              {partners.length > 0 && <div className="mt-9 border-t border-line pt-6"><SectionLabel>In collaboration</SectionLabel><h3 className="mt-3 font-display text-xl font-semibold">Event partners</h3><ul className="mt-4 flex flex-wrap gap-2">{partners.map((partner) => partner && <li key={partner.slug}>{partner.href ? <Link href={partner.href} className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-medium hover:border-amber">{partner.name} ↗</Link> : <span className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-medium">{partner.name}</span>}</li>)}</ul></div>}
            </section>
            <aside className="h-fit border-t border-line bg-[#FCFBF9] p-5 sm:p-7 lg:border-l lg:border-t-0" aria-label="Event details and registration">
              <h2 className="font-display text-xl font-semibold">Event details</h2>
              <dl className="mt-5 divide-y divide-[#E7E5E2]">
                <div className="py-4"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Date</dt><dd className="mt-1.5 text-sm font-semibold leading-6">{formatDate(event.date)}</dd></div>
                <div className="py-4"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Location / format</dt><dd className="mt-1.5 break-words text-sm leading-6">{event.location || "Not specified"}</dd></div>
                <div className="py-4"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Region</dt><dd className="mt-1.5 text-sm leading-6">{event.region || "Not specified"}</dd></div>
                <div className="py-4"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Organizer</dt><dd className="mt-1.5 text-sm leading-6">{host?.href ? <Link href={host.href} className="font-semibold text-amber hover:underline">{host.name} ↗</Link> : host?.name ?? "Not specified"}</dd></div>
                <div className="py-4"><dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777D86]">Status</dt><dd className="mt-1.5 text-sm leading-6">{past ? "This event has passed" : "Scheduled"}</dd></div>
              </dl>
              {event.link && <a href={event.link} target="_blank" rel="noopener noreferrer" className="btn-primary mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2">View event / Register <span aria-hidden="true">↗</span></a>}
              {host?.href && <Link href={host.href} className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-line bg-white px-4 text-sm font-semibold hover:border-amber">Explore organizer</Link>}
              <p className="mt-4 text-xs leading-5 text-[#777D86]">Event information is shown as provided by the organizer.</p>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
