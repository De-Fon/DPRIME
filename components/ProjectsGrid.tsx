import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-14">
      <div className="font-mono text-sm text-muted mb-6">
        <span className="inline-flex items-center">
          <span className="inline-block w-[3px] h-[14px] bg-slate mr-2.5" aria-hidden />
          <span className="font-medium tracking-[0.05em]">recent work</span>
        </span>
      </div>

      <div className="space-y-6">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
