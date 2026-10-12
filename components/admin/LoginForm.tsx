"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});
  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="font-mono text-xs text-muted">PASSWORD</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full border border-line rounded-md bg-card px-3 py-2 text-sm"
        />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
