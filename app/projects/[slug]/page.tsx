import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { projects } from "@/data/projects";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const publicDir = path.join(process.cwd(), "public", "images", "projects", project!.slug);
  let gallery: string[] = [];

  try {
    if (fs.existsSync(publicDir)) {
      gallery = fs.readdirSync(publicDir).filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f));
    }
  } catch (e) {
    gallery = [];
  }

  const highlights = project!.description
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <article className="max-w-5xl mx-auto px-6 py-14 sm:py-16">
      {/* Breadcrumb */}
      <nav className="font-mono text-sm text-muted mb-6" aria-label="breadcrumb">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="text-muted hover:text-amber">DPRIME</Link>
          </li>
          <li aria-hidden className="text-muted">/</li>
          <li>
            <Link href="/projects" className="text-muted hover:text-amber">Projects</Link>
          </li>
          <li aria-hidden className="text-muted">/</li>
          <li className="text-ink font-semibold">{project!.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="py-4 border-b border-line mb-8">
        <div className="flex items-start gap-6">
          <div className="font-mono text-line text-7xl select-none opacity-10" aria-hidden>
            {project!.index}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="font-display text-3xl text-ink">{project!.name}</h1>
              {project!.live && (
                <span className="text-sm bg-amber text-paper px-3 py-1 rounded">Live</span>
              )}

              <div className="ml-auto font-mono text-sm flex items-center gap-2 text-muted">
                <span className="text-muted">{project!.status}</span>
              </div>
            </div>

            {project!.tagline && <p className="mt-3 font-serif text-lg text-muted">{project!.tagline}</p>}
          </div>
        </div>
      </header>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: overview */}
        <div className="lg:col-span-2">
          <section>
            <h2 className="font-display text-xl text-ink mb-3">Project overview</h2>
            <p className="text-body text-muted leading-relaxed">{project!.description}</p>
          </section>

          <section className="mt-8">
            <h3 className="font-display text-lg text-ink mb-3">Product preview</h3>

            {gallery.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gallery.map((f) => (
                  <Image
                    key={f}
                    src={`/images/projects/${project!.slug}/${f}`}
                    alt={`${project!.name} screenshot`}
                    width={1200}
                    height={700}
                    className="rounded-md border border-line bg-paper"
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-line bg-card p-8 text-muted">No preview available.</div>
            )}
          </section>

          <section className="mt-8">
            <h3 className="font-display text-lg text-ink mb-3">Project highlights</h3>
            <ul className="list-inside list-disc space-y-2 text-muted">
              {highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right: meta */}
        <aside className="lg:col-span-1">
          <div className="bg-card border border-line rounded-md p-6">
            <div>
              <h4 className="font-mono text-sm text-muted">Technology</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {project!.stack.map((s) => (
                  <span key={s} className="inline-flex items-center px-3 py-1 bg-paper text-sm font-mono rounded border border-line text-ink">{s}</span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-mono text-sm text-muted">Status</h4>
              <div className="mt-2 font-mono text-sm">
                {project!.live ? (
                  <span className="inline-flex items-center gap-2 text-amber">
                    <span className="w-2 h-2 rounded-full bg-amber inline-block" aria-hidden />
                    Live
                  </span>
                ) : (
                  <span className="text-muted">{project!.status}</span>
                )}
              </div>
            </div>

            <div className="mt-6">
              {project!.url && project!.url.length > 0 ? (
                <a href={project!.url} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center px-4 py-3 bg-amber text-paper rounded font-semibold">Visit →</a>
              ) : (
                <button className="inline-block w-full text-center px-4 py-3 bg-amber/10 text-amber rounded font-semibold cursor-default" disabled>Visit →</button>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Link href="/projects" className="inline-flex items-center text-sm text-muted hover:text-amber">← Back to projects</Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
