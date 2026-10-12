import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { SCHEMAS } from "@/lib/adminSchema";

export const metadata = { title: "Admin | DPRIME", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line pb-4 mb-8 text-sm">
        <Link href="/admin" className="font-display text-ink">
          Admin
        </Link>
        {Object.values(SCHEMAS).map((s) => (
          <Link key={s.kind} href={`/admin/${s.segment}`} className="text-muted hover:text-amber">
            {s.plural}
          </Link>
        ))}
        <form action={logoutAction} className="ml-auto">
          <button type="submit" className="text-muted hover:text-amber">
            Sign out
          </button>
        </form>
      </nav>
      {children}
    </div>
  );
}
