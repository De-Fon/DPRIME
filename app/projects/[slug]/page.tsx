import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>; 
}) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-14 sm:py-16">
      <Link href="/projects" className="font-mono text-slate">← back to projects</Link>

      <div className="mt-6 flex items-start gap-6">
        <div className="font-mono text-line text-6xl select-none">{project!.index}</div>

        <div className="flex-1">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-2xl text-ink">{project!.name}</h1>
            {project!.live && <span className="text-xs bg-amber text-paper px-2 py-1 rounded">live</span>}

            <div className="ml-auto font-mono text-sm flex items-center gap-2 text-muted">
              <span className="text-slate">{project!.status === "shipped" ? "■" : "□"}</span>
              <span className="text-muted">{project!.status}</span>
            </div>
          </div>

          {project!.imageUrl && (
            <div className="mt-6">
              <Image src={project!.imageUrl} alt={`${project!.name} screenshot`} width={1200} height={700} className="rounded-md" />
            </div>
          )}

          <p className="mt-6 text-serif text-body">{project!.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project!.stack.map((s) => (
              <span key={s} className="inline-block bg-card border border-line rounded px-2 py-1 font-mono text-sm">{s}</span>
            ))}
          </div>

          {project!.url && project!.url.length > 0 && (
            <div className="mt-6">
              <a href={project!.url} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-amber text-paper rounded font-semibold">Visit live site</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
