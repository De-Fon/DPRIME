import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-14 sm:py-16">
      <div className="font-mono text-sm text-muted mb-6">not found</div>
      <h1 className="font-display text-2xl text-ink">Page not found</h1>
      <p className="mt-4 text-serif text-body">Sorry, we couldn't find the page you were looking for.</p>
      <div className="mt-6">
        <Link href="/" className="inline-block px-4 py-2 bg-amber text-paper rounded font-semibold">Return home</Link>
      </div>
    </section>
  );
}
