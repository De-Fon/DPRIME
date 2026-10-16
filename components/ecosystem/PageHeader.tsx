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
    <header className="mb-9 max-w-3xl">
      <SectionLabel>{label}</SectionLabel>
      <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
        {intro}
      </p>
    </header>
  );
}
