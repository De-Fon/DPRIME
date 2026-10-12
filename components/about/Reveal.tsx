// Fades content up as it scrolls into view, using CSS scroll-driven animation
// (see .reveal in globals.css). Content is always visible and needs no
// JavaScript; browsers without support simply show it with no animation.
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number; // accepted for compatibility; scroll-driven reveals ignore it
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
