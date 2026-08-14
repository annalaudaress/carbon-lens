export function Header() {
  return (
    <header className="border-b border-terminal-border bg-terminal-surface/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <span className="text-green-400 text-lg">🌿</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white font-mono tracking-tight">
                Carbon Lens
              </h1>
              <p className="text-xs text-terminal-dim font-mono">
                Cloud Sustainability Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-terminal-dim">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow"></span>
              <span>Live Analysis</span>
            </div>
            <div className="hidden md:block text-xs font-mono text-terminal-dim bg-terminal-bg px-3 py-1.5 rounded border border-terminal-border">
              Region: <span className="text-terminal-text">us-east-1</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
