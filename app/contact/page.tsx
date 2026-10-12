import SectionLabel from "@/components/ecosystem/SectionLabel";
import { DISCORD_URL, WHATSAPP_URL } from "@/data/links";

export const metadata = { title: "Get in touch | DPRIME" };

export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <SectionLabel>get in touch</SectionLabel>
      <h1 className="font-display text-4xl md:text-5xl text-ink">
        The conversation happens in our group.
      </h1>
      <p className="mt-4 text-lg text-muted">
        Run a community, represent an organization, or just want to be part of
        it? Join the DPRIME WhatsApp group and say hello. We read everything
        there.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center"
        >
          Join our WhatsApp group
          <span className="ml-3" aria-hidden>
            →
          </span>
        </a>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center"
        >
          Or find us on Discord
        </a>
      </div>
    </section>
  );
}
