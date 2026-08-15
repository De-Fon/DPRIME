export default function StatsBar() {
  return (
    <div className="border-t border-ink border-b border-line bg-paper">
      <div className="max-w-5xl mx-auto px-6 py-6 flex items-center text-center text-sm font-mono">
        <div className="flex-1"> <div className="text-xl text-ink">10</div> <div className="text-muted">team members</div> </div>
        <div className="w-px bg-line h-8 mx-4" />
        <div className="flex-1"> <div className="text-xl text-ink">04</div> <div className="text-muted">projects shipped</div> </div>
        <div className="w-px bg-line h-8 mx-4" />
        <div className="flex-1"> <div className="text-xl text-ink">1</div> <div className="text-muted">live product (Rumia)</div> </div>
        <div className="w-px bg-line h-8 mx-4" />
        <div className="flex-1"> <div className="text-xl text-ink">100%</div> <div className="text-muted">supported post-launch</div> </div>
      </div>
    </div>
  );
}
