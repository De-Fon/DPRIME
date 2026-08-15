"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14 sm:py-16">
      <div className="font-mono text-sm text-muted mb-6">error</div>
      <h1 className="font-display text-2xl text-ink">Something went wrong</h1>
      <p className="mt-4 text-serif text-body">An unexpected error occurred while rendering this page. You can try again.</p>

      <div className="mt-6">
        <button onClick={() => reset()} className="inline-block px-4 py-2 bg-ink text-paper rounded font-semibold">Try again</button>
      </div>
    </div>
  );
}
