import Link from "next/link";
import EmptyState from "@/components/ecosystem/EmptyState";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import SampleBadge from "@/components/ecosystem/SampleBadge";
import { getEcosystem, resolveEntity } from "@/lib/ecosystem";

export const metadata = { title: "Partnerships | DPRIME" };

export default async function PartnershipsPage() {
  const eco = await getEcosystem();
  const partnerships = eco.partnerships;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <SectionLabel>partnerships</SectionLabel>
      <header className="mb-9 mt-3 max-w-3xl">
        <h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">Connections make the ecosystem stronger.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">Explore collaborations between communities and organizations, from event partnerships to sponsorship and academic connections.</p>
      </header>
      <p className="mb-5 font-mono text-xs uppercase tracking-wider text-muted">{partnerships.length} {partnerships.length === 1 ? "connection" : "connections"}</p>
      {partnerships.length === 0 ? <EmptyState message="No partnerships are listed yet. Check back as ecosystem connections are added." /> : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {partnerships.map((partnership, index) => {
            const from = resolveEntity(eco, partnership.fromSlug);
            const to = resolveEntity(eco, partnership.toSlug);
            return <li key={`${partnership.fromSlug}-${partnership.toSlug}-${partnership.type}-${index}`} className="rounded-xl border border-line bg-card p-5 sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber">{partnership.type}</span>{partnership.sample && <SampleBadge />}</div>
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                {from?.href ? <Link href={from.href} className="inline-flex min-h-11 items-center font-display text-lg text-ink hover:text-amber">{from.name} ↗</Link> : <span className="inline-flex min-h-11 items-center font-display text-lg text-ink">{from?.name ?? partnership.fromSlug}</span>}
                <span aria-hidden="true" className="text-amber">↔</span>
                {to?.href ? <Link href={to.href} className="inline-flex min-h-11 items-center font-display text-lg text-ink hover:text-amber">{to.name} ↗</Link> : <span className="inline-flex min-h-11 items-center font-display text-lg text-ink">{to?.name ?? partnership.toSlug}</span>}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">A {partnership.type} connection in the DPRIME ecosystem.</p>
            </li>;
          })}
        </ul>
      )}
    </main>
  );
}
