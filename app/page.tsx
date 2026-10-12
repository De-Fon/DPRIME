import Link from "next/link";
import CommunityCard from "@/components/ecosystem/CommunityCard";
import EventCard from "@/components/ecosystem/EventCard";
import OpportunityCard from "@/components/ecosystem/OpportunityCard";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import { getEcosystem, resolveEntity } from "@/lib/ecosystem";
import { WHATSAPP_URL } from "@/data/links";

const WHAT_WE_DO = [
  {
    title: "Make communities discoverable",
    body: "Every club, meetup and developer group gets a profile with its mission, topics, location and where to join.",
  },
  {
    title: "Connect community to community",
    body: "Communities show their partners, sponsors and collaborators, so one community leads naturally to the next.",
  },
  {
    title: "Bring events together",
    body: "Hackathons, meetups and workshops are listed in one place, with the communities behind them.",
  },
  {
    title: "Surface opportunities",
    body: "Internships, grants, speaking slots and collaborations, posted by the communities and organizations that offer them.",
  },
];

const AUDIENCES = [
  {
    title: "Developers and students",
    body: "Find communities near you or around a topic, see what is on, and discover people building what you care about.",
    href: "/communities",
    cta: "Browse communities",
  },
  {
    title: "Community leaders",
    body: "Put your community on the map, find partners and speakers, and share your events and opportunities with a wider audience.",
    href: WHATSAPP_URL,
    cta: "Join the WhatsApp group",
    external: true,
  },
  {
    title: "Companies and organizations",
    body: "Reach the communities where developers already learn and build, and find the right ones to sponsor or work with.",
    href: WHATSAPP_URL,
    cta: "Get in touch on WhatsApp",
    external: true,
  },
];

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
        <Link href={href} className="inline-flex min-h-11 items-center text-sm text-ink hover:text-amber transition">
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
            We connect Africa&rsquo;s technology communities.
          </h1>
          <p className="mt-5 text-lg text-muted max-w-2xl">
            DPRIME helps university clubs, developer groups and open-source
            communities find each other, run events together and share
            opportunities. Nobody has to leave the WhatsApp, Discord or campus
            group they already use.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/discover" className="btn-primary px-6 py-3">
              Discover
            </Link>
            <Link href="/communities" className="btn-secondary px-6 py-3">
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
              Read our Manifesto
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
        <SectionLabel>what we do</SectionLabel>
        <h2 className="font-display text-3xl md:text-4xl text-ink max-w-3xl">
          Thousands of tech communities exist. Most never meet.
        </h2>
        <p className="mt-3 text-muted max-w-2xl">
          DPRIME is the shared layer between them. We make communities easy to
          find, and give them ways to work together.
        </p>
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHAT_WE_DO.map((item, i) => (
            <li
              key={item.title}
              className="bg-card border border-line rounded-md p-6 border-l-2 hover:border-l-amber transition-colors"
            >
              <span className="font-mono text-xs text-amber">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <SectionLabel>who it is for</SectionLabel>
        <h2 className="font-display text-3xl md:text-4xl text-ink">
          Built for the people who make tech happen.
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {AUDIENCES.map((a) => (
            <div key={a.title} className="bg-card border border-line rounded-md p-6 flex flex-col">
              <h3 className="font-display text-xl text-ink">{a.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted flex-1">{a.body}</p>
              {"external" in a ? (
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center text-sm text-amber hover:underline"
                >
                  {a.cta} →
                </a>
              ) : (
                <Link href={a.href} className="mt-3 inline-flex min-h-11 items-center text-sm text-amber hover:underline">
                  {a.cta} →
                </Link>
              )}
            </div>
          ))}
        </div>
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
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary self-start"
          >
            Get in touch on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
