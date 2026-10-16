import Link from "next/link";
import CoverImage from "@/components/ecosystem/CoverImage";
import EmptyState from "@/components/ecosystem/EmptyState";
import SampleBadge from "@/components/ecosystem/SampleBadge";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import Tag from "@/components/ecosystem/Tag";
import { getEcosystem, resolveEntity } from "@/lib/ecosystem";

export const metadata = { title: "Programs | DPRIME" };

export default async function ProgramsPage() {
  const eco = await getEcosystem();
  const programs = eco.programs;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <SectionLabel>programs</SectionLabel>
      <header className="mb-9 mt-3 max-w-3xl">
        <h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">Learn, grow and build.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">Explore fellowships, bootcamps, incubators, mentorship and developer programs shared by the ecosystem.</p>
      </header>
      <p className="mb-5 font-mono text-xs uppercase tracking-wider text-muted">{programs.length} {programs.length === 1 ? "program" : "programs"}</p>
      {programs.length === 0 ? <EmptyState message="There are no programs listed right now. Check back as communities and organizations add their programs." /> : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const provider = resolveEntity(eco, program.runBySlug);
            return <article key={program.slug} className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition duration-200 hover:-translate-y-0.5 hover:border-amber/50 hover:shadow-lg hover:shadow-ink/5">
              <CoverImage src={program.imageUrl} alt={program.title} />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber">{program.kind}</span>{program.sample && <SampleBadge />}</div>
                <h2 className="font-display text-xl leading-snug text-ink"><Link href={`/programs/${program.slug}`} className="hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber">{program.title}</Link></h2>
                <p className="mt-2 text-sm leading-6 text-muted">{program.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">{program.topics.slice(0, 4).map((topic) => <Tag key={topic}>{topic}</Tag>)}</div>
                <div className="mt-auto border-t border-line pt-4 mt-5"><p className="font-mono text-xs text-muted">Duration · {program.duration}</p><p className="mt-2 text-sm text-muted">Run by {provider?.name ?? program.runBySlug}</p><Link href={`/programs/${program.slug}`} className="mt-2 inline-flex min-h-11 items-center text-sm text-amber hover:underline">View program details ↗</Link></div>
              </div>
            </article>;
          })}
        </div>
      )}
    </main>
  );
}
