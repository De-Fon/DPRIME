import Link from "next/link";
import Image from "next/image";
import CommunityCard from "@/components/ecosystem/CommunityCard";
import EventCard from "@/components/ecosystem/EventCard";
import OpportunityCard from "@/components/ecosystem/OpportunityCard";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import { getEcosystem, resolveEntity } from "@/lib/ecosystem";
import { WHATSAPP_URL } from "@/data/links";

const HOME_PREVIEW = 3;
export const revalidate = 3600;

function SectionHeader({ label, title, href, cta }: { label: string; title: string; href: string; cta: string }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <SectionLabel>{label}</SectionLabel>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
      </div>
      <Link href={href} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber hover:text-ink">
        {cta} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

export default async function Home() {
  const eco = await getEcosystem();
  const { communities, opportunities } = eco;
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = eco.events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, HOME_PREVIEW);
  const openOpportunities = opportunities
    .filter((item) => !item.deadline || item.deadline >= today)
    .slice(0, HOME_PREVIEW);

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-6 md:grid-cols-[1.25fr_.75fr] md:items-center md:py-16 lg:gap-14 lg:py-20">
          <div>
            <SectionLabel>a community connecting communities</SectionLabel>
            <h1 className="max-w-2xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
              We connect Africa&rsquo;s<br />technology communities.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
              DPRIME brings university clubs, developer groups, and open-source communities together to discover one another, organize events, collaborate, and share opportunities — while staying connected to the platforms they already use.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/discover" className="btn-primary min-h-11">Discover <span aria-hidden="true">→</span></Link>
              <Link href="/communities" className="btn-secondary min-h-11">Browse communities</Link>
            </div>
          </div>
          <aside className="relative isolate overflow-hidden rounded-2xl border border-[#f0e4d8] bg-[#fffaf5] p-6 sm:p-8">
            <div className="relative z-10 max-w-[75%]">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-amber">for community leaders</p>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-ink">Put your community on the map.</h2>
              <p className="mt-3 text-sm leading-6 text-muted">Help people discover what you do, find collaborators and connect with the wider ecosystem.</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 min-h-11 text-sm">Connect with DPRIME <span aria-hidden="true">→</span></a>
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-7 -right-8 flex h-36 w-36 items-center justify-center rounded-full border-[18px] border-[#f4dfcc] sm:h-44 sm:w-44">
              <Image src="/images/brand/logo3.png" alt="" width={78} height={78} className="relative z-10 h-16 w-16 object-contain sm:h-20 sm:w-20" />
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute right-5 top-5 h-3 w-3 rounded-full bg-amber/60" />
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-5 py-10 sm:px-6 sm:py-12 lg:space-y-14 lg:py-14">
        <section aria-labelledby="featured-communities">
          <SectionHeader label="meet your people" title="Featured communities" href="/communities" cta="See all communities" />
          {communities.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {communities.slice(0, 4).map((community) => <CommunityCard key={community.slug} community={community} />)}
            </div>
          ) : <EmptySection text="Communities will appear here as they join DPRIME." />}
        </section>

        <section aria-labelledby="upcoming-events">
          <SectionHeader label="learn · meet · build" title="Upcoming events" href="/events" cta="See all events" />
          {upcoming.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {upcoming.map((event) => <EventCard key={event.slug} event={event} host={resolveEntity(eco, event.hostSlug)} />)}
            </div>
          ) : <EmptySection text="No upcoming events are listed right now. Check back soon." />}
        </section>

        <section aria-labelledby="new-opportunities">
          <SectionHeader label="take your next step" title="New opportunities" href="/opportunities" cta="See all opportunities" />
          {openOpportunities.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {openOpportunities.map((opportunity) => <OpportunityCard key={opportunity.slug} opportunity={opportunity} poster={resolveEntity(eco, opportunity.postedBySlug)} />)}
            </div>
          ) : <EmptySection text="No open opportunities are listed right now. Check back soon." />}
        </section>

        <section className="overflow-hidden rounded-2xl border border-line bg-white px-6 py-8 sm:px-9 sm:py-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-amber">for community leaders</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Run a community? List it on DPRIME.</h2>
              <p className="mt-2 text-sm leading-6 text-muted sm:text-base">Grow your reach, connect with like-minded people and discover new ways to collaborate.</p>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-11 shrink-0">Get in touch <span aria-hidden="true">→</span></a>
          </div>
        </section>
      </div>
    </div>
  );
}

function EmptySection({ text }: { text: string }) {
  return <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-10 text-center"><p className="text-sm text-muted">{text}</p></div>;
}
