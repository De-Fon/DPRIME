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
        <Link href="/events" className="inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-medium text-[#555D68] transition hover:text-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber">
          <span aria-hidden="true">←</span> All events
        </Link>

        <header className="mt-4 overflow-hidden rounded-3xl border border-line bg-[#FCFBF9]">
          <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,.75fr)]">
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
              <SectionLabel>{event.kind}</SectionLabel>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className={`inline-flex min-h-8 items-center rounded-full px-3 text-xs font-semibold ${past ? "bg-[#F0F0EF] text-[#626873]" : "bg-[#E8F7F0] text-[#176447]"}`}>{past ? "Past event" : "Upcoming event"}</span>
                {event.sample && <SampleBadge />}
              </div>
              <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">{event.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#555D68] sm:text-lg sm:leading-8">{event.description}</p>
              {event.topics.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{event.topics.map((topic) => <Tag key={topic}>{topic}</Tag>)}</div>}
              <div className="mt-7 flex flex-wrap gap-3">
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex min-h-11 items-center gap-2"
                  >
                    Event / Register link <span aria-hidden="true">↗</span>
                  </a>
                )}
                {host?.href && (
                  <Link
                    href={host.href}
                    className={`inline-flex min-h-11 items-center gap-2 ${event.link ? "inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 text-sm font-semibold text-ink transition hover:border-amber" : "btn-primary"}`}
                  >
                    View event host <span aria-hidden="true">↗</span>
                  </Link>
                )}
                <Link href="/events" className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 text-sm font-semibold text-ink transition hover:border-amber">Explore more events</Link>
              </div>
            </div>
            <div className="relative min-h-[240px] border-t border-line bg-white lg:min-h-full lg:border-l lg:border-t-0">
              <CoverImage src={event.imageUrl ?? host?.imageUrl} alt={event.title} priority className="h-full min-h-[240px] border-0 lg:min-h-[390px]" variant="event" fit="contain" />
            </div>
          </div>
        </header>

        <section aria-labelledby="event-at-a-glance" className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <h2 id="event-at-a-glance" className="sr-only">Event at a glance</h2>
          <div className="rounded-2xl border border-line p-5">
            <MetaLabel>Date</MetaLabel>
            <p className="mt-2 font-display text-lg font-semibold">{formatDate(event.date)}</p>
          </div>
          <div className="rounded-2xl border border-line p-5">
            <MetaLabel>Where</MetaLabel>
            <p className="mt-2 text-sm font-medium leading-6">{event.location}</p>
          </div>
          <div className="rounded-2xl border border-line p-5">
            <MetaLabel>Region</MetaLabel>
            <p className="mt-2 text-sm font-medium leading-6">{event.region}</p>
          </div>
          <div className="rounded-2xl border border-line p-5">
            <MetaLabel>Organized by</MetaLabel>
            {host?.href ? <Link href={host.href} className="mt-2 inline-flex min-h-8 items-center text-sm font-semibold text-amber hover:underline">{host.name} ↗</Link> : <p className="mt-2 text-sm font-medium">{host?.name ?? "Host details unavailable"}</p>}
          </div>
        </section>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <div className="min-w-0">
            <section aria-labelledby="about-event">
              <SectionLabel>Event overview</SectionLabel>
              <h2 id="about-event" className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">About this event</h2>
              <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-8 text-[#454B55]">{event.description}</p>
            </section>
            {partners.length > 0 && <section className="mt-10 border-t border-line pt-8" aria-labelledby="event-partners">
              <SectionLabel>In collaboration</SectionLabel>
              <h2 id="event-partners" className="mt-3 font-display text-2xl font-semibold tracking-tight">Event partners</h2>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {partners.map((partner) => partner && <li key={partner.slug} className="rounded-2xl border border-line p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#777D86]">Partner</p>
                  {partner.href ? <Link href={partner.href} className="mt-2 inline-flex min-h-9 items-center font-semibold hover:text-amber">{partner.name} ↗</Link> : <p className="mt-2 font-semibold">{partner.name}</p>}
                </li>)}
              </ul>
            </section>}
          </div>
          <aside className="h-fit rounded-2xl border border-line bg-[#FCFBF9] p-5 sm:p-6">
            <SectionLabel>Plan your visit</SectionLabel>
            <h2 className="mt-3 font-display text-xl font-semibold">Event details</h2>
            <dl className="mt-5 space-y-5">
              <div><MetaLabel>Date</MetaLabel><dd className="mt-1.5 text-sm leading-6">{formatDate(event.date)}</dd></div>
              <div><MetaLabel>Venue or format</MetaLabel><dd className="mt-1.5 text-sm leading-6">{event.location}</dd></div>
              <div><MetaLabel>Event type</MetaLabel><dd className="mt-1.5 text-sm capitalize">{event.kind}</dd></div>
              <div><MetaLabel>Status</MetaLabel><dd className="mt-1.5 text-sm">{past ? "This event date has passed" : "Scheduled for a future date"}</dd></div>
              {host && <div><MetaLabel>Host</MetaLabel><dd className="mt-1.5 text-sm leading-6">{host.name}</dd></div>}
            </dl>
            <p className="mt-6 border-t border-line pt-4 text-xs leading-5 text-[#626873]">Registration details and event times are shown when provided by the organizer. If they are not listed here, DPRIME has not been given those details yet.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
