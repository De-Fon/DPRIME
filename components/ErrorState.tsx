import Link from "next/link";

export default function ErrorState({ message }: { message?: string }) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center py-12">
      <p className="text-ink text-lg">{message ?? "Something went wrong."}</p>
      <Link href="/" className="mt-4 text-slate underline">Return home</Link>
    </div>
  );
}
