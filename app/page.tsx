import Link from "next/link";
import CommunityCard from "@/components/ecosystem/CommunityCard";
import EventCard from "@/components/ecosystem/EventCard";
import OpportunityCard from "@/components/ecosystem/OpportunityCard";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import { getEcosystem, resolveEntity } from "@/lib/ecosystem";

const HOME_PREVIEW = 3;

// "Upcoming" depends on today's date, so re-render at least hourly.
export const revalidate = 3600;

function SectionHeader({
  label,
  title,
  href,
  cta,
}: {
  label: string;
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="mb-8">
      <SectionLabel>{label}</SectionLabel>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <h2 className="font-display text-3xl md:text-4xl text-ink">{title}</h2>
        <Link href={href} className="text-sm text-ink hover:text-amber transition">
          {cta} →
        </Link>
      </div>
    </div>
  );
}

export default async function Home() {
  const eco = await getEcosystem();
  const { communities, organizations, opportunities, partnerships } = eco;
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = eco.events
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, HOME_PREVIEW);

  const stats = [
    { value: communities.length, label: "communities" },
    { value: organizations.length, label: "organizations" },
    { value: eco.events.length, label: "events" },
    { value: opportunities.length, label: "opportunities" },
    { value: partnerships.length, label: "connections" },
  ];

  return (
    <>
      <section className="relative border-b border-line">
        <div
          className="absolute inset-0 bg-blueprint opacity-30"
          aria-hidden
        />
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <SectionLabel>a community connecting communities</SectionLabel>
          <h1 className="font-display text-4xl md:text-6xl text-ink max-w-3xl leading-tight">
            Find the technology communities, events and people around you.
          </h1>
          <p className="mt-5 text-lg text-muted max-w-2xl">
            DPrime does not replace the groups you already belong to. It
            connects them, so communities can discover each other, collaborate
            and create opportunities together.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/discover" className="btn-primary">
              Discover
            </Link>
            <Link href="/communities" className="btn-secondary">
              Browse communities
            </Link>
            <a
              href="/manifesto"
              target="_blank"
              // Same-origin page, so keeping the opener is safe. It is what lets
              // the new tab play sound immediately: browsers default
              // target=_blank to noopener, which drops the click's permission.
              rel="opener"
              className="manifesto-launch group relative inline-flex cursor-pointer items-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-semibold text-paper transition-colors hover:bg-amber"
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="manifesto-ping absolute inline-flex h-full w-full rounded-full bg-amber group-hover:bg-paper" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber group-hover:bg-paper" />
              </span>
              Read the manifesto
              <span className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>
                ↗
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <dl className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-card border border-line rounded-md p-4"
            >
              <dd className="font-display text-3xl text-ink">{s.value}</dd>
              <dt className="font-mono text-xs text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-3 font-mono text-xs text-muted">
          Listings marked sample are placeholders while communities onboard.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <SectionHeader
          label="what's happening"
          title="Upcoming events"
          href="/events"
          cta="All events"
        />
        {upcoming.length === 0 ? (
          <p className="border border-dashed border-line rounded-md p-8 text-center text-sm text-muted">
            No upcoming events yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {upcoming.map((e) => (
              <EventCard key={e.slug} event={e} host={resolveEntity(eco, e.hostSlug)} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <SectionHeader
          label="communities"
          title="Communities to explore"
          href="/communities"
          cta="All communities"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {communities.slice(0, HOME_PREVIEW).map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <SectionHeader
          label="opportunities"
          title="Open opportunities"
          href="/opportunities"
          cta="All opportunities"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {opportunities.slice(0, HOME_PREVIEW).map((o) => (
            <OpportunityCard key={o.slug} opportunity={o} poster={resolveEntity(eco, o.postedBySlug)} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-t border-line pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl text-ink">
              Run a community? Bring it to DPrime.
            </h2>
            <p className="mt-3 text-muted max-w-2xl">
              Keep your WhatsApp, Discord or Slack. DPrime makes your community
              discoverable and helps you find partners, speakers and sponsors.
            </p>
          </div>
          <Link href="/contact" className="btn-primary self-start">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
