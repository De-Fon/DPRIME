export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="border border-dashed border-line rounded-md p-10 text-center text-sm text-muted">
      {message}
    </div>
  );
}
