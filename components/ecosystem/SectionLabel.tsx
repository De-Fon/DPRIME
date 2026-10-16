export default function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber sm:text-[11px]">
      <span aria-hidden="true" className="inline-flex h-2 w-2 shrink-0 rounded-full bg-amber" />
      <span>{children}</span>
      <span aria-hidden="true" className="h-px min-w-5 flex-1 bg-[#F0D9C7]" />
    </div>
  );
}
