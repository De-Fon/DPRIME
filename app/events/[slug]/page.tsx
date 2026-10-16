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

function MetaLabel({ children }: { children: string }) {
  return <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A64A00]">{children}</p>;
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const eco = await getEcosystem();
  const event = eco.events.find((item) => item.slug === slug);
  if (!event) notFound();
  const host = resolveEntity(eco, event.hostSlug);
  const partners = event.partnerSlugs.map((partnerSlug) => resolveEntity(eco, partnerSlug)).filter(Boolean);
  const past = event.date < new Date().toISOString().slice(0, 10);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-6 sm:px-6 sm:pt-8 lg:pb-20">
        <Link href="/events" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#555D68] transition hover:text-amber"><span aria-hidden="true">←</span> All events</Link>
        <header className="mt-4">
          <div className="overflow-hidden rounded-2xl border border-line"><CoverImage src={event.imageUrl ?? host?.imageUrl} alt={event.title} priority className="border-0" variant="event" /></div>
          <div className="mt-7">
            <SectionLabel>{`${event.kind} · ${formatDate(event.date)}`}</SectionLabel>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">{event.title}</h1>
                  {event.sample && <SampleBadge />}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2"><span className={`inline-flex min-h-7 items-center rounded-full px-3 text-xs font-semibold ${past ? "bg-gray-100 text-gray-700" : "bg-emerald-50 text-emerald-800"}`}>{past ? "Past event" : "Upcoming event"}</span>{event.topics.map((topic) => <Tag key={topic}>{topic}</Tag>)}</div>
                <p className="mt-4 max-w-3xl text-base leading-7 text-[#555D68] sm:text-lg">{event.description}</p>
              </div>
              {host?.href && <Link href={host.href} className="btn-secondary min-h-11 w-fit shrink-0">View host <span aria-hidden="true">↗</span></Link>}
            </div>
          </div>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,.85fr)]">
          <section className="rounded-2xl border border-line bg-white p-5 sm:p-7">
            <MetaLabel>About this event</MetaLabel>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#343A43]">{event.description}</p>
            {partners.length > 0 && <div className="mt-7 border-t border-line pt-5"><MetaLabel>Event partners</MetaLabel><ul className="mt-3 flex flex-wrap gap-2">{partners.map((partner) => partner && <li key={partner.slug}>{partner.href ? <Link className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-medium text-[#343A43] transition hover:border-amber hover:text-amber" href={partner.href}>{partner.name} ↗</Link> : <span className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm text-[#343A43]">{partner.name}</span>}</li>)}</ul></div>}
          </section>
          <aside className="h-fit rounded-2xl border border-line bg-white p-5 sm:p-7">
            <h2 className="font-display text-lg font-semibold tracking-tight text-ink">Key details</h2>
            <dl className="mt-5 space-y-5">
              <div><MetaLabel>Date</MetaLabel><dd className="mt-1.5 text-sm font-medium text-[#343A43]">{formatDate(event.date)}</dd></div>
              <div><MetaLabel>Location</MetaLabel><dd className="mt-1.5 text-sm leading-6 text-[#343A43]">{event.location}</dd></div>
              <div><MetaLabel>Region</MetaLabel><dd className="mt-1.5 text-sm text-[#343A43]">{event.region}</dd></div>
              <div><MetaLabel>Hosted by</MetaLabel><dd className="mt-1.5">{host?.href ? <Link href={host.href} className="inline-flex min-h-10 items-center text-sm font-semibold text-amber hover:underline">{host.name} ↗</Link> : <span className="text-sm text-[#343A43]">{host?.name ?? event.hostSlug}</span>}</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </main>
  );
}
