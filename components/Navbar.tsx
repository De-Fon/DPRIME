import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-sm border-b border-line">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#" className="text-xl font-bold text-ink">DPRIME</Link>

        <div className="hidden md:flex items-center space-x-6">
          <a href="#projects" className="text-sm text-ink hover:text-slate">Projects</a>
          <a href="#services" className="text-sm text-ink hover:text-slate">Services</a>
          <a href="#team" className="text-sm text-ink hover:text-slate">Team</a>
          <a href="#contact" className="text-sm text-ink hover:text-slate">Contact</a>
          <a href="#contact" className="ml-4 inline-block px-4 py-2 rounded bg-amber text-paper text-sm font-semibold">Start a project</a>
        </div>

        {/* Mobile: simple anchor links; hamburger not implemented to keep this Server Component */}
        <div className="md:hidden">
          <a href="#contact" className="inline-block px-3 py-2 rounded bg-amber text-paper text-sm font-semibold">Start</a>
        </div>
      </nav>
    </header>
  );
}
