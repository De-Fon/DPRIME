export default function SectionLabel({ children }: { children: string }) {
  return (
    <div className="font-mono text-sm text-muted mb-4">
      <span className="inline-flex items-center">
        <span
          className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
          aria-hidden
        />
        <span className="font-medium tracking-[0.05em]">{children}</span>
      </span>
    </div>
  );
}
