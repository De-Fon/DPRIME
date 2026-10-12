import SectionLabel from "./SectionLabel";

export default function PageHeader({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="mb-8">
      <SectionLabel>{label}</SectionLabel>
      <h1 className="font-display text-4xl md:text-5xl text-ink">{title}</h1>
      <p className="mt-3 text-lg text-muted max-w-2xl">{intro}</p>
    </header>
  );
}
