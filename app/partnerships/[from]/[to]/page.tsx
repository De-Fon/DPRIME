import Link from "next/link";
import { notFound } from "next/navigation";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import SampleBadge from "@/components/ecosystem/SampleBadge";
import { getEcosystem, resolveEntity } from "@/lib/ecosystem";

export async function generateMetadata({ params }: { params: Promise<{ from: string; to: string }> }) {
  const { from, to } = await params;
  const eco = await getEcosystem();
  const relationship = eco.partnerships.find((item) => (item.fromSlug === from && item.toSlug === to) || (item.fromSlug === to && item.toSlug === from));
  if (!relationship) return { title: "Partnership | DPRIME" };
  const a = resolveEntity(eco, relationship.fromSlug);
  const b = resolveEntity(eco, relationship.toSlug);
  return { title: `${a?.name ?? relationship.fromSlug} × ${b?.name ?? relationship.toSlug} | DPRIME` };
}

export default async function PartnershipDetailPage({ params }: { params: Promise<{ from: string; to: string }> }) {
  const { from, to } = await params;
  const eco = await getEcosystem();
  const relationship = eco.partnerships.find((item) => (item.fromSlug === from && item.toSlug === to) || (item.fromSlug === to && item.toSlug === from));
  if (!relationship) notFound();
  const a = resolveEntity(eco, relationship.fromSlug);
  const b = resolveEntity(eco, relationship.toSlug);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <Link href="/partnerships" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-amber">← All partnerships</Link>
      <header className="mt-7 rounded-xl border border-line bg-card p-6 sm:p-10">
        <SectionLabel>partnership profile</SectionLabel>
        <div className="mt-4 flex flex-wrap items-center gap-3"><h1 className="font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">{a?.name ?? relationship.fromSlug} <span className="text-amber">×</span> {b?.name ?? relationship.toSlug}</h1>{relationship.sample && <SampleBadge />}</div>
        <p className="mt-4 text-base leading-7 text-muted">This relationship is recorded as a {relationship.type} connection in the DPRIME ecosystem.</p>
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-lg border border-line p-5"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Organization or community A</p><h2 className="mt-2 font-display text-xl text-ink">{a?.name ?? relationship.fromSlug}</h2>{a?.href && <Link href={a.href} className="mt-2 inline-flex min-h-11 items-center text-sm text-amber hover:underline">View profile ↗</Link>}</section>
          <section className="rounded-lg border border-line p-5"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Organization or community B</p><h2 className="mt-2 font-display text-xl text-ink">{b?.name ?? relationship.toSlug}</h2>{b?.href && <Link href={b.href} className="mt-2 inline-flex min-h-11 items-center text-sm text-amber hover:underline">View profile ↗</Link>}</section>
        </div>
      </header>
    </main>
  );
}
