"use client";

import { useState } from "react";
import { validateContactForm } from "../lib/validate";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateContactForm({ name, email, message });
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <section id="contact" className="max-w-5xl mx-auto px-6 py-14">
        <div className="font-mono text-sm text-muted mb-6">start a project</div>
        <div className="bg-card border border-line rounded-md p-6">
          <div className="text-ink font-display text-lg">Message sent. We'll get back to you shortly.</div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-14">
      <div className="font-mono text-sm text-muted mb-6">start a project</div>

      <form className="bg-card border border-line rounded-md p-6" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-mono text-muted">Name</span>
            <input
              className="mt-1 bg-paper border border-line focus:border-slate rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "error-name" : undefined}
            />
            {errors.name && (
              <div id="error-name" className="mt-1 text-amber font-mono text-sm">
                {errors.name}
              </div>
            )}
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-mono text-muted">Email</span>
            <input
              type="email"
              className="mt-1 bg-paper border border-line focus:border-slate rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "error-email" : undefined}
            />
            {errors.email && (
              <div id="error-email" className="mt-1 text-amber font-mono text-sm">
                {errors.email}
              </div>
            )}
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-mono text-muted">Message</span>
            <textarea
              className="mt-1 bg-paper border border-line focus:border-slate rounded px-3 py-2 min-h-[120px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "error-message" : undefined}
            />
            {errors.message && (
              <div id="error-message" className="mt-1 text-amber font-mono text-sm">
                {errors.message}
              </div>
            )}
          </label>

          <div>
            <button type="submit" className="inline-block px-4 py-2 bg-amber text-paper rounded font-semibold">Send message</button>
          </div>
        </div>
      </form>
    </section>
  );
}
