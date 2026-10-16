import type { EcosystemEvent } from "@/lib/types";
import { formatDate, type EntityRef } from "@/lib/ecosystem";
import Link from "next/link";
import CoverImage from "./CoverImage";
import SampleBadge from "./SampleBadge";

function DateBlock({ date }: { date: string }) {
  const parsed = new Date(`${date}T12:00:00`);
  return (
    <div className="flex h-[58px] w-[58px] shrink-0 flex-col items-center justify-center rounded-xl border border-[#F1D8C2] bg-[#FFF5EC] text-[#7D3A00]">
      <span className="font-display text-xl font-bold leading-none">{parsed.getDate()}</span>
      <span className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-wider">{parsed.toLocaleString("en", { month: "short" })}</span>
    </div>
  );
}

export default function EventCard({ event, host }: { event: EcosystemEvent; host: EntityRef | null }) {
  const isPast = event.date < new Date().toISOString().slice(0, 10);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-200 hover:-translate-y-1 hover:border-amber/40 hover:shadow-lg hover:shadow-ink/5">
      <CoverImage src={event.imageUrl ?? host?.imageUrl} alt={event.title} variant="event" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-3">
          <DateBlock date={event.date} />
          <div className="min-w-0 flex-1 pt-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${isPast ? "bg-gray-100 text-gray-600" : "bg-emerald-50 text-emerald-800"}`}>{isPast ? "Past event" : "Upcoming"}</span>
              {event.sample && <SampleBadge />}
            </div>
            <h2 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl">
              <Link href={`/events/${event.slug}`} className="rounded-sm hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber">{event.title}</Link>
            </h2>
            <p className="mt-1 text-xs font-medium text-[#555D68]">{event.kind.replace(/\b\w/g, (letter) => letter.toUpperCase())}</p>
          </div>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#555D68]">{event.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {event.topics.slice(0, 3).map((topic) => <span key={topic} className="rounded-full bg-[#F3F4F6] px-2.5 py-1 text-xs font-medium text-[#454B55]">{topic}</span>)}
        </div>
        <div className="mt-auto space-y-3 border-t border-line pt-4 mt-5 text-sm text-[#555D68]">
          <p className="flex items-start gap-2"><span aria-hidden="true" className="mt-0.5 text-amber">⌖</span><span>{event.location}</span></p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs">Hosted by {host?.name ?? event.hostSlug}</span>
            <Link href={`/events/${event.slug}`} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-amber px-3.5 text-xs font-semibold text-amber hover:bg-amber hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber">View event <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
