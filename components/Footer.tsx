export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-paper">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="text-sm text-muted">© {year} DPRIME. All rights reserved.</div>
        <div className="text-xs text-muted mt-2">Small, capable student dev team building production-ready web apps and ongoing support.</div>
      </div>
    </footer>
  );
}
