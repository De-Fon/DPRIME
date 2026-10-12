import ManifestoReveal from "@/components/manifesto/ManifestoReveal";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import { DISCORD_URL, manifesto } from "@/data/manifesto";

export const metadata = { title: "Manifesto | DPRIME" };

export default function ManifestoPage() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-blueprint opacity-20" aria-hidden />
      <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-24 min-h-[calc(100vh-5rem)] flex flex-col justify-center">
        <SectionLabel>manifesto</SectionLabel>
        <ManifestoReveal sentences={manifesto} discordUrl={DISCORD_URL} />
      </div>
    </section>
  );
}
