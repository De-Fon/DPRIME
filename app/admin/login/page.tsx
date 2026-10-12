import LoginForm from "@/components/admin/LoginForm";
import { authConfigured } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin sign in | DPRIME", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto px-6 py-24">
      <h1 className="font-display text-3xl text-ink">Admin</h1>
      <p className="mt-2 mb-8 text-sm text-muted">Sign in to manage the data shown on the site.</p>
      {authConfigured() ? (
        <LoginForm />
      ) : (
        <p className="text-sm text-red-700 border border-red-200 bg-red-50 rounded-md p-3">
          Admin login is disabled. Set ADMIN_PASSWORD and a SESSION_SECRET of at least 32 characters.
        </p>
      )}
    </div>
  );
}
