import Link from "next/link";
import { notFound } from "next/navigation";
import CoverImage from "@/components/ecosystem/CoverImage";
import SampleBadge from "@/components/ecosystem/SampleBadge";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import Tag from "@/components/ecosystem/Tag";
import { getEcosystem, resolveEntity } from "@/lib/ecosystem";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = (await getEcosystem()).programs.find((item) => item.slug === slug);
  return { title: program ? `${program.title} | DPRIME` : "Program | DPRIME" };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const eco = await getEcosystem();
  const program = eco.programs.find((item) => item.slug === slug);
  if (!program) notFound();
  const provider = resolveEntity(eco, program.runBySlug);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <Link href={provider?.href ?? "/discover"} className="inline-flex min-h-11 items-center text-sm text-muted hover:text-amber">← {provider ? provider.name : "Back to discover"}</Link>
      <header className="mt-6">
        <CoverImage src={program.imageUrl} alt={program.title} priority className="mb-7 max-w-4xl overflow-hidden rounded-xl border border-line" />
        <SectionLabel>{`${program.kind} · ${program.duration}`}</SectionLabel>
        <div className="mt-3 flex flex-wrap items-center gap-3"><h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">{program.title}</h1>{program.sample && <SampleBadge />}</div>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{program.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{program.topics.map((topic) => <Tag key={topic}>{topic}</Tag>)}</div>
      </header>
      <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
        <section className="rounded-xl border border-line bg-card p-6 md:col-span-2">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-amber">About this program</h2>
          <p className="mt-3 text-base leading-7 text-muted">{program.description}</p>
          {program.link && (
            <div className="mt-6 border-t border-line pt-5">
              <a
                href={program.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex min-h-11 items-center gap-2"
              >
                Apply / Learn more <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </section>
        <aside className="h-fit space-y-5 rounded-xl border border-line bg-card p-6">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Duration</p><p className="mt-1 text-base text-ink">{program.duration}</p></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Run by</p>{provider?.href ? <Link href={provider.href} className="mt-1 inline-flex min-h-11 items-center text-base text-amber hover:underline">{provider.name} ↗</Link> : <p className="mt-1 text-base text-ink">{provider?.name ?? program.runBySlug}</p>}</div>
          {program.link && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Website</p>
              <a
                href={program.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-amber hover:underline"
              >
                Visit program website ↗
              </a>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
