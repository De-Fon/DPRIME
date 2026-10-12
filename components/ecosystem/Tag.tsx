export default function Tag({ children }: { children: string }) {
  return (
    <span className="font-mono text-xs text-muted border border-line rounded-full px-2.5 py-1">
      {children}
    </span>
  );
}
